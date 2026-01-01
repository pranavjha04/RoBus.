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

import java.time.LocalTime;

import java.util.ArrayList;

import models.Schedule;
import models.Operator;
import models.BusRouteWeekday;

import utils.AppUtil;

import utils.FieldManager;

@WebServlet("/check_valid_schedule_timings.do")
public class CheckValidScheduleTimingServlet extends HttpServlet {
    private static final String[] acceptedParams = {"departure_time", "arrival_time", "journey_date", "bus_id"};
    private static final String[] acceptedIncludeRequestList = {"add_bus_schedule.do"};
    
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        session.removeAttribute("isScheduleDateTimeValid");
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);
        
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

            ArrayList<Schedule> scheduleList = Schedule.collectBusScheduleRecords(journeyDate, busId, operator.getOperatorId(), 11);
            if(scheduleList == null) throw new IllegalArgumentException("Internal Server Error");
            
            for (Schedule schedule : scheduleList) {
                    LocalTime newStart = departureTime.toLocalTime();
                    LocalTime newEnd = arrivalTime.toLocalTime();

                    LocalTime existingStart = schedule.getDepartureTime().toLocalTime();
                    LocalTime existingEnd = schedule.getArrivalTime().toLocalTime();

                    boolean isOverlap = newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart);

                    if (isOverlap) {
                        if (!isIncludeRequest) {
                            response.getWriter().println("clash");
                        }
                        return;
                    }
            }

            if(!isIncludeRequest) {
                response.getWriter().println("ok");
            }
            else {
                request.setAttribute("isScheduleDateTimeValid", true);
            }
            return;
        }
        catch(IllegalArgumentException e) {
            if(isIncludeRequest) {
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