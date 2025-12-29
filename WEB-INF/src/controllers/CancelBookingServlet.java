package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import exceptions.MissingParameterException;

import models.Booking;
import models.User;

@WebServlet("/cancel_booking.do")
public class CancelBookingServlet extends HttpServlet {
    private static final String[] acceptedParameterList = {"booking_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }

        ServletContext context = getServletContext();

        try {
            for(String next : acceptedParameterList) {
                if(request.getParameter(next) == null) {
                    throw new MissingParameterException();
                }
            }

            Integer bookingId = Integer.parseInt(request.getParameter("booking_id"));
            User user = (User) session.getAttribute("user");

            // check karo booking ka status agr upcoming ho toh he cancel karo
            Booking targetBooking = Booking.getRecord(bookingId);
            if(targetBooking == null || !targetBooking.getStatus().getName().equals("Upcoming")) {
                throw new IllegalArgumentException("Invalid Request");
            }

            // update booking status to cancelled
            boolean isBookingStatusUpdated = Booking.updateStatus(bookingId, 6);
            if(!isBookingStatusUpdated) throw new IllegalArgumentException("Internal Server Error");

            context.removeAttribute("booked_schedule" + targetBooking.getSchedule().getScheduleId());
            response.getWriter().println("ok");
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