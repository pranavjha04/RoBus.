package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.User;
import models.Operator;

import utils.FieldManager;

@WebServlet("/check_unique_email.do")
public class CheckUniqueEmailServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String email = request.getParameter("email");
        boolean isValid = FieldManager.validateEmail(email);
        if(!isValid) {
            response.getWriter().println(false);
            return;
        }

        boolean isUnique = User.checkUniqueEmail(email) && Operator.checkUniqueEmail(email);
        response.getWriter().println(isUnique);
    }
}