package models;

import java.util.ArrayList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;

public class OperatorTicketFare {
    private Integer operatorTicketFareId;
    private Integer charge;
    private Operator operator;
    private FareFactor fareFactor;

    public OperatorTicketFare(Integer operatorTicketFareId, Integer charge, Operator operator, FareFactor fareFactor) {
        this(charge, fareFactor);
    }

    public OperatorTicketFare(Integer charge, FareFactor fareFactor) {
        this(fareFactor);
        this.charge = charge;
    }

    public OperatorTicketFare(FareFactor fareFactor) {
        this.fareFactor = fareFactor.clone();
    }

    public OperatorTicketFare() {

    }


    public static ArrayList<OperatorTicketFare> getAvailableFareFactors(int operatorId, boolean wantAllRecords) {
        ArrayList<OperatorTicketFare> factors = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "";
            if (wantAllRecords) {
                query =
                    "SELECT " +
                    "f.fare_factor_id, " +
                    "f.name, " +
                    "f.fixed_charge, " +
                    "otf.operator_ticket_fare_id, " +
                    "otf.charges " +
                    "FROM fare_factor AS f " +
                    "LEFT JOIN operator_ticket_fare AS otf " +
                    "ON f.fare_factor_id = otf.fare_factor_id " +
                    "AND otf.operator_id=?";
            } 
            else {
                query =
                    "SELECT " +
                    "f.fare_factor_id, " +
                    "f.name, " +
                    "f.fixed_charge " +
                    "FROM fare_factor AS f " +
                    "JOIN operator_ticket_fare AS otf " +
                    "ON f.fare_factor_id = otf.fare_factor_id " +
                    "AND otf.operator_id=?";
            }


            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorId);

            ResultSet rs = ps.executeQuery();

            if(wantAllRecords) {

            } 
            else {
                while(rs.next()) {
                    FareFactor fareFactor = new FareFactor(
                        rs.getInt("f.fare_factor_id"),
                        rs.getString("f.name"),
                        rs.getBoolean("f.fixed_charge")
                    );

                    factors.add(new OperatorTicketFare(fareFactor));
                }
            }
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return factors;
    }

    public void setFareFactpr(FareFactor fareFactor) {
        this.fareFactor = fareFactor;
    }

    public FareFactor getFarFactor() {
        return fareFactor;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setCharge(Integer charge) {
        this.charge = charge;
    }

    public Integer getCharge() {
        return charge;
    }

    public void setOperatorTicketFareId(Integer operatorTicketFareId) {
        this.operatorTicketFareId = operatorTicketFareId;
    }

    public Integer getOperatorTicketFareId() {
        return operatorTicketFareId;
    }
}