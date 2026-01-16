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
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("[]");
                return;
            }          

            ArrayList<BusFareFactor> busFareFactorList = BusFareFactor.collectAllRecords(busId, operator.getOperatorId());
            response.getWriter().println(new Gson().toJson(busFareFactorList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}