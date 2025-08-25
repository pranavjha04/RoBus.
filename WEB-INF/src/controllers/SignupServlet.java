package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.util.List;
import java.sql.Date;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.FileItem;

import utils.FieldUtil;
import utils.RecaptchaManager;

@WebServlet("/signup.do")
public class SignupServlet extends HttpServlet {
    
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String nextPage = "signup.jsp?type=";
        String type = request.getParameter("type");
        request.getRequestDispatcher(type == null ? nextPage : nextPage + type).forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/plain");
        /*
         RESPONSE CODE 
         * 1 is Not Multipart Content
         * 2 is Not Valid Field Input
         * 3 is Form Valid
         */
        int responseCode = 1;
        Date date = null;
        try {
            if (!ServletFileUpload.isMultipartContent(request)) {
                responseCode = 1;
            }
            else {
                List<FileItem> fileItems = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
                User user = new User();
                boolean areFieldsValid = true;
                for (FileItem item : fileItems) {
                    boolean flag = true;
                    String fieldName = item.getFieldName();
                    if(item.isFormField()) {
                        String value = item.getString();
                        if(fieldName.equals("g-recaptcha-response")) {
                            flag = RecaptchaManager.checkCaptchaValid(value, getServletContext().getInitParameter("captcha_secret_key"));
                        }
                        else {
                            flag = FieldUtil.validateField(fieldName, value);
                        }

                        if(flag) {
                            user.setField(fieldName, value);
                        }
                    }
                    else {
                        if(FieldUtil.validateFileExtension(item.getName())) {
                            long maxFileSize = 5 * 1024L * 1024L; 
                            if (item.getSize() > maxFileSize) {
                                flag = false;
                            }
                        }
                        else {   
                            flag = false;
                        }
                    }
                    if(!flag) {
                        areFieldsValid = false;
                        responseCode = 2;
                        break;
                    }
                }

                if(areFieldsValid) {
                    responseCode = 3;
                }
            }

        } catch (FileUploadException e) {
            e.printStackTrace();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.getWriter().print(responseCode);
    }
}

// @RESPONSE CODE
        /*  
            1 means Recaptcha Invalid 
            2 means Not Multipart Content

         */