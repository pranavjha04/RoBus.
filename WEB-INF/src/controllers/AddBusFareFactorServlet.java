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
import models.BusFareFactor;

@WebServlet("/add_bus_fare_factor.do")
public class AddBusFareFactorServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        Enumeration<String> params = request.getParameterNames();
        while(params.hasMoreElements()) {
            String next = params.nextElement();
            if(request.getParameter(next) == null) {
                response.getWriter().println("invalid");
                return;
            }
        }

        Operator operator = (Operator) session.getAttribute("operator");
        int operatorId = operator.getOperatorId();

        int operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));
        String[] busIdList = request.getParameterValues("bus_id");

        boolean success = BusFareFactor.addMultipleRecords(busIdList, operatorTicketFareId);

        response.getWriter().println(success ? "success" : "internal");
    }
}