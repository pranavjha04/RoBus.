package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import models.User;
import models.Operator;

import utils.RecaptchaManager;
import utils.FieldManager;

import java.io.IOException;

@WebServlet("/operator_signup.do")
public class OperatorSignupServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }
        request.getRequestDispatcher("operator_signup.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        // user logged in nahi hai so kick to home page;
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }
        // user jo logged in uska status verified nahi hai ya phir uska type driver hai toh show him invalid request;
        User user = (User) session.getAttribute("user");
        if(user.getStatus().getStatusId() != 1 || user.getUserType().getUserTypeId() == 3) {
            response.sendRedirect("/bts?invalid=true");
            return;
        }

        String errorMessage = "";
        String params = "";
        String captchaResponse = request.getParameter("g-recaptcha-response");
        
        // captcha invalid hai 
        if(!RecaptchaManager.checkCaptchaValid(captchaResponse, getServletContext().getInitParameter("captcha_secret_key"))) {
            errorMessage += "0";
            response.getWriter().println(errorMessage);
            return;
        }
        String fullName = request.getParameter("full_name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String contact = request.getParameter("contact");
        String address = request.getParameter("address");
        String website = request.getParameter("website");
        Integer baseCharge = Integer.parseInt(request.getParameter("base_charge"));
        String backURL = request.getParameter("back_url");
        if(backURL == null) {
            backURL = "/bts";
        }

        // full_name validate
        if(!FieldManager.validateName(fullName)) {
            System.out.println("FULL_NAME");
            errorMessage += "1";
        }
        else {
            params += "full_name="+fullName+"&";
        }

        // email validate
        boolean isEmailValid = FieldManager.validateEmail(email) && User.checkUniqueEmail(email) && Operator.checkUniqueEmail(email);

        if(!isEmailValid) {
            System.out.println("EMAIL");

            errorMessage += "2";
        }
        else {
            params += "email="+email+"&";
        }

        // contact validate
        boolean isContactValid = FieldManager.validateContact(contact) && User.checkUniqueContact(contact) && Operator.checkUniqueContact(contact);

        if(!isContactValid) {
            System.out.println("CONTACT");
            errorMessage += "4";
        }
        else{
            params += "contact="+contact+"&";
        }

        // address validate
        if(!FieldManager.validateAddress(address)) {
            System.out.println("ADDRESS");

            errorMessage += "5";
        }
        else {
            params += "address="+address+"&";
        }

        if(website != null && !website.equals(website.trim())) {
            if(!FieldManager.validateWebsite(website)) {
                errorMessage += "6";
            }
            else {
                params += "website="+website+"&";
            }
        }

        if(!FieldManager.validateBaseCharge(baseCharge)) {
            System.out.println("BASE CHARGE");
            errorMessage += "7";
        }
        else {
            params += "base_charge="+baseCharge+"&";
        }

        if(!FieldManager.validatePassword(password)) {
            errorMessage += "3";
        }
    
        String nextPage = "operator_signup.do";
        if(errorMessage.length() > 0) {
            nextPage = "operator_signup.do?error_message="+errorMessage+"&"+params;
        }    
        else {
            Operator operator = new Operator(fullName, contact, email, password, address, website, baseCharge, user);
            if(operator.addRecord()) {
                nextPage = backURL+"?success=true";
            }
        }

        response.sendRedirect(nextPage);
    }
}