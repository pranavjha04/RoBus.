package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.util.ArrayList;

import java.sql.Date;

import models.Operator;
import models.BusRouteWeekday;

import com.google.gson.Gson;


@WebServlet("/get_weekday_route.do")
public class GetWeekdayRouteServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }
        
        try {
            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("[]");
                return;
            }
            int operatorId = operator.getOperatorId();
            
            @SuppressWarnings("deprecation")
            int weekdayId = journeyDate.getDay() + 1;

            ArrayList<BusRouteWeekday> routeWeekdayList = BusRouteWeekday.collectWeekdayAvailableRouteList(weekdayId, operatorId);
            
            if(routeWeekdayList == null) throw new IllegalArgumentException("Invalid Request");
            
            response.getWriter().println(new Gson().toJson(routeWeekdayList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}