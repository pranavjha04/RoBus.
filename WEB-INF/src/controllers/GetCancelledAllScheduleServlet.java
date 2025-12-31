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

@WebServlet("/get_cancelled_schedule.do")
public class GetCancelledAllScheduleServlet extends HttpServlet {
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
            Date currDate = new Date(System.currentTimeMillis());
            Operator operator = (Operator) session.getAttribute("operator");

            ArrayList<Schedule> scheduleList = null;
            
            final String CACHE_ATTRIBUTE = "cancelled_schedule_list" + journeyDate.toString();
            boolean isBefore = journeyDate.toLocalDate().isBefore(currDate.toLocalDate());

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
                scheduleList = Schedule.collectAllScheduleRecords(journeyDate, operator.getOperatorId(), 6);
                if(scheduleList == null) throw new IllegalArgumentException("Internal Server Error");
            }
 
            for(Schedule next : scheduleList) {
                OperatorRoute operatorRoute = next.getBusRouteWeekday().getOperatorRoute();

                int operatorRouteId = operatorRoute.getOperatorRouteId();
                String OPERATOR_MID_CITY_CACHE = "operator_route_midcities_" + operatorRouteId;

                if(session.getAttribute(OPERATOR_MID_CITY_CACHE) == null) {
                    ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = 
                                    OperatorRouteMidCity.collectAllRecords(
                                        operatorRouteId,
                                        operator.getOperatorId()
                    );
                        
                    if(operatorRouteMidCityList == null) throw new IllegalArgumentException("Invalid Request");
                        
                    session.setAttribute(OPERATOR_MID_CITY_CACHE, operatorRouteMidCityList);
                }
                @SuppressWarnings("unchecked")
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(OPERATOR_MID_CITY_CACHE);

                operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
            }

            if(isBefore) session.setAttribute(CACHE_ATTRIBUTE, scheduleList);
            if(!isIncludeRequest) response.getWriter().println(new Gson().toJson(scheduleList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!isIncludeRequest) {
                response.getWriter().println("invalid");
            }
            return;
        }
        catch(Exception e) {
            e.printStackTrace();
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