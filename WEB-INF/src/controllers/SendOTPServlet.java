package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldManager;

@WebServlet("/send_otp.do")
public class SendOTPServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String contact = request.getParameter("contact");
        boolean isRegexValid = FieldManager.validateContact(contact);

        if(!isRegexValid) {
            response.getWriter().println(false);
            return;
        }
        
        HttpSession session = request.getSession();
        session.setAttribute("otp", "123456");
        session.setAttribute("remainingAttempts", 3);
        response.getWriter().println(true);
    }
}