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

import com.google.gson.Gson;


import models.Operator;
import models.Driver;
import models.Schedule;
import models.Status;

@WebServlet("/update_schedule_driver.do")
public class UpdateScheduleDriverServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        try {
            /*********************** CHECK MISSING PARAMETRS ****************************** */
            if(
                request.getParameter("new_driver_id") == null
                ||
                request.getParameter("old_driver_id") == null
                ||
                request.getParameter("schedule_id") == null 
                ||
                request.getParameter("bus_id") == null
             ) {
                throw new IllegalArgumentException("Invalid Request");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            Integer newDriverId = Integer.parseInt(request.getParameter("new_driver_id"));
            Integer oldDriverId = Integer.parseInt(request.getParameter("old_driver_id"));
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Date journeyDate = Date.valueOf(request.getParameter("date"));
            final String JOURNEY_DATE_CACHE = "date_schedule_list" + journeyDate.toString();
            Driver newDriver = null;
            Driver oldDriver = null;
            Schedule currSchedule = null;

            if(session.getAttribute(JOURNEY_DATE_CACHE) == null) {
                request.getRequestDispatcher("get_journey_date_schedule.do").include(request, response);
                if(session.getAttribute(JOURNEY_DATE_CACHE) == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }

            @SuppressWarnings("unchecked")
            ArrayList<Schedule> dateScheduleList = (ArrayList<Schedule>) session.getAttribute(JOURNEY_DATE_CACHE);

            for(Schedule curr : dateScheduleList) {
                if(curr.getScheduleId().equals(scheduleId)) {
                    currSchedule = curr;
                    break;
                }
            }

            if(currSchedule == null || !currSchedule.getStatus().getStatusId().equals(11))  { // upcoming nahi hai
                throw new IllegalArgumentException("Invalid Request");
            } 
            
            // check karo ki jo new driver hai inactive hai ya nahi
            request.getRequestDispatcher("get_inactive_drivers.do").include(request, response);

            if(session.getAttribute("inactiveDriverList") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            @SuppressWarnings("unchecked")
            ArrayList<Driver> inactiveDriverList = (ArrayList<Driver>) session.getAttribute("inactiveDriverList");

            for(int index = 0; index < inactiveDriverList.size(); index++) {
                Driver curr = inactiveDriverList.get(index);
                if(curr.getDriverId().equals(newDriverId)) {
                    newDriver = curr;
                    break;
                }
            }

            if(newDriver == null) throw new IllegalArgumentException("Invalid Request");

            request.getRequestDispatcher("get_active_drivers.do").include(request, response);

            if(session.getAttribute("activeDriverList") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            @SuppressWarnings("unchecked")
            ArrayList<Driver> activeDriverList = (ArrayList<Driver>) session.getAttribute("activeDriverList");

            for(int index = 0; index < activeDriverList.size(); index++) {
                Driver curr = activeDriverList.get(index);
                if(curr.getDriverId().equals(oldDriverId)) {
                    oldDriver = curr;
                    break;
                }
            }
    

            if(oldDriver == null) throw new IllegalArgumentException("Invalid Request");
            
            boolean isScheduleDriverUpdated = Schedule.updateDriver(newDriverId, busId, scheduleId, operator.getOperatorId());
            if(!isScheduleDriverUpdated) throw new IllegalArgumentException("Invalid Request");

            // update old driver to inactive
            request.setAttribute("user_id", oldDriver.getUser().getUserId());
            request.setAttribute("status_id", 5);

            // update old driver to inactive
            request.getRequestDispatcher("update_user_status.do").include(request, response);
        
            if(request.getAttribute("isUpdated") == null) throw new IllegalArgumentException("Invalid Request");
            request.removeAttribute("isUpdated");

            @SuppressWarnings("unchecked")
            ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

            if(statusList == null) throw new IllegalArgumentException("Invalid Request");

            for(Status next : statusList) {
                if(next.getStatusId().equals(5)) {
                    oldDriver.getUser().setStatus(next);
                    break;
                }
            }
            for(int index = 0; index < inactiveDriverList.size(); index++) {
                Driver curr = inactiveDriverList.get(index);
                if(curr.getDriverId().equals(newDriverId)) {
                    inactiveDriverList.set(index, oldDriver);
                    break;
                }
            }

            // update old driver to active
            request.setAttribute("user_id", newDriver.getUser().getUserId());
            request.setAttribute("status_id", 4);

            request.getRequestDispatcher("update_user_status.do").include(request, response);

            if(request.getAttribute("isUpdated") == null) throw new IllegalArgumentException("Invalid Request");
            request.removeAttribute("isUpdated");

            
            for(Status next : statusList) {
                if(next.getStatusId().equals(4)) {
                    newDriver.getUser().setStatus(next);
                    break;
                }
            }

            for(int index = 0; index < activeDriverList.size(); index++) {
                Driver curr = activeDriverList.get(index);
                if(curr.getDriverId().equals(oldDriverId)) {
                    activeDriverList.set(index, newDriver);
                    break;
                }
            }

            currSchedule.setDriver(newDriver);
            response.getWriter().println(new Gson().toJson(currSchedule));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}
