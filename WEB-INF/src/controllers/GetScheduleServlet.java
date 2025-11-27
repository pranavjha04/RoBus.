package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.util.ArrayList;


import models.Operator;
import models.OperatorRoute;
import models.OperatorRouteMidCity;
import models.Schedule;

import com.google.gson.Gson;

@WebServlet("/get_schedule.do")
public class GetScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Missing operator");
            }

            if(request.getParameter("schedule_id") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }   
            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Operator operator = (Operator) session.getAttribute("operator");
            String formattedAttribute = "schedule" + scheduleId;
            
            if(session.getAttribute(formattedAttribute) == null) {
                Schedule schedule = Schedule.getRecord(scheduleId, operator.getOperatorId());

                if(schedule == null) {
                    throw new IllegalArgumentException("Invalid Operation");
                }

                OperatorRoute operatorRoute = schedule.getBusRouteWeekday().getOperatorRoute();
                    int operatorRouteId = operatorRoute.getOperatorRouteId();
                    String currFormattedAttribute = "operator_route_midcities" + operatorRouteId;
                    
                    if(session.getAttribute(currFormattedAttribute) == null) {
                        request.setAttribute("operator_route_id", operatorRouteId);
                        request.getRequestDispatcher("get_operator_route_mid_cities.do").include(request, response);
                        if(session.getAttribute(currFormattedAttribute) == null) {
                            throw new IllegalArgumentException("Invalid Request");
                        }
                        request.removeAttribute("operator_route_id");
                    }

                @SuppressWarnings("unchecked")
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(formattedAttribute);

                operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
                session.setAttribute(formattedAttribute, schedule);
            }
            Schedule schedule = (Schedule) session.getAttribute(formattedAttribute);

            response.getWriter().println(new Gson().toJson(schedule));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}