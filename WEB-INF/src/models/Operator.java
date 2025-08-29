package models;

import java.sql.Date;
import java.sql.Timestamp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;
import utils.EncryptionManager;

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

    public boolean addRecord() {
        boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO operators " + 
                    "(full_name,contact,email,password,address,website,base_charge,status_id,user_id) " +
                    "VALUES (?,?,?,?,?,?,?,?,?)";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, fullName);
            ps.setString(2, contact);
            ps.setString(3, email);
            ps.setString(4, EncryptionManager.encryptPassword(password));
            ps.setString(5, address);
            ps.setString(6, website);
            ps.setInt(7, baseCharge);
            ps.setInt(8, 2); 
            ps.setInt(9, user.getUserId());

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;
    }

    public static Operator login(String email, String password) throws PasswordMismatchException {
        Operator operator = null;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "SELECT * FROM operators " +
                    "JOIN status ON operators.status_id=status.status_id " +
                    "JOIN users ON operators.user_id=users.user_id " +
                    "WHERE operators.email=?";

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
