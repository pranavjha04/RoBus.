package models;

import utils.DBManager;

import java.sql.Date;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

import java.util.ArrayList;


public class Driver {
    private Integer driverId;
    private Date startDate;
    private Date endDate;
    private String licencePic;
    private String licenceNumber;
    private User user;
    private Operator operator;

    public Driver(Integer driverId, Date startDate, Date endDate, String licencePic, String licenceNumber, User user) {
        this.driverId = driverId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.licencePic = licencePic;
        this.licenceNumber = licenceNumber;
        this.user = user;
    }
    
    public Driver() {

    }

    public static ArrayList<Driver> collectRecords(Integer operatorId) {
        ArrayList<Driver> list = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                            "SELECT * " +
                            "from drivers d " +
                            "join users u on d.user_id = u.user_id " +
                            "join status s on u.status_id = s.status_id " +
                            "join user_types ut on u.user_type_id = ut.user_type_id " +
                            "WHERE operator_id=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, operatorId);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                 User user = new User(
                        rs.getInt("u.user_id"), 
                        rs.getString("u.full_name"),
                        rs.getDate("u.dob"),
                        rs.getString("u.contact"),
                        rs.getInt("u.gender"),
                        rs.getString("u.email"),
                        rs.getString("u.password"),
                        rs.getString("u.profile_pic"),
                        new Status(rs.getInt("s.status_id"), rs.getString("s.name")),
                        rs.getString("u.verification_code"),
                        rs.getTimestamp("u.created_at"),
                        rs.getTimestamp("u.updated_at"),
                        new UserType(rs.getInt("ut.user_type_id"), rs.getString("ut.name"))
                );

                Driver driver = new Driver(
                    rs.getInt("d.driver_id"),
                    rs.getDate("d.start_date"),
                    rs.getDate("d.end_date"),
                    rs.getString("d.licence_pic"),
                    rs.getString("d.licence_no"),
                    user
                );

                list.add(driver);
            }
            con.close();
        }
        catch(SQLException e) {
            list = null;
            e.printStackTrace();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        
        return list;
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