package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

import utils.DBManager;


public class SeatType {
    private Integer seatTypeId;
    private String name;

    public SeatType(Integer seatTypeId, String name) {
        this.seatTypeId = seatTypeId;
        this.name = name;
    }

    public static ArrayList<SeatType> collectAllRecords() {
        ArrayList<SeatType> seatTypeList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT * FROM seat_types";
            PreparedStatement ps = con.prepareStatement(query);
            
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                SeatType type = new SeatType(
                    rs.getInt("seat_type_id"), 
                    rs.getString("name")
                );

                seatTypeList.add(type);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            seatTypeList = null;
        }
        return seatTypeList;
    } 

    public SeatType() {

    }

    public void setSeatTypeId(Integer seatTypeId) {
        this.seatTypeId = seatTypeId;
    }
    
    public Integer getSeatTypeId() {
        return seatTypeId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}