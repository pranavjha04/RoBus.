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
    private String manufacturer;
    private String seatingType;
    private Status status;
    private Operator operator;

    public Bus(String busNumber, String manufacturer, Status status) {
        this.busNumber = busNumber;
        this.manufacturer = manufacturer;
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public Bus(Integer busId, String busNumber, String manufacturer, Status status) {
        this(busNumber, manufacturer, status);
        this.busId = busId;
    }

    public Bus() {
        
    }
    
    public static ArrayList<Bus> collectRecords(int operatorId, boolean allData) {
        ArrayList<Bus> busList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "";
            if(allData) {}
            else {
                query = 
                    "SELECT * FROM " +
                    "buses JOIN status " + 
                    "ON buses.status_id = status.status_id " +
                    "WHERE operator_id=?";
            }

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, operatorId);

            ResultSet rs = ps.executeQuery();

            if(allData) {}
            else {
                while(rs.next()) {
                    System.out.println("hello");
                    Bus bus = new Bus(
                        rs.getInt("bus_id"),
                        rs.getString("bus_number"),
                        rs.getString("manufacturer"),
                        new Status(
                            rs.getInt("status_id"),
                            rs.getString("name")
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

    public int addRecord() {
        int generatedId = -1;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO buses " + 
                    "(bus_number, manufacturer, operator_id, status_id) " + 
                    "VALUES (?,?,?,10)";
            
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, busNumber);
            ps.setString(2, manufacturer);
            ps.setInt(3, operator.getOperatorId());

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
            case "manufacturer":
                if(value == null || value.isEmpty()) {
                    return "2";
                }
                setManufacturer(value);
                break;
            default:
                break;
        }
        return "";
    }
    
    @Override
    public Bus clone() {
        return new Bus(getBusId(), getBusNumber(), getManufacturer(), getStatus());
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

    public void setSeatingType(String seatingType) {
        this.seatingType = seatingType;
    }

    public String getSeatingType() {
        return seatingType;
    }
    
    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getManufacturer() {
        return manufacturer;
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