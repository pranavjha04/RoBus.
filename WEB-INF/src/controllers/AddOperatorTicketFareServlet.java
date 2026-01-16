package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Enumeration;

import models.OperatorTicketFare;
import models.Operator;
import models.BusFareFactor;

import utils.FieldManager;

@WebServlet("/add_operator_ticket_fare.do")
public class AddOperatorTicketFareServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        Operator operator = (Operator) session.getAttribute("operator");
        if(operator.getStatus().getStatusId().equals(2)) {
            response.getWriter().println("internal");
            return;
        }

        if(
            session.getAttribute("operator") == null ||
            request.getParameter("charge") == null ||
            request.getParameter("fare_factor_id") == null
        ) {
            response.getWriter().println("invalid");
            return; 
        }

        Integer charge = Integer.parseInt(request.getParameter("charge"));

        if(!FieldManager.validateCharge(charge)) {
            response.getWriter().println("1");
            return;
        }

        Integer fareFactorId = Integer.parseInt(request.getParameter("fare_factor_id"));
        
        boolean success = OperatorTicketFare.addRecord(fareFactorId, charge, operator.getOperatorId());
        response.getWriter().println(success ? "success" : "internal");
    }
}