package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import models.RouteMidCity;

@WebServlet("/add_operator_route_mid_city.do")
public class AddOperatorRouteMidCityServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        if(
            request.getParameter("route_id") == null || 
            request.getParameter("operator_route_id") == null || 
            request.getParameter("mid_city") == null)
        {
            response.getWriter().println("invalid");
            return;
        }

        try {
            Integer routeId = Integer.parseInt(request.getParameter("route_id"));
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));

            String[] midCities = request.getParameterValues("mid_city");

            ArrayList<int[]> formattedMidCities = new ArrayList<>();

            for(String next : midCities) {
                String[] splittedForm = next.split("-");
                int routeMidCityId = Integer.parseInt(splittedForm[0]);
                int haltingTime = Integer.parseInt(splittedForm[1]);

                formattedMidCities.add(new int[]{routeMidCityId, haltingTime});
            }

            boolean success = RouteMidCity.addRecords(routeId, operatorRouteId, formattedMidCities);

            response.getWriter().println(success ? "success" : "internal");
            return;
        }
        catch(NumberFormatException e) {
            response.getWriter().println("invalid");
            e.printStackTrace();
            return;
        }
    }
}     