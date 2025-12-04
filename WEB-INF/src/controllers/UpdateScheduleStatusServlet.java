package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;

import java.sql.Date;

import com.google.gson.Gson;

import models.Operator;
import models.Schedule;
import models.Status;
import models.Driver;


@WebServlet("/update_schedule_status.do")
public class UpdateScheduleStatusServlet extends HttpServlet {
    private static String[] acceptedParametersList = {"date", "schedule_id", "status_id", "bus_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
    }
}
