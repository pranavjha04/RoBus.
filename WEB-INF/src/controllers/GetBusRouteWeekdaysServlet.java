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

@WebServlet("/get_bus_route_weekday_all.do")
public class GetBusRouteWeekdaysServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        try {
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();
            ArrayList<BusRouteWeekday> busRouteWeekdayList = BusRouteWeekday.collectAllRecords(operatorRouteId, operatorId);
            if(busRouteWeekdayList == null) throw new IllegalArgumentException("Invalid");

            response.getWriter().println(new Gson().toJson(busRouteWeekdayList));
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}