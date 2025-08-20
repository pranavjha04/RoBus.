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
        // 1 MEANS INVALID SESSION OR SERVER ERROR
        // 2 MEANS SESSION OTP MISMATCHED
        // 3 MEANS SESSION OTP SUCCESS

        int responseCode = 1;
        HttpSession session = request.getSession(false);
        String otp = request.getParameter("otp");
        String sessionOTP = (session.getAttribute("otp")).toString();
        System.out.println(otp);
        
        if(sessionOTP != null) {
            if(!sessionOTP.equals(otp)) {
                responseCode = 2;
                System.out.println("Hi");
            }
            else {
                responseCode = 3;
                System.out.println("Hey");
            }
        }
        else {
            System.out.println("Hello");
        }

        response.getWriter().print(responseCode);
    }
}