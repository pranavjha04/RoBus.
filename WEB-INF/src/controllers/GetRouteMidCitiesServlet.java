package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;

import models.RouteMidCity;

@WebServlet("/get_route_mid_cities.do")
public class GetRouteMidCitiesServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        try {
            Integer routeId = Integer.parseInt(request.getParameter("route_id"));
            
            @SuppressWarnings("unchecked")
            ArrayList<RouteMidCity> routeMidCityList = (ArrayList<RouteMidCity>) getServletContext().getAttribute("routeMidCities");

            ArrayList<RouteMidCity> prepareRouteMidCityList = new ArrayList<>();
            for(RouteMidCity midCity : routeMidCityList) {
                if(midCity.getRoute().getRouteId() == routeId) {
                    prepareRouteMidCityList.add(midCity);
                }
            } 

            response.getWriter().println(new Gson().toJson(prepareRouteMidCityList));
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}