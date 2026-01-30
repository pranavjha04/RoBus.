package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;

import exceptions.MissingParameterException;
import utils.EmailHandler;

@WebServlet("/send_help_query.do")
public class SendHelpQueryServlet extends HttpServlet {
    private static String[] acceptedParamList = {"subject", "message"};
    final static private Integer MIN_SUBJECT_LENGTH = 10;
    final static private Integer MIN_MESSAGE_LENGTH = 10;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        try {
            for(String next : acceptedParamList) {
                if(request.getParameter(next) == null) {
                    throw new MissingParameterException();
                }
            }
            String subject = request.getParameter("subject");
            String message = request.getParameter("message");

            if(subject.length() < MIN_SUBJECT_LENGTH || message.length() < MIN_MESSAGE_LENGTH) {
                response.getWriter().println("no");
                return;
            }

            boolean isSent = EmailHandler.sendHelpQueryMail(subject, message);
            response.getWriter().println(isSent ? "ok" : "no");
        }
        catch(MissingParameterException e) {
            e.printStackTrace();
            response.getWriter().println("no");
            return;
        }
    }
}