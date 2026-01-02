package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import com.google.gson.Gson;

import models.User;

@WebServlet("/get_active_user.do")
public class GetActiveUserAccountServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.getWriter().println("invalid");
            return;
        }



        response.getWriter().println(new Gson().toJson((session.getAttribute("user"))));
    }
}