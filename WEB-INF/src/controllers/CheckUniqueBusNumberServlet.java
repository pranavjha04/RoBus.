package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldManager;

import models.Bus;

@WebServlet("/check_unique_bus_number.do")
public class CheckUniqueBusNumberServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String busNumber = request.getParameter("bus_number");
        if(busNumber == null || !FieldManager.validateBusNumber(busNumber)) {
            response.getWriter().println("Internal server error");
            return;
        }

        boolean isUnique = Bus.checkUniqueBusNumber(busNumber);
        response.getWriter().println(isUnique);
    }
}