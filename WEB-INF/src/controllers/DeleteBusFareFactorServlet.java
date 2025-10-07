package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.BusFareFactor;

@WebServlet("/delete_bus_fare_factor.do")
public class DeleteBusFareFactorServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }
        if(
            request.getParameter("bus_id") == null ||
            request.getParameter("bus_fare_factor_id") == null ||
            request.getParameter("operator_ticket_fare_id") == null 
        ) {
            response.getWriter().println("invalid");
            return;
        }

        try {
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Integer busFareFactorId = Integer.parseInt(request.getParameter("bus_fare_factor_id"));
            Integer operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));

            Boolean success = BusFareFactor.deleteRecord(busId, busFareFactorId, operatorTicketFareId);

            response.getWriter().println(success ? "success" : "internal");
        } 
        catch(NumberFormatException e) {
            response.getWriter().println("invalid");
            e.printStackTrace();
            return;
        }
    }
}