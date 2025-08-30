package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/verify_otp.do")
public class VerifyOTPServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String otp = request.getParameter("otp");
        boolean isOTPValid = otp.trim().length() == 6;
        int responseCode = 0;
        if(!isOTPValid) {
            responseCode = 1;
            response.getWriter().println(responseCode);
            return;
        }
        
        HttpSession session = request.getSession();
        if(session.getAttribute("otp") == null) {
            responseCode = 2;
            response.getWriter().println(responseCode);
            return;
        }

        String sessionOTP = (String) session.getAttribute("otp");
        System.out.println(sessionOTP);
        Integer attempt = (Integer) session.getAttribute("remainingAttempts");

        if(sessionOTP.equals(otp)) {
            responseCode = 3;
            System.out.println("YUSSSSSSSSSSSSSSSSSs");
            response.getWriter().println(responseCode);
            session.removeAttribute("otp");
            session.removeAttribute("remainingAttempts");
            return;
        }
        else {
            if(attempt == 1) {
                responseCode = 2;
                session.invalidate();
                response.getWriter().println(responseCode);
                return;
            }

            session.setAttribute("remainingAttempts", attempt - 1);
            String message = "You have " + (attempt - 1) + " ";
            if(attempt - 1 == 1) {
                message += "attemp remaining";
            }
            else {
                message += "attempt's remaining";
            }
            response.getWriter().println(message);
            return;
        }
    }
}