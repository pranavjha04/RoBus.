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

import models.Operator;
import models.OperatorTicketFare;


@WebServlet("/get_fare_factor.do")
public class GetFareFactorServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(
            request.getParameter("id") == null || 
            request.getParameter("wantAll") == null ||  
            session.getAttribute("operator") == null
        ) {
            response.getWriter().println("invalid");
            return;
        }

        Integer operatorId = Integer.parseInt(request.getParameter("id"));
        boolean wantAll = request.getParameter("wantAll").equals("true") ? true : false;
        Operator operator = (Operator) session.getAttribute("operator");

        System.out.println(operatorId);
        System.out.println(wantAll);
        System.out.println(operator);

        if(operator.getOperatorId() != operatorId) {
            response.getWriter().println("invalid");
            return;
        }

        boolean wantAllRecords = false;
        if(wantAll == true) {
            wantAllRecords = true;
        }

        ArrayList<OperatorTicketFare> factors = OperatorTicketFare.getAvailableFareFactors(operatorId, wantAllRecords);

        response.getWriter().println(new Gson().toJson(factors));        
    }
}