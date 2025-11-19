package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

import java.util.ArrayList;

import utils.DBManager;
import utils.FieldManager;

public class Bus implements Cloneable {
    private Integer busId;
    private String busNumber;
    private Integer seats;
    private Manufacturer manufacturer;
    private Boolean doubleDecker;
    private Status status;
    private Operator operator;

    public Bus(String busNumber, Manufacturer manufacturer, Boolean doubleDecker, Status status) {
        this.busNumber = busNumber;
        this.manufacturer = new Manufacturer(manufacturer.getManufacturerId(), manufacturer.getName());
        this.doubleDecker = doubleDecker;
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public Bus(Integer busId, String busNumber, Manufacturer manufacturer, Boolean doubleDecker, Status status) {
        this(busNumber, manufacturer, doubleDecker, status);
        this.busId = busId;
    }

    public Bus() {
        
    }

    public static ArrayList<Bus> collectAvailableTicketFareBusRecords(Integer operatorTicketFareId, String[] busIdList, Integer operatorId, int offSet) {
        ArrayList<Bus> busList = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            StringBuilder builder = new StringBuilder();
            builder.append("(");
            for(int i = 0; i < busIdList.length; i++) {
                try {
                    int busId = Integer.parseInt(busIdList[i]);
                    builder.append("?");
                }
                catch(NumberFormatException e) {
                    return null;
                }
                if(i != busIdList.length - 1) builder.append(",");
            }
            builder.append(")");

            String query = 
                        "SELECT " + 
                        "b.bus_id, b.bus_number, b.double_decker, " +
                        "m.manufacturer_id, m.name AS 'manufacturer_name', " +
                        "s.status_id, s.name AS 'status_name' " +
                        "FROM buses b  " +
                        "LEFT JOIN bus_fare_factor bff ON b.bus_id = bff.bus_id " +
                        "AND bff.operator_ticket_fare_id!=? " + 
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        "JOIN status s ON b.status_id = s.status_id " +
                        "WHERE b.operator_id=? " + "AND s.status_id!=4 " +
                        "AND b.bus_id NOT IN " + builder.toString() + "LIMIT 5 OFFSET " + offSet;
            
            PreparedStatement ps = con.prepareStatement(query);

            int count = 1;
            ps.setInt(count++, operatorTicketFareId);
            ps.setInt(count++, operatorId);          

            for (String busIdStr : busIdList) {
                ps.setInt(count++, Integer.parseInt(busIdStr));
            }
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

                busList.add(bus);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            busList = null;
        }

        return busList;
    }

    public static Bus getRecord(Integer busId, Integer operatorId) {
        Bus bus = null;
        try {
            Connection con = DBManager.getConnection();

            String query = 
                    "SELECT " +
                    "b.bus_id, b.bus_number, b.double_decker, " +
                    "m.manufacturer_id, m.name AS manufacturer_name, " +
                    "s.status_id, s.name AS status_name " + 
                    "FROM " +
                    "buses b JOIN status s " + 
                    "ON b.status_id = s.status_id " +
                    "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                    "WHERE bus_id=? AND operator_id=?";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, busId);
            ps.setInt(2, operatorId);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                bus = new Bus(
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
            }

            con.close();
        }
        catch(SQLException e) {
            bus = null;
            e.printStackTrace();
        }

        return bus;
    }

    public static Boolean updateStatus(Integer busId, Integer statusId) {
        Boolean flag = false;
        try {
            Connection con = DBManager.getConnection();

            String query = 
                        "UPDATE buses " +
                        "SET status_id=? " +
                        "WHERE bus_id=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, statusId);
            ps.setInt(2, busId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        
        return flag;
    }
    
    public static ArrayList<Bus> collectRecords(int operatorId, boolean allData) {
        ArrayList<Bus> busList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "";
            if(allData) {

            }
            else {
                query = 
                    "SELECT " +
                    "b.bus_id, b.bus_number, b.double_decker, " +
                    "m.manufacturer_id, m.name AS manufacturer_name, " +
                    "s.status_id, s.name AS status_name " + 
                    "FROM " +
                    "buses b JOIN status s " + 
                    "ON b.status_id = s.status_id " +
                    "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                    "WHERE operator_id=?";
            }

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, operatorId);

            ResultSet rs = ps.executeQuery();

            if(allData) {}
            else {
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

                    busList.add(bus);
                }
            }

        }
        catch(SQLException e) {
            e.printStackTrace();
            busList = null;
        }

        return busList;
    }

    public static boolean checkRecordExist(int busId) {
        boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT bus_id FROM BUSES WHERE bus_id=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, busId);

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;   
    }

    public int addRecord(Integer manufacturerId) {
        int generatedId = -1;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO buses " + 
                    "(bus_number, manufacturer_id, double_decker, operator_id, status_id) " + 
                    "VALUES (?,?,?,?,10)";
            
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, busNumber);
            ps.setInt(2, manufacturerId);
            ps.setBoolean(3, doubleDecker);
            ps.setInt(4, operator.getOperatorId());

            if(ps.executeUpdate() != 1) {
                generatedId = -1;
            }

            if(generatedId == -1) {
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

    public static boolean checkBusNumberExist(String busNumber) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT bus_id FROM buses " +
                        "WHERE bus_number=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, busNumber);

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public String setField(String field, String value) {
        switch(field) {
            case "bus_number":
                if(value == null || !FieldManager.validateBusNumber(value)) {
                    return "1";
                }
                setBusNumber(value);
                break;
            case "double_decker":
                setDoubleDecker(Boolean.parseBoolean(value));
            default:
                break;
        }
        return "";
    }
    
    @Override
    public Bus clone() {
        return new Bus(getBusId(), getBusNumber(), getManufacturer(), getDoubleDecker(), getStatus());
    }

    public void setStatus(Status status) {
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public Status getStatus() {
        return new Status(status.getStatusId(), status.getName());
    }

    public void setOperator(Operator operator) {
        this.operator = operator.clone();
    }

    public Operator getOperator() {
        return operator.clone();
    }

    public boolean getDoubleDecker() {
        return doubleDecker;
    }

    public void setDoubleDecker(boolean doubleDecker) {
        this.doubleDecker = doubleDecker;
    }
    
    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = new Manufacturer(manufacturer.getManufacturerId(), manufacturer.getName());
    }

    public Manufacturer getManufacturer() {
        return new Manufacturer(manufacturer.getManufacturerId(), manufacturer.getName());
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getBusNumber() {
        return busNumber;
    }    

    public void setBusId(Integer busId) {
        this.busId = busId;
    }

    public Integer getBusId() {
        return busId;
    }
}