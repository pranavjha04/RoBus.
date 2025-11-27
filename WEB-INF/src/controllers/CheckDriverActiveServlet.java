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

@WebServlet("/check_active_driver.do")
public class CheckDriverActiveServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        int driverId = -1;
        boolean isActive = false;
        try {
            if(requestURLPath.equals("update_schedule_driver.do")) {
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
            if(session.getAttribute("activeDriverList") == null) {
                request.getRequestDispatcher("get_active_drivers.do").include(request, response);
                if(session.getAttribute("activeDriverList") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }

            @SuppressWarnings("unchecked")
            ArrayList<Driver> activeDriverList = (ArrayList<Driver>) session.getAttribute("activeDriverList");

            for(Driver driver : activeDriverList) {
                if(driver.getDriverId().equals(driverId)) {
                    isActive = true;
                    break;
                }
            }

            if(!isActive) throw new IllegalArgumentException("Invalid Request");

            if(requestURLPath.equals("update_schedule_driver.do")) {
                request.setAttribute("isValid", true);
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!requestURLPath.equals("update_schedule_driver.do")) {
                response.getWriter().println("invalid");
            }
            else {
                request.setAttribute("isValid", false);
            }
        }
    }
}