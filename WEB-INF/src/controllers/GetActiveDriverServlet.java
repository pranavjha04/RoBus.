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

import com.google.gson.Gson;

@WebServlet("/get_active_drivers.do")
public class GetActiveDriverServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestURL = {"add_bus_schedule.do", "check_active_driver.do", "update_schedule_driver.do"};

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        Operator operator = (Operator) session.getAttribute("operator");
        boolean isIncludeRequest = false;

        for(String next : acceptedIncludeRequestURL) {
            if(requestURLPath.equals(next)) {
                isIncludeRequest = true;
                break;
            }
        }

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            final String CACHE_ATTRIBUTE = "activeDriverList";

            if(session.getAttribute(CACHE_ATTRIBUTE) == null) {
                ArrayList<Driver> driverList = Driver.collectActiveDrivers(operator.getOperatorId());
                if(driverList == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
                else {
                    session.setAttribute(CACHE_ATTRIBUTE, driverList);
                }
            }

            if(!isIncludeRequest) {
                @SuppressWarnings("unchecked")  
                ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute(CACHE_ATTRIBUTE);
                response.getWriter().println(new Gson().toJson(list));   
            }
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

        boolean isIncludeRequest = false;
        for(String next : acceptedIncludeRequestURL) {
            if(requestURLPath.equals(next)) {
                isIncludeRequest = true;
                break;
            }
        }

        if(session.getAttribute("operator") == null || !isIncludeRequest) {
            response.sendRedirect("/bts");
            return;
        }

        if(isIncludeRequest) {
            doGet(request, response);
        }
    }

}