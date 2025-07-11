package models;

import java.util.Date;

public class User implements Cloneable {
    private Integer userId;
    private String fullName;
    private Date dob;
    private String contact;
    private String gender;
    private String email;
    private String password;
    private String profilePic;
    private String licencePic;
    private String licenceNumber;
    private Status status;

    public User() {

    }

    @Override
    public User clone() {
        User user = null;
        try {
            user = (User) super.clone();
            user.dob = new Date(dob.getTime());
        }
        catch(CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return user;
    }

    public void setStatus(Status status) {
        this.status = status;
    } 

    public Status getStatus() {
        return status;
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

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getContact() {
        return contact;
    }

    public void setDob(Date dob) {
        this.dob = new Date(dob.getTime());
    }

    public Date getDob() {
        return new Date(dob.getTime());
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;   
    }
    
    public Integer getUserId() {
        return userId;
    }
}