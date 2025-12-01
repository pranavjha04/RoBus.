// package controllers;

// import javax.servlet.http.HttpServlet;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import javax.servlet.http.HttpSession;
// import javax.servlet.annotation.WebServlet;
// import javax.servlet.ServletException;

// import java.io.IOException;

// import java.util.ArrayList;

// import models.Operator;
// import models.Driver;
// import models.Status;

// import utils.AppUtil;

// import com.google.gson.Gson;

// @WebServlet("/update_driver_status.do")
// public class UpdateDriverStatusServlet extends HttpServlet {
//     private static String[] acceptedIncludeRequestURL = {"add_bus_schedule.do"};
//     public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//         HttpSession session = request.getSession();
//         if(session.getAttribute("operator") == null) {
//             response.sendRedirect("/bts");
//             return;
//         }
//         String requestURLPath = request.getServletPath().substring(1);
//         boolean isIncludeRequest = AppUtil.isIncludeRequest(requestURLPath, acceptedIncludeRequestURL);
//         Operator operator = (Operator) session.getAttribute("operator");

//         try {
//             int driverId = -1;
//             int statusId = -1;
//             Driver driver = null;
//             Status status = null;

//             if(isIncludeRequest) {
//                 if(request.getAttribute("driver_id") == null || request.getAttribute("status_id") == null) throw new IllegalArgumentException("Invalid Request");
//                 driverId = (Integer) request.getAttribute("driver_id");
//                 statusId = (Integer) request.getAttribute("status_id");
//             }
//             else {
//                 if(request.getParameter("driver_id") == null || request.getParameter("status_id") == null) throw new IllegalArgumentException("Invalid Request");
//                 driverId = Integer.parseInt(request.getParameter("driver_id"));
//                 statusId = Integer.parseInt(request.getParameter("status_id"));
//             }

//             final String CACHE_ATTRIBUTE = "inactiveDriverList";
//             if(session.getAttribute(CACHE_ATTRIBUTE) != null) {
//                 @SuppressWarnings("unchecked")
//                 ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute(CACHE_ATTRIBUTE);

//                 for(Driver next : list) {
//                     if(next.getDriverId().equals(driverId)) {
//                         driver = next;
//                         break;
//                     }
//                 }
//             }
//             else {
//                 driver = Driver.getRecord(driverId, operator.getOperatorId());
//                 if(driver == null) throw new IllegalArgumentException("Invalid Request");
//             }

//             @SuppressWarnings("unchecked")
//             ArrayList<Status> statusList = (ArrayList<Status>) getServletContext().getAttribute("statusList");

//             for(Status next : statusList) {
//                 if(next.getStatusId().equals(statusId)) {
//                     status = next;
//                     break;
//                 }
//             }
//             if(status == null) throw new IllegalArgumentException("Invalid Request");

//             String targetAttribute;
//             if("Active".equals(status.getName())) {
//                 targetAttribute = "inactiveDriverList";
//             }
//             else if("Inctive".equals(status.getName())) {
//                 targetAttribute = "activeDriverList";
//             }
//             else {
//                 throw new IllegalArgumentException("Invalid Request");
//             }
            
//             request.setAttribute("user_id", driver.getUser().getUserId());
//             request.getRequestDispatcher("update_user_status.do").include(request, response);

//             Object obj = request.getAttribute("isUpdated");
//             if(obj == null || !((Boolean) obj)) {
//                 throw new IllegalArgumentException("Invalid Request");
//             }

//             driver.getUser().setStatus(status);
//             if(session.getAttribute(CACHE_ATTRIBUTE) != null) {
//                 @SuppressWarnings("unchecked")
//                 ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute(CACHE_ATTRIBUTE);

//                 list.removeIf((d) -> d.getDriverId().equals(driverId));
//             }     

//             if(session.getAttribute(targetAttribute) != null) {
//                 @SuppressWarnings("unchecked")
//                 ArrayList<Driver> list = (ArrayList<Driver>) session.getAttribute(targetAttribute);
//                 list.removeIf((d) -> d.getDriverId().equals(driverId));
//                 if(list.size() == 0) {
//                     session.removeAttribute(targetAttribute);
//                 }
//             }    

//             if(isIncludeRequest) {
//                 request.setAttribute("isUpdated", true);
//             }    
//             else {
//                 response.getWriter().println("ok");
//             }
//         }
//         catch(IllegalArgumentException e) {
//             e.printStackTrace();
//             if(!isIncludeRequest) {
//                 request.setAttribute("isUpdated", false);
//             }
//             else {
//                 response.getWriter().println("invalid");
//             }
//         }
//     }
// }