package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;

import models.Operator;
import models.OperatorRouteMidCity;

import utils.FieldManager;

@WebServlet("/update_halting_time.do")
public class UpdateHaltingTimeServlet extends HttpServlet {
    static final String[] acceptedParams = {"operator_route_id", "operator_route_mid_city_id", "halting_time"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
            return;
        }

        try {
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) {
                    throw new IllegalArgumentException("Missing parameter " + next);
                }
            }
            Operator operator = (Operator) session.getAttribute("operator");
            if(!operator.getStatus().getStatusId().equals(1)) {
                throw new IllegalArgumentException("Not verified");
            }
            Integer operatorId = operator.getOperatorId();
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Integer operatorRouteMidCityId = Integer.parseInt(request.getParameter("operator_route_mid_city_id"));
            Integer haltingTime = Integer.parseInt(request.getParameter("halting_time"));

            boolean isHaltingTimeValid = FieldManager.validateHaltingTime(haltingTime);
            if(!isHaltingTimeValid) throw new IllegalArgumentException("Invalid Halting Time");

            boolean isUpdated = OperatorRouteMidCity.updateHaltingTime(operatorRouteId, operatorRouteMidCityId, haltingTime, operatorId);

            if(isUpdated) {
                if(session.getAttribute("operator_route_midcities" + operatorRouteId) != null) {
                    @SuppressWarnings("unchecked")
                    ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute("operator_route_midcities" + operatorRouteId);

                    for(OperatorRouteMidCity next : operatorRouteMidCityList) {
                        if(next.getOperatorRouteMidCityId().equals(operatorRouteMidCityId)) {
                            next.setHaltingTime(haltingTime);
                        }
                    }
                }
            }

            response.getWriter().println(isUpdated ? "success" : "failed");
        }
        catch (IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }

    }
}