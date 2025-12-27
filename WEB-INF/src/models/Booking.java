package models;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Date;

import java.util.ArrayList;

import utils.DBManager;


public class Booking {
    private Integer bookingId;
    private Integer totalFare;
    private Date bookingDate;
    private User user;
    private Schedule schedule;

    public Booking(Integer bookingId, Integer totalFare, Date bookingDate, User user, Schedule schedule) {
        this(bookingId, totalFare, bookingDate, schedule);
        this.user = user;
    }
    public Booking(Integer bookingId, Integer totalFare, Date bookingDate, Schedule schedule) {
        this.bookingId = bookingId;
        this.totalFare = totalFare;
        this.bookingDate = bookingDate;
        this.schedule = schedule;
    }

    public Booking() {

    }

    public static int addRecord(int scheduleId, int totalFare, int userId) {
        int generatedId = -1;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO bookings " +
                        "(schedule_id, total_fare, user_id, booking_date) " +
                        "VALUES (?,?,?,CURDATE())";

            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, scheduleId);
            ps.setInt(2, totalFare);
            ps.setInt(3, userId);

            if(ps.executeUpdate() > 0) {
                ResultSet rs = ps.getGeneratedKeys();
                if(rs.next()) {
                    generatedId = rs.getInt(1);
                }
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            generatedId = -1;
        }
        return generatedId;
    }

    public ArrayList<Booking> collectAllRecords(int userId) {
        ArrayList<Booking> list = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM bookings bks " +
                        // users
                        "JOIN users usr ON bks.user_id = usr.user_id " +
                        "JOIN status usrs ON usrs.status_id = usr.status_id " +
                        "JOIN user_types usrt ON usrt.user_type_id = usr.user_type_id " +
                        //schedules
                        "JOIN schedules sch ON bks.schedule_id = sch.schedule_id " +
                        "JOIN status schs ON sch.status_id = schs.status_id " +
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
                        "JOIN weekdays w ON brw.weekday_id = w.weekday_id " +
                        "JOIN routes r ON opr.route_id = r.route_id " +
                        "JOIN cities s ON r.source = s.city_id " +
                        "JOIN states ss ON s.state_id = ss.state_id " +
                        "JOIN cities d ON r.destination = d.city_id " +
                        "JOIN states ds ON d.state_id = ds.state_id " +
                        "JOIN status st ON st.status_id = opr.status_id " +
                        "WHERE usr.user_id=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, userId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User(
                        rs.getInt("usr.user_id"), 
                        rs.getString("usr.full_name"),
                        rs.getDate("usr.dob"),
                        rs.getString("usr.contact"),
                        rs.getInt("usr.gender"),
                        rs.getString("usr.email"),
                        rs.getString("usr.password"),
                        rs.getString("usr.profile_pic"),
                        new Status(rs.getInt("usrs.status_id"), rs.getString("usrs.name")),
                        rs.getString("usr.verification_code"),
                        rs.getTimestamp("usr.created_at"),
                        rs.getTimestamp("usr.updated_at"),
                        new UserType(rs.getInt("usrt.user_type_id"), rs.getString("usrt.name"))
                );
                Weekday weekday = new Weekday(rs.getInt("w.weekday_id"), rs.getString("w.name"));
                City source = new City(
                    rs.getInt("s.city_id"),
                    rs.getString("s.name"),
                    new State(
                        rs.getInt("ss.state_id"),
                        rs.getString("ss.name")
                    )
                );
                City destination = new City(
                    rs.getInt("d.city_id"),
                    rs.getString("d.name"),
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
                User driverUser = new User(
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
                    rs.getInt("dr.driver_id"),
                    rs.getDate("dr.start_date"),
                    rs.getDate("dr.end_date"),
                    rs.getString("dr.licence_pic"),
                    rs.getString("dr.licence_no"),
                    driverUser
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

                Status scheduleStatus = new Status(
                    rs.getInt("schs.status_id"),
                    rs.getString("schs.name")
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
                    currWeekDay,
                    scheduleStatus
                );

                Booking booking = new Booking(
                    rs.getInt("bks.booking_id"),
                    rs.getInt("bks.total_fare"),
                    rs.getDate("bks.journey_date"),
                    user,
                    schedule
                );

                list.add(booking);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setTotalFare(Integer totalFare) {
        this.totalFare = totalFare;
    }

    public Integer getTotalFare() {
        return totalFare;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public Integer getBookingId() {
        return bookingId;
    }
}