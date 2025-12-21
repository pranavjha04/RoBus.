package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.ArrayList;

import models.Seating;
import models.Operator;

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/get_seating.do")
public class GetSeatingServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String requestURLPath = request.getServletPath().substring(1);
        ServletContext context = getServletContext();

        try {
            if(session.getAttribute("operator") == null || request.getParameter("bus_id") == null) {
                throw new IllegalArgumentException("Missing Paramters");
            }

            Operator operator = (Operator) session.getAttribute("operator");
            int busId = Integer.parseInt(request.getParameter("bus_id"));
            int operatorId = operator.getOperatorId();

            String cachedAttribute = "seatingList" + busId;

            if(context.getAttribute(cachedAttribute) == null) {
                ArrayList<Seating> seatingList = Seating.collectRecords(busId, operatorId);

                if(seatingList == null) {
                    throw new IllegalArgumentException("Internal or Invalid Request");
                }

                AppUtil.formateSeatingRecord(seatingList);
                context.setAttribute(cachedAttribute, seatingList);
            }
            
            if(!requestURLPath.equals("add_seating.do")) {
                @SuppressWarnings("unchecked")
                ArrayList<Seating> seatingList = (ArrayList<Seating>) context.getAttribute(cachedAttribute);
                response.getWriter().println(new Gson().toJson(seatingList));
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!requestURLPath.equals("add_seating.do")) {
                response.getWriter().println("invalid");
            }
            return;
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
        if(requestURLPath.equals("add_seating.do")) {
            doGet(request, response);
            return;
        }
    }
}