package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import com.google.gson.Gson;

@WebServlet("/get_active_account.do")
public class GetActiveAccountServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("user") != null) {
            response.getWriter().println(new Gson().toJson(session.getAttribute("user")));
        }
        else if(session.getAttribute("operator") != null) {
            response.getWriter().println(new Gson().toJson(session.getAttribute("operator")));
        }
        else {
            response.getWriter().println("invalid");
        }
    }
}