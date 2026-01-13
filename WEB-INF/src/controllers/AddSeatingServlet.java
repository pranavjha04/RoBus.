package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletContext;

import java.util.ArrayList;
import java.io.IOException;

import com.google.gson.Gson;

import models.Seating;
import models.Bus;
import models.Status;
import models.Operator;

import utils.AppUtil;

@WebServlet("/add_seating.do")
public class AddSeatingServlet extends HttpServlet {
    static final String[] acceptedParams = {"lsCount", "rsCount", "seats", "rowCount", "deck", "sleeper", "bus_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }
        Operator operator = (Operator) session.getAttribute("operator");
        if(operator.getStatus().getStatusId().equals(2)) {
            response.getWriter().println("invalid");
            return;
        }
        ServletContext context = getServletContext();

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
        for(String param : acceptedParams) {
            String value = request.getParameter(param);
            if (value == null || value.trim().isEmpty()) {
                response.getWriter().println("invalid");
                return;
            }
            else {
                Boolean success = seating.setField(param, value);
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

        System.out.println(generatedId);

        Bus activeBus = null;
        if(session.getAttribute("busList") != null) {
            @SuppressWarnings("unchecked")
            ArrayList<Bus> busList = (ArrayList<Bus>) session.getAttribute("busList");

            for(Bus bus : busList) {
                if(bus.getBusId().equals(busId)) {
                    activeBus = bus;
                    break;
                }
            }
        }
        if(activeBus == null) {
            activeBus = Bus.getRecord(busId, operator.getOperatorId());
            if(activeBus == null) {
                response.getWriter().println("internal");
                return;
            }
        }
    

        ArrayList<Seating> seatingList = Seating.collectRecords(busId, operator.getOperatorId());
        AppUtil.formateSeatingRecord(seatingList);

        context.setAttribute("seatingList" + busId, seatingList);
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
            Boolean success = Bus.updateStatus(busId, 5, operator.getOperatorId()); // 2nd column is statusId  (5) <-> Inactive
            if(!success) {
                response.getWriter().println("internal");
                return;
            }
            
        }

        
        seating.setSeatingId(generatedId);
        session.removeAttribute("busList");
        response.getWriter().println(new Gson().toJson(seating));

    } 
}