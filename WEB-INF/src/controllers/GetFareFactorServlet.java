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
            request.getParameter("onlyFactors") == null ||
            session.getAttribute("operator") == null
        ) {
            response.getWriter().println("invalid");
            return;
        }
        Gson gson = new Gson();
        boolean onlyFactors = request.getParameter("onlyFactors").equals("true") ? true : false;
        boolean isCached = false;

        // cache
        if(onlyFactors && session.getAttribute("onlyFareFactorList") != null) {
            isCached = true;
            System.out.println("39");
            @SuppressWarnings("unchecked")
            ArrayList<OperatorTicketFare> list = (ArrayList<OperatorTicketFare>) session.getAttribute("onlyFareFactorList");
            response.getWriter().println(gson.toJson(list));   
        }

        if(!onlyFactors && session.getAttribute("allFareFactorList") != null) {
            isCached = true;
            System.out.println("47");
            @SuppressWarnings("unchecked")
            ArrayList<OperatorTicketFare> list = (ArrayList<OperatorTicketFare>) session.getAttribute("allFareFactorList");
            response.getWriter().println(gson.toJson(list));    
        }

        if(isCached) {
            System.out.println("51");
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");
        ArrayList<OperatorTicketFare> factors = OperatorTicketFare.getAvailableFareFactors(operator.getOperatorId(), onlyFactors);

        if(factors == null) {
            response.getWriter().println("internal");
            return;
        }
        session.setAttribute(onlyFactors ? "onlyFareFactorList" : "allFareFactorList", factors);
        System.out.println("63");
        response.getWriter().println(gson.toJson(factors));        
    }
}