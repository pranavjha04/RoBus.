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
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        int driverId = -1;
        boolean isInActive = false;
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
            if(session.getAttribute("inactiveDriverList") == null) {
                request.getRequestDispatcher("get_inactive_drivers.do").include(request, response);
                if(session.getAttribute("inactiveDriverList") == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }

            @SuppressWarnings("unchecked")
            ArrayList<Driver> inactiveDriverList = (ArrayList<Driver>) session.getAttribute("inactiveDriverList");

            for(Driver driver : inactiveDriverList) {
                if(driver.getDriverId().equals(driverId)) {
                    isInActive = true;
                    break;
                }
            }

            if(!isInActive) throw new IllegalArgumentException("Invalid Request");
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