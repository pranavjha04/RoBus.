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
            response.sendRedirect("/robus");
            return;
        }

        try {
            int userId = Integer.parseInt(request.getParameter("user_id"));
            int statusId = Integer.parseInt(request.getParameter("status_id"));

            boolean isUpdated = User.updateStatus(userId, statusId);
            if(!isUpdated) throw new IllegalArgumentException("Invalid Request");

            response.getWriter().println("ok");
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
        }
       
    }
}