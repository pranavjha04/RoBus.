package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.OperatorTicketFare;
import models.Operator;

import utils.FieldManager;

@WebServlet("/add_operator_ticket_fare.do")
public class AddOperatorTicketFareServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

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
        
        Operator operator = (Operator) session.getAttribute("operator");

        boolean success = OperatorTicketFare.addRecord(fareFactorId, charge, operator.getOperatorId());

        // clear cache
        if(success) {
            session.removeAttribute("allFareFactorList");
            session.removeAttribute("onlyFareFactorList");
            session.removeAttribute("allOperatorTicketFareList");
        }
        
        response.getWriter().println(success ? "success" : "internal");
    }
}