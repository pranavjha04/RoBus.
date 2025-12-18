package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

@WebServlet("/manage_profile.do")
public class OperatorDashboardServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        HttpSession session = request.getSession();

        String nextPage = "manage_user_profile.jsp";
        if(session.getAttribute("operator") != null) {
            nextPage = "manage_operator_profile.jsp";
        }
        request.getRequestDispatcher(nextPage).forward(request, response);
    }
}