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

@WebServlet("/get_journey_date_schedule.do")
public class GetJourneyDateScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");   
            }

            if(request.getParameter("date") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }

            Date journeyDate = Date.valueOf(request.getParameter("date"));
            Operator operator = (Operator) session.getAttribute("operator");

            if(session.getAttribute("date_schedule_list" + journeyDate.toString()) == null) {
                ArrayList<Schedule> list = Schedule.collectDateScheduleRecords(journeyDate, operator.getOperatorId());

                if(list == null) {
                    throw new IllegalArgumentException("Internal Server Error");
                }
                for(Schedule schedule : list) {
                    OperatorRoute operatorRoute = schedule.getBusRouteWeekday().getOperatorRoute();
                    int operatorRouteId = operatorRoute.getOperatorRouteId();
                    String formattedAttribute = "operator_route_midcities" + operatorRouteId;
                    
                    if(session.getAttribute(formattedAttribute) == null) {
                        request.setAttribute("operator_route_id", operatorRouteId);
                        request.getRequestDispatcher("get_operator_route_mid_cities.do").include(request, response);
                        if(session.getAttribute(formattedAttribute) == null) {
                            throw new IllegalArgumentException("Invalid Request");
                        }
                        request.removeAttribute("operator_route_id");
                    }

                    @SuppressWarnings("unchecked")
                    ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(formattedAttribute);

                    operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
                }
                session.setAttribute("date_schedule_list" + journeyDate.toString(), list);
            }

            @SuppressWarnings("unchecked")
            ArrayList<Schedule> dateScheduleList = (ArrayList<Schedule>) session.getAttribute("date_schedule_list" + journeyDate.toString());
            response.getWriter().println(new Gson().toJson(dateScheduleList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    } 
}