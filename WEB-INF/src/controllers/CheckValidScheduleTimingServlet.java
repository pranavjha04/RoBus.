package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.sql.Date;
import java.sql.Time;

import java.util.ArrayList;

import models.Schedule;
import models.Operator;
import models.BusRouteWeekday;

@WebServlet("/check_valid_schedule_timings.do")
public class CheckValidScheduleTimingServlet extends HttpServlet {
    private static final String[] acceptedParams = {"departure_time", "arrival_time", "journey_date", "bus_id"};
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
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));  

            String formattedAttribute = journeyDate.toString() + operator.getOperatorId() + busId;

            if(session.getAttribute(formattedAttribute) == null) {
                ArrayList<Schedule> scheduleList = Schedule.getRecordsForTimings(operator.getOperatorId(), journeyDate, busId);
                if(scheduleList == null) throw new IllegalArgumentException("Invalid request");

                session.setAttribute(formattedAttribute, scheduleList);
            }
            
            @SuppressWarnings("unchecked")
            ArrayList<Schedule> scheduleList = (ArrayList<Schedule>) session.getAttribute(formattedAttribute);

            
            if(scheduleList == null) {
                throw new IllegalArgumentException("Invalid Parameter");
            }
            
            for(Schedule schedule : scheduleList) {
                if(
                    (departureTime.getTime() >= schedule.getDepartureTime().getTime() && departureTime.getTime() <= schedule.getArrivalTime().getTime()) ||
                    (arrivalTime.getTime() >= schedule.getDepartureTime().getTime() && arrivalTime.getTime() <= schedule.getArrivalTime().getTime())
                ) {
                    response.getWriter().println("clash");
                    return;
                }
            }

            response.getWriter().println("ok");
            return;
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(IllegalArgumentException e) {
            response.getWriter().println("invalid");
            e.printStackTrace();
            return;
        }
    }
}