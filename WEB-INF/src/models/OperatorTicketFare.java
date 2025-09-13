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
        this(operatorTicketFareId, charge, fareFactor);
    }

    public OperatorTicketFare(Integer operatorTicketFareId, Integer charge, FareFactor fareFactor) {
        this(fareFactor);
        this.operatorTicketFareId = operatorTicketFareId;
        this.charge = charge;
    }

    public OperatorTicketFare(FareFactor fareFactor) {
        this.fareFactor = fareFactor.clone();
    }

    public OperatorTicketFare() {

    }

    public static boolean addRecord(int fareFactorId, int charges, int operatorId) {
        boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO " +
                    "operator_ticket_fare" +
                    "(fare_factor_id, charges, operator_id) " +
                    "VALUES (?,?,?)";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, fareFactorId);
            ps.setInt(2, charges);
            ps.setInt(3, operatorId);

            flag = ps.executeUpdate() == 1;
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;
    }

    public static boolean deleteRecord(int operatorTicketFareId) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "DELETE FROM operator_ticket_fare " +
                    "WHERE operator_ticket_fare_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, operatorTicketFareId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;
    }

    public static boolean updateCharge(int newCharge, int operatorTicketFareId) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "UPDATE operator_ticket_fare " +
                        "SET charges=? " +
                        "WHERE operator_ticket_fare_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, newCharge);
            ps.setInt(2, operatorTicketFareId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        
        return flag;
    }


    public static ArrayList<OperatorTicketFare> getAvailableFareFactors(int operatorId, boolean onlyFactors) {
        ArrayList<OperatorTicketFare> factors = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "SELECT " +
                    "f.fare_factor_id, " +
                    "f.name, " +
                    "f.fixed_charge, " +
                    "otf.operator_ticket_fare_id, " +
                    "otf.charges " +
                    "FROM fare_factor AS f " +
                    (onlyFactors ? "LEFT" : "INNER") +  " " +  
                    "JOIN operator_ticket_fare AS otf " +
                    "ON f.fare_factor_id = otf.fare_factor_id " +
                    "AND otf.operator_id=? " + 
                    (onlyFactors ? "WHERE ISNULL(otf.operator_ticket_fare_id)" : "");
            

            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                FareFactor fareFactor = new FareFactor(
                    rs.getInt("f.fare_factor_id"),
                    rs.getString("f.name"),
                    rs.getBoolean("f.fixed_charge")
                );

                if(onlyFactors) {
                    factors.add(new OperatorTicketFare(
                        fareFactor
                    ));
                }
                else {
                    factors.add(new OperatorTicketFare(
                        rs.getInt("otf.operator_ticket_fare_id"),
                        rs.getInt("otf.charges"),
                        fareFactor
                    ));
                }
            }

            con.close();
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