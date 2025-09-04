package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import utils.FieldManager;

import models.User;
import models.Operator;

import exceptions.PasswordMismatchException;


@WebServlet("/login.do")
public class LoginServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        String errorMessage = "";
        String params = "";
        boolean isEmailRegValid = FieldManager.validateEmail(email);
        boolean isPasswordRegValid = FieldManager.validatePassword(password);

        if(!isEmailRegValid) {
            errorMessage += "1";
        }
        else {
            params += "email="+email;
        }

        if(!isPasswordRegValid) {
            errorMessage += "2";
        }

        if(isEmailRegValid && isPasswordRegValid) {
            boolean found = false;
            // user mei record milgya
            if(User.checkEmailExist(email)) {
                found = true;
                try {
                    User user = User.login(email, password);
                    if(user != null) {
                        HttpSession session = request.getSession();
                        if(session.getAttribute("operator") != null) {
                            session.removeAttribute("operator");
                        }
                        session.setAttribute("user", user);
                        response.sendRedirect("/bts");
                        return;
                    }
                }
                catch(PasswordMismatchException e) {
                    errorMessage += "3";
                    e.printStackTrace();
                }
            }

            if(!found && Operator.checkEmailExist(email)) {
                found = true;
                try {
                    Operator operator = Operator.login(email, password);
                    if(operator != null) {
                        HttpSession session = request.getSession();
                        if(session.getAttribute("user") != null) {
                            session.removeAttribute("user");
                        }
                        session.setAttribute("operator", operator);
                        response.sendRedirect("operator_dashboard.do");
                        return;
                    }
                }
                catch(PasswordMismatchException e) {
                    errorMessage += "3";
                    e.printStackTrace();
                }
            }

            if(!found) {
                errorMessage += "4";
            }
        }

        response.sendRedirect("login.do?error_message="+errorMessage+"&"+params);
    }
}