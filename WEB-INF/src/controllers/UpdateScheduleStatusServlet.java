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
import models.User;
import models.Booking;

import exceptions.MissingParameterException;


@WebServlet("/update_schedule_status.do")
public class UpdateScheduleStatusServlet extends HttpServlet {
    private static String[] acceptedParametersList = {"schedule_id", "status_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        ServletContext context = getServletContext();

        try {
            int operatorId = -1;
            if(session.getAttribute("user") != null) {
                if(request.getParameter("operator_id") == null) {
                    throw new MissingParameterException();
                }
                else {
                    operatorId = Integer.parseInt(request.getParameter("operator_id"));
                }
            }
            else if(session.getAttribute("operator") != null) {
                Operator operator = (Operator) session.getAttribute("operator");
                if(operator.getStatus().getStatusId().equals(1)) {
                    operatorId = operator.getOperatorId();
                    return;
                }
            }

            if(operatorId == -1) throw new IllegalArgumentException("Invalid Request");

            for(String next : acceptedParametersList) {
                if(request.getParameter(next) == null) {
                    throw new MissingParameterException();
                }
            }


            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Integer statusId = Integer.parseInt(request.getParameter("status_id"));
            Schedule currSchedule = Schedule.getRecord(scheduleId, operatorId);
            if(currSchedule == null) throw new IllegalArgumentException("Invalid Request");

            switch(statusId) {
                case 6 : { // cancelled
                    if(request.getParameter("journey_date") == null || request.getParameter("bus_id") == null) {
                        throw new MissingParameterException();
                    }
                    Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
                    Integer busId = Integer.parseInt(request.getParameter("bus_id"));
                    // cancel tb he kr skte hai jab schedule incoming ho
                    // check if current is not incoming then throw him out
                    if(!currSchedule.getStatus().getStatusId().equals(11)) {
                        throw new IllegalArgumentException("Invalid Schedule");
                    }

                    // driver set to inactive
                    boolean isDriverStatusUpdated = User.updateStatus(currSchedule.getDriver().getUser().getUserId(), 5);
                    if(!isDriverStatusUpdated) throw new IllegalArgumentException("Invalid Request");

                    // uske baad journey ko cancel kardo
                    boolean isScheduleUpdate = Schedule.updateStatus(scheduleId, 6, operatorId);
                    if(!isScheduleUpdate) throw new IllegalArgumentException("Invalid Request");

                    // now jo bookings mei ye jo schedule hai usko cancel kard
                    boolean isBookingStatusUpdated = Booking.updateAllStatusBySchedule(scheduleId, 6);
                    if(!isBookingStatusUpdated) throw new IllegalArgumentException("Internal Server Error");

                    @SuppressWarnings("unchecked")
                    ArrayList<Status> statusList = (ArrayList<Status>) context.getAttribute("statusList");

                    for(Status next : statusList) {
                        if(next.getStatusId().equals(statusId)) {
                            currSchedule.setStatus(next);
                            break;
                        }
                    }

                    response.getWriter().println(new Gson().toJson(currSchedule));
                    break;
                } 
                case 12 : { // ongoing 
                    // check karo ki upcoming nahi hai then throw krdo
                    if(!currSchedule.getStatus().getStatusId().equals(11)) {
                        throw new IllegalArgumentException("Invalid Schedule");
                    }

                    // schedule status update krdo ongoing mei
                    boolean isScheduleUpdate = Schedule.updateStatus(scheduleId, 12, operatorId);
                    if(!isScheduleUpdate) throw new IllegalArgumentException("Invalid Request");

                    // booking status update krdo complete mei
                    boolean isBookingStatusUpdated = Booking.updateAllStatusBySchedule(scheduleId, 13);
                    if(!isBookingStatusUpdated) throw new IllegalArgumentException("Internal Server Error");

                    response.getWriter().println("ok");
                    break;
                } 
                case 13 : { // completed
                    // check karo ki ongoing nahi hai then throw krdo
                    if(!currSchedule.getStatus().getStatusId().equals(12)) {
                        throw new IllegalArgumentException("Invalid Schedule");
                    }

                    // schedule status update krdo complete mei
                    boolean isScheduleUpdate = Schedule.updateStatus(scheduleId, 13, operatorId);
                    if(!isScheduleUpdate) throw new IllegalArgumentException("Invalid Request");

                    // driver set to inactive
                    boolean isDriverStatusUpdated = User.updateStatus(currSchedule.getDriver().getUser().getUserId(), 5);
                    if(!isDriverStatusUpdated) throw new IllegalArgumentException("Invalid Request");

                    response.getWriter().println("ok");
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
        catch(MissingParameterException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    }
}
