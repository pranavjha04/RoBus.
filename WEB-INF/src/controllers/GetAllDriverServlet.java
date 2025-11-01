package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import models.Driver;
import models.Operator;

@WebServlet("/get_all_drivers.do")
public class GetAllDriverServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }   

        System.out.println("hello");
        Operator operator = (Operator) session.getAttribute("operator");
        Integer operatorId = operator.getOperatorId();

        ArrayList<Driver> driverList = Driver.collectRecords(operatorId);
        System.out.println(driverList);
        if(driverList == null) {
            response.getWriter().println("invalid");
            return;
        }

        response.getWriter().println(new Gson().toJson(driverList));
    }
}