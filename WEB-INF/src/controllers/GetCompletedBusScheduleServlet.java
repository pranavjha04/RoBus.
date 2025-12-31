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

@WebServlet("/get_completed_bus_schedule.do")
public class GetCompletedBusScheduleServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {"update_schedule_driver.do", "update_schedule_charges.do", "update_schedule_status.do", "check_valid_schedule_timings.do"};

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);

        try {
            int busId = -1;
            
            if(isIncludeRequest) {
                if(request.getAttribute("bus_id") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
                busId = (Integer) request.getAttribute("bus_id");
            }
            else {
                if(request.getParameter("bus_id") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
                busId = Integer.parseInt(request.getParameter("bus_id"));
            }
            if(busId == -1) throw new IllegalArgumentException("Invalid Request");

            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Date currDate = new Date(System.currentTimeMillis());

            boolean isBefore = journeyDate.toLocalDate().isBefore(currDate.toLocalDate());
            Operator operator = (Operator) session.getAttribute("operator");

            final String CACHE_ATTRIBUTE = "completed" + busId + "schedule_list" + journeyDate.toString();
            ArrayList<Schedule> scheduleList = null;

            if(isBefore) {
                if(session.getAttribute(CACHE_ATTRIBUTE) != null) {
                    @SuppressWarnings("unchecked")
                    ArrayList<Schedule> list = (ArrayList<Schedule>) session.getAttribute(CACHE_ATTRIBUTE);
                    scheduleList = list;
                    
                    if(!isIncludeRequest) response.getWriter().println(new Gson().toJson(scheduleList));
                    return;
                }
            }

            if(scheduleList == null) {
                scheduleList = Schedule.collectBusScheduleRecords(journeyDate, busId, operator.getOperatorId(), 13);
                if(scheduleList == null) throw new IllegalArgumentException("Internal Server Error");
            }

            for(Schedule schedule : scheduleList) {
                OperatorRoute operatorRoute = schedule.getBusRouteWeekday().getOperatorRoute();
                int operatorRouteId = operatorRoute.getOperatorRouteId();
                    String formattedAttribute = "operator_route_midcities" + operatorRouteId;
                    
                if(session.getAttribute(formattedAttribute) == null) {
                    request.setAttribute("operator_route_id", operatorRouteId);
                    request.getRequestDispatcher("get_operator_route_mid_cities.do").include(request, response);
                    if(session.getAttribute(formattedAttribute) == null) {
                        throw new IllegalArgumentException("Invalid Request");
                    }
                }

                @SuppressWarnings("unchecked")
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(formattedAttribute);

                operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
            }
            if(isBefore) session.setAttribute(CACHE_ATTRIBUTE, scheduleList);
            if(!isIncludeRequest) {
                response.getWriter().println(new Gson().toJson(scheduleList));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!isIncludeRequest) {
                response.getWriter().println("invalid");
            }
            return;
        }
        finally {
            request.removeAttribute("operator_route_id");
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