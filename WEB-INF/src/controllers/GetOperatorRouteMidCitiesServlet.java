package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import models.Operator;
import models.OperatorRouteMidCity;

import com.google.gson.Gson;

@WebServlet("/get_operator_route_mid_cities.do")
public class GetOperatorRouteMidCitiesServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null || request.getParameter("operator_route_id") == null) {
            response.getWriter().println("invalid");
            return;
        }
        
        try {
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = OperatorRouteMidCity.collectAllRecords(operatorRouteId, operatorId);
            response.getWriter().println(new Gson().toJson(operatorRouteMidCityList));
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}