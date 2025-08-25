package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldUtil;

import models.User;
import models.Operator;

@WebServlet("/check_unique_contact.do")
public class CheckUniqueContactServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        boolean flag = true;
        String contact = request.getParameter("contact");

        // FIRST VALIDATE THE CONTACT
        flag = FieldUtil.validateContact(contact);

        // CHECK DUPLICATE RECORD IF THE CONTACT IS VALID
        if(flag) {
            flag = User.checkUniqueContact(contact) && Operator.checkUniqueContact(contact);
        }

        response.getWriter().print(flag);
    }
}