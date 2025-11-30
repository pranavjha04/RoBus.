package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;

import java.sql.Date;

import com.google.gson.Gson;

import models.Operator;
import models.Schedule;
import models.Status;
import models.Driver;


@WebServlet("/update_schedule_status.do")
public class UpdateScheduleStatusServlet extends HttpServlet {
    private static String[] acceptedParametersList = {"date", "schedule_id", "status_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }   

        try {
           for(String next : acceptedParametersList) {
                if(request.getParameter(next) == null) {
                    System.out.println(next);
                    throw new IllegalArgumentException("Missing Parameter");
                }   
           }    

           Operator operator = (Operator) session.getAttribute("operator");
           Date journeyDate = Date.valueOf(request.getParameter("date"));
           Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
           Integer statusId = Integer.parseInt(request.getParameter("status_id"));
           Schedule currSchedule = null;
           int newDriverStatus = -1;
        
           final String JOURNEY_DATE_CACHE = "date_schedule_list" + journeyDate.toString();
           System.out.println(journeyDate);

           if(session.getAttribute(JOURNEY_DATE_CACHE) == null) {
                request.getRequestDispatcher("get_journey_date_schedule.do").include(request, response);
                if(session.getAttribute(JOURNEY_DATE_CACHE) == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }

            if(statusId == 6) {
                newDriverStatus = 5;
            }

            @SuppressWarnings("unchecked")
            ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

            @SuppressWarnings("unchecked")
            ArrayList<Schedule> dateScheduleList = (ArrayList<Schedule>) session.getAttribute(JOURNEY_DATE_CACHE);

            int targetIndex = -1;
            for(Schedule curr : dateScheduleList) {
                targetIndex++;
                if(curr.getScheduleId().equals(scheduleId)) {
                    currSchedule = curr;
                    break;
                }
            }

            if(currSchedule == null || !currSchedule.getStatus().getStatusId().equals(11))  { // upcoming nahi hai
                throw new IllegalArgumentException("Invalid Request");
            } 

            boolean isStatusUpdatable = true;

            for (Schedule curr : dateScheduleList) {
                if (curr.getScheduleId().equals(currSchedule.getScheduleId())) continue;

                if (curr.getDepartureTime().toLocalTime().isAfter(currSchedule.getArrivalTime().toLocalTime())) {
                    isStatusUpdatable = false;
                    break;
                }
            }


            if(isStatusUpdatable) {
                request.setAttribute("user_id", currSchedule.getDriver().getUser().getUserId());
                request.setAttribute("status_id", 5);
                
                request.getRequestDispatcher("update_user_status.do").include(request, response);

                if(request.getAttribute("isUpdated") == null) throw new IllegalArgumentException("Invalid Request");

                Boolean isStatusUpdated = (Boolean) request.getAttribute("isUpdated");
                if(!isStatusUpdated) {
                    throw new IllegalArgumentException("Invalid Request");
                }

                if(session.getAttribute("activeDriverList") == null) {
                    request.getRequestDispatcher("get_active_drivers.do").include(request, response);
                    if(session.getAttribute("activeDriverList") == null) {
                        throw new IllegalArgumentException("Invalid Request");
                    }
                }

                @SuppressWarnings("unchecked")
                ArrayList<Driver> activeDriverList = (ArrayList<Driver>) session.getAttribute("activeDriverList");

                
                for(int index = 0; index < activeDriverList.size(); index++) {
                    Driver curr = activeDriverList.get(index);
                    if(curr.getDriverId().equals(currSchedule.getDriver().getDriverId())) {
                        activeDriverList.remove(index);
                        break;
                    }
                }

                for(Status next : statusList) {
                    if(next.getStatusId().equals(newDriverStatus)) {
                        currSchedule.getDriver().getUser().setStatus(next);
                        break;
                    }
                }

                if(session.getAttribute("inactiveDriverList") == null) {
                    request.getRequestDispatcher("get_inactive_drivers.do").include(request, response);
                    if(session.getAttribute("inactiveDriverList") == null) {
                        throw new IllegalArgumentException("Invalid Request");
                    }
                }
                else {
                    @SuppressWarnings("unchecked")
                    ArrayList<Driver> inactiveDriverList = (ArrayList<Driver>) session.getAttribute("inactiveDriverList");
                    inactiveDriverList.add(currSchedule.getDriver());
                }
            }

            boolean isUpdated = Schedule.updateStatus(scheduleId, statusId, operator.getOperatorId());
            if(!isUpdated) throw new IllegalArgumentException("Invalid Request");


            if(statusList == null) throw new IllegalArgumentException("Invalid Request");

            for(Status next : statusList) {
                if(next.getStatusId().equals(statusId)) {
                    currSchedule.setStatus(next);
                    break;
                }
            }

            dateScheduleList.set(targetIndex, currSchedule);
            session.setAttribute(JOURNEY_DATE_CACHE, dateScheduleList);

            response.getWriter().println(new Gson().toJson(currSchedule));  
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        finally {
            request.removeAttribute("user_id");
            request.removeAttribute("status_id");
        }
    }
}
