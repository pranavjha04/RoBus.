package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import java.io.IOException;

import java.util.ArrayList;

import models.Operator;
import models.Driver;
import models.Status;

import utils.AppUtil;

import com.google.gson.Gson;

@WebServlet("/update_driver_status.do")
public class UpdateDriverStatusServlet extends HttpServlet {
    private static String[] acceptedIncludeRequestURL = {"add_bus_schedule.do", "update_schedule_driver.do", "update_schedule_status.do"};
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }
        String requestURLPath = request.getServletPath().substring(1);
        boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestURL);
        Operator operator = (Operator) session.getAttribute("operator");

        try {
            int driverId = -1;
            int statusId = -1;
            Driver driver = null;
            Status status = null;

            if(isIncludeRequest) {
                if(request.getAttribute("driver_id") == null || request.getAttribute("status_id") == null) throw new IllegalArgumentException("Invalid Request");
                driverId = (Integer) request.getAttribute("driver_id");
                statusId = (Integer) request.getAttribute("status_id");
            }
            else {
                if(request.getParameter("driver_id") == null || request.getParameter("status_id") == null) throw new IllegalArgumentException("Invalid Request");
                driverId = Integer.parseInt(request.getParameter("driver_id"));
                statusId = Integer.parseInt(request.getParameter("status_id"));
            }

            String[] cacheList = {"inactiveDriverList", "activeDriverList"};
            String sessionAttribute = null;
            for(String next : cacheList) {
                if(session.getAttribute(next) != null) {
                    @SuppressWarnings("unchecked")
                    ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute(next);
                    for(Driver curr : list) {
                        if(curr.getDriverId().equals(driverId)) {
                            driver = curr;
                            break;
                        }
                    }
                    if(driver != null) {
                        sessionAttribute = next;
                        break;
                    }
                }
            }
            
            if(driver == null) {
                driver = Driver.getRecord(driverId, operator.getOperatorId());
                if(driver == null) throw new IllegalArgumentException("Invalid Request");
            }

            @SuppressWarnings("unchecked")
            ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

            for(Status next : statusList) {
                if(next.getStatusId().equals(statusId)) {
                    status = next;
                    break;
                }
            }
            if(status == null) throw new IllegalArgumentException("Invalid Request");

            String targetAttribute;
            switch(status.getName()) {
                case "Active" : {
                    targetAttribute = "inactiveDriverList";
                    break;
                }
                case "Inactive" : {
                    targetAttribute = "activeDriverList";
                    break;
                }
                default : {
                    throw new IllegalArgumentException("Invalid Request");
                }
            }
        
            
            request.setAttribute("user_id", driver.getUser().getUserId());
            request.getRequestDispatcher("update_user_status.do").include(request, response);

            Object obj = request.getAttribute("isUpdated");
            if(obj == null || !((Boolean) obj)) {
                throw new IllegalArgumentException("Invalid Request");
            }

            driver.getUser().setStatus(status);

            if(sessionAttribute != null) {
                @SuppressWarnings("unchecked")
                ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute(sessionAttribute);
                final int targetDriverId = driverId;
                list.removeIf((d) -> d.getDriverId().equals(targetDriverId));
            }

            session.removeAttribute(targetAttribute);
            if(isIncludeRequest) {
                request.setAttribute("isUpdated", true);
            }    
            else {
                response.getWriter().println("ok");
            }
        }
        catch(IllegalArgumentException e) {
            e.printStackTrace();
            if(isIncludeRequest) {
                request.setAttribute("isUpdated", false);
            }
            else {
                response.getWriter().println("invalid");
            }
        }
        finally {
            request.removeAttribute("user_id");
        }
    }
}