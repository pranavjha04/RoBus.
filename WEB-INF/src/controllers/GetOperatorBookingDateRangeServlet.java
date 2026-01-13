package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.sql.Date;

import java.util.List;

import com.google.gson.Gson;

import models.Booking;
import models.Operator;

import exceptions.MissingParameterException;

import utils.Pair;

@WebServlet("/get_operator_date_range_bookings.do")
public class GetOperatorBookingDateRangeServlet extends HttpServlet {
    private static String[] acceptedParamsList = {"from", "to"};
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }
        Operator operator = (Operator) session.getAttribute("operator");

        try {
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("[]");
                return;
            }
            for(String next : acceptedParamsList) {
                if(request.getParameter(next) == null) {
                    throw new MissingParameterException();
                }
            }
            Date from = Date.valueOf(request.getParameter("from"));
            Date to = Date.valueOf(request.getParameter("to"));

            List<Pair<Date, Integer>> bookingList = Booking.collectRecords(from, to, operator.getOperatorId());
            
            response.getWriter().println(new Gson().toJson(bookingList));
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
        catch(MissingParameterException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
    }
}