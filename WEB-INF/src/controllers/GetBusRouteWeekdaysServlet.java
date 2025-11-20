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
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();

            if(session.getAttribute("bus_route_weekday_list" + operatorRouteId) == null) {
                ArrayList<BusRouteWeekday> busRouteWeekdayList = BusRouteWeekday.collectAllRecords(operatorRouteId, operatorId);
                
                if(busRouteWeekdayList == null) throw new IllegalArgumentException("Invalid");
                session.setAttribute("bus_route_weekday_list" + operatorRouteId, busRouteWeekdayList);
            }

            if(!requestURLPath.equals("add_bus_schedule.do")) {
                @SuppressWarnings("unchecked")
                ArrayList<BusRouteWeekday> list = (ArrayList<BusRouteWeekday>) session.getAttribute("bus_route_weekday_list" + operatorRouteId);
                response.getWriter().println(new Gson().toJson(list));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!requestURLPath.equals("add_bus_schedule.do")) {
                response.getWriter().println("invalid");
            }
            return;
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        if(session.getAttribute("operator") == null || !requestURLPath.equals("add_bus_schedule.do")) {
            response.sendRedirect("/bts");
        }
        
        doGet(request, response);
    }
}