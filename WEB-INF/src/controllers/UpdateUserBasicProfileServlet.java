package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import java.sql.Date;

import exceptions.MissingParameterException;

import utils.FieldManager;

import models.User;

@WebServlet("/update_user_basic_profile.do")
public class UpdateUserBasicProfileServlet extends HttpServlet {
    private static final String[] acceptedParams = {"full_name", "dob", "gender"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }

        User user = (User) session.getAttribute("user");

        try {
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) throw new MissingParameterException();
            }

            String fullName = request.getParameter("full_name");
            Date dob = Date.valueOf(request.getParameter("dob"));
            Integer gender = Integer.parseInt(request.getParameter("gender"));

            // validate fullname
            boolean isNameValid = FieldManager.validateName(fullName);
            if(!isNameValid) {
                response.getWriter().println("full_name");
                return;
            }

            // validate dob
            boolean isAgeValid = FieldManager.validateDob(dob);
            if(!isAgeValid) {
                response.getWriter().println("dob");
                return;
            }
            
            // validate gender
            boolean isGenderValid = FieldManager.validateGender(gender);
            if(!isGenderValid) {
                response.getWriter().println("gender");
                return;
            }

            // update from users table
            boolean isUpdated = User.updateBasicInfo(user.getUserId(), fullName, dob, gender);
            if(!isUpdated) throw new IllegalArgumentException("Internal Server Error");

            // update the session attribute
            User newUserObj = User.getUserById(user.getUserId());
            if(newUserObj == null) throw new IllegalArgumentException("Internal Server Error");

            session.setAttribute("user", newUserObj);
            // return ok
            response.getWriter().println("ok");
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(MissingParameterException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}