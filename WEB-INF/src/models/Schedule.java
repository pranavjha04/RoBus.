package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Date;
import java.sql.Timestamp;
import java.sql.Time;
import java.util.ArrayList;
import java.sql.SQLException;

import utils.DBManager;

public class Schedule {

    private Integer scheduleId;
    private Date journeyDate;
    private Time departureTime;
    private Time arrivalTime;
    private Integer additionalCharges;
    private Integer seaterSeatsBooked;
    private Integer sleeperSeatsBooked;
    private Integer seaterFare;
    private Integer sleeperFare;
    private Integer totalCharges;

    private Bus bus;
    private Driver driver;
    private BusRouteWeekday busRouteWeekday;

    public Schedule(Integer scheduleId, Date journeyDate, Time departureTime,
                    Time arrivalTime, Integer additionalCharges,
                    Integer seaterSeatsBooked, Integer sleeperSeatsBooked,
                    Integer seaterFare, Integer sleeperFare, Integer totalCharges,
                    Bus bus, Driver driver, BusRouteWeekday busRouteWeekday) {

        this.scheduleId = scheduleId;
        this.journeyDate = journeyDate;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.additionalCharges = additionalCharges;
        this.seaterSeatsBooked = seaterSeatsBooked;
        this.sleeperSeatsBooked = sleeperSeatsBooked;
        this.seaterFare = seaterFare;
        this.sleeperFare = sleeperFare;
        this.totalCharges = totalCharges;
        this.bus = bus;
        this.driver = driver;
        this.busRouteWeekday = busRouteWeekday;
    }
    public Schedule() {
    }

    public static Boolean addRecord(Date journeyDate, Time departureTime, Time arrivalTime, Integer additionalCharges, Integer sleeperFare, Integer seaterFare, Integer totalCharges, Integer busId, Integer driverId, Integer busRouteWeekdayId) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO schedules " +
                        "(journey_date, departure_time, arrival_time, seater_seats_booked, sleeper_seats_booked, additional_charges, seater_fare, sleeper_fare, total_charges, bus_id, driver_id, bus_route_weekday_id)";
            PreparedStatement ps = con.prepareStatement(query);
            
            ps.setDate(1, journeyDate);
            ps.setTime(2, departureTime);
            ps.setTime(3, arrivalTime);
            ps.setInt(4, 0); // seater seats booked
            ps.setInt(5, 0); // sleeper seats booked
            ps.setInt(6, additionalCharges);
            ps.setInt(7, seaterFare); 
            ps.setInt(8, sleeperFare); 
            ps.setInt(9, totalCharges);
            ps.setInt(10, busId);
            ps.setInt(11, driverId);
            ps.setInt(12, busRouteWeekdayId);

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

    public static ArrayList<Schedule> getRecordsForTimings(Integer operatorId, Date journeyDate, Integer busId) {
        ArrayList<Schedule> list = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM schedules sch " +
                        // buses
                        "JOIN buses b ON sch.bus_id = b.bus_id " + 
                        "JOIN status bs ON b.status_id = bs.status_id " +
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        // drivers
                        "JOIN drivers dr ON sch.driver_id = dr.driver_id " +
                        "JOIN users u ON dr.user_id = u.user_id " +
                        "JOIN status us ON u.status_id = us.status_id " +
                        "JOIN user_types ut ON u.user_type_id = ut.user_type_id " +
                        // busroutweekdays
                        "JOIN bus_route_weekdays brw ON sch.bus_route_weekday_id = brw.bus_route_weekday_id " +
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
                        "WHERE opr.operator_id=? AND sch.journey_date=? AND sch.bus_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, operatorId);
            ps.setDate(2, journeyDate);
            ps.setInt(3, busId);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                // busRouteWeekday
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
                    rs.getInt("st.status_id"),
                    rs.getString("st.name")
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

                // driver
                User user = new User(
                        rs.getInt("u.user_id"), 
                        rs.getString("u.full_name"),
                        rs.getDate("u.dob"),
                        rs.getString("u.contact"),
                        rs.getInt("u.gender"),
                        rs.getString("u.email"),
                        rs.getString("u.password"),
                        rs.getString("u.profile_pic"),
                        new Status(rs.getInt("us.status_id"), rs.getString("us.name")),
                        rs.getString("u.verification_code"),
                        rs.getTimestamp("u.created_at"),
                        rs.getTimestamp("u.updated_at"),
                        new UserType(rs.getInt("ut.user_type_id"), rs.getString("ut.name"))
                );

                Driver driver = new Driver(
                    rs.getInt("d.driver_id"),
                    rs.getDate("d.start_date"),
                    rs.getDate("d.end_date"),
                    rs.getString("d.licence_pic"),
                    rs.getString("d.licence_no"),
                    user
                );

                // bus
                Bus bus = new Bus(
                    rs.getInt("b.bus_id"),
                    rs.getString("b.bus_number"),
                    new Manufacturer(
                        rs.getInt("m.manufacturer_id"),
                        rs.getString("m.name")
                    ),
                    rs.getBoolean("b.double_decker"),
                    new Status(
                        rs.getInt("bs.status_id"),
                        rs.getString("bs.name")
                    )
                );

                Schedule schedule = new Schedule(
                    rs.getInt("sch.schedule_id"),
                    rs.getDate("sch.journey_date"),
                    rs.getTime("sch.departure_time"),
                    rs.getTime("sch.arrival_time"),
                    rs.getInt("sch.seater_seats_booked"),
                    rs.getInt("sch.sleeper_seats_booked"),
                    rs.getInt("sch.additional_charges"),
                    rs.getInt("sch.seater_fare"),
                    rs.getInt("sch.sleeper_fare"),
                    rs.getInt("sch.total_charges"),
                    bus,
                    driver,
                    currWeekDay
                );

                list.add(schedule);
            }

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            list = null;
        }
        return list;
    }

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Date getJourneyDate() {
        return journeyDate;
    }

    public void setJourneyDate(Date journeyDate) {
        this.journeyDate = journeyDate;
    }

    public Time getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Time departureTime) {
        this.departureTime = departureTime;
    }

    public Time getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Time arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Integer getAdditionalCharges() {
        return additionalCharges;
    }

    public void setAdditionalCharges(Integer additionalCharges) {
        this.additionalCharges = additionalCharges;
    }

    public Integer getSeaterSeatsBooked() {
        return seaterSeatsBooked;
    }

    public void setSeaterSeatsBooked(Integer seaterSeatsBooked) {
        this.seaterSeatsBooked = seaterSeatsBooked;
    }

    public Integer getSleeperSeatsBooked() {
        return sleeperSeatsBooked;
    }

    public void setSleeperSeatsBooked(Integer sleeperSeatsBooked) {
        this.sleeperSeatsBooked = sleeperSeatsBooked;
    }

    public Integer getSeaterFare() {
        return seaterFare;
    }

    public void setSeaterFare(Integer seaterFare) {
        this.seaterFare = seaterFare;
    }

    public Integer getSleeperFare() {
        return sleeperFare;
    }

    public void setSleeperFare(Integer sleeperFare) {
        this.sleeperFare = sleeperFare;
    }

    public Integer getTotalCharges() {
        return totalCharges;
    }

    public void setTotalCharges(Integer totalCharges) {
        this.totalCharges = totalCharges;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public BusRouteWeekday getBusRouteWeekday() {
        return busRouteWeekday;
    }

    public void setBusRouteWeekday(BusRouteWeekday busRouteWeekday) {
        this.busRouteWeekday = busRouteWeekday;
    }
}
