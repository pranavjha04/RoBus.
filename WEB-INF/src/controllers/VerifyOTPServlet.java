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
        // 1 = invalid session / expired
        // 2 = otp mismatch
        // 3 = otp success
        int responseCode = 1;
        HttpSession session = request.getSession(false);
        String otp = request.getParameter("otp");
        String sessionOTP = (session.getAttribute("otp") == null ? "" : session.getAttribute("otp")).toString();
        
        if(!sessionOTP.equals(otp)) {
            responseCode = 2;
        }
        else {
            responseCode = 3;
        }

        response.getWriter().print(responseCode);
    }
}
