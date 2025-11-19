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
        if(requestURLPath.equals("add_bus_schedule.do")) {
            session.removeAttribute("driverList");
        }

        Operator operator = (Operator) session.getAttribute("operator");
        ArrayList<Driver> driverList = Driver.collectInactiveDrivers(operator.getOperatorId());
        if(driverList == null) {
            if(!requestURLPath.equals("add_bus_schedule.do")) {
                response.getWriter().println("invalid");   
            }
            return;
        }

        if(requestURLPath.equals("add_bus_schedule.do")) {
            session.setAttribute("driverList", driverList);         
        }
        else  {
            response.getWriter().println(new Gson().toJson(driverList));
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        doGet(request, response);
    }

}