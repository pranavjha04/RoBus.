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
    private Operator operator;
    private ArrayList<Seating> seatings;

    public Bus(String busNumber, String manufacturer, Operator operator) {
        this.busNumber = busNumber;
        this.manufacturer = manufacturer;
        this.operator = operator.clone();
    }

    public Bus(Integer busId, String busNumber, String manufacturer, Operator operator) {
        this(busNumber, manufacturer, operator);
        this.busId = busId;
    }

    public Bus() {
        
    }

    public int addRecord() {
        int generatedId = -1;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO buses " + 
                    "(bus_number, manufacturer, operator_id, status_id) " + 
                    "VALUES (?,?,?,2)";
            
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

    public static boolean checkUniqueBusNumber(String busNumber) {
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
        return new Bus(getBusId(), getBusNumber(), getManufacturer(), getOperator());
    }

    public void setSeatings(ArrayList<Seating> seatings) {
        this.seatings = seatings;
    }

    public ArrayList<Seating> getSeatings() {
        return seatings;
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