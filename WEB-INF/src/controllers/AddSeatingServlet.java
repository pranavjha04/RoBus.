package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;


import java.util.Enumeration;
import java.util.ArrayList;

import java.io.IOException;

import com.google.gson.Gson;

import models.Seating;
import models.Bus;

@WebServlet("/add_seating.do")
public class AddSeatingServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Enumeration<String> params = request.getParameterNames();
        if(request.getParameter("bus_id") != null && request.getParameter("deck") != null) {
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Boolean deck = Boolean.parseBoolean(request.getParameter("deck"));

            boolean isExist = Seating.checkSeatingExist(busId, deck);
            if(isExist) {
                response.getWriter().println("invalid");
                return;
            }
        }   
        else {
            response.getWriter().println("invalid");
            return;
        }


        Seating seating = new Seating();
        while (params.hasMoreElements()) {
            String currParam = params.nextElement();
            String value = request.getParameter(currParam);
            if (value == null || value.trim().isEmpty()) {
                response.getWriter().println("invalid");
                return;
            }
            else {
                Boolean success = seating.setField(currParam, value);
                if(!success) {
                    response.getWriter().println("invalid");
                    return;
                }
            }
            
        }

        Integer busId = Integer.parseInt(request.getParameter("bus_id"));
        Integer generatedId = seating.addRecord(busId);

        if(generatedId == -1) {
            response.getWriter().println("internal");
            return;
        }

        Bus activeBus = Bus.getRecord(busId);
        if(activeBus == null) {
            response.getWriter().println("internal");
            return;
        }
                
        ArrayList<Seating> seatingList = Seating.collectRecords(busId);
        Boolean isUpdatable = false;
        if(activeBus.getDoubleDecker()) {
            if(seatingList.size() == 2) {
                isUpdatable = true;
            }
        }
        else {
            if(seatingList.size() == 1) {
                isUpdatable = true;
            }
        }

        if(isUpdatable) {
            Boolean success = Bus.updateStatus(busId, 5); // 2nd column is statusId  (5) <-> Inactive

            if(!success) {
                response.getWriter().println("internal");
                return;

            }
        }

        seating.setSeatingId(generatedId);

        // clear cache
        session.removeAttribute(busId + "seatingList");
        
        response.getWriter().println(new Gson().toJson(seating));

    } 
}