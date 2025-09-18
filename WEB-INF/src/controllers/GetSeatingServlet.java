package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import models.Seating;

import com.google.gson.Gson;

@WebServlet("/get_seating.do")
public class GetSeatingServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null || request.getParameter("bus_id") == null) {
            response.getWriter().println("invalid");
            return;
        }

        int busId = Integer.parseInt(request.getParameter("bus_id"));
        ArrayList<Seating> seatingList = Seating.collectRecords(busId);

        if(seatingList == null) {
            response.getWriter().println("internal");
            return;
        } 

        switch(seatingList.size()) {
            case 1 : {
                Seating firstSeating = seatingList.get(0);
                if(firstSeating.getDeck()) {
                    seatingList.set(0, null);
                    seatingList.add(firstSeating);
                }
                break;
            }
            case 2 : {
                Seating firstSeating = seatingList.get(0);
                Seating secondSeating = seatingList.get(1);

                if(firstSeating.getDeck()) {
                    seatingList.set(0, secondSeating);
                    seatingList.set(1, firstSeating);
                }
                break;
            }
            default : 
                break;
        }

        response.getWriter().println(new Gson().toJson(seatingList));
    }
}