package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldManager;

import models.Bus;
import models.Operator;

@WebServlet("/check_bus_number_exist.do")
public class CheckBusNumberExistServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        try {
            String busNumber = request.getParameter("bus_number");
            if(session.getAttribute("operator") == null || busNumber == null || !FieldManager.validateBusNumber(busNumber)) {
               throw new IllegalArgumentException("Missing Arguments");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            if(!operator.getStatus().getStatusId().equals(1)) {
                throw new IllegalArgumentException("Not Verified");
            }

            boolean isExist = Bus.checkBusNumberExist(busNumber);
            response.getWriter().println(isExist);
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("Invalid");
        }
    }
}