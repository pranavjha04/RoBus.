package models;

import utils.DBManager;

import java.sql.Date;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

public class Driver {
    private Integer driverId;
    private Date startDate;
    private Date endDate;
    private String licencePic;
    private String licenceNumber;
    private User user;
    private Operator operator;
    

    public Driver() {

    }

    public static int addRecord(String licenceNumber, String licencePic, Date startDate, Integer userId, Integer operatorId) {
        int generatedKey = -1;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                            "INSERT INTO drivers " + 
                            "(licence_no, licence_pic, start_date, user_id, operator_id) " +
                            "VALUES (?,?,?,?,?)";
            
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, licenceNumber);
            ps.setString(2, licencePic);
            ps.setDate(3, startDate);
            ps.setInt(4, userId);
            ps.setInt(5, operatorId);

            int rows = ps.executeUpdate();
            if(rows > 0) {
                ResultSet rs = ps.getGeneratedKeys();
                if(rs.next()) {
                    generatedKey = rs.getInt(1);
                }
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            generatedKey = -1;
        }

        return generatedKey;
    }

    public static boolean checkLicenceNumberExist(String licenceNumber) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                            "SELECT licence_no FROM drivers " +
                            "where licence_no=?";
            
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, licenceNumber);

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
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

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public Integer getDriverId() {
        return driverId;
    }
}