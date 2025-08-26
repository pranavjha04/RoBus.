package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldManager;

import models.User;
import models.Operator;

@WebServlet("/check_unique_email.do")
public class CheckUniqueEmailServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        boolean flag = true;
        String email = request.getParameter("email");

        // FIRST VALIDATE THE MAIL
        flag = FieldManager.validateEmail(email);

        // CHECK DUPLICATE RECORD IF THE EMAIL IS VALID
        if(flag) {
            flag = User.checkUniqueEmail(email) && Operator.checkUniqueEmail(email);
        }

        response.getWriter().print(flag);
    }
}