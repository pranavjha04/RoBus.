package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import utils.AppUtil;
import utils.RegexUtil;

@WebServlet("/send_otp.do")
public class SendOTPServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        boolean flag = true;
        String contact = request.getParameter("contact");

        flag = RegexUtil.validateContact(contact);
        if(flag) {
            int otp = AppUtil.generateRandomOTP();
            System.out.println("OTP ------" + otp);
            session.setAttribute("otp", otp);
            session.setMaxInactiveInterval(30);
        }

        response.getWriter().print(flag);
    }
}