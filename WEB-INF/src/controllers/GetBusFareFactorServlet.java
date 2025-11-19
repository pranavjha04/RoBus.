package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import java.util.ArrayList;


import models.Operator;
import models.BusFareFactor;

import com.google.gson.Gson;
@WebServlet("/get_bus_fare_factors.do")
public class GetBusFareFactorServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Missing Operator");
            }

            Operator operator = (Operator) session.getAttribute("operator");
            if(request.getParameter("bus_id") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }

            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            if(session.getAttribute("bus_fare_factor_list" + busId) == null) {
                ArrayList<BusFareFactor> busFareFactorList = BusFareFactor.collectAllRecords(busId, operator.getOperatorId());
                if(busFareFactorList == null) {
                    throw new IllegalArgumentException("invalid");
                }
                session.setAttribute("bus_fare_factor_list" + busId, busFareFactorList);
            }

            @SuppressWarnings("unchecked")
            ArrayList<BusFareFactor> list = (ArrayList<BusFareFactor>) session.getAttribute("bus_fare_factor_list" + busId);
            
            if(!requestURLPath.equals("add_bus_schedule.do")) {
                response.getWriter().println(new Gson().toJson(list));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!requestURLPath.equals("add_bus_schedule.do")) {
                response.getWriter().println("invalid");
            }
            return;
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);

        if(session.getAttribute("operator") == null || !requestURLPath.equals("add_bus_schedule.do")) {
            response.sendRedirect("/bts");
        }
        
        doGet(request, response);
    }
}