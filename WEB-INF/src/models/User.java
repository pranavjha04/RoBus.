package models;

import java.sql.Date;

public class User extends Account {
    private Integer userId;
    private Date dob;
    private String gender;
    private String profilePic;
    private String licencePic;
    private String licenceNumber;
    private Account account;

    public User() {

    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }

    public void setLicenceNumber(String licenceNumber) {
        this.licenceNumber = licenceNumber;
    }

    public String getLicenceNumber() {
        return licenceNumber;
    }

    public void setLicencePic(String licencePic) {
        this.licencePic = licencePic;
    }
    
    public String getLicencePic() {
        return licencePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }

    public void setDob(Date dob) {
        this.dob = new Date(dob.getTime());
    }

    public Date getDob() {
        return new Date(dob.getTime());
    }

    public void setUserId(Integer userId) {
        this.userId = userId;   
    }
    
    public Integer getUserId() {
        return userId;
    }
}