package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

import utils.DBManager;

public class BusImage {
    private Integer busImageId;
    private String pic;
    private Bus bus;

    public BusImage(String pic, Bus bus) {
        this.pic = pic;
        this.bus = bus.clone();
    }

    public BusImage() {

    }

    public int addRecord() {
        int generatedId = -1;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO bus_images " +
                    "(pic, bus_id) " + 
                    "VALUES (?,?)";
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, pic);
            ps.setInt(2, bus.getBusId());

            if(ps.executeUpdate() != 1) {
                generatedId = -1;
            }

            if(generatedId != -1) {
                ResultSet rs = ps.getGeneratedKeys();
                if(rs.next()) {
                    generatedId = rs.getInt(1);
                }
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        
        return generatedId;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public Bus getBus() {
        return bus;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getPic() {
        return pic;
    }

    public void setBusImageId(Integer busImageId) {
        this.busImageId = busImageId;
    }

    public Integer getBusImageId() {
        return busImageId;
    }
}