package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.util.Enumeration;
import java.util.ArrayList;


import models.Operator;
import models.Bus;

import com.google.gson.Gson;

@WebServlet("/get_available_ticket_fare_bus.do")
public class GetAvailableTicketFareBusServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        Enumeration<String> params = request.getParameterNames();
        while(params.hasMoreElements()) {
            if(request.getParameter(params.nextElement()) == null) {
                response.getWriter().println("invalid");
                return;
            } 
        }

        Operator operator = (Operator) session.getAttribute("operator");
        int operatorId = operator.getOperatorId();
        String[] busIdList = request.getParameterValues("bus_id");
        int operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));

        ArrayList<Bus> busList = Bus.collectAvailableTicketFareBusRecords(operatorTicketFareId, busIdList, operatorId);

        System.out.println(busList);

        if(busList == null) {
            response.getWriter().println("internal");
            return;
        }

        response.getWriter().println(new Gson().toJson(busList));
    }
}