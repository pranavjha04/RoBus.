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
    private User user;

    public Operator(Integer operatorId, String fullName, String address, String email, String password, String contact, String certificate, String website, String logo, String banner, String verificationCode, Integer baseCharge, Status status, Timestamp createdAt, Timestamp updatedAt, User user) {
        this(fullName, contact, email, password, address, website, baseCharge, user);
        this.operatorId = operatorId;
        this.certificate = certificate;
        this.logo = logo;
        this.banner = banner;
        this.verificationCode = verificationCode;
        this.status = status.clone();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
                    "SELECT " +
                    "o.operator_id, " +
                    "o.full_name AS operator_full_name, " +
                    "o.contact AS operator_contact, " +
                    "o.email AS operator_email, " +
                    "o.password AS operator_password, " +
                    "o.address AS operator_address, " +
                    "o.certificate AS operator_certificate, " +
                    "o.website AS operator_website, " +
                    "o.logo AS operator_logo, " +
                    "o.banner AS operator_banner, " +
                    "o.base_charge AS operator_base_charge, " +
                    "o.created_at AS operator_created_at, " +
                    "o.updated_at AS operator_updated_at, " +
                    "o.verification_code AS operator_verification_code, " +
                    "os.status_id AS operator_status_id, " +
                    "os.name AS operator_status_name, " +
                    "u.user_id, " +
                    "u.full_name AS user_full_name, " +
                    "u.contact AS user_contact, " +
                    "u.email AS user_email, " +
                    "u.password AS user_password, " +
                    "u.dob AS user_dob, " +
                    "u.gender AS user_gender, " +
                    "u.profile_pic AS user_profile_pic, " +
                    "u.created_at AS user_created_at, " +
                    "u.updated_at AS user_updated_at, " +
                    "u.verification_code AS user_verification_code, " +
                    "us.status_id AS user_status_id, " +
                    "us.name AS user_status_name, " +
                    "ut.user_type_id, " +
                    "ut.name AS user_type_name " +
                    "FROM operators o " +
                    "JOIN status os ON o.status_id = os.status_id " +
                    "JOIN users u ON o.user_id = u.user_id " +
                    "JOIN status us ON u.status_id = us.status_id " +
                    "JOIN user_types ut ON u.user_type_id = ut.user_type_id " +
                    "WHERE o.email = ?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email); 

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                if(!EncryptionManager.checkPassword(password, rs.getString("operator_password"))) {
                    throw new PasswordMismatchException("Wrong password");
                }
                operator = new Operator(
                    rs.getInt("operator_id"),
                    rs.getString("operator_full_name"),
                    rs.getString("operator_address"),
                    rs.getString("operator_email"),
                    rs.getString("operator_password"),
                    rs.getString("operator_contact"),
                    rs.getString("operator_certificate"),
                    rs.getString("operator_website"),
                    rs.getString("operator_logo"),
                    rs.getString("operator_banner"),
                    rs.getString("operator_verification_code"),
                    rs.getInt("operator_base_charge"),
                    new Status(rs.getInt("operator_status_id"), rs.getString("operator_status_name")),
                    rs.getTimestamp("operator_created_at"),
                    rs.getTimestamp("operator_updated_at"),
                    new User(
                        rs.getInt("user_id"),
                        rs.getString("user_full_name"),
                        rs.getDate("user_dob"),
                        rs.getString("user_contact"),
                        rs.getInt("user_gender"),
                        rs.getString("user_email"),
                        rs.getString("user_password"),
                        rs.getString("user_profile_pic"),
                        new Status(rs.getInt("user_status_id"), rs.getString("user_status_name")),
                        rs.getString("user_verification_code"),
                        rs.getTimestamp("user_created_at"),
                        rs.getTimestamp("user_updated_at"),
                        new UserType(rs.getInt("user_type_id"), rs.getString("user_type_name"))
                    )
                );
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return operator;
    }

    public static boolean checkEmailExist(String email) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT operator_id FROM operators WHERE email=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email);
            
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = true;
            }
            con.close();
        }   
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public static boolean checkContactExist(String contact) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT operator_id FROM operators WHERE contact=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, contact);
            
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = true;
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
                boolean isContactValid = FieldManager.validateContact(value) && !User.checkContactExist(value) && !Operator.checkContactExist(value);

                if(!isContactValid) {
                    return "4";
                }
                setContact(value);
                break;
            case "email":
                boolean isEmailValid = FieldManager.validateEmail(value) && !User.checkEmailExist(value) && !Operator.checkEmailExist(value);
                
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

    public void setUser(User user) {
        this.user = user.clone();
    }

    public User getUser() {
        return user.clone();
    }
}
