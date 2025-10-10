package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;

import java.util.ArrayList;

import models.Operator;
import models.Bus;

import com.google.gson.Gson;

@WebServlet("/get_bus.do")
public class GetBusServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null || request.getParameter("allRecord") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Boolean allRecord = Boolean.parseBoolean(request.getParameter("allRecord"));
        Gson gson = new Gson();
        
        Operator operator = (Operator) session.getAttribute("operator");
        ArrayList<Bus> busList = Bus.collectRecords(operator.getOperatorId(), allRecord);
        
        if(busList == null) {
            response.getWriter().println("internal");
            return;
        }
        
        response.getWriter().println(gson.toJson(busList));
    }
}