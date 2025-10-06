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

@WebServlet("/get_operator_ticket_fare_bus.do")
public class GetOperatorTicketFareBusServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(
            session.getAttribute("operator") == null) {
            System.out.println("Hello"+28);
            response.sendRedirect("/bts");
            return;
        }   

        try {
            Integer operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));
            ArrayList<BusFareFactor> busList = BusFareFactor.collectAllRecordsWithOperatorTicketFare(operatorTicketFareId); 
            System.out.println("Hello"+28);

            if(busList == null) {
                response.getWriter().println("internal");
                System.out.println("Hello"+28);
                return;
            }

            response.getWriter().println(new Gson().toJson(busList));
            System.out.println("Hello"+28);
            return;
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            System.out.println("Hello"+28);
            return;
        }
    }
}