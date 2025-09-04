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

@WebServlet("/check_email_exist.do")
public class CheckEmailExistServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String email = request.getParameter("email");
        boolean isValid = FieldManager.validateEmail(email);
        if(!isValid) {
            response.getWriter().println("Invalid");
            return;
        }

        boolean alreadyExist = User.checkEmailExist(email) || Operator.checkEmailExist(email);
        response.getWriter().println(alreadyExist);
    }
}