package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.Enumeration;

import models.Operator;
import models.BusRouteWeekday;

@WebServlet("/add_bus_route_weekday.do")
public class AddBusRouteWeekdayServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        boolean success = false;
        try {
            if(request.getParameter("weekday") == null || request.getParameter("operator_route_id") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }
            
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            String[] weekdays = request.getParameterValues("weekday");

            success = BusRouteWeekday.addRecord(weekdays, operatorRouteId);
        }
        catch(NumberFormatException e) {
            success = false;
            e.printStackTrace();
        }
        catch(IllegalArgumentException e) {
            success = false;
            e.printStackTrace();
        }       
        response.getWriter().println(success ? "success" : "invalid");
    }
}