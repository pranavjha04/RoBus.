package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.OperatorTicketFare;

@WebServlet("/delete_fare_factor.do")
public class DeleteFareFactorServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(
            session.getAttribute("operator") == null ||
            request.getParameter("operator_ticket_fare_id") == null
        ) {
            response.getWriter().println("invalid");
            return;
        }

        int operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));
        boolean success = OperatorTicketFare.deleteRecord(operatorTicketFareId);

        response.getWriter().println(success == true ? "success" : "internal");
    }
}