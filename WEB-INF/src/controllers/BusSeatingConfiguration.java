package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

@WebServlet("/bus_seating_configuration.do")
public class BusSeatingConfiguration extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String backURL = request.getParameter("back_url");
        if(backURL == null) {
            backURL = "/";
        }
        
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect(backURL);
            return;
        }
        
        request.getRequestDispatcher("bus_seating_configuration.jsp").forward(request, response);
    }
}