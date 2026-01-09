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

import utils.AppUtil;

import com.google.gson.Gson;
@WebServlet("/get_bus_fare_factors.do")
public class GetBusFareFactorServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestList = {"update_schedule_charges.do", "add_bus_schedule.do"};
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Missing Operator");
            }

            Operator operator = (Operator) session.getAttribute("operator");
            if(!operator.getStatus().getStatusId().equals(1)) {
                throw new IllegalArgumentException("Not verified");
            }            

            if(request.getParameter("bus_id") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }

            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            if(getServletContext().getAttribute("bus_fare_factor_list" + busId) == null) {
                ArrayList<BusFareFactor> busFareFactorList = BusFareFactor.collectAllRecords(busId, operator.getOperatorId());
                if(busFareFactorList == null) {
                    throw new IllegalArgumentException("invalid");
                }
                getServletContext().setAttribute("bus_fare_factor_list" + busId, busFareFactorList);
            }

            
            if(!isIncludeRequest) {
                @SuppressWarnings("unchecked")
                ArrayList<BusFareFactor> list = (ArrayList<BusFareFactor>) getServletContext().getAttribute("bus_fare_factor_list" + busId);
                response.getWriter().println(new Gson().toJson(list));
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

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestList);

        if(session.getAttribute("operator") == null || !isIncludeRequest) {
            response.sendRedirect("/bts");
        }
        if(isIncludeRequest) {
            doGet(request, response);
        }
    }
}