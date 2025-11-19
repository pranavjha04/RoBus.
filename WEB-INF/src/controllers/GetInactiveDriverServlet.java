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


@WebServlet("/get_inactive_drivers.do")
public class GetInactiveDriverServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }
        String requestURLPath = request.getServletPath().substring(1);
        Operator operator = (Operator) session.getAttribute("operator");

        if(session.getAttribute("driverList") == null) {
            ArrayList<Driver> driverList = Driver.collectInactiveDrivers(operator.getOperatorId());
            if(driverList == null) {
                if(!requestURLPath.equals("add_bus_schedule.do")) {
                    response.getWriter().println("invalid");   
                    return;
                }
            }
            else {
                session.setAttribute("driverList", driverList);
            }
        }
        
        @SuppressWarnings("unchecked")
        ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute("driverList");

        if(!requestURLPath.equals("add_bus_schedule.do")) {
            response.getWriter().println(new Gson().toJson(list));
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        if(session.getAttribute("operator") == null || !requestURLPath.equals("add_bus_schedule.do")) {
            response.sendRedirect("/bts");
        }
        
        doGet(request, response);
    }

}