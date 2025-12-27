package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;

import java.io.IOException;

import java.sql.Date;
import java.sql.Time;

import java.time.LocalTime;

import java.util.ArrayList;

import models.Schedule;
import models.BusFareFactor;
import models.Seating;
import models.OperatorRoute;
import models.OperatorRouteMidCity;
import models.BusImage;
import models.BookedSeat;

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/get_schedule.do")
public class GetScheduleServlet extends HttpServlet {

    private static String[] acceptedIncludeRequestURL = {};
    private static String[] acceptedParametersList = {
        "source", "destination", "journey_date"
    };

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        String requestURLPath = request.getServletPath().substring(1);
        HttpSession session = request.getSession();
        boolean isIncludeRequest =
                AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestURL);

        ServletContext context = getServletContext();
        LocalTime currTime = LocalTime.now();
        try {
            if (isIncludeRequest) {
                for (String p : acceptedParametersList) {
                    if (request.getAttribute(p) == null)
                        throw new IllegalArgumentException("Missing parameter");
                }
            } else {
                for (String p : acceptedParametersList) {
                    if (request.getParameter(p) == null)
                        throw new IllegalArgumentException("Missing parameter");
                }

                int source = Integer.parseInt(request.getParameter("source"));
                int destination = Integer.parseInt(request.getParameter("destination"));
                Date journeyDate = Date.valueOf(request.getParameter("journey_date"));

                String SCHEDULE_CACHE_KEY =
                        "upcoming_schedule_" + source + "_" + destination + "_" + journeyDate;

                @SuppressWarnings("unchecked")
                ArrayList<Schedule> scheduleList =
                        (ArrayList<Schedule>) context.getAttribute(SCHEDULE_CACHE_KEY);

                if (scheduleList == null) {
                    synchronized (context) {
                        scheduleList =
                                (ArrayList<Schedule>) context.getAttribute(SCHEDULE_CACHE_KEY);

                        if (scheduleList == null) {
                            scheduleList =
                                    Schedule.collectSearchedScheduleRecord(
                                            source, destination, journeyDate
                                    );

                            if (scheduleList == null) {
                                throw new IllegalArgumentException("Invalid Request");
                            }

                            context.setAttribute(
                                    SCHEDULE_CACHE_KEY,
                                    new ArrayList<>(scheduleList)
                            );
                        }
                    }
                }

        
                ArrayList<Schedule> filteredScheduleList = new ArrayList<>();
                Date todayDate = new Date(System.currentTimeMillis());
    
                for (Schedule next : scheduleList) {

                    boolean allow = false;
                    if (next.getJourneyDate().after(todayDate)) {
                        allow = true;
                    }
                    else if (next.getJourneyDate().toString().equals(todayDate.toString())) {
                        if (next.getDepartureTime().toLocalTime().isAfter(currTime)) {
                            allow = true;
                        }
                    }

                    if (!allow) continue;

                    filteredScheduleList.add(next);

                    OperatorRoute operatorRoute =
                            next.getBusRouteWeekday().getOperatorRoute();

                    int operatorRouteId = operatorRoute.getOperatorRouteId();

                    ArrayList<OperatorRouteMidCity> operatorRouteMidCityList =
                            OperatorRouteMidCity.collectAllRecords(
                                    operatorRouteId,
                                    next.getBus().getOperator().getOperatorId()
                            );

                    operatorRoute.setOperatorRouteMidCities(operatorRouteMidCityList);
                    context.setAttribute(
                            "operator_route_midcities_" + operatorRouteId,
                            operatorRouteMidCityList
                    );
                }

                for (Schedule next : filteredScheduleList) {

                    int busId = next.getBus().getBusId();
                    int operatorId = next.getBus().getOperator().getOperatorId();

                    String FARE_CACHE_KEY = "bus_fare_factor_" + busId;
                    String SEATING_CACHE_KEY = "bus_seating_" + busId;
                    String BUS_IMAGE_CACHE_KEY = "bus_images" + busId;
                    String SCHEDULE_BOOKED_SEAT_CACHE_KEY = "booked_schedule" + next.getScheduleId();

                    @SuppressWarnings("unchecked")
                    ArrayList<BusFareFactor> fareList =
                            (ArrayList<BusFareFactor>) context.getAttribute(FARE_CACHE_KEY);

                    if (fareList == null) {
                        synchronized (context) {
                            if (fareList == null) {
                                fareList =
                                        BusFareFactor.collectAllRecords(busId, operatorId);

                                if (fareList == null)
                                    throw new IllegalArgumentException("Invalid Operation");

                                context.setAttribute(
                                        FARE_CACHE_KEY,
                                        new ArrayList<>(fareList)
                                );
                            }
                        }
                    }

                    next.getBus().setBusFareFactorList(
                        new ArrayList<>(fareList)
                    );


                    @SuppressWarnings("unchecked")
                    ArrayList<Seating> seatingList =
                            (ArrayList<Seating>) context.getAttribute(SEATING_CACHE_KEY);

                    if (seatingList == null) {
                        synchronized (context) {
                            if (seatingList == null) {
                                seatingList =
                                        Seating.collectRecords(busId, operatorId);

                                if (seatingList == null)
                                    throw new IllegalArgumentException("Invalid Operation");

                                context.setAttribute(
                                        SEATING_CACHE_KEY,
                                        new ArrayList<>(seatingList)
                                );
                            }
                        }
                    }

                    next.getBus().setSeatingList(
                        new ArrayList<>(seatingList)
                    );

                    // now get the busImages

                    @SuppressWarnings("unchecked")
                    ArrayList<BusImage> busImageList =
                            (ArrayList<BusImage>) context.getAttribute(BUS_IMAGE_CACHE_KEY);

                    if (busImageList == null) {
                        synchronized (context) {
                            if (busImageList == null) {
                                busImageList =
                                        BusImage.collectAllRecords(busId, operatorId);

                                if (busImageList == null)
                                    throw new IllegalArgumentException("Invalid Operation");

                                context.setAttribute(
                                        BUS_IMAGE_CACHE_KEY,
                                        new ArrayList<>(busImageList)
                                );
                            }
                        }
                    }

                    next.getBus().setBusImageList(
                        new ArrayList<>(busImageList)
                    );

                    @SuppressWarnings("unchecked")
                    ArrayList<BookedSeat> bookedSeatList =
                            (ArrayList<BookedSeat>) context.getAttribute(SCHEDULE_BOOKED_SEAT_CACHE_KEY);

                    if (bookedSeatList == null) {
                        synchronized (context) {
                            if (bookedSeatList == null) {
                                bookedSeatList =
                                        BookedSeat.collectAllRecords(next.getScheduleId());

                                if (bookedSeatList == null)
                                    throw new IllegalArgumentException("Invalid Operation");

                                context.setAttribute(
                                        SCHEDULE_BOOKED_SEAT_CACHE_KEY,
                                        new ArrayList<>(bookedSeatList)
                                );
                            }
                        }
                    }

                    next.setBookedSeatList(bookedSeatList);
                }

                Gson gson = new Gson();
                response.getWriter().write(
                        gson.toJson(filteredScheduleList)
                );
            }
        }
        catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(e.getMessage());
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        HttpSession session = request.getSession();
    }
}
