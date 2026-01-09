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
        if(!user.getStatus().getStatusId().equals(1)) {
            response.getWriter().println("[]");
            return;
        }
        
        ArrayList<Booking> bookingList = (ArrayList<Booking>)  Booking.collectAllRecords(user.getUserId());

        for(Booking next : bookingList) {
            String cache = next.getBookingId() + "bookedSeats";
            if(session.getAttribute(cache) == null) {
                ArrayList<BookedSeat> list = BookedSeat.collectAllRecordsByBooking(next.getBookingId());
                session.setAttribute(cache, list);
            } 

            @SuppressWarnings("unchecked")
            ArrayList<BookedSeat> list = (ArrayList<BookedSeat>) session.getAttribute(cache);
            next.setBookedSeatList(list);
        }
        
        response.getWriter().println(new Gson().toJson(bookingList));
    }
}