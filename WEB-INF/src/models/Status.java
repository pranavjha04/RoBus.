package models;

import java.util.ArrayList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;

public class Status implements Cloneable {
    private Integer statusId;
    private String name;
    
    public Status(Integer statusId, String name) {
        this.statusId = statusId;
        this.name = name;
    }

    public Status() {
    }

    public static ArrayList<Status> collectAllRecords() {
        ArrayList<Status> statusList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT * FROM status";
            PreparedStatement ps = con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Status status = new Status(rs.getInt("status_id"), rs.getString("name"));
                statusList.add(status);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            statusList = null;
        }
        return statusList;
    }

    @Override
    public Status clone() {
        return new Status(getStatusId(), getName());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }
}
