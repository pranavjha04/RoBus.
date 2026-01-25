package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;

import models.Operator;
import models.Driver;

@WebServlet("/check_inactive_driver.do")
public class CheckDriverInActiveServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");

        try {
            if(operator.getStatus().getStatusId().equals(2)) {
                throw new IllegalArgumentException("Not Verified");
            }
            if(request.getParameter("driver_id") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            
            int driverId = Integer.parseInt(request.getParameter("driver_id"));
            boolean isInActive = Driver.checkStatus(driverId, 5, operator.getOperatorId());
            
            response.getWriter().println(isInActive ? "ok" : "no");
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    }
}