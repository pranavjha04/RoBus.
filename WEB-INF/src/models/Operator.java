package models;

import java.sql.Date;
import java.sql.Timestamp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import utils.DBManager;
import utils.EncryptionManager;

import java.util.HashMap;

import utils.FieldManager;
import utils.FileManager;

import exceptions.PasswordMismatchException;

public class Operator implements Cloneable {
    private Integer operatorId;
    private String fullName;
    private String address;
    private String email;
    private String password;
    private String contact;
    private String certificate;
    private String website;
    private String logo;
    private String banner;
    private String verificationCode;
    private Integer baseCharge;
    private Status status;
    private Timestamp createdAt;   
    private Timestamp updatedAt;   
    private UserType userType;
    private User user;

    public Operator(Integer operatorId, String fullName, String address, String email, String password, String contact, String certificate, String website, String logo, String banner, String verificationCode, Integer baseCharge, Status status, Timestamp createdAt, Timestamp updatedAt, UserType userType, User user) {
        this(fullName, contact, email, password, address, website, baseCharge, user);
        this.operatorId = operatorId;
        this.certificate = certificate;
        this.logo = logo;
        this.banner = banner;
        this.verificationCode = verificationCode;
        this.status = status.clone();
        this.createdAt = createdAt;
        this.updatedAt =  updatedAt;
        this.userType = userType.clone();
    }
    public Operator(String fullName, String contact, String email, String password, String address, String website, Integer baseCharge, User user) {
        this.fullName = fullName;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.address = address;
        this.website = website;
        this.baseCharge = baseCharge;
        this.user = user.clone();
    }

    public Operator() {
    }

    public int addRecord() {
        int generatedId = -1;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO operators " + 
                    "(full_name,contact,email,password,address,website,base_charge,certificate,logo,banner,status_id,user_id) " +
                    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
            
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, fullName);
            ps.setString(2, contact);
            ps.setString(3, email);
            ps.setString(4, EncryptionManager.encryptPassword(password));
            ps.setString(5, address);
            ps.setString(6, website);
            ps.setInt(7, baseCharge);
            ps.setString(8, certificate);
            ps.setString(9, logo);
            ps.setString(10, banner);
            ps.setInt(11, 2); 
            ps.setInt(12, user.getUserId());

            if(ps.executeUpdate() != 1) {
                generatedId = -1;
            } 

            if(generatedId == -1) {
                ResultSet rs = ps.getGeneratedKeys();
                if(rs.next()) {
                    generatedId = rs.getInt(1);
                }
            }

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return generatedId;
    }

    public static Operator login(String email, String password) throws PasswordMismatchException {
        Operator operator = null;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "SELECT o.*, o.status_id AS operator_status, os.name as operator_name  FROM operators AS o " +
                    "JOIN status as s ON o.status_id=s.status_id " +
                    "JOIN users AS u ON o.user_id=u.user_id " +
                    "WHERE o.email=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email); 

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                if(!EncryptionManager.checkPassword(password, rs.getString("password"))) {
                    throw new PasswordMismatchException("Wrong password");
                }
                operator = new Operator();
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return operator;
    }

    public static boolean checkUniqueEmail(String email) {
        boolean flag = true;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT operator_id FROM operators WHERE email=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email);
            
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = false;
            }
            con.close();
        }   
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public static boolean checkUniqueContact(String contact) {
        boolean flag = true;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT operator_id FROM operators WHERE contact=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, contact);
            
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = false;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public String setField(String field, String value)  {
        switch(field) {
            case "full_name":
                if(!FieldManager.validateName(value)) {
                    return "1";
                }
                setFullName(value);
                break;
            case "contact":
                boolean isContactValid = FieldManager.validateContact(value) && User.checkUniqueContact(value) && Operator.checkUniqueContact(value);

                if(!isContactValid) {
                    return "4";
                }
                setContact(value);
                break;
            case "email":
                boolean isEmailValid = FieldManager.validateEmail(value) && User.checkUniqueEmail(value) && Operator.checkUniqueEmail(value);
                
                if(!isEmailValid) {
                    return "2";
                }
                setEmail(value);
                break;
            case "password":
                if(!FieldManager.validatePassword(value)) {
                    return "3";
                }
                setPassword(value);
                break;
            case "address":
                if(!FieldManager.validateAddress(value)) {
                    return "5";
                }
                setAddress(value);
                break;
            case "website":
                if(!value.trim().isEmpty() && !FieldManager.validateWebsite(value)) {
                    return "6";
                }
                setWebsite(value.isEmpty() ? null : value);
                break;
            case "base_charge":
                if(value == null || !FieldManager.validateBaseCharge(Integer.parseInt(value))) {
                    return "7";
                }
                setBaseCharge(Integer.parseInt(value));
                break;
            default:
                break;
        }
        return "";
    }

    public String setFile(String field, String name, long size, HashMap<String,String> map)  {
        String randomFileName = FileManager.generateFileName(name);
        String accept = "image";
        switch(field) {
            case "certificate":
                if(!FileManager.validateFileSize(size) || !FileManager.validateFileExtension(name, accept)) {
                    return "8";
                }

                map.put(field, randomFileName);
                setCertificate(randomFileName);
                break;
            case "logo":
                if(!FileManager.validateFileSize(size) || !FileManager.validateFileExtension(name, accept)) {
                    return "9";
                }

                map.put(field, randomFileName);
                setLogo(randomFileName);
                break;
            case "banner":
                if(!FileManager.validateFileSize(size) || !FileManager.validateFileExtension(name, accept)) {
                    return "10";
                }

                map.put(field, randomFileName);
                setBanner(randomFileName);
                break;
            default:
                break;
        }
        return "";
    }

    @Override
    public Operator clone() {
        return new Operator(
            getOperatorId(),
            getFullName(),
            getAddress(),
            getEmail(),
            getPassword(),
            getContact(),
            getCertificate(),
            getWebsite(),
            getLogo(),
            getBanner(),
            getVerificationCode(),
            getBaseCharge(),
            getStatus(),
            getCreatedAt(),
            getUpdatedAt(),
            getUserType(),
            getUser()
        );
    }

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Integer getBaseCharge() {
        return baseCharge;
    }

    public void setBaseCharge(Integer baseCharge) {
        this.baseCharge = baseCharge;
    }

    public Status getStatus() {
        return status.clone();
    }

    public void setStatus(Status status) {
        this.status = status.clone();
    }

    public Timestamp getCreatedAt() {
        return new Timestamp(createdAt.getTime());
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = new Timestamp(createdAt.getTime());
    }

    public Timestamp getUpdatedAt() {
        return new Timestamp(updatedAt.getTime());
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = new Timestamp(updatedAt.getTime());
    }

    public UserType getUserType() {
        return userType.clone();
    } 

    public void setUserType(UserType userType) {
        this.userType = userType.clone();
    }

    public void setUser(User user) {
        this.user = user.clone();
    }

    public User getUser() {
        return user.clone();
    }
}
