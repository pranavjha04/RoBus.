package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;


import java.util.Enumeration;
import java.io.IOException;
import com.google.gson.Gson;

import models.Seating;


@WebServlet("/update_seating.do")
public class UpdateSeatingServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
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
            if(!isExist) {
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

        Boolean success = seating.updateRecord(busId);
        if(!success) {
            response.getWriter().println("internal");
            return;
        }

        response.getWriter().println(new Gson().toJson(seating));


    }
}