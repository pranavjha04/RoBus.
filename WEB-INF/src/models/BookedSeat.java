package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

import java.util.List;
import java.util.ArrayList;


import utils.DBManager;

public class BookedSeat {
    
    private Integer bookedSeatId;
    private Integer seatNumber;
    private Booking booking;

    public BookedSeat() {
    }

    public BookedSeat(Integer bookedSeatId, Booking booking, Integer seatingNumber) {
        this.bookedSeatId = bookedSeatId;
        this.booking = booking;
        this.seatNumber = seatingNumber;
    }

    public static boolean deleteAllBySchedule(int scheduleId) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "DELETE FROM booked_seats bs " +
                        "JOIN bookings b ON b.booking_id = bs.booking_id " +
                        "WHERE b.schedule_id=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, scheduleId);

            ps.executeUpdate();
            flag = true;
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
    }
    public static boolean deleteAllByBooking(int bookingId) {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "DELETE FROM booked_seats " +
                        "WHERE booking_id=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, bookingId);

            ps.executeUpdate();
            flag = true;
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
    }

    public static boolean addRecordMultiple(int bookingId, List<Integer> selectedSeatNumberList) {
        boolean flag = false;
        StringBuilder helper = new StringBuilder();
        for(Integer seatNumber : selectedSeatNumberList) {
            helper.append("(?,?),");
        }
        helper.deleteCharAt(helper.length() - 1);
        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "INSERT INTO booked_seats "  +
                        "(booking_id, seat_number) " +
                        "VALUES " +
                        helper.toString();
            PreparedStatement ps = con.prepareStatement(query);

            int countHelper = 1;
            for(Integer seatNumber : selectedSeatNumberList) {
                ps.setInt(countHelper++, bookingId);
                ps.setInt(countHelper++, seatNumber);
            }

            if(ps.executeUpdate() == selectedSeatNumberList.size()) {
                flag = true;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
            flag = true;
        }
        return flag;
    }

    public static boolean checkRecordExistBySeatNumber(int seatNumber, int scheduleId) {
        boolean flag = false;

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM booked_seats bs " + 
                        "JOIN bookings b ON b.booking_id = bs.booking_id " +
                        "WHERE seat_number=? AND b.status_id=11 AND b.schedule_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, seatNumber);
            ps.setInt(2, scheduleId);

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
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

    public static ArrayList<BookedSeat> collectAllRecords(int scheduleId) {
        ArrayList<BookedSeat> list = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM booked_seats bkst " + 
                        "JOIN bookings bks ON bkst.booking_id = bks.booking_id " +
                        // schedules
                        "JOIN schedules sch ON bks.schedule_id = sch.schedule_id " +
                        "JOIN status schs ON sch.status_id = schs.status_id " +
                        // buses
                        "JOIN buses b ON sch.bus_id = b.bus_id " +
                        "JOIN status bs ON b.status_id = bs.status_id " +
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        // driver
                        "JOIN drivers dr ON sch.driver_id = dr.driver_id " +
                        "JOIN users u ON dr.user_id = u.user_id " +
                        "JOIN status us ON u.status_id = us.status_id " +
                        "JOIN user_types ut ON u.user_type_id = ut.user_type_id " +
                        "JOIN bus_route_weekdays brw ON sch.bus_route_weekday_id = brw.bus_route_weekday_id " +
                        "JOIN operator_routes opr ON brw.operator_route_id = opr.operator_route_id " +
                        "JOIN weekdays w ON brw.weekday_id = w.weekday_id " +
                        "JOIN routes r ON opr.route_id = r.route_id " +
                        "JOIN cities s ON r.source = s.city_id " +
                        "JOIN states ss ON s.state_id = ss.state_id " +
                        "JOIN cities d ON r.destination = d.city_id " +
                        "JOIN states ds ON d.state_id = ds.state_id " +
                        "JOIN status st ON st.status_id = opr.status_id " +
                        "WHERE bks.schedule_id=? AND bks.status_id=11";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, scheduleId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
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
                    rs.getDate("bks.booking_date"),
                    schedule
                );

                BookedSeat bookedSeat = new BookedSeat(
                    rs.getInt("bkst.booked_seat_id"),
                    booking, 
                    rs.getInt("bkst.seat_number")
                );

                list.add(bookedSeat);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static ArrayList<BookedSeat> collectAllRecordsByBooking(int bookingId) {
        ArrayList<BookedSeat> list = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = 
                        "SELECT * FROM booked_seats bkst " + 
                        "JOIN bookings bks ON bkst.booking_id = bks.booking_id " +
                        // schedules
                        "JOIN schedules sch ON bks.schedule_id = sch.schedule_id " +
                        "JOIN status schs ON sch.status_id = schs.status_id " +
                        // buses
                        "JOIN buses b ON sch.bus_id = b.bus_id " +
                        "JOIN status bs ON b.status_id = bs.status_id " +
                        "JOIN manufacturers m ON b.manufacturer_id = m.manufacturer_id " +
                        // driver
                        "JOIN drivers dr ON sch.driver_id = dr.driver_id " +
                        "JOIN users u ON dr.user_id = u.user_id " +
                        "JOIN status us ON u.status_id = us.status_id " +
                        "JOIN user_types ut ON u.user_type_id = ut.user_type_id " +
                        "JOIN bus_route_weekdays brw ON sch.bus_route_weekday_id = brw.bus_route_weekday_id " +
                        "JOIN operator_routes opr ON brw.operator_route_id = opr.operator_route_id " +
                        "JOIN weekdays w ON brw.weekday_id = w.weekday_id " +
                        "JOIN routes r ON opr.route_id = r.route_id " +
                        "JOIN cities s ON r.source = s.city_id " +
                        "JOIN states ss ON s.state_id = ss.state_id " +
                        "JOIN cities d ON r.destination = d.city_id " +
                        "JOIN states ds ON d.state_id = ds.state_id " +
                        "JOIN status st ON st.status_id = opr.status_id " +
                        "WHERE bkst.booking_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, bookingId);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
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
                    rs.getDate("bks.booking_date"),
                    schedule
                );

                BookedSeat bookedSeat = new BookedSeat(
                    rs.getInt("bkst.booked_seat_id"),
                    booking, 
                    rs.getInt("bkst.seat_number")
                );

                list.add(bookedSeat);
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public Integer getBookedSeatId() {
        return bookedSeatId;
    }

    public void setBookedSeatId(Integer bookedSeatId) {
        this.bookedSeatId = bookedSeatId;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
