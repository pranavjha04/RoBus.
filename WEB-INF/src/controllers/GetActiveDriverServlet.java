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
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }
        String requestURLPath = request.getServletPath().substring(1);
        Operator operator = (Operator) session.getAttribute("operator");

        if(session.getAttribute("activeDriverList") == null) {
            ArrayList<Driver> driverList = Driver.collectActiveDrivers(operator.getOperatorId());
            if(driverList == null) {
                if(!requestURLPath.equals("check_active_driver.do")) {
                    response.getWriter().println("invalid");   
                    return;
                }
            }
            else {
                session.setAttribute("activeDriverList", driverList);
            }
        }
        

        if(!requestURLPath.equals("check_active_driver.do")) {
            @SuppressWarnings("unchecked")
            ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute("activeDriverList");
            response.getWriter().println(new Gson().toJson(list));
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
        }

        if(requestURLPath.equals("check_active_driver.do")) {
            doGet(request, response);
        }
        else {
            response.sendRedirect("/bts");
        }
    }

}