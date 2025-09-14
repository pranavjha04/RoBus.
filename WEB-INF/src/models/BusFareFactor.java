package models;

import utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class BusFareFactor {
    private Integer busFareFactorId;
    private Bus bus;
    private OperatorTicketFare operatorTicketFare;


    public BusFareFactor() {

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