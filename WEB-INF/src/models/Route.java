package models;

import utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

public class Route {
    private Integer routeId;
    private Integer distance;
    private Integer duration;
    private City source;
    private City destination;
    
    public Route(Integer routeId, City source, City destination, Integer distance, Integer duration) {
        this.routeId = routeId;
        this.source = new City(source.getCityId(), source.getName(), source.getState());
        this.destination = new City(destination.getCityId(), destination.getName(), destination.getState()); // ✅ fixed
        this.distance = distance;
        this.duration = duration;
    }

    public Route() {}

    public static ArrayList<Route> collectAllRecords() {
        ArrayList<Route> routeList = new ArrayList<>();

        String query = 
            "SELECT " +
            "r.route_id, r.distance, r.duration, " +
            "s.city_id AS source_city_id, s.name AS source_city_name, " +
            "ss.state_id AS source_state_id, ss.name AS source_state_name, " +
            "d.city_id AS destination_city_id, d.name AS destination_city_name, " +
            "ds.state_id AS destination_state_id, ds.name AS destination_state_name " +
            "FROM routes r " +
            "JOIN cities s ON r.source = s.city_id " + 
            "JOIN states ss ON s.state_id = ss.state_id " +
            "JOIN cities d ON r.destination = d.city_id " +
            "JOIN states ds ON d.state_id = ds.state_id";

        try {
            Connection con = DBManager.getConnection();
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
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

                routeList.add(route);
            }

            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return routeList;
    }

    public void setDestination(City destination) {
        this.destination = new City(destination.getCityId(), destination.getName(), destination.getState());
    }

    public City getDestination() {
        return new City(destination.getCityId(), destination.getName(), destination.getState());
    }

    public void setSource(City source) {
        this.source = new City(source.getCityId(), source.getName(), source.getState());
    }

    public City getSource() {
        return new City(source.getCityId(), source.getName(), source.getState());
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
    
    public Integer getDuration() {
        return duration;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setRouteId(Integer routeId) {
        this.routeId = routeId;
    }

    public Integer getRouteId(){
        return routeId;
    }
}
