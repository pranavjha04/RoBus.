package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldManager;

import models.Bus;

@WebServlet("/check_bus_number_exist.do")
public class CheckBusNumberExistServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String busNumber = request.getParameter("bus_number");
        if(busNumber == null || !FieldManager.validateBusNumber(busNumber)) {
            response.getWriter().println("Invalid");
            return;
        }

        boolean isExist = Bus.checkBusNumberExist(busNumber);
        response.getWriter().println(isExist);
    }
}