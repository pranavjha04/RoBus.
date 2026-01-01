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
import models.User;
import models.Status;

@WebServlet("/update_schedule_driver.do")
public class UpdateScheduleDriverServlet extends HttpServlet {
    private static String[] acceptedParams = {"new_driver_id", "old_driver_id", "schedule_id", "bus_id", "schedule_id", "journey_date"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        try {
            /*********************** CHECK MISSING PARAMETRS ****************************** */
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) {
                    throw new IllegalArgumentException("Missing Parameter");
                }
            }
            Operator operator = (Operator) session.getAttribute("operator");
            Integer newDriverId = Integer.parseInt(request.getParameter("new_driver_id"));
            Integer oldDriverId = Integer.parseInt(request.getParameter("old_driver_id"));
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));

            Driver newDriver = Driver.getRecord(newDriverId, operator.getOperatorId());
            Driver oldDriver = Driver.getRecord(oldDriverId, operator.getOperatorId());
            Schedule currSchedule = Schedule.getRecord(scheduleId, operator.getOperatorId());

            if(currSchedule == null || !currSchedule.getStatus().getStatusId().equals(11) || newDriver == null || oldDriver == null)  { // upcoming nahi hai or driver invalid hai
                throw new IllegalArgumentException("Invalid Request");
            } 
            
            // check karo ki jo new driver hai inactive hai ya nahi
            if(!newDriver.getUser().getStatus().getStatusId().equals(5)) {
                throw new IllegalArgumentException("Invalid Request");
            }
            // check karo ki jo old driver hai wo active hai ya nhi
            if(!oldDriver.getUser().getStatus().getStatusId().equals(4)) {
                throw new IllegalArgumentException("Invalid Request");
            }
            
            boolean isScheduleDriverUpdated = Schedule.updateDriver(newDriverId, busId, scheduleId, operator.getOperatorId());
            if(!isScheduleDriverUpdated) throw new IllegalArgumentException("Invalid Request");

            boolean isNewDriverUpdated = User.updateStatus(newDriver.getUser().getUserId(), 4); // active kardo
            if(!isNewDriverUpdated) throw new IllegalArgumentException("Invalid Request");

            boolean isOldDriverUpdated = User.updateStatus(oldDriver.getUser().getUserId(), 5); // inactive kardo
            if(!isOldDriverUpdated) throw new IllegalArgumentException("Invalid Request");

        
            @SuppressWarnings("unchecked")
            ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

            if(statusList == null) throw new IllegalArgumentException("Invalid Request");

            for(Status next : statusList) {
                if(next.getStatusId().equals(5)) {
                    oldDriver.getUser().setStatus(next);
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
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
