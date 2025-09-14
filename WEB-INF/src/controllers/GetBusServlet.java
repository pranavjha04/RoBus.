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

        if(session.getAttribute("operator") == null || request.getParameter("all_record") == null) {
            response.getWriter().println("invalid");
            return;
        }

        Boolean allRecord = Boolean.parseBoolean(request.getParameter("all_record"));
        Operator operator = (Operator) request.getSession();
        
        ArrayList<Bus> busList = Bus.collectRecords(operator.getOperatorId(), allRecord);

        if(busList == null) {
            response.getWriter().println("internal");
        }

        response.getWriter().println(new Gson().toJson(busList));
    }
}