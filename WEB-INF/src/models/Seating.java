package models;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

import utils.DBManager;

public class Seating {
    private Integer seatingId;
    private Integer lsCount;
    private Integer rsCount;
    private Integer rowCount;
    private Boolean deck;
    private Boolean sleeper;
    private Bus bus;

    public Seating(Integer lsCount, Integer rsCount, Integer rowCount, Boolean deck, Boolean sleeper) {
        this.lsCount = lsCount;
        this.rsCount = rsCount;
        this.rowCount = rowCount;
        this.deck = deck;
        this.sleeper = sleeper;
    }

    public Seating(Integer seatingId, Integer lsCount, Integer rsCount, Integer rowCount, Boolean deck, Boolean sleeper) {
        this(lsCount, rsCount, rowCount, deck, sleeper);
        this.seatingId = seatingId;
    }

    public Seating() {

    }       

    public static ArrayList<Seating> collectRecords(int busId) {
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

    private void setBus(Bus bus) {
        this.bus = bus;
    }

    private Bus getBus() {
        return bus;
    }

    private void setSleeper(Boolean sleeper) {
        this.sleeper = sleeper;
    }

    public Boolean getSleeper() {
        return sleeper;
    }

    private void setDeck(Boolean deck) {
        this.deck = deck;
    }

    private Boolean getDeck() {
        return deck;
    }

    private void setRowCount(Integer rowCount) {
        this.rowCount = rowCount;
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