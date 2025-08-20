package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import utils.DBManager;

public class Account {
    private Integer accountId;
    private String fullName;
    private String contact;
    private String email;
    private String password;
    private Timestamp registrationDate;
    private String verificationCode;
    private Status status;

    public Account() {
        
    }

    public static Boolean checkDuplicateEmail(String email) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT account_id FROM accounts WHERE email=?";
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

    public Status getStatus() {
        return new Status(status.getStatusId(), status.getName());
    }

    public void setStatus(Status status) {
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public String getVerificationCode() {
        return verificationCode;
    }   

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Timestamp getRegistrationDate() {
        return registrationDate;
    }
    
    public void setRegistrationDate(Timestamp registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }
}