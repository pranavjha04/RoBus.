package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.Operator;
import models.User;
import models.Status;

@WebServlet("/send_verification_email.do")
public class SendVerificationEmailServlet extends HttpServlet {
    public boolean checkAccountNotVerified(Status status) {
        return !status.getStatusId().equals(1);
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") != null) {
            Operator operator = (Operator) session.getAttribute("operator");
            boolean isUnverified = checkAccountNotVerified(operator.getStatus());
            if(!isUnverified) return;

            
        }
        else if(session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            boolean isUnverified = checkAccountNotVerified(user.getStatus());
            if(!isUnverified) return;
        }
        else {
            return;
        }
    }
}