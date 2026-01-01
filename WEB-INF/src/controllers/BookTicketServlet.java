package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.Map;
import java.util.ArrayList;

import java.sql.Date;

import models.BookedSeat;
import models.Schedule;
import models.Seating;
import models.Booking;
import models.User;

import utils.AppUtil;
import utils.Pair;
import exceptions.MissingParameterException;

@WebServlet("/book_ticket.do")
public class BookTicketServlet extends HttpServlet {
    private final static String[] acceptedParameterList = {"seat", "total_fare", "schedule_id","source", "destination"};

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }

        try {
            User activeUser = (User) session.getAttribute("user");
            ServletContext context = getServletContext();
            for(String next : acceptedParameterList) {
                if(request.getParameter(next) == null) {
                    throw new MissingParameterException();
                }
            }

            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Integer totalFare = Integer.parseInt(request.getParameter("total_fare"));
            int source = Integer.parseInt(request.getParameter("source"));
            int destination = Integer.parseInt(request.getParameter("destination"));
            Map<Integer, Pair> selectedSeats = AppUtil.getFormattedSeatChargeRecord(request.getParameterValues("seat"));

            String SCHEDULE_BOOKED_SEAT_CACHE_KEY = "booked_schedule" + scheduleId;
            
            /* VALIDATION */
            // 1) validate  schedule    
                // check if schedule exist also it's status is upcoming
            
            Schedule schedule = Schedule.getRecordByStatus(scheduleId, 11);
            if(schedule == null) throw new IllegalArgumentException("Missing Schedule");

            // 2) validate selectedSeats
            // check if it's not already booked
            for(int seatNumber : selectedSeats.keySet()) {
                boolean isSeatAlreadyBooked = BookedSeat.checkRecordExistBySeatNumber(seatNumber);
                if(isSeatAlreadyBooked) throw new IllegalArgumentException("Seat is already booked");
            }

            // check if it's seater or sleeper actually supported
            String SEATING_CACHE_KEY = "seatingList" + schedule.getBus().getBusId();    
            if(context.getAttribute(SEATING_CACHE_KEY) == null) {
                ArrayList<Seating> seatingList = Seating.collectRecords(schedule.getBus().getBusId(), schedule.getBus().getOperator().getOperatorId());

                if(seatingList == null) {
                    throw new IllegalArgumentException("Seating is missing");
                }

                AppUtil.formateSeatingRecord(seatingList);
                context.setAttribute(SEATING_CACHE_KEY, seatingList);
            }
            
            @SuppressWarnings("unchecked")
            ArrayList<Seating> seatingList = (ArrayList<Seating>) context.getAttribute(SEATING_CACHE_KEY);

            // check if it's it's number is <= to totalSeats
            int totalAvailableSeats = 0;
            for(Seating next : seatingList) {
                int lsCount = next.getLsCount();
                int rsCount = next.getRsCount();
                int rowCount = next.getRowCount();
                
                totalAvailableSeats += ((lsCount + rsCount) * rowCount);
                if(!next.getSleeper()) {
                    totalAvailableSeats -= (lsCount + rsCount);
                    totalAvailableSeats += 5;
                }
            }

            for(int seatNumber : selectedSeats.keySet()) {
                if(seatNumber < 0  || seatNumber > totalAvailableSeats) {
                    throw new IllegalArgumentException("Invalid Seat");
                }

            }

            // check if it's fare charge
            int baseFair = schedule.getTotalCharges() - schedule.getSeaterFare() - schedule.getSleeperFare() - schedule.getAdditionalCharges(); 
            int currTotalCharges = schedule.getAdditionalCharges();
            int sleeperCount = 0;
            int seaterCount = 0;

            // 3) validate totalFare;

            for(int seatNumber : selectedSeats.keySet()) {
                Pair<Integer, Integer> details = selectedSeats.get(seatNumber);
                boolean isSleeper = details.getFirst() == 1;
                int currFair = details.getSecond();
                int targetFair = baseFair + (isSleeper ? schedule.getSleeperFare() : schedule.getSeaterFare());
                if(isSleeper) sleeperCount++;
                else seaterCount++;

                if(targetFair != currFair) {
                    throw new IllegalArgumentException("Seat Charge is invalid");
                }

                currTotalCharges += currFair;
            }
            
            if(currTotalCharges != totalFare) throw new IllegalArgumentException("Total Charge is not valid");
            // add record in bookings
            int newBookingId = Booking.addRecord(scheduleId, totalFare, activeUser.getUserId());
            
            if(newBookingId == -1) throw new IllegalArgumentException("Invalid Booking");


            // 3) add record in bookedSeats
            boolean areSeatingsInserted = BookedSeat.addRecordMultiple(newBookingId, new ArrayList<>(selectedSeats.keySet()));
            if(!areSeatingsInserted) throw new IllegalArgumentException("Invalid Booking Seat");

            // 4) update schedule booked or booking sleeper or booked seater seats
            boolean isUpdated = Schedule.updateSeatsBooked(scheduleId,  schedule.getSeaterSeatsBooked() + seaterCount, schedule.getSleeperSeatsBooked() + sleeperCount);

            if(isUpdated) {
                schedule.setSeaterSeatsBooked(schedule.getSeaterSeatsBooked() + seaterCount);
                schedule.setSeaterSeatsBooked(schedule.getSleeperSeatsBooked() + sleeperCount);
            }
            else {
                throw new IllegalArgumentException("Invalid Seats Booked updation");
            }

            schedule.setBookedSeatList(BookedSeat.collectAllRecords(scheduleId));
            context.setAttribute(SCHEDULE_BOOKED_SEAT_CACHE_KEY, schedule.getBookedSeatList());
            
            response.getWriter().println("ok");
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(MissingParameterException e) {
            e.printStackTrace();
            response.getWriter().println("missing");
            return;
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}