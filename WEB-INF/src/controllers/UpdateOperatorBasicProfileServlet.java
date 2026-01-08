package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import exceptions.MissingParameterException;

import utils.FieldManager;

import models.Operator;

@WebServlet("/update_operator_basic_profile.do")
public class UpdateOperatorBasicProfileServlet extends HttpServlet {
    private static final String[] acceptedParams = {"full_name", "address", "website"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");

        try {
            for(String next : acceptedParams) {
                if(request.getParameter(next) == null) throw new MissingParameterException();
            }

            String fullName = request.getParameter("full_name");
            String address = request.getParameter("address");
            String website = request.getParameter("website");

            // validate fullname
            boolean isNameValid = FieldManager.validateName(fullName);
            if(!isNameValid) {
                response.getWriter().println("full_name");
                return;
            }

            // validate address
            boolean isAddressValid = FieldManager.validateAddress(address);
            if(!isAddressValid) {
                response.getWriter().println("address");
                return;
            }
            
            // validate website
            if(website.length() > 0) {
                boolean isWebsiteValid = FieldManager.validateWebsite(website);
                if(!isWebsiteValid) {
                    response.getWriter().println("website");
                    return;
                }
            }

            // update from operators table
            boolean isUpdated = Operator.updateBasicInfo(operator.getOperatorId(), fullName, address, website);
            if(!isUpdated) throw new IllegalArgumentException("Internal Server Error");

            // update the session attribute
            Operator newOperatorObj = Operator.getOperatorById(operator.getOperatorId());
            if(newOperatorObj == null) throw new IllegalArgumentException("Internal Server Error");

            session.setAttribute("operator", newOperatorObj);
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