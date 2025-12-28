package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import com.google.gson.Gson;

import models.User;
import models.Booking;
import models.BookedSeat;

@WebServlet("/get_all_booking.do")
public class GetAllBookingServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("user") == null) {
            response.getWriter().println("invalid");
            return;
        }
        User user = (User) session.getAttribute("user");
        int userId = user.getUserId();
        String cacheKey = "allBookingList";

        if(session.getAttribute(cacheKey) == null) {
            ArrayList<Booking> bookingList = Booking.collectAllRecords(userId);

            for(Booking next : bookingList) {
                next.setBookedSeatList(BookedSeat.collectAllRecordsByBooking(next.getBookingId()));
            }

            session.setAttribute(cacheKey, bookingList);
        }

        @SuppressWarnings("unchecked")
        ArrayList<Booking> bookingList = (ArrayList<Booking>) session.getAttribute(cacheKey);

        response.getWriter().println(new Gson().toJson(bookingList));
    }
}