package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;

import java.util.ArrayList;

public class OperatorRoute {
    private Integer operatorRouteId;
    private Operator operator;
    private Route route;
    private Status status;

    public OperatorRoute(Integer operatorRouteId, Route route, Status status) {
        this.operatorRouteId = operatorRouteId;
        this.route = new Route(route.getRouteId(), route.getSource(), route.getDestination(), route.getDistance(), route.getDuration());
        this.status = new Status(status.getStatusId(), status.getName());
    }

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

    public static ArrayList<OperatorRoute> collectRecords(Integer operatorId) {
        ArrayList<OperatorRoute> operatorRouteList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT " +
                        "opr.operator_route_id, " +
                        "r.route_id, r.distance, r.duration, " + 
                        "s.city_id AS 'source_city_id', s.name AS 'source_city_name', " +
                        "ss.state_id AS 'source_state_id', ss.name AS 'source_state_name', " +
                        "d.city_id AS 'destination_city_id', d.name AS 'destination_city_name', " +
                        "ds.state_id AS 'destination_state_id', ds.name AS 'destination_state_name', " +
                        "st.status_id, st.name AS 'status_name' " +
                        "FROM operator_routes opr " +
                        "JOIN routes r ON  opr.route_id = r.route_id " +
                        "JOIN status st ON opr.status_id = st.status_id " +
                        "JOIN cities s on r.source = s.city_id " +
                        "JOIN states ss on s.state_id = ss.state_id " +
                        "JOIN cities d on r.destination = d.city_id " +
                        "JOIN states ds on d.state_id = ds.state_id";
            
            PreparedStatement ps = con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                 Route route = new Route(
                    rs.getInt("route_id"),
                    new City(
                        rs.getInt("source_city_id"),
                        rs.getString("source_city_name"),
                        new State(
                            rs.getInt("source_state_id"),
                            rs.getString("source_state_name")
                        )
                    ),
                    new City(
                        rs.getInt("destination_city_id"),
                        rs.getString("destination_city_name"),
                        new State(
                            rs.getInt("destination_state_id"),
                            rs.getString("destination_state_name")
                        )
                    ),
                    rs.getInt("distance"),
                    rs.getInt("duration")
                );

                Status status = new Status(
                    rs.getInt("status_id"),
                    rs.getString("status_name")
                );

                OperatorRoute operatorRoute = new OperatorRoute(
                    rs.getInt("operator_route_id"),
                    route,
                    status
                );

                operatorRouteList.add(operatorRoute);
            }

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return operatorRouteList;
    }

    public void setStatus(Status status) {
        this.status = new Status(status.getStatusId(), status.getName());
    }

    public Status getStatus() {
        return new Status(status.getStatusId(), status.getName());
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