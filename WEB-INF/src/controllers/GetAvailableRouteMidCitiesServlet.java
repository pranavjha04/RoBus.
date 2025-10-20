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
import models.RouteMidCity;
import models.OperatorRoute;
import models.OperatorRouteMidCity;

import com.google.gson.Gson;

@WebServlet("/get_available_route_mid_cities.do")
public class GetAvailableRouteMidCitiesServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        if(request.getParameter("route_id") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Integer routeId = Integer.parseInt(request.getParameter("route_id"));

        @SuppressWarnings("unchecked")
        ArrayList<RouteMidCity> routeMidCityList = (ArrayList<RouteMidCity>) getServletContext().getAttribute("routeMidCities");
        ArrayList<RouteMidCity> availableMidCityList = new ArrayList<>();

        for(RouteMidCity midCity : routeMidCityList) {
            if(midCity.getRoute().getRouteId() == routeId) {
                availableMidCityList.add(midCity);
            }
        } 

        response.getWriter().println(new Gson().toJson(availableMidCityList));
    }
}