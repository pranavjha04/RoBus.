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
            
            // total Charges check
            if(totalCharges < 0) {
                throw new IllegalArgumentException("Invalid total Charges");
            }

            // validate check if driver exist and he is inactive
            request.getRequestDispatcher("get_inactive_drivers.do").include(request, response);
            
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

            response.getWriter().println("ok");
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            session.removeAttribute("driverList");
            return;
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}