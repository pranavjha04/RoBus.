package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.Enumeration;
import java.util.ArrayList;
import java.util.List;

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

        try {
            int operatorTicketFareId = Integer.parseInt(request.getParameter("operator_ticket_fare_id"));
            boolean success = OperatorTicketFare.deleteRecord(operatorTicketFareId);

            if(success) {
                Enumeration<String> allAttributes = session.getAttributeNames();
                List<String> toRemove = new ArrayList<>();

                while (allAttributes.hasMoreElements()) {
                    String attributeName = allAttributes.nextElement();
                    if (attributeName.startsWith("bus_fare_factor_list")) {
                        toRemove.add(attributeName);
                    }
                }
                for (String name : toRemove) {
                    session.removeAttribute(name);
                }

                response.getWriter().println("success");
            }
            else {
                throw new IllegalArgumentException("Invalid Request");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    }
}