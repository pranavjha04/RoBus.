package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import java.util.Enumeration;

import models.User;
import models.Operator;

@WebServlet("/logout.do")
public class LogoutServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        Enumeration<String> attributes = session.getAttributeNames();

        while(attributes.hasMoreElements()) {
            session.removeAttribute(attributes.nextElement());
        } 

        if(session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            if(user.getStatus().getStatusId().equals(2)) {
                User.updateVerificationCode(null, user.getUserId());
            }
        }
        else if(session.getAttribute("operator") != null) {
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                Operator.updateVerificationCode(null, operator.getOperatorId());
            }
        }
        
        response.getWriter().println("ok");
    }
}