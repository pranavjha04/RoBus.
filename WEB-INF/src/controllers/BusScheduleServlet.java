package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;


@WebServlet("/bus_schedule.do")
public class BusScheduleServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletRequest response) throws IOException, ServletException {
        request.getRequestDispatcher("bus_schedule.jsp").forward(request, response);
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        
    }
}