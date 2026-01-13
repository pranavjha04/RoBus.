package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;

import java.io.IOException;
import java.util.ArrayList;


import models.Operator;
import models.BusRouteWeekday;

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/get_bus_route_weekday_all.do")
public class GetBusRouteWeekdaysServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {"update_schedule_charges.do", "add_bus_schedule.do"};

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);
        ServletContext context = getServletContext();

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

            if(context.getAttribute("bus_route_weekday_list" + operatorRouteId) == null) {
                ArrayList<BusRouteWeekday> busRouteWeekdayList = BusRouteWeekday.collectAllRecords(operatorRouteId, operatorId);
                
                if(busRouteWeekdayList == null) throw new IllegalArgumentException("Invalid");
                context.setAttribute("bus_route_weekday_list" + operatorRouteId, busRouteWeekdayList);
            }

            if(!isIncludeRequest) {
                @SuppressWarnings("unchecked")
                ArrayList<BusRouteWeekday> list = (ArrayList<BusRouteWeekday>) context.getAttribute("bus_route_weekday_list" + operatorRouteId);
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
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
        }
        if(isIncludeRequest) {
            doGet(request, response);
        }
    }
}