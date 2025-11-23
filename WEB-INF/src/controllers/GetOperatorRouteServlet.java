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
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        try {
            if(session.getAttribute("operator") == null) {
                throw new IllegalArgumentException("Invalid Request");
            }

            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();
            String cachedAttribute = "opetator_route_list" + operatorId;
            
            if(session.getAttribute(cachedAttribute) == null) {
                ArrayList<OperatorRoute> operatorRouteList = OperatorRoute.collectAllRecords(operatorId);
                if(operatorRouteList == null) {
                    throw new IllegalArgumentException("Invalid Request");
                }

                session.setAttribute(cachedAttribute, operatorRouteList);
            }

            @SuppressWarnings("unchecked")
            ArrayList<OperatorRoute> list = (ArrayList<OperatorRoute>) session.getAttribute(cachedAttribute);
            response.getWriter().println(new Gson().toJson(list));
        }   
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }

        
    }
}