package models;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;

import utils.DBManager;
import utils.FieldManager;


public class Seating {
    private Integer seatingId;
    private Integer lsCount;
    private Integer rsCount;
    private Integer rowCount;
    private Integer seats;
    private Boolean deck;
    private Boolean sleeper;
    private Bus bus;

    public Seating(Integer lsCount, Integer rsCount, Integer seats, Integer rowCount, Boolean deck, Boolean sleeper) {
        this.lsCount = lsCount;
        this.rsCount = rsCount;
        this.seats = seats;
        this.rowCount = rowCount;
        this.deck = deck;
        this.sleeper = sleeper;
    }

    public Seating(Integer seatingId, Integer lsCount, Integer rsCount, Integer seats, Integer rowCount, Boolean deck, Boolean sleeper) {
        this(lsCount, rsCount, seats, rowCount, deck, sleeper);
        this.seatingId = seatingId;
    }

    public Seating() {

    }      

    public Boolean updateRecord(Integer busId) {
        Boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "UPDATE SEATINGS " +
                    "SET ls_count=?, rs_count=?, seats=?, row_count=?, deck=?, sleeper=? " +
                    "WHERE seating_id=? and bus_id=?";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, lsCount);
            ps.setInt(2, rsCount);
            ps.setInt(3, seats);
            ps.setInt(4, rowCount);
            ps.setBoolean(5, deck);
            ps.setBoolean(6, sleeper);
            ps.setInt(7, seatingId);
            ps.setInt(8, busId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;
    }

    public Integer addRecord(Integer busId) {
        Integer generatedId = -1;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO seatings " +
                    "(ls_count, rs_count, seats, row_count, deck, sleeper, bus_id) " +
                    "VALUES (?,?,?,?,?,?,?)";
            
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            ps.setInt(1, lsCount);
            ps.setInt(2, rsCount);
            ps.setInt(3, seats);
            ps.setInt(4, rowCount);
            ps.setBoolean(5, deck);
            ps.setBoolean(6, sleeper);
            ps.setInt(7, busId);

            Integer rows = ps.executeUpdate();
            if(rows == 1) {
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

    public static ArrayList<Seating> collectRecords(Integer busId) {
        ArrayList<Seating> seatingList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "SELECT * FROM seatings " +
                    "where bus_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, busId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Seating seating = new Seating(
                    rs.getInt("seating_id"),
                    rs.getInt("ls_count"),
                    rs.getInt("rs_count"),
                    rs.getInt("seats"),
                    rs.getInt("row_count"),
                    rs.getBoolean("deck"),
                    rs.getBoolean("sleeper")
                );
                
                seatingList.add(seating);
            }
        }
        catch(SQLException e) {
            seatingList = null;
        }

        return seatingList;
    }

    public static Boolean checkSeatingExist(Integer busId, Boolean deck) {
        Boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM seatings " +
                        "WHERE bus_id=? and deck=?";
            
            PreparedStatement ps = con.prepareStatement(query);
            
            ps.setInt(1, busId);
            ps.setBoolean(2, deck);

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

    public Boolean setField(String param, String value) {
        switch (param) {
            case "lsCount": {
                Integer count = Integer.parseInt(value);
                if (FieldManager.validateSeatCount(count, 3)) {
                    setLsCount(count);
                    return true;
                }
                break;
            }
            case "rsCount": {
                Integer count = Integer.parseInt(value);
                if (FieldManager.validateSeatCount(count, 3)) {
                    setRsCount(count);
                    return true;
                }
                break;
            }
            case "seats" : {
                setSeats(Integer.parseInt(value));
                return true;
            }
            case "rowCount": {
                Integer rowCount = Integer.parseInt(value);
                if (FieldManager.validateRowCount(rowCount)) {
                    setRowCount(rowCount);
                    return true;
                }
                break;
            }
            case "deck": {
                setDeck("true".equals(value));
                return true;
            }
            case "sleeper": {
                setSleeper("true".equals(value));
                return true;
            }
            case "bus_id": {
                return true;
            }
            case "seating_id": {
                setSeatingId(Integer.parseInt(value));
                return true;
            }
        }
        return false;  
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public Bus getBus() {
        return bus;
    }

    public void setSleeper(Boolean sleeper) {
        this.sleeper = sleeper;
    }

    public Boolean getSleeper() {
        return sleeper;
    }

    public void setDeck(Boolean deck) {
        this.deck = deck;
    }

    public Boolean getDeck() {
        return deck;
    }

    public void setRowCount(Integer rowCount) {
        this.rowCount = rowCount;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public Integer getRowCount() {
        return rowCount;
    }

    public void setRsCount(Integer rsCount) {
        this.rsCount = rsCount;
    }

    public Integer getRsCount() {
        return rsCount;
    }

    public void setLsCount(Integer lsCount) {
        this.lsCount = lsCount;
    }

    public Integer getLsCount() {
        return lsCount;
    }

    public void setSeatingId(Integer seatingId) {
        this.seatingId = seatingId;
    }

    public Integer getSeatingId() {
        return seatingId;
    }
}