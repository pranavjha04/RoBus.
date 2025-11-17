package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.Enumeration;

import models.Operator;
import models.Schedule;

@WebServlet("/add_bus_schedule.do")
public class AddBusScheduleServlet extends HttpServlet {
    private static String[] acceptedParams = {"bus_id", "journey_date", "arrival_time", "departure_time", "seater_seats_booked", "sleeper_seats_booked", "additional_charges", "sleeper_fare", "seater_fare", "total_charges", "driver_id", "bus_route_weekday_id"};
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

            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Time departureTime = Time.valueOf(request.getParameter("departure_time"));
            Time arrivalTime = Time.valueOf(request.getParameter("arrival_time"));
            Integer seaterSeatsBooked = Integer.parseInt(request.getParameter("seater_seats_booked"));
            Integer sleeperSeatsBooked = Integer.parseInt(request.getParameter("sleeper_seats_booked"));
            Integer additionalCharges = Integer.parseInt(request.getAttribute("additional_charges"));
            Integer sleeperFare = Integer.parseInt(request.getParameter("sleeper_fare"));
            Integer seaterFare = Integer.parseInt(request.getParameter("seater_fare"));
            Integer totalCharges = Integer.parseInt(request.getParameter("total_charges"));
            Integer driverId = Integer.parseInt(request.getParameter("driver_id"));
            Integer busRouteWeekdayId = Integer.parseInt(request.getParameter("bus_route_weekday_id"));

            
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }

    }
}