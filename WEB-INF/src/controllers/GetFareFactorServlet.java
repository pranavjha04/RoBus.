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

        if(request.getAttribute("id") == null) {
            System.out.println("1");
            return;
        }

        if(request.getAttribute("wantAll") == null) {
            System.out.println("2");
            return;
        }

        if(session.getAttribute("operator") == null) {
            System.out.println("3");
            return;
        }

        // if(
        //     request.getAttribute("operator_id") == null || 
        //     request.getAttribute("wantAll") == null ||  
        //     session.getAttribute("operator") == null
        // ) {
        //     System.out.println("yoo");
        //     response.getWriter().println("invalid");
        //     return;
        // }
        
        Integer operatorId = (Integer) request.getAttribute("operator_id");
        Boolean wantAll = (Boolean) request.getAttribute("wantAll");
        Operator operator = (Operator) session.getAttribute("operator");
        
        if(operator.getOperatorId() != operatorId) {
            System.out.println("heii");
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