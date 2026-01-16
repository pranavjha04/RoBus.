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

import utils.AppUtil;

@WebServlet("/check_inactive_driver.do")
public class CheckDriverInActiveServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {"add_bus_schedule.do"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);
        Operator operator = (Operator) session.getAttribute("operator");
        int driverId = -1;

        try {
            if(operator.getStatus().getStatusId().equals(2)) {
                throw new IllegalArgumentException("Not Verified");
            }
            if(isIncludeRequest) {
                if(request.getAttribute("driver_id") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
                else {
                    driverId = (Integer) request.getAttribute("driver_id");
                }
            }
            else {
                if(request.getParameter("driver_id") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
                else {
                    driverId = Integer.parseInt(request.getParameter("driver_id"));
                }
            }

            if(driverId == -1) {
                throw new IllegalArgumentException("Invalid Request");
            }
            boolean isInActive = Driver.checkStatus(driverId, 5, operator.getOperatorId());
            
            if(isIncludeRequest) {
                request.setAttribute("isInActive", isInActive);
            }
            else {
                response.getWriter().println("ok");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(isIncludeRequest) {
                request.setAttribute("isInActive", false);
            }
            else {
                response.getWriter().println("invalid");
            }
        }
    }
}