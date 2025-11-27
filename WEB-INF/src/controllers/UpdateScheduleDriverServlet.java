package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;

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

            boolean isOldDriverActive = false;
            boolean isNewDriverInActive = false;

            int oldDriverUserId = -1;
            int newDriverUserId = -1;

            // check karo ki jo new driver hai inactive hai ya nahi
            request.setAttribute("driver_id", newDriverId);
            request.getRequestDispatcher("check_inactive_driver.do").include(request, response);

            if(request.getAttribute("isValid") == null) {
                throw new IllegalArgumentException("Invalid Operation");
            }
            isNewDriverInActive = (Boolean) request.getAttribute("isValid");
            // clear attributes
            request.removeAttribute("driver_id");
            request.removeAttribute("isValid");

            @SuppressWarnings("unchecked")
            ArrayList<Driver> inactiveDriverList = (ArrayList<Driver>) session.getAttribute("inactiveDriverList");

            for(Driver driver : inactiveDriverList) {
                if(driver.getDriverId().equals(newDriverId)) {
                    newDriverUserId = driver.getUser().getUserId();
                    break;
                }
            }

            // check karo ki jo new driver active hai ya nahi
            request.setAttribute("driver_id", oldDriverId);
            request.getRequestDispatcher("check_inactive_driver.do").include(request, response);

            if(request.getAttribute("isValid") == null) {
                throw new IllegalArgumentException("Invalid Operation");
            }
            isOldDriverActive = (Boolean) request.getAttribute("isValid");

            @SuppressWarnings("unchecked")
            ArrayList<Driver> activeDriverList = (ArrayList<Driver>) session.getAttribute("activeDriverList");

            for(Driver driver : activeDriverList) {
                if(driver.getDriverId().equals(oldDriverId)) {
                    oldDriverId = driver.getUser().getUserId();
                    break;
                }
            }

            // clear attributes
            request.removeAttribute("driver_id");
            request.removeAttribute("isValid");

            if(!isNewDriverInActive || !isOldDriverActive) throw new IllegalArgumentException("Invalid Driver");

            Operator operator = (Operator) session.getAttribute("operator");
            
            boolean isScheduleDriverUpdated = Schedule.updateDriver(oldDriverId, busId, scheduleId, operator.getOperatorId());
            if(!isScheduleDriverUpdated) throw new IllegalArgumentException("Invalid Request");

            boolean isNewDriverStatusUpdated = false;
            request.setAttribute("user_id", newDriverUserId);
            request.setAttribute("status_id", 4); // active status
            request.getRequestDispatcher("update_user_status.do").include(request, response);

            if(request.getAttribute("isUpdated") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            isNewDriverStatusUpdated = (Boolean) request.getAttribute("isUpdated");

            if(!isNewDriverStatusUpdated) {
                throw new IllegalArgumentException("Invalid Request");
            }

            
            boolean isOldDriverStatusUpdated = false;
            request.setAttribute("user_id", oldDriverUserId);
            request.setAttribute("status_id", 5); // active status
            request.getRequestDispatcher("update_user_status.do").include(request, response);

            if(request.getAttribute("isUpdated") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            isOldDriverStatusUpdated = (Boolean) request.getAttribute("isUpdated");

            if(!isOldDriverStatusUpdated) {
                throw new IllegalArgumentException("Invalid Request");
            }

            request.removeAttribute("isUpdated");
            request.removeAttribute("user_id");
            session.removeAttribute("inactiveDriverList");
            session.removeAttribute("activeDriverList");

            request.getRequestDispatcher("get_schedule.do").forward(request, response);
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}
