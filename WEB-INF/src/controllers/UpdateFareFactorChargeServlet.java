package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.OperatorTicketFare;
import models.Operator;

import utils.FieldManager;

@WebServlet("/update_fare_factor_charge.do")
public class UpdateFareFactorChargeServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(
            session.getAttribute("operator") == null ||
            request.getParameter("operator_ticket_fare_id") == null ||
            request.getParameter("charge") == null
        ) {
            response.getWriter().println("invalid");
            return;
        } 

        Operator operator = (Operator) session.getAttribute("operator");
        int operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));
        int newChargeValue = Integer.parseInt(request.getParameter("charge"));

        if(!FieldManager.validateCharge(newChargeValue)) {
            response.getWriter().println("invalid");
            return;
        }
        
        boolean success = OperatorTicketFare.updateCharge(newChargeValue, operatorTicketFareId);

        response.getWriter().println(success == true ? "success" : "internal");
    }
}