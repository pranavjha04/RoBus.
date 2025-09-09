package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import models.Operator;
import models.User;

@WebServlet("/get_active_account.do")
public class GetActiveAccountServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String accountType = request.getParameter("accountType");
        HttpSession session = request.getSession();
        if(accountType == null || accountType.isEmpty() || session.getAttribute(accountType) == null) {
            response.getWriter().println("invalid");
            return;
        }

        if(accountType.equals("user")) {

        }
        switch(accountType) {
            case "user": 
                User activeUser = (User) session.getAttribute(accountType);
                response.getWriter().println(activeUser.getUserId());
                break;
            case "operator":
                Operator activeOperator = (Operator) session.getAttribute(accountType);
                response.getWriter().println(activeOperator.getOperatorId());
                break;
            default:
                response.getWriter().println("invalid");
                break;
        }
    }
}