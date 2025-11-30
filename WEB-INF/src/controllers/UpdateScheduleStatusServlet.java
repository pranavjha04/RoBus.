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
import models.Schedule;
import models.Status;


@WebServlet("/update_schedule_status.do")
public class UpdateScheduleStatusServlet extends HttpServlet {
    private String[] acceptedParametersList = {"date", "schedule_id", "status_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }   
        String requestURLPath = request.getServletPath().substring(1);

        try {
           for(String next : acceptedParametersList) {
                if(request.getParameter(next) == null) throw new IllegalArgumentException("Invalid Request");
           }    

           Operator operator = (Operator) session.getAttribute("operator");
           Date journeyDate = Date.valueOf(request.getParameter("date"));
           Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
           Integer statusId = Integer.parseInt(request.getParameter("status_id"));
           Schedule currSchedule = null;
           final String JOURNEY_DATE_CACHE = "date_schedule_list" + journeyDate.toString();

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

            boolean isUpdated = Schedule.updateStatus(scheduleId, statusId, operator.getOperatorId());
            if(!isUpdated) throw new IllegalArgumentException("Invalid Request");

            @SuppressWarnings("unchecked")
            ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

            if(statusList == null) throw new IllegalArgumentException("Invalid Request");

            for(Status next : statusList) {
                if(next.getStatusId().equals(statusId)) {
                    currSchedule.setStatus(next);
                    break;
                }
            }
            System.out.println(new Gson().toJson(currSchedule));
            // response.getWriter().println(new Gson().toJson(currSchedule));   
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}
