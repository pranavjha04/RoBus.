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
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        String requestURLPath = request.getServletPath().substring(1);
        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();
            Integer operatorRouteId = 0;
            if(requestURLPath.equals("get_journey_date_schedule.do") || requestURLPath.equals("get_bus_journey_date_schedule.do") || requestURLPath.equals("get_schedule.do")) {
                operatorRouteId = (Integer) request.getAttribute("operator_route_id");
            }
            else {
                operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            }
            String formattedAttribute = "operator_route_midcities" + operatorRouteId;

            if(session.getAttribute(formattedAttribute) == null) {
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = OperatorRouteMidCity.collectAllRecords(operatorRouteId, operatorId);

                if(operatorRouteMidCityList == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }
                session.setAttribute(formattedAttribute, operatorRouteMidCityList);
            }
            if(!requestURLPath.equals("get_journey_date_schedule.do") && !requestURLPath.equals("get_bus_journey_date_schedule.do") && !requestURLPath.equals("get_schedule.do")) {
                @SuppressWarnings("unchecked")
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(formattedAttribute);
                response.getWriter().println(new Gson().toJson(operatorRouteMidCityList));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!requestURLPath.equals("get_journey_date_schedule.do") && !requestURLPath.equals("get_bus_journey_date_schedule.do") && !requestURLPath.equals("get_schedule.do")) {
                response.getWriter().println("invalid");
            }
            return;
        }
    }
}