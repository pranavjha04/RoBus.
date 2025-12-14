package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import java.util.Enumeration;

@WebServlet("/logout.do")
public class LogoutServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        Enumeration<String> attributes = session.getAttributeNames();

        while(attributes.hasMoreElements()) {
            session.removeAttribute(attributes.nextElement());
        } 

        response.getWriter().println("ok");
    }
}