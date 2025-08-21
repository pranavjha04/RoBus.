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
        Integer attempt = (Integer) session.getAttribute("attempt");
        String sessionOTP = (session.getAttribute("otp") == null ? "" : session.getAttribute("otp")).toString();
        
        if(!sessionOTP.equals(otp)) {
            responseCode = 2; // MISMATCH HOGYA
            System.out.println(attempt);
            attempt++;
            session.setAttribute("attempt", attempt);
            
        }
        else {
            responseCode = 3; // MATCH HOGYA
        }

        if(responseCode == 1 || attempt == 4) {
            session.invalidate();
            session.removeAttribute("otp");
            session.removeAttribute("attempt");
        }

        response.getWriter().print(responseCode);
    }
}

