package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

@WebServlet("/signup.do")
public class SignupServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String nextPage = "signup.jsp?type=";
        String type = request.getParameter("type");

        if(type == "" || type == null) {
            response.sendRedirect("login.do");
        }
        else {
            request.getRequestDispatcher(nextPage + type).forward(request, response);
        }
    }
}