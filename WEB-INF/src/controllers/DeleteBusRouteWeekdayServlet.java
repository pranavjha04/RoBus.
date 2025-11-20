package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;
import models.Operator;
import models.BusRouteWeekday;


@WebServlet("/delete_bus_route_weekday.do")
public class DeleteBusRouteWeekdayServlet extends HttpServlet {
    static final String[] acceptedParams = {"operator_route_id", "bus_route_weekday_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        boolean success = false;

        try {
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) throw new IllegalArgumentException("Missing Parameter");
            }
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Integer busRouteWeekdayId = Integer.parseInt(request.getParameter("bus_route_weekday_id"));
            Integer operatorId = operator.getOperatorId();

            success = BusRouteWeekday.deleteRecord(busRouteWeekdayId, operatorRouteId, operatorId)
            if(success) {
                session.removeAttribute("bus_route_weekday_list" + operatorRouteId);
                response.getWriter().println("success");
            }
            else {
                throw new IllegalArgumentException("Invalid Request");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }

    }
}