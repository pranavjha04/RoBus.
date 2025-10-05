package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

import utils.DBManager;

public class Manufacturer {
    private Integer manufacturerId;
    private String name;

    public Manufacturer(Integer manufacturerId, String name) {
        this.manufacturerId = manufacturerId;
        this.name = name;
    }

    public Manufacturer () {

    }

    public static ArrayList<Manufacturer> collectAllRecords() {
        ArrayList<Manufacturer> manufacturerList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT * FROM manufacturers";
            PreparedStatement ps = con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Manufacturer manufacturer = new Manufacturer(
                    rs.getInt(1),
                    rs.getString(2)
                );

                manufacturerList.add(manufacturer);
            }

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return manufacturerList;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }

    public void setManufacturerId(Integer manufacturerId) {
        this.manufacturerId = manufacturerId;
    }

    public Integer getManufacturerId() {
        return manufacturerId;
    }
}