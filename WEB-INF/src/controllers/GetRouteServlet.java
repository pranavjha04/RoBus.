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

import models.Route;
import models.RouteMidCity;

@WebServlet("/get_route.do")
public class GetRouteServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null || request.getParameter("source") == null || request.getParameter("destination") == null) {
            response.getWriter().println("invalid");
            return;
        }

        try {

            String source = request.getParameter("source").toLowerCase();
            String destination = request.getParameter("destination").toLowerCase();

            ServletContext context = getServletContext();

            @SuppressWarnings("unchecked")
            ArrayList<Route> routeList = (ArrayList<Route>) context.getAttribute("routes");
            ArrayList<Route> preparRouteList = new ArrayList<>();

            for(Route route : routeList) {
                boolean currSource = route.getSource().getName().toLowerCase().contains(source);
                boolean currDestination = route.getDestination().getName().toLowerCase().contains(destination);

                if(currSource && currDestination) {
                    preparRouteList.add(route);
                }
                else {
                    System.out.println("Route");
                }
            }

            @SuppressWarnings("unchecked")
            ArrayList<RouteMidCity> routeMidCityList = (ArrayList<RouteMidCity>) context.getAttribute("routeMidCities");
            ArrayList<RouteMidCity> prepareRouteMidCityList = new ArrayList<>();

            for(Route route : preparRouteList) {
                int routeId = route.getRouteId();
                for(RouteMidCity routeMidCity : routeMidCityList) {
                    int currRouteId = routeMidCity.getRoute().getRouteId();
                    if(routeId == currRouteId) {
                        System.out.println("yo");
                        prepareRouteMidCityList.add(routeMidCity);
                    }
                    else {
                        System.out.println("yoi");
                    }
                }
            }

            HashMap<String, ArrayList> map = new HashMap<>();

            map.put("routeList", preparRouteList);
            map.put("routeMidCityList", prepareRouteMidCityList);

            response.getWriter().println(new Gson().toJson(map));
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;   
        }
    }
}