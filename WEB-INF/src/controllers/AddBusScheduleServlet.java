package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import java.sql.Date;
import java.sql.Time;

import models.Operator;
import models.Schedule;
import models.Driver;
import models.Bus;
import models.BusFareFactor;
import models.BusRouteWeekday;

import utils.FieldManager;

@WebServlet("/add_bus_schedule.do")
public class AddBusScheduleServlet extends HttpServlet {

    private static String[] acceptedParams = {"bus_id", "journey_date", "arrival_time", "departure_time", "additional_charges", "sleeper_fare", "seater_fare", "total_charges", "driver_id", "bus_route_weekday_id", "operator_route_id"};

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        try {
            // validate if any missing parameter
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) {
                    throw new IllegalArgumentException("Missing Parameter");
                }
            }

            // store all parameters
            Operator operator = (Operator) session.getAttribute("operator");
            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Time departureTime = Time.valueOf(request.getParameter("departure_time"));
            Time arrivalTime = Time.valueOf(request.getParameter("arrival_time"));
            Integer additionalCharges = Integer.parseInt(request.getParameter("additional_charges"));
            Integer seaterFare = Integer.parseInt(request.getParameter("seater_fare"));
            Integer sleeperFare = Integer.parseInt(request.getParameter("sleeper_fare"));
            Integer totalCharges = Integer.parseInt(request.getParameter("total_charges"));
            Integer driverId = Integer.parseInt(request.getParameter("driver_id"));
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Integer busRouteWeekdayId = Integer.parseInt(request.getParameter("bus_route_weekday_id"));
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Integer seaterSeatsBooked = 0;
            Integer sleeperSeatsBooked = 0;

            /* -------- DATE TIME START -------- */
            request.getRequestDispatcher("check_valid_schedule_timings.do").include(request, response);
            if (session.getAttribute("isScheduleDateTimeValid") == null) {
                throw new IllegalArgumentException("Invalid schedule timing");
            }
            /* -------- DATE TIME VALIDATION END -------- */

            /* -------- EXTRA FARE CHARGES  START -------- */
            if(
                !FieldManager.validateExtraChargeFare(seaterSeatsBooked) || 
                !FieldManager.validateExtraChargeFare(sleeperSeatsBooked) || 
                !FieldManager.validateExtraChargeFare(additionalCharges)
            ) {
                throw new IllegalArgumentException("Invalid Seating Fare");
            }
            /* -------- EXTRA FARE CHARGES END -------- */

            /* -------- DRIVER START -------- */
            if(session.getAttribute("driverList") == null) {
                request.getRequestDispatcher("get_inactive_drivers.do").include(request, response);
                if(session.getAttribute("driverList") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }
            @SuppressWarnings("unchecked")
            ArrayList<Driver> driverList = (ArrayList<Driver>) session.getAttribute("driverList");

            boolean isDriverValid = false;
            for(Driver next : driverList) {
                if(next.getDriverId().equals(driverId) && next.getUser().getStatus().getName().equals("Inactive")) {
                    isDriverValid = true;
                    break;
                }
            }

            if(!isDriverValid) {
                throw new IllegalArgumentException("Illegal Driver");
            }
            /* -------- DRIVER END -------- */

            /* -------- BUS START -------- */
            Bus inputBus = Bus.getRecord(busId, operator.getOperatorId());
            if(inputBus == null) {
                throw new IllegalArgumentException("Invalid Bus ID");
            }
            /* -------- BUS END -------- */

            /* -------- TOTAL CHARGES START -------- */
            if(session.getAttribute("bus_fare_factor_list" + busId) == null) {
                request.getRequestDispatcher("get_bus_fare_factors.do").include(request, response);
                if(session.getAttribute("bus_fare_factor_list" + busId) == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }
            if(session.getAttribute("bus_route_weekday_list" + operatorRouteId) == null) {
                request.getRequestDispatcher("get_bus_route_weekday_all.do").include(request, response);
                if(session.getAttribute("bus_route_weekday_list" + operatorRouteId) == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }

            @SuppressWarnings("unchecked")
            ArrayList<BusFareFactor> busFareFactorList = (ArrayList<BusFareFactor>) session.getAttribute("bus_fare_factor_list"+ busId);

            @SuppressWarnings("unchecked")
            ArrayList<BusRouteWeekday> busRouteWeekdayList = (ArrayList<BusRouteWeekday>) session.getAttribute("bus_route_weekday_list" + operatorRouteId);
            
            int distance = 0;
            for(BusRouteWeekday next : busRouteWeekdayList) {
                if(next.getBusRouteWeekdayId().equals(busRouteWeekdayId)) {
                    distance = next.getOperatorRoute().getRoute().getDistance();
                    break;
                }
            }
            if(distance == 0) {
                throw new IllegalArgumentException("Invalid Bus Route Weekday Id");
            }
            
            int targetTotalFareCharges = BusFareFactor.calculateTotalFareCharges(busFareFactorList, distance);
            int currTotalFareCharges = totalCharges - additionalCharges - seaterFare - sleeperFare;

            if(currTotalFareCharges != targetTotalFareCharges) {
                throw new IllegalArgumentException("Invalid Total Charges");
            }
            /* -------- TOTAL CHARGES END -------- */

            /* -------- ADD QUERY -------- */
            boolean isScheduled = Schedule.addRecord(journeyDate, departureTime, arrivalTime, additionalCharges, sleeperFare, seaterFare, totalCharges, busId, driverId, busRouteWeekdayId);

            if(!isScheduled) throw new IllegalArgumentException("Internal Server Error");
    
            response.getWriter().println("ok");
            // clear cache
            session.removeAttribute(journeyDate.toString() + operator.getOperatorId() + busId);
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }       
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}