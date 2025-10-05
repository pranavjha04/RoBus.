package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;


import java.io.IOException;

import java.util.ArrayList;

import com.google.gson.Gson;

import models.BusFareFactor;
import models.OperatorTicketFare;
import models.Bus;

@WebServlet("/manage_fare_factor.do")
public class ManageOperatorFareFactorServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }   

        request.getRequestDispatcher("manage_fare_factor.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(
            session.getAttribute("operator") == null ||
            request.getParameter("operator_fare_factor_id") == null) {
            response.sendRedirect("/bts");
            return;
        }   

        try {
            Integer operatorTicketFareId = Integer.parseInt("operator_ticket_fare_id");
            ArrayList<BusFareFactor> busList = BusFareFactor.collectAllRecordsWithOperatorTicketFare(operatorTicketFareId); 

            if(busList == null) {
                response.getWriter().println("internal");
                return;
            }

            response.getWriter().println(new Gson().toJson(busList));
            return;
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.sendRedirect("/bts");
            return;
        }
    }
}