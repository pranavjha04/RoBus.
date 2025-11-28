package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import models.Operator;
import models.Driver;
import models.Schedule;


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

            Integer newDriverId = Integer.parseInt(request.getParameter("new_driver_id"));
            Integer oldDriverId = Integer.parseInt(request.getParameter("old_driver_id"));
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            final String SCHEDULE_CACHE = "schedule"  + scheduleId;

            boolean isOldDriverActive = false;
            boolean isNewDriverInActive = false;

            int oldDriverUserId = -1;
            int newDriverUserId = -1;

            request.getRequestDispatcher("get_schedule.do").include(request, response);

            if(session.getAttribute(SCHEDULE_CACHE) == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            Schedule currSchedule = (Schedule) session.getAttribute(SCHEDULE_CACHE);
            if(!currSchedule.getStatus().getStatusId().equals(11)) {
                throw new IllegalArgumentException("Invalid Request");
            } // upcoming nahi hai
            

            // check karo ki jo new driver hai inactive hai ya nahi
            request.getRequestDispatcher("get_inactive_drivers.do").include(request, response);

            if(session.getAttribute("inactiveDriverList") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            @SuppressWarnings("unchecked")
            ArrayList<Driver> inactiveDriverList = (ArrayList<Driver>) session.getAttribute("inactiveDriverList");

            for(Driver driver : inactiveDriverList) {
                if(driver.getDriverId().equals(newDriverId)) {
                    newDriverUserId = driver.getUser().getUserId();
                    isNewDriverInActive = true;
                    break;
                }
            }

            if(!isNewDriverInActive || newDriverUserId == -1) throw new IllegalArgumentException("Invalid Request");

            request.getRequestDispatcher("get_active_drivers.do").include(request, response);

            if(session.getAttribute("activeDriverList") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            @SuppressWarnings("unchecked")
            ArrayList<Driver> activeDriverList = (ArrayList<Driver>) session.getAttribute("activeDriverList");

            for(Driver driver : activeDriverList) {
                if(driver.getDriverId().equals(oldDriverId)) {
                    oldDriverUserId = driver.getUser().getUserId();
                    isOldDriverActive = true;
                    break;
                }
            }

            if(!isOldDriverActive || oldDriverUserId == -1) throw new IllegalArgumentException("Invalid Request");

            Operator operator = (Operator) session.getAttribute("operator");
            
            
            boolean isScheduleDriverUpdated = Schedule.updateDriver(newDriverId, busId, scheduleId, operator.getOperatorId());
            if(!isScheduleDriverUpdated) throw new IllegalArgumentException("Invalid Request");

            // update old driver to inactive
            request.setAttribute("user_id", oldDriverUserId);
            request.setAttribute("status_id", 5);

            request.getRequestDispatcher("update_user_status.do").include(request, response);
            

            if(request.getAttribute("isUpdated") == null) throw new IllegalArgumentException("Invalid Request");
            request.removeAttribute("isUpdated");


            // update new driver to active
            request.setAttribute("user_id", newDriverUserId);
            request.setAttribute("status_id", 4);

            request.getRequestDispatcher("update_user_status.do").include(request, response);

            if(request.getAttribute("isUpdated") == null) throw new IllegalArgumentException("Invalid Request");
            request.removeAttribute("isUpdated");
            session.removeAttribute(SCHEDULE_CACHE);

            request.getRequestDispatcher("get_schedule.do").include(request, response);
            
            if(session.getAttribute(SCHEDULE_CACHE) == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            Schedule schedule = (Schedule) session.getAttribute(SCHEDULE_CACHE);

            session.removeAttribute("inactiveDriverList");
            session.removeAttribute("activeDriverList");
            session.removeAttribute("date_schedule_list" + schedule.getJourneyDate().toString());
            session.removeAttribute(schedule.getJourneyDate().toString() + operator.getOperatorId() + schedule.getBus().getBusId());


            response.getWriter().println(new Gson().toJson(schedule));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}
