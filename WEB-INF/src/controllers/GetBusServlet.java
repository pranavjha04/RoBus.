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
import models.Bus;

import com.google.gson.Gson;

@WebServlet("/get_bus.do")
public class GetBusServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null || request.getParameter("allRecord") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Boolean allRecord = Boolean.parseBoolean(request.getParameter("allRecord"));
        Gson gson = new Gson();
        Boolean isCached = false;

        /**
         * caching the data
         */
        if (allRecord && session.getAttribute("allBusList") != null) {
            isCached = true;
            @SuppressWarnings("unchecked")
            ArrayList<Bus> list = (ArrayList<Bus>) session.getAttribute("allBusList");
            response.getWriter().println(gson.toJson(list));
        }

        if (!allRecord && session.getAttribute("busList") != null) {
            isCached = true;
            @SuppressWarnings("unchecked")
            ArrayList<Bus> list = (ArrayList<Bus>) session.getAttribute("busList");
            response.getWriter().println(gson.toJson(list));
        }

        if(isCached) {
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");
        ArrayList<Bus> busList = Bus.collectRecords(operator.getOperatorId(), allRecord);
        
        if(busList == null) {
            response.getWriter().println("internal");
            return;
        }
        
        // store in cache
        session.setAttribute(allRecord ? "allBusList" : "busList", busList);
        response.getWriter().println(gson.toJson(busList));
    }
}