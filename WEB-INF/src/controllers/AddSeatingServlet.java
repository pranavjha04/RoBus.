package controllers;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import java.util.Enumeration;
import java.io.IOException;

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

        while(params.hasMoreElements()) {
            String currParam = params.nextElement();
            if(request.getParameter(currParam) == null || request.getParameter(currParam).isEmpty()) {
                response.getWriter().println("invalid");
                return;
            }
        }

        Integer lsCount = Integer.parseInt(request.getParameter("ls_count"));
        Integer rsCount = Integer.parseInt(request.getParameter("rs_count"));
        Integer rowCount = Integer.parseInt(request.getParameter("row_count"));
        Boolean sleeper = request.getParameter("sleeper").equals("true");
        Boolean deck = request.getParameter("deck").equals("true"); // true means upper else lower
        Integer busId = Integer.parseInt(request.getParameter("bus_id"));

        boolean success = Seating.addRecord(lsCount, rsCount, rowCount, deck, sleeper, busId);

        response.getWriter().println(success ? "success" : "internal");

    } 
}