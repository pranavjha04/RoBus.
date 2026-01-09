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

@WebServlet("/check_active_driver.do")
public class CheckDriverActiveServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {"add_bus_schedule.do"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);
        Operator operator = (Operator) session.getAttribute("operator");
        int driverId = -1;
        boolean isActive = false;

        try {
            if(!operator.getStatus().getStatusId().equals(1)) {
                throw new IllegalArgumentException("Not verified");
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
            if(session.getAttribute("activeDriverList") != null) {
                @SuppressWarnings("unchecked")
                ArrayList<Driver> activeDriverList = (ArrayList<Driver>) session.getAttribute("activeDriverList");
                for(Driver driver : activeDriverList) {
                    if(driver.getDriverId().equals(driverId)) {
                        isActive = true;
                        break;
                    }
                }
            }
            else {
                isActive = Driver.checkStatus(driverId, 4, operator.getOperatorId());
            }

            if(isIncludeRequest) {
                request.setAttribute("isActive", isActive);
            }
            else {
                response.getWriter().println("ok");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(isIncludeRequest) {
                request.setAttribute("isActive", false);
            }
            else {
                response.getWriter().println("invalid");
            }
        }
    }
}