package controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import java.sql.Date;

import com.google.gson.Gson;

import models.Schedule;
import models.Operator;

@WebServlet("/get_journey_date_schedule.do")
public class GetJourneyDateScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");   
            }

            if(request.getParameter("date") == null) {
                throw new IllegalArgumentException("Missing Parameter");
            }

            Date journeyDate = Date.valueOf(request.getParameter("date"));
            System.out.println(journeyDate);
            Operator operator = (Operator) session.getAttribute("operator");

            if(session.getAttribute("date_schedule_list" + journeyDate.toString()) == null) {
                ArrayList<Schedule> list = Schedule.collectDateScheduleRecords(journeyDate, operator.getOperatorId());

                if(list == null) {
                    throw new IllegalArgumentException("Internal Server Error");
                }

                session.setAttribute("date_schedule_list" + journeyDate.toString(), list);
            }

            @SuppressWarnings("unchecked")
            ArrayList<Schedule> dateScheduleList = (ArrayList<Schedule>) session.getAttribute("date_schedule_list" + journeyDate.toString());

            System.out.println(dateScheduleList);

            response.getWriter().println(new Gson().toJson(dateScheduleList));
   
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    } 
}