package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import com.google.gson.Gson;

import models.Operator;
import models.Booking;
import models.Driver;
import models.Bus;

import utils.DashBoardFormatHelper;

@WebServlet("/operator_dashboard.do")
public class OperatorDashboardServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("operator_dashboard.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");
        if(!operator.getStatus().getStatusId().equals(1)) {
            response.getWriter().println(new Gson().toJson(new DashBoardFormatHelper(0, 0, 0, 0)));
            return;
        }
           

        int noOfBookings = Booking.getNumberOfOperatorBookings(operator.getOperatorId());
        int revenueGenerated = Booking.collectTotalBookingFareRevenue(operator.getOperatorId());
        int totalBuses = Bus.collectTotalOperatorBuses(operator.getOperatorId());
        int totalDrivers = Driver.collectTotalOperatorDrivers(operator.getOperatorId());


        DashBoardFormatHelper helper = new DashBoardFormatHelper(
            noOfBookings,
            revenueGenerated,
            totalBuses,
            totalDrivers
        );

        response.getWriter().println(new Gson().toJson(helper));
    }
}