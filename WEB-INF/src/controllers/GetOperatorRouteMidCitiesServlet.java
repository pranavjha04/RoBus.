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

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/get_operator_route_mid_cities.do")
public class GetOperatorRouteMidCitiesServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {
        "get_upcoming_schedule.do", "get_upcoming_bus_schedule.do",
        "get_ongoing_schedule.do", "get_ongoing_bus_schedule.do",
        "get_completed_schedule.do", "get_completed_bus_schedule.do",
        "get_cancelled_schedule.do", "get_cancelled_bus_schedule.do",
        "get_schedule.do"
    };
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);
        Operator operator = (Operator) session.getAttribute("operator");
        if(!operator.getStatus().getStatusId().equals(1)) {
            if(!isIncludeRequest) response.getWriter().println("[]");
            return;
        }
        try {
            if(session.getAttribute("operator") == null && !requestURLPath.equals("get_schedule.do")) {
                throw new IllegalArgumentException("Invalid Request");
            }
            Integer operatorId = operator.getOperatorId();
            Integer operatorRouteId = 0;
            if(isIncludeRequest) {
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
            if(!isIncludeRequest) {
                @SuppressWarnings("unchecked")
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList = (ArrayList<OperatorRouteMidCity>) session.getAttribute(formattedAttribute);
                response.getWriter().println(new Gson().toJson(operatorRouteMidCityList));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!isIncludeRequest) {
                response.getWriter().println("invalid");
            }
            return;
        }
    }
}