package models;

import java.util.ArrayList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;

public class Weekday {
    private Integer weekdayId;
    private String name;

    public Weekday() {

    }

    public Weekday(Integer weekdayId, String name) {
        this.weekdayId = weekdayId;
        this.name = name;
    }

    public static ArrayList<Weekday> collectAllRecords() {
        ArrayList<Weekday> weekdayList = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT * FROM weekdays";
            PreparedStatement ps = con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Weekday day = new Weekday(
                    rs.getInt("weekday_id"),
                    rs.getString("name")
                );
                weekdayList.add(day);
            }   
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            weekdayList = null;
        }

        return weekdayList;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWeekdayId(Integer weekdayId) {
        this.weekdayId = weekdayId;
    }

    public String getName() {
        return name;
    }

    public Integer getWeekdayId() {
        return weekdayId;
    }

}