package models;

import utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

public class BusFareFactor {
    private Integer busFareFactorId;
    private Bus bus;
    private OperatorTicketFare operatorTicketFare;

    public BusFareFactor(Integer busFareFactorId, Bus bus) {
        this.busFareFactorId = busFareFactorId;
        this.bus = bus;
    }

    public BusFareFactor(Integer busFareFactorId, Bus bus, OperatorTicketFare operatorTicketFare) {
        this(busFareFactorId, bus);
        this.operatorTicketFare = operatorTicketFare;
    }

    public BusFareFactor() {

    }

    public static Boolean deleteRecord(Integer busId, Integer busFareFactorId, Integer operatorTicketFareId) {
        Boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "DELETE FROM bus_fare_factor " +
                        "WHERE bus_id=? AND bus_fare_factor_id=? AND operator_ticket_fare_id=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, busId);
            ps.setInt(2, busFareFactorId);
            ps.setInt(3, operatorTicketFareId);
            int rows = ps.executeUpdate();

            if(rows == 1) {
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

    public static boolean addMultipleRecords(String[] busIdList, int operatorTicketFareId) {
        boolean flag = false;
        StringBuilder builder = new StringBuilder();
        for(int i = 0; i < busIdList.length; i++) {
            builder.append("(?,?)");
            if(i != busIdList.length - 1) builder.append(",");
        }
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO " +  
                        "bus_fare_factor (bus_id, operator_ticket_fare_id) " + 
                        "VALUES " + builder.toString();
            
            PreparedStatement ps = con.prepareStatement(query);

            int count = 1;
            for(String next: busIdList) {
                try {
                    int busId = Integer.parseInt(next);
                    ps.setInt(count++, busId);
                    ps.setInt(count++, operatorTicketFareId);
                }
                catch(NumberFormatException e) {
                    throw new SQLException();
                }
            }

            int rows = ps.executeUpdate();
            if(rows > 0) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            flag = true;
            e.printStackTrace();
        }
        return flag;
    }

    public static boolean addRecord(int busId, int operatorTicketFareId) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();

            String query = 
                    "INSERT INTO " + 
                    "bus_fare_factor" + 
                    "(bus_id, operator_ticket_fare_id) " +
                    "VALUES(?,?)";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, busId);
            ps.setInt(2, operatorTicketFareId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;
    }

    public static ArrayList<BusFareFactor> collectAllRecordsWithOperatorTicketFare(Integer operatorTicketFareId, Integer operatorId) {
        ArrayList<BusFareFactor> busFareFactorList = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT " + 
                        "bff.*, " +
                        "b.bus_id, b.bus_number, b.double_decker, " +
                        "m.manufacturer_id, m.name AS 'manufacturer_name', " +
                        "s.status_id, s.name AS 'status_name' " +
                        "FROM bus_fare_factor bff " +
                        "JOIN buses b ON bff.bus_id = b.bus_id " +
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        "JOIN status s ON b.status_id = s.status_id " +
                        "WHERE bff.operator_ticket_fare_id=? and b.operator_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorTicketFareId);
            ps.setInt(2, operatorId);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                Bus bus = new Bus(
                    rs.getInt("bus_id"),
                    rs.getString("bus_number"),
                    new Manufacturer(
                        rs.getInt("manufacturer_id"),
                        rs.getString("manufacturer_name")
                    ),
                    rs.getBoolean("double_decker"),
                    new Status(
                        rs.getInt("status_id"),
                        rs.getString("status_name")
                    )
                );

                BusFareFactor busFareFactor = new BusFareFactor(
                    rs.getInt("bus_fare_factor_id"),
                    bus
                );

                busFareFactorList.add(busFareFactor);
            }

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            busFareFactorList = null;
        }

        return busFareFactorList;
    }

    public static ArrayList<BusFareFactor> collectAllRecords(Integer busId, Integer operatorId) {
        ArrayList<BusFareFactor> list = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM bus_fare_factor bff " +
                        // buses
                        "JOIN buses b ON bff.bus_id = b.bus_id " +
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        "JOIN status s ON b.status_id = s.status_id " +
                        // operator_ticket_fare
                        "JOIN operator_ticket_fare otf ON bff.operator_ticket_fare_id = otf.operator_ticket_fare_id " +
                        "JOIN fare_factor ff ON otf.fare_factor_id = ff.fare_factor_id " +
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

                OperatorTicketFare operatorTicketFare = new OperatorTicketFare(
                    rs.getInt("otf.operator_ticket_fare_id"),
                    rs.getInt("otf.charges"),
                    new FareFactor(
                        rs.getInt("ff.fare_factor_id"),
                        rs.getString("ff.name"),
                        rs.getBoolean("ff.fixed_charge")
                    )
                );

                BusFareFactor busFareFactor = new BusFareFactor(
                    rs.getInt("bff.bus_fare_factor_id"),
                    bus,
                    operatorTicketFare
                );

                list.add(busFareFactor);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            list = null;
        }

        return list;
    }

    public void setOperatorTicketFare(OperatorTicketFare operatorTicketFare) {
        this.operatorTicketFare = operatorTicketFare;
    }

    public OperatorTicketFare getOperatorTicketFare() {
        return operatorTicketFare;
    }

    public void setBus(Bus bus) {
        this.bus = bus.clone();
    }

    public Bus getBus() {
        return bus.clone();
    }

    public void setBusFareFactorId(Integer busFareFactorId) {
        this.busFareFactorId = busFareFactorId;
    } 

    public Integer getBusFareFactorId() {
        return busFareFactorId;
    }
}