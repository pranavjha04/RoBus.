package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.util.ArrayList;

import models.City;

import com.google.gson.Gson;

@WebServlet("/get_city.do")
public class GetCityServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(request.getParameter("name") == null) {
            response.getWriter().println("invalid");
            return;
        }

        String cityName = request.getParameter("name").toLowerCase();
        @SuppressWarnings("unchecked")
        ArrayList<City> allCityList = (ArrayList<City>) getServletContext().getAttribute("cities");


        if(getServletContext().getAttribute("search_city" + cityName) == null) {
            ArrayList<City> prepareCityList = new ArrayList<>();
            for(City city : allCityList) {
                if(city.getName().toLowerCase().contains(cityName)) {
                    prepareCityList.add(city);
                }
            }

            getServletContext().setAttribute("search_city" + cityName, prepareCityList);
        }
        
        @SuppressWarnings("unchecked")
        ArrayList<City> cityList = (ArrayList<City>) getServletContext().getAttribute("search_city" + cityName);

        response.getWriter().println(new Gson().toJson(cityList));
    }
}