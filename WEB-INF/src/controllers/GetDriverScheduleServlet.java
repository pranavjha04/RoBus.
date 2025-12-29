package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import com.google.gson.Gson;

import exceptions.MissingParameterException;

import models.Schedule;
import models.User;

@WebServlet("/get_driver_schedule.do")
public class GetDriverScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.getWriter().println("invalid");
            return;
        }

        User user = (User) session.getAttribute("user");
        try {
            if(!user.getUserType().getUserTypeId().equals(3)) {
                throw new IllegalArgumentException("Invalid Request");
            }

            ArrayList<Schedule> scheduleList = Schedule.getSchedulesByDriverUser(user.getUserId());
            if(scheduleList == null) throw new IllegalArgumentException("Invalid Request");

            response.getWriter().println(new Gson().toJson(scheduleList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    }
}