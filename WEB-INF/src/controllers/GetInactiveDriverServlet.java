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

        Operator operator = (Operator) session.getAttribute("operator");
        ArrayList<Driver> driverList = Driver.collectInactiveDrivers(operator.getOperatorId());
        if(driverList == null) {
            response.getWriter().println("invalid");
            return;
        }

        System.out.println(driverList);
        
        response.getWriter().println(new Gson().toJson(driverList));
    }
}