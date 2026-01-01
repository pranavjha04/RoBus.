package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;

import java.util.ArrayList;

import models.Operator;
import models.Driver;
import models.User;
import models.Status;

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/update_driver_status.do")
public class UpdateDriverStatusServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestURL = {"add_bus_schedule.do"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestURL);
        Operator operator = (Operator) session.getAttribute("operator");

        try {
            int driverId = -1;
            int statusId = -1;
            Driver driver = null;

            if(isIncludeRequest) {
                if(request.getAttribute("driver_id") == null || request.getAttribute("status_id") == null) throw new IllegalArgumentException("Invalid Request");
                driverId = (Integer) request.getAttribute("driver_id");
                statusId = (Integer) request.getAttribute("status_id");
            }
            else {
                if(request.getParameter("driver_id") == null || request.getParameter("status_id") == null) throw new IllegalArgumentException("Invalid Request");
                driverId = Integer.parseInt(request.getParameter("driver_id"));
                statusId = Integer.parseInt(request.getParameter("status_id"));
            }

        
            if(driver == null) {
                driver = Driver.getRecord(driverId, operator.getOperatorId());
                if(driver == null) throw new IllegalArgumentException("Invalid Request");
            }

            boolean isStatusUpdated = User.updateStatus(driver.getUser().getUserId(), statusId); 
            if(!isStatusUpdated) throw new IllegalArgumentException("Invalid Request");

            if(isIncludeRequest) {
                request.setAttribute("isUpdated", true);
            }    
            else {
                response.getWriter().println("ok");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(isIncludeRequest) {
                request.setAttribute("isUpdated", false);
            }
            else {
                response.getWriter().println("invalid");
            }
        }
    }
}