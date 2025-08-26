package models;

import java.sql.Date;
import java.sql.Timestamp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;
import utils.EncryptionManager;

public class Operator implements Account {
    private Integer operatorId;
    private String fullName;
    private Date registrationDate; 
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

    public Operator(String fullName, String contact, String email, String password, Date registrationDate, String address, Integer baseCharge, Status status) {
        this.fullName = fullName;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.registrationDate = new Date(registrationDate.getTime());
        this.address = address;
        this.baseCharge = baseCharge;
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public Operator() {
    }

    @Override
    public boolean saveRecord() {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO operators " + 
                    "(full_name,contact,email,password,registration_date,address,base_charge,status_id)" + 
                    "VALUES (?,?,?,?,?,?,?,2)";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, fullName);
            ps.setString(2, contact);
            ps.setString(3, email);
            ps.setString(4, EncryptionManager.encryptPassword(password));
            ps.setDate(5, registrationDate);
            ps.setString(6, address);
            ps.setInt(7, baseCharge);

            flag = ps.executeUpdate() == 1;
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public void setField(String fieldName, String value) {
        switch(fieldName) {
            case "full_name":
                setFullName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "contact":
                setContact(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "registration_date":
                setRegistrationDate(Date.valueOf(value));
            case "address":
                setAddress(value);
                break;
            case "website":
                setWebsite(value);
                break;
            case "base_charge":
                setBaseCharge(Integer.parseInt(value));
                break;
            default:
                break;
        }
    }

    @Override
    public void setFile(String fieldName, String value) {
        switch(fieldName) {
            case "certificate":
                setCertificate(value);
                break;
            case "logo":
                setLogo(value);
                break;
            case "banner":
                setBanner(value);
                break;
            default:
                break;
        }
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

    public Date getRegistrationDate() {
        return new Date(registrationDate.getTime());
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = new Date(registrationDate.getTime());
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
        return new Status(status.getStatusId(), status.getName());
    }

    public void setStatus(Status status) {
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
