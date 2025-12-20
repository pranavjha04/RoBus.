package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

import java.util.ArrayList;

import utils.DBManager;

public class BusImage {
    private Integer busImageId;
    private String pic;
    private Bus bus;

    public BusImage(String pic, Bus bus) {
        this.pic = pic;
        this.bus = bus;
    }
    public BusImage(Integer busImageId, String pic, Bus bus) {
        this(pic, bus);
        this.busImageId = busImageId;
    }

    public BusImage() {

    }

    public static boolean addRecord(String pic, int busId) {
        boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO bus_images " +
                    "(pic, bus_id) " + 
                    "VALUES (?,?)";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, pic);
            ps.setInt(2, busId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        
        return flag;
    }

    public static ArrayList<BusImage> collectAllRecords(int busId, int operatorId) {
        ArrayList<BusImage> list = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM bus_images bi " +
                        "JOIN buses b ON b.bus_id = bi.bus_id " +
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        "JOIN status s ON b.status_id = s.status_id " +
                        "WHERE b.operator_id=? AND b.bus_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorId);
            ps.setInt(2, busId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Bus bus = new Bus(
                    rs.getInt("b.bus_id"),
                    rs.getString("b.bus_number"),
                    new Manufacturer(
                        rs.getInt("m.manufacturer_id"),
                        rs.getString("m.name")
                    ),
                    rs.getBoolean("double_decker"),
                    new Status(
                        rs.getInt("s.status_id"),
                        rs.getString("s.name")
                    )
                );

                BusImage busImage = new BusImage(
                    rs.getInt("bi.bus_image_id"),
                    rs.getString("bi.pic"),
                    bus
                );

                list.add(busImage);
            }

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return list;
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