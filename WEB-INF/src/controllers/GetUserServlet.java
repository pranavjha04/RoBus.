package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import com.google.gson.Gson;

import models.User;

import utils.FieldManager;

@WebServlet("/get_user_via_mail.do")
public class GetUserServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.getWriter().println("invalid");
            return;
        }

        String email = request.getParameter("email");
        boolean isValidEmail = FieldManager.validateEmail(email);
        if(!isValidEmail) {
            response.getWriter().println("invalid");
            return;
        }

        User user = User.getRecordByEmail(email);
        if(user == null) {
            response.getWriter().println("invalid");
            return;
        }

        response.getWriter().println(new Gson().toJson(user));
    }
}