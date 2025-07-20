package models;

import java.sql.Date;

public class Driver implements Cloneable {
    private Integer driverId;
    private Date startDate;
    private Date endDate;
    private User user;
    private Operator operator;

    public Driver() {

    }

    @Override
    public Driver clone() {
        Driver driver = null;
        try {
            driver = (Driver) super.clone();
            driver.startDate = new Date(startDate.getTime());
            driver.endDate = new Date(endDate.getTime());
            driver.user = user.clone();
            driver.operator = operator.clone();
        }
        catch(CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return driver;
    }

    public void setOperator(Operator operator) {
        this.operator = operator.clone();
    }

    public Operator getOperator() {
        return operator.clone();
    }

    public void setUser(User user) {
        this.user = user.clone();
    }

    public User getUser() {
        return user.clone();
    }

    public void setEndDate(Date endDate) {
        this.endDate = new Date(endDate.getTime());
    }

    public Date getEndDate() {
        return new Date(endDate.getTime());
    }

    public void setStartDate(Date startDate) {
        this.startDate = new Date(startDate.getTime());
    }

    public Date getStartDate() {
        return new Date(startDate.getTime());
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public Integer getDriverId() {
        return driverId;
    }
}