package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;

import java.sql.Date;

import com.google.gson.Gson;

import models.Operator;
import models.Schedule;
import models.Status;
import models.Driver;


@WebServlet("/update_schedule_status.do")
public class UpdateScheduleStatusServlet extends HttpServlet {
    private static String[] acceptedParametersList = {"journey_date", "schedule_id", "status_id", "bus_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        ServletContext context = getServletContext();

        Operator operator = (Operator) session.getAttribute("operator");

        try {
            for(String next : acceptedParametersList) {
                if(request.getParameter(next) == null) {
                    throw new IllegalArgumentException("Missing parameter");
                }
            }

            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Integer statusId = Integer.parseInt(request.getParameter("status_id"));
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));

            switch(statusId) {
                case 6 : { // cancelled
                    final String ALL_INCOMING_SCHEDULE_LIST = "upcoming_schedule_list" + journeyDate.toString();
                    final String BUS_INCOMING_SCHEDULE_LIST = "upcoming" + busId + "schedule_list" + journeyDate.toString();

                    final String ALL_CANCELLED_SCHEDULE_LIST = "cancelled_schedule_list" + journeyDate.toString();
                    final String BUS_CANCELLED_SCHEDULE_LIST = "cancelled" + busId + "schedule_list" + journeyDate.toString();

                    Schedule currSchedule = null;
                    // cancel tb he kr skte hai jab schedule incoming ho
    
                    // first get the schedule from all incoming sources
                    final String[] cacheList = {
                        "upcoming_schedule_list" + journeyDate.toString(),
                        "upcoming" + busId + "schedule_list" + journeyDate.toString()
                    };

                    for(String next : cacheList) {
                        if(session.getAttribute(next) != null) {
                            @SuppressWarnings("unchecked")
                            ArrayList<Schedule> list = (ArrayList<Schedule>) session.getAttribute(next);

                            for(Schedule curr : list) {
                                if(curr.getScheduleId().equals(scheduleId)) {
                                    currSchedule = curr;
                                    break;
                                }
                            }
                            if(currSchedule != null) break;
                        }
                    }

                    // check karo agr mil gya toh theek wrna database se lao
                    if(currSchedule == null) {
                        currSchedule = Schedule.getRecord(scheduleId, operator.getOperatorId());
                    }

                    // usme uska status check karo ki wo incoming hai ya nahi
                    if(currSchedule == null || !currSchedule.getStatus().getStatusId().equals(11))  { // upcoming nahi hai
                        // agr incoming nahi hai toh exception throw
                        throw new IllegalArgumentException("Invalid Request");
                    } 

                    Integer source = currSchedule.getBusRouteWeekday().getOperatorRoute().getRoute().getSource().getCityId();
                    Integer destination = currSchedule.getBusRouteWeekday().getOperatorRoute().getRoute().getDestination().getCityId();
                    
                    // driver set to inactive
                    request.setAttribute("driver_id", currSchedule.getDriver().getDriverId());
                    request.setAttribute("status_id", 5);

                    request.getRequestDispatcher("update_driver_status.do").include(request, response);

                    Object isDriverUpdated = request.getAttribute("isUpdated");
                    if(isDriverUpdated == null || !((Boolean) isDriverUpdated)) {
                        throw new IllegalArgumentException("Invalid Request");
                    }

                    // uske baad journey ko cancel kardo
                    boolean isScheduleUpdate = Schedule.updateStatus(scheduleId, 6, operator.getOperatorId());
                    if(!isScheduleUpdate) throw new IllegalArgumentException("Invalid Request");

                    // clear the session and cache
                    final String[] removeCacheList = {ALL_INCOMING_SCHEDULE_LIST, BUS_INCOMING_SCHEDULE_LIST, ALL_CANCELLED_SCHEDULE_LIST, BUS_CANCELLED_SCHEDULE_LIST};

                    for(String next : removeCacheList) {
                        session.removeAttribute(next);
                    }
                    context.removeAttribute("upcoming_schedule_" + source + "_" + destination + "_" + journeyDate);

                    @SuppressWarnings("unchecked")
                    ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

                    for(Status next : statusList) {
                        if(next.getStatusId().equals(statusId)) {
                            currSchedule.setStatus(next);
                            break;
                        }
                    }

                    
                    response.getWriter().println(new Gson().toJson(currSchedule));
                    break;
                } 
                default : {
                    break;
                }
            }

        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");       
        }
    }
}
