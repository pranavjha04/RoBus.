package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.RegexUtil;
import models.Account;

@WebServlet("/check_duplicate_email.do")
public class CheckDuplicateEmailServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        boolean flag = true;
        String email = request.getParameter("email");

        // FIRST VALIDATE THE MAIL
        flag = RegexUtil.validateEmail(email);

        // CHECK DUPLICATE RECORD IF THE EMAIL IS VALID
        if(flag) {
            flag = Account.checkDuplicateEmail(email);
        }

        response.getWriter().print(flag);
    }
}