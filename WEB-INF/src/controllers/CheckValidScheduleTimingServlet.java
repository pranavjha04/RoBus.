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

import utils.FieldManager;

@WebServlet("/check_valid_schedule_timings.do")
public class CheckValidScheduleTimingServlet extends HttpServlet {
    private static final String[] acceptedParams = {"departure_time", "arrival_time", "journey_date", "bus_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        session.removeAttribute("isScheduleDateTimeValid");
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);


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

            if(!FieldManager.validateScheduleDate(journeyDate.toString())) {
                throw new IllegalArgumentException("Invalid Date");
            }

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
                    if(!requestURLPath.equals("add_bus_schedule.do")) {
                        response.getWriter().println("clash");
                    }
                    return;
                }
            };

            if(!requestURLPath.equals("add_bus_schedule.do")) {
                response.getWriter().println("ok");
            }
            else {
                session.setAttribute("isScheduleDateTimeValid", true);
            }
            return;
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            if(requestURLPath.equals("add_bus_schedule.do")) {
                session.removeAttribute("isScheduleDateTimeValid");
            }
            else {
                response.getWriter().println("invalid");
            }
            return;
        }
        catch(IllegalArgumentException e) {
            if(requestURLPath.equals("add_bus_schedule.do")) {
                session.removeAttribute("isScheduleDateTimeValid");
            }
            else {
                response.getWriter().println("invalid");
            }
            e.printStackTrace();
            return;
        }
    }
}