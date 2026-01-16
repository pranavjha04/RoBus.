package controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import java.sql.Date;

import com.google.gson.Gson;

import models.Schedule;
import models.Operator;
import models.OperatorRoute;
import models.OperatorRouteMidCity;

@WebServlet("/get_completed_schedule.do")
public class GetCompletedAllScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");   
            }

            if(request.getParameter("journey_date") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }

            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("[]");
                return;
            }

            ArrayList<Schedule> scheduleList = Schedule.collectAllScheduleRecords(journeyDate, operator.getOperatorId(), 13);
            if(scheduleList == null) throw new IllegalArgumentException("Internal Server Error");
 
            for(Schedule next : scheduleList) {
                OperatorRoute operatorRoute = next.getBusRouteWeekday().getOperatorRoute();

                int operatorRouteId = operatorRoute.getOperatorRouteId();
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = 
                        OperatorRouteMidCity.collectAllRecords(
                        operatorRouteId,
                        operator.getOperatorId()
                );
                operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
            }

            response.getWriter().println(new Gson().toJson(scheduleList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(Exception e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    } 
}