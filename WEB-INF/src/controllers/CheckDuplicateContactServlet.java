package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.RegexUtil;
import models.Account;

@WebServlet("/check_duplicate_contact.do")
public class CheckDuplicateContactServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        boolean flag = true;
        String contact = request.getParameter("contact");

        // FIRST VALIDATE THE CONTACT
        flag = RegexUtil.validateContact(contact);

        // CHECK DUPLICATE RECORD IF THE CONTACT IS VALID
        if(flag) {
            flag = Account.checkDuplicateContact(contact);
        }

        response.getWriter().print(flag);
    }
}