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
import models.Weekday;

import com.google.gson.Gson;

@WebServlet("/get_weekday_all.do")
public class GetWeekdaysServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        @SuppressWarnings("unchecked")
        ArrayList<Weekday> weekdayList = (ArrayList<Weekday>) getServletContext().getAttribute("weekdayList");

       
        response.getWriter().println(new Gson().toJson(weekdayList));
    }
}