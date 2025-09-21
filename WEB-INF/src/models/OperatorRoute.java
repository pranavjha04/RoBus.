package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import utils.DBManager;

import java.util.ArrayList;

public class OperatorRoute {
    private Integer operatorRouteId;
    private Operator operator;
    private Route route;

    public OperatorRoute() {

    }

    public static Boolean addRecord(Integer operatorId, Integer routeId) {
        Boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO " +
                    "operator_routes " +
                    "(operator_id, route_id) " +
                    "VALUES (?, ?)";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorId);
            ps.setInt(2, routeId);

            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            flag = false;
            e.printStackTrace();
        }

        return flag;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
    
    public Route getRoute() {
        return route;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperatorRouteId(Integer operatorRouteId) {
        this.operatorRouteId = operatorRouteId;
    }

    public Integer getOperatorRouteId() {
        return operatorRouteId;
    }
}