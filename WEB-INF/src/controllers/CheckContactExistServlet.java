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

@WebServlet("/check_contact_exist.do")
public class CheckContactExistServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String contact = request.getParameter("contact");
        boolean isValid = FieldManager.validateContact(contact);
        if(!isValid) {
            response.getWriter().println("Invalid");
            return;
        }

        boolean alreadyExist = User.checkContactExist(contact) || Operator.checkContactExist(contact);
        response.getWriter().println(alreadyExist);
    }
}