package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;


import java.io.IOException;

import java.util.ArrayList;

import com.google.gson.Gson;

import models.BusFareFactor;
import models.OperatorTicketFare;
import models.Bus;

@WebServlet("/manage_fare_factor.do")
public class ManageOperatorFareFactorServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }   

        request.getRequestDispatcher("manage_fare_factor.jsp").forward(request, response);
    }
}