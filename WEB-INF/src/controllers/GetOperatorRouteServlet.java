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

        // cache it
        if(session.getAttribute("routeMap") != null) {
            @SuppressWarnings("unchecked")
            HashMap<String, ArrayList> routeMap = (HashMap<String, ArrayList>) session.getAttribute("routeMap");
            response.getWriter().println(new Gson().toJson(routeMap));
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");
        HashMap<String, ArrayList> routeMap = new HashMap<>();

        Integer operatorId = operator.getOperatorId();
        ArrayList<OperatorRoute> operatorRouteList = OperatorRoute.collectAllRecords(operatorId);
        ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = OperatorRouteMidCity.collectAllRecords(operatorId);
        
        routeMap.put("operatorRouteList", operatorRouteList);
        routeMap.put("operatorRouteMidCityList", operatorRouteMidCityList);

        session.setAttribute("routeMap", routeMap);

        response.getWriter().println(new Gson().toJson(routeMap));
    }
}