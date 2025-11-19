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
    
    public BusRouteWeekday(Integer busRouteWeekdayId, Weekday weekday, OperatorRoute operatorRoute) {
        this.busRouteWeekdayId = busRouteWeekdayId;
        this.weekday = weekday;
        this.operatorRoute = operatorRoute;
    }

    public BusRouteWeekday() {

    }

    public static BusRouteWeekday getRecord(int busRouteWeekdayId, int operatorId) {
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM " +
                        "bus_route_weekdays brw " + 
                        "JOIN operator_routes opr ON brw.operator_route_id = opr.operator_route_id " + 
                        "JOIN cities mc ON mc.city_id = rmc.midcity_id " +
                        "JOIN states ms ON ms.state_id = mc.state_id " +
                        "JOIN weekdays w ON brw.weekday_id = w.weekday_id " +
                        "JOIN routes r ON opr.route_id = r.route_id " +
                        "JOIN cities s ON r.source = s.city_id " +
                        "JOIN states ss ON s.state_id = ss.state_id " +
                        "JOIN cities d ON r.destination = d.city_id " +
                        "JOIN states ds ON d.state_id = ds.state_id " +
                        "JOIN status st ON st.status_id = opr.status_id " +
                        "WHERE opr.operator_id=? AND brw.bus_route_weekday_id=?";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorId);
            ps.setInt(2, busRouteWeekdayId);

            if(rs.next()) {
                
            }
        }
        catch(SQLException e) {

        }
    }

    public static ArrayList<BusRouteWeekday> collectWeekdayAvailableRouteList(Integer weekdayId, Integer operatorId) {
        ArrayList<BusRouteWeekday> list = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                            "SELECT * FROM " +
                            "bus_route_weekdays brw " + 
                            "JOIN operator_routes opr ON brw.operator_route_id = opr.operator_route_id " + 
                            "JOIN operator_route_midcities oprm ON oprm.operator_route_id = opr.operator_route_id " +
                            "JOIN route_midcities rmc ON rmc.route_midcity_id = oprm.route_midcity_id " +
                            "JOIN cities mc ON mc.city_id = rmc.midcity_id " +
                            "JOIN states ms ON ms.state_id = mc.state_id " +
                            "JOIN weekdays w ON brw.weekday_id = w.weekday_id " +
                            "JOIN routes r ON opr.route_id = r.route_id " +
                            "JOIN cities s ON r.source = s.city_id " +
                            "JOIN states ss ON s.state_id = ss.state_id " +
                            "JOIN cities d ON r.destination = d.city_id " +
                            "JOIN states ds ON d.state_id = ds.state_id " +
                            "JOIN status st ON st.status_id = opr.status_id " +
                            "WHERE opr.operator_id=? AND w.weekday_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, operatorId);
            ps.setInt(2, weekdayId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Weekday weekday = new Weekday(rs.getInt("w.weekday_id"), rs.getString("w.name"));
                Route route = new Route(
                    rs.getInt("r.route_id"),
                    new City(
                        rs.getInt("s.city_id"),
                        rs.getString("s.name"),
                        new State(
                            rs.getInt("ss.state_id"),
                            rs.getString("ss.name")
                        )
                    ),
                    new City(
                        rs.getInt("d.city_id"),
                        rs.getString("d.name"),
                        new State(
                            rs.getInt("ds.state_id"),
                            rs.getString("ds.name")
                        )
                    ),
                    rs.getInt("distance"),
                    rs.getInt("duration")
                );

                Status status = new Status(
                    rs.getInt("st.status_id"),
                    rs.getString("st.name")
                );

                OperatorRoute operatorRoute = new OperatorRoute(
                    rs.getInt("operator_route_id"),
                    route,
                    status
                );

                RouteMidCity routeMidCity = new RouteMidCity(
                    rs.getInt("rmc.route_midcity_id"),
                    rs.getInt("rmc.distance_from_source"),
                    rs.getInt("rmc.duration_from_source"),
                    route,
                    new City(
                        rs.getInt("mc.city_id"),
                        rs.getString("mc.name"),
                        new State(
                            rs.getInt("ms.state_id"),
                            rs.getString("ms.name")
                        )
                    )
                );

                OperatorRouteMidCity operatorRouteMidCity = new OperatorRouteMidCity(
                    rs.getInt("oprm.operator_route_midcity_id"),
                    rs.getInt("oprm.halting_time"),
                    operatorRoute,
                    routeMidCity
                );
                
                BusRouteWeekday busRouteWeekday = new BusRouteWeekday(
                    rs.getInt("brw.bus_route_weekday_id"),
                    weekday,
                    operatorRoute
                );

                boolean isExist = false;
                for(BusRouteWeekday next : list) {
                    if(next.getBusRouteWeekdayId().equals(rs.getInt("brw.bus_route_weekday_id"))) {
                        next.getOperatorRoute().getOperatorRouteMidCities().add(operatorRouteMidCity);
                        isExist = true;
                    }
                }

                if(!isExist) {
                    busRouteWeekday.getOperatorRoute().setOperatorRouteMidCities(new ArrayList<>());
                    busRouteWeekday.getOperatorRoute().getOperatorRouteMidCities().add(operatorRouteMidCity);
                    list.add(busRouteWeekday);
                }
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            list = null;
        }

        return list;
    }

    public static boolean deleteRecord(Integer busRouteWeekdayId, Integer operatorRouteId, Integer operatorId) {
        boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "DELETE brw FROM " +
                        "bus_route_weekdays brw " +
                        "JOIN operator_routes opr ON brw.operator_route_id = brw.operator_route_id " +
                        "WHERE brw.bus_route_weekday_id=? AND brw.operator_route_id=? AND opr.operator_id=?";

            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, busRouteWeekdayId);
            ps.setInt(2, operatorRouteId);
            ps.setInt(3, operatorId);

            int rows = ps.executeUpdate();
            if(rows > 0) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = false;
        }

        return flag;
    }

    public static boolean addRecord(String[] weekdays, Integer operatorRouteId) {
        boolean flag = false;
        StringBuilder builder = new StringBuilder();
        if(weekdays.length == 0) return flag;

        try {
            for(String next : weekdays) {
                builder.append("(?,?),");
            }
            builder.deleteCharAt(builder.length() - 1);
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO bus_route_weekdays " +
                        "(operator_route_id, weekday_id) " +
                        "VALUES " + builder.toString();
            
            PreparedStatement ps = con.prepareStatement(query);

            int count = 1;
            for(String next : weekdays) {
                ps.setInt(count++, operatorRouteId);
                try {
                    ps.setInt(count++, Integer.parseInt(next));
                }
                catch(NumberFormatException e) {
                    e.printStackTrace();
                    flag = false;
                    con.close();
                    return flag;
                }
            }

            int rows = ps.executeUpdate();
            if(rows > 0) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
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