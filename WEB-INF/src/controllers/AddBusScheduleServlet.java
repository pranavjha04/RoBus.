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

import utils.FieldManager;

@WebServlet("/add_bus_schedule.do")
public class AddBusScheduleServlet extends HttpServlet {
    private static String[] acceptedParams = {"bus_id", "journey_date", "arrival_time", "departure_time", "additional_charges", "sleeper_fare", "seater_fare", "total_charges", "driver_id", "bus_route_weekday_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        try {
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) {
                    throw new IllegalArgumentException("Missing Parameter");
                }
            }
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
            Integer seaterSeatsBooked = 0;
            Integer sleeperSeatsBooked = 0;

            // date time validation
            request.getRequestDispatcher("check_valid_schedule_timings.do").include(request, response);

            if (session.getAttribute("isScheduleDateTimeValid") == null) {
                throw new IllegalArgumentException("Invalid schedule timing");
            }
            // extra charges check
            if(
                !FieldManager.validateExtraChargeFare(seaterSeatsBooked) || 
                !FieldManager.validateExtraChargeFare(sleeperSeatsBooked) || 
                !FieldManager.validateExtraChargeFare(additionalCharges)
            ) {
                throw new IllegalArgumentException("Invalid Seating Fare");
            }

            // validate check if driver exist and he/she/her/they/them is inactive
            
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

            // validate bus
            Bus inputBus = Bus.getRecord(busId);
            if(inputBus == null || !inputBus.getOperator().getOperatorId().equals(operator.getOperatorId())) {
                response.getWriter().println("invalid");
                return;
            }

            // validate TotalCharges
            request.getRequestDispatcher("get_bus_fare_factors.do").include(request, response);
            if(session.getAttribute("bus_fare_factor_list") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            // validate total Fare
            @SuppressWarnings("unchecked");
            ArrayList<BusFareFactor> busFareFactorList = (ArrayList<BusFareFactor>) session.getAttribute("bus_fare_factor_list");

            int targetTotalFareCharges = BusFareFactor.calculateTotalFareCharges(busFareFactorList, duration);
            int currTotalFareCharges = totalCharges - additionalCharges - seaterFare - sleeperFare;

            
            if(currTotalCharges != targetTotalCharges) {
                throw new IllegalArgumentException("Invalid Request");
            }

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
    }
}