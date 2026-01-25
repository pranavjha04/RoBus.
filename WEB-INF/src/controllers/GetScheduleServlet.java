package controllers;

import com.google.gson.Gson;

import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import models.BookedSeat;
import models.BusFareFactor;
import models.BusImage;
import models.Operator;
import models.OperatorRoute;
import models.OperatorRouteMidCity;
import models.Schedule;
import models.Seating;
import utils.AppUtil;

@WebServlet("/get_schedule.do")
public class GetScheduleServlet extends HttpServlet {
    private static String[] acceptedParametersList = {
            "source", "destination", "journey_date"};

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        HttpSession session = request.getSession();
        ServletContext context = getServletContext();
        LocalTime currTime = LocalTime.now();
        try {
            for (String p : acceptedParametersList) {
                if (request.getParameter(p) == null)
                    throw new IllegalArgumentException("Missing parameter");
            }

            int source = Integer.parseInt(request.getParameter("source"));
            int destination =
                    Integer.parseInt(request.getParameter("destination"));
            Date journeyDate =
                    Date.valueOf(request.getParameter("journey_date"));

            ArrayList<Schedule> scheduleList =
                    Schedule.collectSearchedScheduleRecord(
                            source, destination, journeyDate);

            ArrayList<Schedule> filteredScheduleList = new ArrayList<>();
            Date todayDate = new Date(System.currentTimeMillis());

            for (Schedule next : scheduleList) {
                boolean allow = false;
                if (next.getJourneyDate().after(todayDate)) {
                    allow = true;
                } else if (next.getJourneyDate().toString().equals(
                                   todayDate.toString())) {
                    if (next.getDepartureTime().toLocalTime().isAfter(
                                currTime)) {
                        allow = true;
                    }
                }

                if (!allow) continue;

                OperatorRoute operatorRoute =
                        next.getBusRouteWeekday().getOperatorRoute();

                int operatorRouteId = operatorRoute.getOperatorRouteId();
                ArrayList<OperatorRouteMidCity> operatorRouteMidCityList =
                        OperatorRouteMidCity.collectAllRecords(operatorRouteId,
                                next.getBus().getOperator().getOperatorId());
                if (operatorRouteMidCityList == null)
                    throw new IllegalArgumentException("Invalid Request");

                operatorRoute.setOperatorRouteMidCities(
                        operatorRouteMidCityList);
                filteredScheduleList.add(next);
            }

            for (Schedule next : filteredScheduleList) {
                int busId = next.getBus().getBusId();
                int operatorId = next.getBus().getOperator().getOperatorId();

                ArrayList<BusFareFactor> fareList =
                        BusFareFactor.collectAllRecords(busId, operatorId);
                if (fareList == null)
                    throw new IllegalArgumentException("Invalid request");
                next.getBus().setBusFareFactorList(new ArrayList<>(fareList));

                ArrayList<Seating> seatingList =
                        Seating.collectRecords(busId, operatorId);
                if (seatingList == null)
                    throw new IllegalArgumentException(
                            "Invalid Seatings Request");
                next.getBus().setSeatingList(new ArrayList<>(seatingList));

                // now get the busImages
                ArrayList<BusImage> busImageList =
                        BusImage.collectAllRecords(busId, operatorId);
                if (busImageList == null)
                    throw new IllegalArgumentException(
                            "Illegal Bus Image Request");
                next.getBus().setBusImageList(new ArrayList<>(busImageList));

                ArrayList<BookedSeat> bookedSeatList =
                        BookedSeat.collectAllRecords(next.getScheduleId());
                if (bookedSeatList == null)
                    throw new IllegalArgumentException("Invalid booked Seats");
                next.setBookedSeatList(bookedSeatList);
            }

            Gson gson = new Gson();
            response.getWriter().write(gson.toJson(filteredScheduleList));

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
