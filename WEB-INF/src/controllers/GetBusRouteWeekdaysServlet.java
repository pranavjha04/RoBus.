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
        String requestURLPath = request.getServletPath().substring(1);

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid  Request");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("[]");
                return;
            }
            
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Integer operatorId = operator.getOperatorId();

            ArrayList<BusRouteWeekday> busRouteWeekdayList = BusRouteWeekday.collectAllRecords(operatorRouteId, operatorId);

            response.getWriter().println(new Gson().toJson(busRouteWeekdayList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!isIncludeRequest) {
                response.getWriter().println("invalid");
            }
            return;
        }
    }
}