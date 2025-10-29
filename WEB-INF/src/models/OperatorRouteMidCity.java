package models;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;

import java.util.ArrayList;

public class OperatorRouteMidCity {
    private Integer operatorRouteMidCityId;
    private Integer haltingTime;
    private OperatorRoute operatorRoute;
    private RouteMidCity routeMidCity;

    public OperatorRouteMidCity(Integer operatorRouteMidCityId, Integer haltingTime, OperatorRoute operatorRoute, RouteMidCity routeMidCity) {
        this(haltingTime, operatorRoute, routeMidCity);
        this.operatorRouteMidCityId = operatorRouteMidCityId;
    }

    public OperatorRouteMidCity(Integer haltingTime, OperatorRoute operatorRoute, RouteMidCity routeMidCity) {
        this.haltingTime = haltingTime;
        this.operatorRoute = new OperatorRoute(
            operatorRoute.getOperatorRouteId(),
            operatorRoute.getRoute(),
            operatorRoute.getStatus()
        );
        this.routeMidCity = new RouteMidCity(
            routeMidCity.getRouteMidCityId(), 
            routeMidCity.getDistanceFromSource(), 
            routeMidCity.getDurationFromSource(), 
            routeMidCity.getRoute(), 
            routeMidCity.getMidCity());
    }

    public OperatorRouteMidCity() {

    }

    public static Boolean addRecord(Integer operatorRouteId, Integer routeMidCityId,Integer haltingTime) {
        Boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO operator_route_midcities " +
                        "(operator_route_id, route_midcity_id, halting_time) " +
                        "VALUES (?,?,?)";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorRouteId);
            ps.setInt(2, routeMidCityId);
            ps.setInt(3, haltingTime);
            
