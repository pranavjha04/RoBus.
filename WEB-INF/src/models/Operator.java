package models;

import java.util.Date;

public class Operator implements Cloneable {
    private Integer operatorId;
    private String name;
    private Date registrationDate;
    private String address;
    private String email;
    private String password;
    private String certificate;
    private String website;
    private String logo;
    private String verificationCode;
    private String banner;
    private Integer baseCharge;
    private Status status;


    public Operator() {
        
    }

    @Override
    public Operator clone() {
        Operator operator = null;
        try {
            operator = (Operator) super.clone();
            operator.registrationDate = new Date(registrationDate.getTime());
            return operator;
        }
        catch(CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return operator;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }
    
    public void setBaseCharge(Integer baseCharge) {
        this.baseCharge = baseCharge;
    }

    public Integer getBaseCharge() {
        return baseCharge;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getBanner() {
        return banner;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLogo() {
        return logo;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getWebsite() {
        return website;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }    

    public String getCertificate() {
        return certificate;
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

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = new Date(registrationDate.getTime());
    }
    
    public Date getRegistrationDate() {
        return new Date(registrationDate.getTime());
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }
    public Integer getOperatorId() {
        return operatorId;
    }
}