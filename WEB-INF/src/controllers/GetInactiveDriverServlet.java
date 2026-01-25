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
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("[]");
                return;
            }

            ArrayList<Driver> driverList = Driver.collectInactiveDrivers(operator.getOperatorId());
            if(driverList == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            response.getWriter().println(new Gson().toJson(driverList)); 
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    }
}