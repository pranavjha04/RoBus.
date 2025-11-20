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
            int weekdayId = Integer.parseInt(request.getParameter("weekday_id"));
            Operator operator = (Operator) session.getAttribute("operator");
            int operatorId = operator.getOperatorId();
            ArrayList<BusRouteWeekday> routeWeekdayList = BusRouteWeekday.collectWeekdayAvailableRouteList(weekdayId, operatorId);

            if(routeWeekdayList == null) {
                response.getWriter().println("invalid");
                return;
            }

            response.getWriter().println(new Gson().toJson(routeWeekdayList));
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}