            flag = ps.executeUpdate() == 1;

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = true;
        }

        return flag;
    }

    public static ArrayList<OperatorRouteMidCity> collectAllRecords(Integer operatorRouteId, Integer operatorId) {
        ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = new ArrayList<>();
        try {

            Connection con = DBManager.getConnection();
            String query =
                "SELECT " +
                "oprm.operator_route_midcity_id, " +
                "oprm.halting_time, " +
                "opr.operator_route_id, " +
                "r.route_id, r.distance AS operator_route_distance, r.duration AS operator_route_duration, " +
                "cs.city_id   AS operator_route_source_city_id, " +
                "cs.name      AS operator_route_source_city_name, " +
                "ss.state_id  AS operator_route_source_state_id, " +
                "ss.name      AS operator_route_source_state_name, " +
                "cd.city_id   AS operator_route_destination_city_id, " +
                "cd.name      AS operator_route_destination_city_name, " +
                "sd.state_id  AS operator_route_destination_state_id, " +
                "sd.name      AS operator_route_destination_state_name, " +
                "st.status_id AS operator_route_status_id, " +
                "st.name      AS operator_route_status_name, " +
                "rm.route_midcity_id, " +
                "cm.city_id   AS operator_route_midcity_city_id, " +
                "cm.name      AS operator_route_midcity_city_name, " +
                "sm.state_id  AS operator_route_midcity_state_id, " +
                "sm.name      AS operator_route_midcity_state_name, " +
                "rm.distance_from_source AS operator_route_midcity_distance_from_source, " +
                "rm.duration_from_source AS operator_route_midcity_duration_from_source " +
                "FROM operator_route_midcities oprm " +
                "JOIN operator_routes opr ON oprm.operator_route_id = opr.operator_route_id " +
                "JOIN routes r               ON opr.route_id = r.route_id " +
                "JOIN cities cs  ON r.source      = cs.city_id " +
                "JOIN states ss  ON cs.state_id   = ss.state_id " +
                "JOIN cities cd  ON r.destination = cd.city_id " +
                "JOIN states sd  ON cd.state_id   = sd.state_id " +
                "JOIN status st  ON opr.status_id = st.status_id " +
                "JOIN route_midcities rm ON oprm.route_midcity_id = rm.route_midcity_id " +
                "JOIN cities cm  ON rm.midcity_id = cm.city_id " +
                "JOIN states sm  ON cm.state_id   = sm.state_id " +
                "WHERE opr.operator_route_id=? AND opr.operator_id=?";


            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorRouteId);
            ps.setInt(2, operatorId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                State sourceState = new State(
                    rs.getInt("operator_route_source_state_id"),
                    rs.getString("operator_route_source_state_name")
                );
                City sourceCity = new City(
                    rs.getInt("operator_route_source_city_id"),
                    rs.getString("operator_route_source_city_name"),
                    sourceState
                );
                State destState = new State(
                    rs.getInt("operator_route_destination_state_id"),
                    rs.getString("operator_route_destination_state_name")
                );
                City destCity = new City(
                    rs.getInt("operator_route_destination_city_id"),
                    rs.getString("operator_route_destination_city_name"),
                    destState
                );
                Route route = new Route(
                    rs.getInt("route_id"),
                    sourceCity,
                    destCity,
                    rs.getInt("operator_route_distance"),
                    rs.getInt("operator_route_duration")
                );
                Status status = new Status(
                    rs.getInt("operator_route_status_id"),
                    rs.getString("operator_route_status_name")
                );
                OperatorRoute operatorRoute = new OperatorRoute(
                    rs.getInt("operator_route_id"),
                    route,
                    status
                );
                State midState = new State(
                    rs.getInt("operator_route_midcity_state_id"),
                    rs.getString("operator_route_midcity_state_name")
                );
                City midCity = new City(
                    rs.getInt("operator_route_midcity_city_id"),
                    rs.getString("operator_route_midcity_city_name"),
                    midState
                );
                RouteMidCity routeMidCity = new RouteMidCity(
                    rs.getInt("route_midcity_id"),
                    rs.getInt("operator_route_midcity_distance_from_source"),
                    rs.getInt("operator_route_midcity_duration_from_source"),
                    route,
                    midCity
                );
                OperatorRouteMidCity operatorRouteMidCity = new OperatorRouteMidCity(
                    rs.getInt("operator_route_midcity_id"),
                    rs.getInt("halting_time"),
                    operatorRoute,
                    routeMidCity
                );

                operatorRouteMidCityList.add(operatorRouteMidCity);
            }

            con.close();
        } 
        catch (SQLException e) {
            e.printStackTrace();
        } 
        return operatorRouteMidCityList;
    }


    public void setRouteMidCity(RouteMidCity routeMidCity) {
        this.routeMidCity = new RouteMidCity(
                                routeMidCity.getRouteMidCityId(), 
                                routeMidCity.getDistanceFromSource(), 
                                routeMidCity.getDurationFromSource(), 
                                routeMidCity.getRoute(), 
                                routeMidCity.getMidCity()
                            );
    }

    public RouteMidCity getRouteMidCity() {
        return new RouteMidCity(
                    routeMidCity.getRouteMidCityId(), 
                    routeMidCity.getDistanceFromSource(), 
                    routeMidCity.getDurationFromSource(), 
                    routeMidCity.getRoute(), 
                    routeMidCity.getMidCity()
                );
    }

    public void setOperatorRoute(OperatorRoute operatorRoute) {
        this.operatorRoute = new OperatorRoute(
                                operatorRoute.getOperatorRouteId(),
                                operatorRoute.getRoute(),
                                operatorRoute.getStatus()
                            );
    }

    public OperatorRoute getOperatorRoute() {
        return new OperatorRoute(
                    operatorRoute.getOperatorRouteId(),
                    operatorRoute.getRoute(),
                    operatorRoute.getStatus()
                );
    }

    public void setHaltingTime(Integer haltingTime) {
        this.haltingTime = haltingTime;
    }
    
    public Integer getHaltingTime() {
        return haltingTime;
    }

    public void setRouteMidCityId(Integer operatorRouteMidCityId) {
        this.operatorRouteMidCityId = operatorRouteMidCityId;
    }

    public Integer getOperatorRouteMidCityId() {
        return operatorRouteMidCityId;
    }
} 