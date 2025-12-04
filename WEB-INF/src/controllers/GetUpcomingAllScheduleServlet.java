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

import utils.AppUtil;

@WebServlet("/get_upcoming_schedule.do")
public class GetUpcomingAllScheduleServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {"update_schedule_driver.do", "update_schedule_charges.do", "update_schedule_status.do"};

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");   
            }

            if(request.getParameter("journey_date") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }

            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Operator operator = (Operator) session.getAttribute("operator");

            final String CACHE_ATTRIBUTE = "upcoming_schedule_list" + journeyDate.toString();

            if(session.getAttribute(CACHE_ATTRIBUTE) == null) {
                ArrayList<Schedule> list = Schedule.collectAllScheduleRecords(journeyDate, operator.getOperatorId(), 11);

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
                session.setAttribute(CACHE_ATTRIBUTE, list);
            }

            if(!isIncludeRequest) {
                @SuppressWarnings("unchecked")
                ArrayList<Schedule> list = (ArrayList<Schedule>) session.getAttribute(CACHE_ATTRIBUTE);
                response.getWriter().println(new Gson().toJson(list));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!isIncludeRequest) {
                response.getWriter().println("invalid");
            }
            return;
        }
    } 
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);

        if(isIncludeRequest) {
            doGet(request, response);
        }   
    }
}