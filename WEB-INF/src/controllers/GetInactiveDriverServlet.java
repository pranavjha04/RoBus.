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

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/get_inactive_drivers.do")
public class GetInactiveDriverServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestURL = {"add_bus_schedule.do", "check_inactive_driver.do", "update_schedule_driver.do", "update_schedule_status.do"};

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestURL);
        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            if(!operator.getStatus().getStatusId().equals(1)) {
                if(!isIncludeRequest) response.getWriter().println("[]");
                return;
            }

            ArrayList<Driver> driverList = Driver.collectInactiveDrivers(operator.getOperatorId());
            if(driverList == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            if(!isIncludeRequest) response.getWriter().println(new Gson().toJson(driverList)); 
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!isIncludeRequest) {
                response.getWriter().println("invalid");
                return;
            }
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestURL);
        if(session.getAttribute("operator") == null || !isIncludeRequest) {
            response.sendRedirect("/bts");
            return;
        }

        if(isIncludeRequest) {
            doGet(request, response);
        }
    }
}