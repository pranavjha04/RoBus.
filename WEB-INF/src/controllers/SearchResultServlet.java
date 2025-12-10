package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;


@WebServlet("/search_result.do")
public class SearchResultServlet extends HttpServlet {
    private static String[] acceptedParameterList = {"from", "to", "source", "destination", "journey_date"};
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("search_results.jsp").forward(request, response);
    }
    
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        for(String next : acceptedParameterList) {
            if(request.getParameter(next) == null) {
                response.sendRedirect("/bts?invalid=true");
            }
        }
    }
}