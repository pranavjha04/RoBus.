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

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        ServletContext context = getServletContext();

        @SuppressWarnings("unchecked")
        ArrayList<Route> routeList = (ArrayList<Route>) context.getAttribute("routes");
        
        @SuppressWarnings("unchecked")
        ArrayList<RouteMidCity> routeMidCityList = (ArrayList<RouteMidCity>) context.getAttribute("routeMidCities");

        HashMap<String, ArrayList> map = new HashMap<>();

        map.put("routeList", routeList);
        map.put("routeMidCityList", routeMidCityList);

        response.getWriter().println(new Gson().toJson(map));
    }
}