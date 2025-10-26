package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import models.Operator;
import models.OperatorRoute;

import com.google.gson.Gson;

@WebServlet("/get_operator_routes.do")
public class GetOperatorRouteServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");
        Integer operatorId = operator.getOperatorId();
        ArrayList<OperatorRoute> operatorRouteList = OperatorRoute.collectAllRecords(operatorId);
        
        response.getWriter().println(new Gson().toJson(operatorRouteList));
    }
}