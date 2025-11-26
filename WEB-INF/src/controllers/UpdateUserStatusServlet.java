package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.User;

@WebServlet("/update_user_status.do")
public class UpdateUserStatusServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String requestURLPath = request.getServletPath().substring(1);
            
        int userId = -1;
        int statusId = -1;
        try {
            if(requestURLPath.equals("add_bus_schedule.do")) {
                if(
                    request.getAttribute("status_id") != null 
                    && 
                    request.getAttribute("user_id") != null
                ) {
                    userId = (Integer) request.getAttribute("user_id");
                    statusId = (Integer) request.getAttribute("status_id");
                }
                else {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }
            else {
                if(
                    request.getParameter("status_id") != null 
                    && 
                    request.getParameter("user_id") != null
                ) {
                    userId = Integer.parseInt(request.getParameter("user_id"));
                    statusId = Integer.parseInt(request.getParameter("status_id"));
                }
                else {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }
            if(userId == -1 || statusId == -1) throw new IllegalArgumentException("Invalid Request");

            if(statusId == 4) {
                if(!requestURLPath.equals("add_bus_schedule.do")) {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }
            boolean isUpdated = User.updateStatus(userId, statusId);
            if(!isUpdated) {
                throw new IllegalArgumentException("Invalid Request");
            }
            else {
                if(requestURLPath.equals("add_bus_schedule.do")) {
                    request.setAttribute("isUpdated", true);
                }
                else {
                    response.getWriter().println("ok");
                }
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(!requestURLPath.equals("add_bus_schedule.do")) {
                response.getWriter().println("invalid");
            }
            else {
                request.setAttribute("isUpdated", false);
            }
        }
    }
}