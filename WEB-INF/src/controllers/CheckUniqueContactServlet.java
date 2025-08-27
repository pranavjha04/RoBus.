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

@WebServlet("/check_unique_contact.do")
public class CheckUniqueContactServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String contact = request.getParameter("contact");
        boolean isValid = FieldManager.validateContact(contact);
        if(!isValid) {
            response.getWriter().println(false);
            return;
        }

        boolean isUnique = User.checkUniqueContact(contact) && Operator.checkUniqueContact(contact);
        response.getWriter().println(isUnique);
    }
}