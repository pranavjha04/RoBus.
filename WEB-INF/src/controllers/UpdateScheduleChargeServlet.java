package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletContext;

import java.io.IOException;

import java.sql.Date;
import java.util.ArrayList;

import models.Schedule;
import models.Operator;
import models.BusRouteWeekday;
import models.BusFareFactor;

import utils.FieldManager;

@WebServlet("/update_schedule_charges.do")
public class UpdateScheduleChargeServlet extends HttpServlet {
    private static String[] acceptedParams = {"additional_charges", "seater_fare", "sleeper_fare", "total_charges", "schedule_id", "journey_date", "bus_id"};

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
            return;
        }
        ServletContext context = getServletContext();
        try {
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) {
                    System.out.println(next);
                    throw new IllegalArgumentException("Missing Parameter");
                }
            }   

            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                response.getWriter().println("invalid");
                return;
            }
            Integer additionalCharges = Integer.parseInt(request.getParameter("additional_charges"));
            Integer seaterFare = Integer.parseInt(request.getParameter("seater_fare"));
            Integer sleeperFare = Integer.parseInt(request.getParameter("sleeper_fare"));
            Integer totalCharges = Integer.parseInt(request.getParameter("total_charges"));
            Integer busId = Integer.parseInt(request.getParameter("bus_id"));
            Integer scheduleId = Integer.parseInt(request.getParameter("schedule_id"));
            Date journeyDate = Date.valueOf(request.getParameter("journey_date"));
            Schedule currSchedule = Schedule.getRecord(scheduleId, operator.getOperatorId());
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            if(currSchedule == null || !currSchedule.getStatus().getStatusId().equals(11))  { // upcoming nahi hai
                throw new IllegalArgumentException("Invalid Request");
            }
        
            ArrayList<BusFareFactor> busFareFactorList = BusFareFactor.collectAllRecords(busId, operator.getOperatorId());
            ArrayList<BusRouteWeekday> busRouteWeekdayList = BusRouteWeekday.collectAllRecords(operatorRouteId, operator.getOperatorId());
            
            int distance = 0;
            for(BusRouteWeekday next : busRouteWeekdayList) {
                if(next.getBusRouteWeekdayId().equals(currSchedule.getBusRouteWeekday().getBusRouteWeekdayId())) {
                    distance = next.getOperatorRoute().getRoute().getDistance();
                    break;
                }
            }
            if(distance == 0) {
                throw new IllegalArgumentException("Invalid Bus Route Weekday Id");
            }

            if(
                !FieldManager.validateExtraChargeFare(sleeperFare) || 
                !FieldManager.validateExtraChargeFare(seaterFare) || 
                !FieldManager.validateExtraChargeFare(additionalCharges)
            ) {
                throw new IllegalArgumentException("Invalid Seating Fare");
            }
            
            int targetTotalFareCharges = BusFareFactor.calculateTotalFareCharges(busFareFactorList, distance);
            int currTotalFareCharges = totalCharges - additionalCharges - seaterFare - sleeperFare;

            if(currTotalFareCharges != targetTotalFareCharges) {
                throw new IllegalArgumentException("Invalid Total Charges");
            }
            else {
                boolean isUpdated = Schedule.updateCharges(scheduleId, additionalCharges, seaterFare, sleeperFare, totalCharges, operator.getOperatorId());

                if(!isUpdated) throw new IllegalArgumentException("Invalid Request");

                response.getWriter().println("ok");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}