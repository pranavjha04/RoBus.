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

@WebServlet("/check_email_exist.do")
public class CheckEmailExistServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String email = request.getParameter("email");

        if(email == null || !FieldManager.validateEmail(email)) {
            response.getWriter().println("Invalid email");
            return;
        }

        boolean isEmailExist = User.checkUniqueEmail(email) && Operator.checkUniqueEmail(email);
        response.getWriter().println(isEmailExist);
    }
}