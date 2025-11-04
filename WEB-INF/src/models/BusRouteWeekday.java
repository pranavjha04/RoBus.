package models;

import utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;


public class BusRouteWeekday {
    private Integer busRouteWeekdayId;
    private Weekday weekday;
    private OperatorRoute operatorRoute;

    public BusRouteWeekday() {

    }

    public BusRouteWeekday(Integer busRouteWeekdayId, Weekday weekday, OperatorRoute operatorRoute) {
        this.busRouteWeekdayId = busRouteWeekdayId;
        this.weekday = weekday;
        this.operatorRoute = operatorRoute;
    }

    public static ArrayList<BusRouteWeekday> collectAllRecords(Integer operatorRouteId, Integer operatorId) {
        ArrayList<BusRouteWeekday> busRouteWeekdayList = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                            "SELECT * FROM bus_route_weekdays brw " +
                            "JOIN operator_routes opr  ON brw.operator_route_id = opr.operator_route_id " +
                            "JOIN weekdays w ON brw.weekday_id = w.weekday_id " +
                            "JOIN operators o ON o.operator_id = opr.operator_id " +
                            "JOIN routes r ON opr.route_id = r.route_id " +
                            "JOIN cities sc ON r.source = sc.city_id " +
                            "JOIN states ss ON sc.state_id = ss.state_id " +
                            "JOIN cities dc ON r.destination = dc.city_id " +
                            "JOIN states ds ON dc.state_id = ds.state_id " +
                            "JOIN status s ON opr.status_id = s.status_id " +
                            "WHERE opr.operator_route_id=? AND o.operator_id=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, operatorRouteId);
            ps.setInt(2, operatorId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Weekday weekday = new Weekday(rs.getInt("w.weekday_id"), rs.getString("w.name"));
                City source = new City(
                    rs.getInt("sc.city_id"),
                    rs.getString("sc.name"),
                    new State(
                        rs.getInt("ss.state_id"),
                        rs.getString("ss.name")
                    )
                );
                City destination = new City(
                    rs.getInt("dc.city_id"),
                    rs.getString("dc.name"),
                    new State(
                        rs.getInt("ds.state_id"),
                        rs.getString("ds.name")
                    )
                );
                Status status = new Status(
                    rs.getInt("s.status_id"),
                    rs.getString("s.name")
                );
                
                Route route = new Route(
                    rs.getInt("r.route_id"),
                    source, 
                    destination, 
                    rs.getInt("r.distance"),
                    rs.getInt("r.duration")
                );

                OperatorRoute operatorRoute = new OperatorRoute(
                    rs.getInt("opr.operator_route_id"),
                    route,
                    status
                );

                BusRouteWeekday currWeekDay = new BusRouteWeekday(
                    rs.getInt("brw.bus_route_weekday_id"),
                    weekday,
                    operatorRoute
                );

                busRouteWeekdayList.add(currWeekDay);
            }   

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            busRouteWeekdayList = null;
        }
        catch(Exception e) {
            e.printStackTrace();
        }

        return busRouteWeekdayList;
    }

    public void setOperatorRoute(OperatorRoute operatorRoute) {
        this.operatorRoute = operatorRoute;
    }

    public OperatorRoute getOperatorRoute() {
        return operatorRoute;
    }

    public void setWeekday(Weekday weekday) {
        this.weekday = new Weekday(weekday.getWeekdayId(), weekday.getName());
    }

    public Weekday getWeekday() {
        return new Weekday(weekday.getWeekdayId(), weekday.getName());
    }

    public void setBusRouteWeekdayId(Integer busRouteWeekdayId) {
        this.busRouteWeekdayId = busRouteWeekdayId;
    }

    public Integer getBusRouteWeekdayId() {
        return busRouteWeekdayId;
    }
}