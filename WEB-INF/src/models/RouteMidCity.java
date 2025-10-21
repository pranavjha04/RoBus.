package models;

import utils.DBManager;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.util.ArrayList;

public class RouteMidCity {
    private Integer routeMidCityId;
    private Integer distanceFromSource;
    private Integer durationFromSource;
    private Route route;
    private City midCity;

    public RouteMidCity(Integer routeMidCityId, Integer distanceFromSource, Integer durationFromSource, Route route, City midCity) {
        this.routeMidCityId = routeMidCityId;
        this.distanceFromSource = distanceFromSource;
        this.durationFromSource = durationFromSource;
        this.route = new Route(route.getRouteId(), route.getSource(), route.getDestination(), route.getDistance(), route.getDuration());
        this.midCity = new City(midCity.getCityId(), midCity.getName(), midCity.getState());
    }

    public RouteMidCity() {}

    public static boolean addRecords(Integer routeId, Integer operatorRouteId, ArrayList<int[]> midCities) {
        boolean flag = false;

        StringBuilder helper = new StringBuilder();

        for(int i = 0; i < midCities.size(); i++) {
            helper.append("(?,?,?)");
            if(i != midCities.size() - 1) helper.append(", ");
        }

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO operator_route_midcities " +
                        "(route_midcity_id, operator_route_id, halting_time) " +
                        "VALUES " + helper.toString();
            
            PreparedStatement ps = con.prepareStatement(query);
            
            int count = 1;  
            for(int i = 0; i < midCities.size(); i++) {
                Integer routeMidCityId = midCities.get(i)[0];
                Integer haltingTime = midCities.get(i)[1];

                ps.setInt(count++, routeMidCityId);
                ps.setInt(count++, operatorRouteId);
                ps.setInt(count++, haltingTime);
            }

            int rows = ps.executeUpdate();

            if(rows > 0) {
                flag = true;                
            }

            con.close();
        }
        catch(SQLException e) {
            flag = false;
            e.printStackTrace();
        }
        return flag;
    }

    public static ArrayList<RouteMidCity> collectAllRecords() {
        ArrayList<RouteMidCity> routeMidCityList = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query =
                "SELECT " +
                "rm.route_midcity_id, rm.distance_from_source, rm.duration_from_source, " +
                "r.route_id, r.distance, r.duration, " +
                "s.city_id AS source_city_id, s.name AS source_city_name, " +
                "ss.state_id AS source_state_id, ss.name AS source_state_name, " +
                "d.city_id AS destination_city_id, d.name AS destination_city_name, " +
                "ds.state_id AS destination_state_id, ds.name AS destination_state_name, " +
                "mc.city_id AS mid_city_id, mc.name AS mid_city_name, " +
                "ms.state_id AS mid_state_id, ms.name AS mid_state_name " +
                "FROM route_midcities rm " +
                "JOIN routes r ON rm.route_id = r.route_id " +
                "JOIN cities mc ON rm.midcity_id = mc.city_id " +
                "JOIN states ms ON mc.state_id = ms.state_id " +
                "JOIN cities s ON r.source = s.city_id " +
                "JOIN states ss ON s.state_id = ss.state_id " +
                "JOIN cities d ON r.destination = d.city_id " +
                "JOIN states ds ON d.state_id = ds.state_id";

            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Route route = new Route(
                    rs.getInt("route_id"),
                    new City(
                        rs.getInt("source_city_id"),
                        rs.getString("source_city_name"),
                        new State(rs.getInt("source_state_id"), rs.getString("source_state_name"))
                    ),
                    new City(
                        rs.getInt("destination_city_id"),
                        rs.getString("destination_city_name"),
                        new State(rs.getInt("destination_state_id"), rs.getString("destination_state_name"))
                    ),
                    rs.getInt("distance"),
                    rs.getInt("duration")
                );

                City midCity = new City(
                    rs.getInt("mid_city_id"),
                    rs.getString("mid_city_name"),
                    new State(rs.getInt("mid_state_id"), rs.getString("mid_state_name"))
                );

                RouteMidCity routeMidCity = new RouteMidCity(
                    rs.getInt("route_midcity_id"),
                    rs.getInt("distance_from_source"),
                    rs.getInt("duration_from_source"),
                    route,
                    midCity
                );

                routeMidCityList.add(routeMidCity);
            }

            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return routeMidCityList;
    }

    public void setMidCity(City midCity) {
        this.midCity = new City(midCity.getCityId(), midCity.getName(), midCity.getState());
    }

    public City getMidCity() {
        return new City(midCity.getCityId(), midCity.getName(), midCity.getState());
    }

    public void setRoute(Route route) {
        this.route = new Route(route.getRouteId(), route.getSource(), route.getDestination(), route.getDistance(), route.getDuration());
    }

    public Route getRoute() {
        return new Route(route.getRouteId(), route.getSource(), route.getDestination(), route.getDistance(), route.getDuration());
    }

    public void setDistanceFromSource(Integer distanceFromSource) {
        this.distanceFromSource = distanceFromSource;
    }

    public Integer getDistanceFromSource() {
        return distanceFromSource;
    }

    public void setDurationFromSource(Integer durationFromSource) {
        this.durationFromSource = durationFromSource;
    }

    public Integer getDurationFromSource() {
        return durationFromSource;
    }

    public void setRouteMidCityId(Integer routeMidCityId) {
        this.routeMidCityId = routeMidCityId;
    }

    public Integer getRouteMidCityId() {
        return routeMidCityId;
    }
}
