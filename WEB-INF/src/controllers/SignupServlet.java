package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.List;
import java.sql.Date;

import java.io.File;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.FileItem;

import models.User;
import models.Operator;

import utils.FieldManager;
import utils.RecaptchaManager;
import utils.FileManager;

@WebServlet("/signup.do")
public class SignupServlet extends HttpServlet {
    
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("signup.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        // captcha
        String errorMessage = "";
        String params = "";
        String captchaResponse = request.getParameter("g-recaptcha-response");
        if(!RecaptchaManager.checkCaptchaValid(captchaResponse, getServletContext().getInitParameter("captcha_secret_key"))) {
            errorMessage += "0";
            response.getWriter().println(errorMessage);
            return;
        }


        String fullName = request.getParameter("full_name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String contact = request.getParameter("contact");
        String dob = request.getParameter("dob");
        Integer gender = Integer.parseInt(request.getParameter("gender") == null ? "0" : request.getParameter("gender"));


        // full_name validate
        if(!FieldManager.validateName(fullName)) {
            errorMessage += "1";
        }
        else {
            params += "full_name="+fullName+"&";
        }

        // email validate
        boolean isEmailValid = FieldManager.validateEmail(email) && !User.checkEmailExist(email) && !Operator.checkEmailExist(email);

        if(!isEmailValid) {
            errorMessage += "2";
        }
        else {
            params += "email="+email+"&";
        }

        // contact validate
        boolean isContactValid = FieldManager.validateContact(contact) && !User.checkContactExist(contact) && !Operator.checkContactExist(contact);

        if(!isContactValid) {
            errorMessage += "4";
        }
        else{
            params += "contact="+contact+"&";
        }

        // dob validate
        if(!FieldManager.validateDob(dob)) {
            errorMessage += "5";
        }
        else {
            params += "dob="+dob+"&";
        }

        // gender validate
        if(!FieldManager.validateGender(gender)) {
            errorMessage += "6";
        }
        else {
            params += "gender="+gender+"&";
        }

        // password validate
        if(!FieldManager.validatePassword(password)) {
            errorMessage += "3";
        }
        
        String nextPage = "signup.do";
        if(errorMessage.length() > 0) {
            nextPage = "signup.do?error_message="+errorMessage+"&"+params;
        }
        else {
            User user = new User(fullName, contact, email, password, Date.valueOf(dob), gender);

            if(user.addRecord()) {
                nextPage = "login.do?success=true";
            }
        }
        response.sendRedirect(nextPage);
    }
}

