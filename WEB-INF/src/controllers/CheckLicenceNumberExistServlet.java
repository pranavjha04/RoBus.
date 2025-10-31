package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.Operator;
import models.Driver;

import utils.FieldManager;


@WebServlet("/check_licence_no.do")
public class CheckLicenceNumberExistServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        String licenceNumber = request.getParameter("licence_no");
        boolean isValidLicenceNumber = FieldManager.validateLicenceNumber(licenceNumber);
        if(!isValidLicenceNumber) {
            response.getWriter().println("invalid");
            return;
        }

        boolean isExists = Driver.checkLicenceNumberExist(licenceNumber);
        response.getWriter().println(isExists);
    }
}