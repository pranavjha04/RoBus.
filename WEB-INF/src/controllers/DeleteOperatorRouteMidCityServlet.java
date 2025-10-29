package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import models.Operator;
import models.OperatorRouteMidCity;

@WebServlet("/delete_operator_route_mid_city.do")
public class DeleteOperatorRouteMidCityServlet extends HttpServlet {
    static final String[] acceptedParams = {"operator_route_id", "operator_route_mid_city_id"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        for(String next : acceptedParams) {
            if(request.getParameter(next) == null) {
                response.getWriter().println("invalid");
                return;
            }
        }

        try {
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();
            Integer operatorRouteId = Integer.parseInt(request.getParameter("operator_route_id"));
            Integer operatorRouteMidCityId = Integer.parseInt(request.getParameter("operator_route_mid_city_id"));

            boolean isDeleted = OperatorRouteMidCity.deleteRecord(operatorRouteId, operatorRouteMidCityId, operatorId);
            response.getWriter().println(isDeleted ? "success" : "failed");
        }
        catch(NumberFormatException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}