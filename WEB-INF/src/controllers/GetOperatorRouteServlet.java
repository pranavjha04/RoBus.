package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;

import models.Operator;
import models.OperatorRoute;
import models.OperatorRouteMidCity;

import com.google.gson.Gson;

@WebServlet("/get_operator_routes.do")
public class GetOperatorRouteServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Operator operator = (Operator) request.getAttribute("operator");
        HashMap<String, ArrayList> map = new HashMap<>();

        Integer operatorId = operator.getOperatorId();
        // ArrayList<OperatorRoute> operatorRouteList = OperatorRoute.collectRecords(operatorId);
        // ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = OperatorRouteMidCity.collectRecords(operatorId);
        
        // map.put("operatorRouteList", operatorRouteList);
        // map.put("operatorRouteMidCityList", operatorRouteMidCityList);

        response.getWriter().println(new Gson().toJson(map));
    }
}