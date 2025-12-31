package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import java.sql.Date;

import com.google.gson.Gson;

import exceptions.MissingParameterException;

import models.Schedule;
import models.User;
import models.OperatorRoute;
import models.OperatorRouteMidCity;

@WebServlet("/get_driver_schedule.do")
public class GetDriverScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.getWriter().println("invalid");
            return;
        }

        User user = (User) session.getAttribute("user");
        ServletContext context = getServletContext();
        try {
            if(!user.getUserType().getUserTypeId().equals(3) || request.getParameter("journey_date") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Date currDate = new Date(System.currentTimeMillis());

            ArrayList<Schedule> scheduleList = null;
            boolean isBefore = journeyDate.toLocalDate().isBefore(currDate.toLocalDate());
            String CACHE_ATTRIBUTE = "schedule" + journeyDate;

            if(isBefore) {
                if(session.getAttribute(CACHE_ATTRIBUTE) != null) {
                    @SuppressWarnings("unchecked")
                    ArrayList<Schedule> list = (ArrayList<Schedule>) session.getAttribute(CACHE_ATTRIBUTE);
                    scheduleList = list;
                    response.getWriter().println(scheduleList);
                    return;
                }
            }

            if(scheduleList == null) {
                scheduleList = Schedule.getSchedulesByDriverUser(user.getUserId(), journeyDate);
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
                                        next.getBus().getOperator().getOperatorId()
                    );
                        
                    if(operatorRouteMidCityList == null) throw new IllegalArgumentException("Invalid Request");
                        
                    session.setAttribute(OPERATOR_MID_CITY_CACHE, operatorRouteMidCityList);
                }
                @SuppressWarnings("unchecked")
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(OPERATOR_MID_CITY_CACHE);

                operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
            }

            if(isBefore) session.setAttribute(CACHE_ATTRIBUTE, scheduleList);
            response.getWriter().println(new Gson().toJson(scheduleList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}