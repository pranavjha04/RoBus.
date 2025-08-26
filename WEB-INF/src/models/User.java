package models;

import java.sql.Date;
import java.sql.Timestamp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;
import utils.EncryptionManager;

public class User implements Account {

    private Integer userId;
    private String fullName;
    private Date dob;
    private String contact;
    private Integer gender;
    private String email;
    private String password;
    private String profilePic;
    private Status status;
    private String licencePic;
    private String licenceNumber;
    private Timestamp createdAt;   
    private Timestamp updatedAt; 

    public User(String fullName, String contact, String email, String password, Date dob, Integer gender, Status status) {
        this.fullName = fullName;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.dob = new Date(dob.getTime());
        this.gender = gender;
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public User() {
    }

    @Override
    public boolean saveRecord() {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO users " + 
                    "(full_name,contact,email,password,dob,gender,status_id) " +
                    "VALUES (?,?,?,?,?,?,2)";
            
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, fullName);
            ps.setString(2, contact);
            ps.setString(3, email);
            ps.setString(4, EncryptionManager.encryptPassword(password));
            ps.setDate(5, dob);
            ps.setInt(6, gender);

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
            case "dob":
                setDob(Date.valueOf(value));
                break;
            case "gender":
                setGender(Integer.parseInt(value));
                break;
            case "licence_no":
                setLicenceNumber(value);
                break;
            default:
                break;
        }
    }

    @Override
    public void setFile(String fieldName, String value) {
        switch(fieldName) {
            case "profile_pic":
                setProfilePic(value);
                break;
            case "licence_pic":
                setLicencePic(value);
                break;
            default:
                break;
        }
    }

    public static boolean checkUniqueEmail(String email) {
        boolean flag = true;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT user_id FROM users WHERE email=?";
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
            String query = "SELECT user_id FROM users WHERE contact=?";
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


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getDob() {
        return new Date(dob.getTime());
    }

    public void setDob(Date dob) {
        this.dob = new Date(dob.getTime());
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
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

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Status getStatus() {
        return new Status(status.getStatusId(), status.getName());
    }

    public void setStatus(Status status) {
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public String getLicencePic() {
        return licencePic;
    }

    public void setLicencePic(String licencePic) {
        this.licencePic = licencePic;
    }

    public String getLicenceNumber() {
        return licenceNumber;
    }

    public void setLicenceNumber(String licenceNumber) {
        this.licenceNumber = licenceNumber;
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
