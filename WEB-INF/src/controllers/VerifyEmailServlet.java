package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import utils.FieldManager;

@WebServlet("/verify_email.do")
public class VerifyEmailServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        String accountType = null;

        if(request.getParameter("verification_code") == null) {
            request.setAttribute("invalid", true);
        }
        String verificationCode = request.getParameter("verification_code");

        if(session.getAttribute("user") != null) {
            accountType = "user";
        }   
        else if(session.getAttribute("operator") != null) {
            accountType = "operator";
        }

        switch(accountType) {
            case "user" : {
                User user = (User) session.getAttribute("user");
                if(user.getVerificationCode() == null) {
                    request.setAttribute("expired", true);
                    break;
                }
                else if(user.getVerificationCode().equals(verificationCode)) {
                    // db mei save karlo
                    boolean isUpdated = User.updateStatus(user.getUserId(), 1);
                    if(!isUpdated) {
                        request.setAttribute("invalid", true);
                        break;
                    }
                    session.setAttribute("user", user.getRecordByEmail(user.getEmail()));
                    request.setAttribute("valid", true);
                }
                else {
                    request.setAttribute("invalid", true);
                }
                break;
            }
            case "operator" : {
                Operator operator = (Operator) session.getAttribute("operator");
                if(operator.getVerificationCode() == null) {
                    request.setAttribute("expired", true);
                    break;
                }
                else if(operator.getVerificationCode().equals(verificationCode)) {
                    // db mei save karlo
                    boolean isUpdated = Operator.updateStatus(operator.getOperatorId(), 1);
                    if(!isUpdated) {
                        request.setAttribute("invalid", true);
                        break;
                    }
                    session.setAttribute("operator", operator.getOperatorById(operator.getOperatorId()));
                    request.setAttribute("valid", true);
                }
                else {
                    request.setAttribute("invalid", true);
                }
                break;
            }
            default : {
                break;
            }
        }
    }
}