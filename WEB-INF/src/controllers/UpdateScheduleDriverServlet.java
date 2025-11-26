package controllers;

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
import models.Driver;



@WebServlet("/update_schedule_driver.do")
public class UpdateScheduleDriverServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        try {
            if(
                request.getParameter("new_driver_id") == null
                ||
                request.getParameter("old_driver_id") == null
                ||
                request.getParameter("schedule_id") == null
             ) {
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
