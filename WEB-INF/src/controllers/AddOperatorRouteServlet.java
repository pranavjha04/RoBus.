package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.Operator;
import models.OperatorRoute;
import models.OperatorRouteMidCity;

import utils.FieldManager;

@WebServlet("/add_operator_route.do")
public class AddOperatorRouteServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        try {
            if(
                session.getAttribute("operator") == null ||
                request.getParameter("route_id") == null
            ) {
                throw new IllegalArgumentException("Invalid Request");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                throw new IllegalArgumentException("Not verified");
            }
            
            Integer operatorId = operator.getOperatorId();
            Integer routeId = Integer.parseInt(request.getParameter("route_id"));
            
            Integer generatedOperatorRouteId = OperatorRoute.addRecord(operatorId, routeId);

            if(generatedOperatorRouteId == -1) {
                response.getWriter().println("internal");
                return;
            }

            String[] routeMidCities = request.getParameterValues(("route_midcity_halting"));

            if(routeMidCities != null) {
                for(String midCity: routeMidCities) {
                    String[] currValue = midCity.split("-");
                    
                    Integer routeMidCityId = Integer.parseInt(currValue[1]);
                    Integer haltingTime = Integer.parseInt(currValue[2]);

                    if(!FieldManager.validateHaltingTime(haltingTime)) {
                        response.getWriter().println("invalid");
                        return;
                    }
                    Boolean success = OperatorRouteMidCity.addRecord(generatedOperatorRouteId, routeMidCityId, haltingTime);
                    response.getWriter().println(success ? "success" : "internal");
                }
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
   
    }
}