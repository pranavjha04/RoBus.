package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.util.UUID;

import models.Operator;
import models.User;
import models.Status;

import utils.AppUtil;
import utils.EmailHandler;

@WebServlet("/send_verification_email.do")
public class SendVerificationEmailServlet extends HttpServlet {
    public boolean checkAccountNotVerified(Status status) {
        return status.getStatusId().equals(2);
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        final String APP_URL = getServletContext().getInitParameter("app_url");

        if(session.getAttribute("operator") != null) {
            Operator operator = (Operator) session.getAttribute("operator");
            boolean isUnverified = checkAccountNotVerified(operator.getStatus());
            if(!isUnverified) {
                response.getWriter().println("invalid");
                return;
            }

            String verificationCode = UUID.randomUUID().toString();

            boolean isVerificationCodeSet = operator.updateVerificationCode(verificationCode, operator.getOperatorId());

            if(!isVerificationCodeSet) {
                response.getWriter().println("invalid");
                return;
            }
            
            operator.setVerificationCode(verificationCode);

            boolean isSent = EmailHandler.sendVerificationMail(operator.getEmail(), operator.getFullName(), AppUtil.generateVerificationURL(APP_URL, verificationCode));

            if(!isSent) response.getWriter().println("internal");

            response.getWriter().println("Verification email has been successfully sent to " + operator.getEmail());
        }
        else if(session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            boolean isUnverified = checkAccountNotVerified(user.getStatus());
            if(!isUnverified) {
                response.getWriter().println("invalid");
                return;
            }
            String verificationCode = UUID.randomUUID().toString();

            boolean isVerificationCodeSet = user.updateVerificationCode(verificationCode, user.getUserId());
            
            if(!isVerificationCodeSet) {
                response.getWriter().println("invalid");
                return;
            }

            
            user.setVerificationCode(verificationCode);

            boolean isSent = EmailHandler.sendVerificationMail(user.getEmail(), user.getFullName(), AppUtil.generateVerificationURL(APP_URL, verificationCode));

            if(!isSent) response.getWriter().println("internal");

            response.getWriter().println("Verification email has been successfully sent to " + user.getEmail());
            
        }
        else {
            return;
        }
    }
}