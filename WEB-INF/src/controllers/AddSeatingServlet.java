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

@WebServlet("/add_seating.do")
public class AddSeatingServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Enumeration<String> params = request.getParameterNames();

        Seating seating = new Seating();
        while (params.hasMoreElements()) {
            String currParam = params.nextElement();
            String value = request.getParameter(currParam);
            if (value == null || value.trim().isEmpty()) {
                response.getWriter().println("invalid");
                return;
            }
            else {
                boolean success = seating.setField(currParam, value);
                if(!success) {
                    System.out.println(currParam);
                    response.getWriter().println("invalid");
                    return;
                }
            }
            
        }

        int busId = Integer.parseInt(request.getParameter("bus_id"));
        int generatedId = seating.addRecord(busId);
        if(generatedId == -1) {
            response.getWriter().println("internal");
            return;
        }

        seating.setSeatingId(generatedId);
        response.getWriter().println(new Gson().toJson(seating));

    } 
}