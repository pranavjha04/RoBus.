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

import models.User;
import models.Operator;
import models.Account;

import utils.FieldManager;
import utils.RecaptchaManager;
import utils.FileManager;

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
         * 0 is Excpetion Occured
         * 1 is Not Multipart Content
         * 2 is Captcha invalid
         * 3 is Invalid field
         * 4 is Invalid file
         * 5 is Error while saving
         * 6 is Valid Form
         */
        Integer accountType = Integer.parseInt(request.getParameter("accountType"));
        try {
            if (!ServletFileUpload.isMultipartContent(request)) {
                response.getWriter().print(1);
                return;
            }
            else {
                List<FileItem> fileItems = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
                Account account = accountType == 1 ? new User() : new Operator();
                boolean areFieldsValid = true;
                for(FileItem item: fileItems) {
                    // GET THE NAME OF THE FIELD
                    String fieldName = item.getFieldName();
                    
                    // FORM FIELD 
                    if(item.isFormField()) {
                        // GET THE VALUE OF THE FIELD
                        String value = item.getString();
                        // RECAPTCHA VALIDATE
                        if(fieldName.equals("g-recaptcha-response")) {
                            // CHECK CAPTCHA INVALID THEN BREAK THE LOOP
                            if(!RecaptchaManager.checkCaptchaValid(value, getServletContext().getInitParameter("captcha_secret_key"))) {
                                System.out.println(fieldName + "----captcha");
                                response.getWriter().print(2); 
                                return;
                            }
                        }
                        else {
                            // CHECK OTHER FIELD AS IF THEY ARE VALID
                            boolean flag = FieldManager.validateField(fieldName, value);
                            if(!flag) {
                                System.out.println(fieldName);
                                response.getWriter().print(3);
                                return;
                            }
                            account.setField(fieldName, value);
                        }
                    }
                    else { // FILE FIELD
                        
                        // MEANS THE IMAGE IS UPLOADED
                        long size = item.getSize();
                        if(size > 0) {
                            String name = item.getName();
                            if(FileManager.validateFileSize(size) && FileManager.validateFileExtension(name, "image")) {
                                String fileName = FileManager.generateFileName(name);
                                // account.setFile(fieldName, fileName);
                            }
                            else {
                                response.getWriter().print(4);
                                return;
                            }
                        }
                        else {
                            System.out.println(fieldName + " Not Uploaded");
                        }
                    }
                }

                System.out.println("Sab changa si");
                boolean insrted = account.saveRecord();
                System.out.println(insrted);
                // if(!isInserted) {
                //     response.getWriter().print(5);
                //     return;
                // }
                // else {
                //     response.getWriter().print(6);
                //     return;
                // }
            }

        } catch (FileUploadException e) {
            e.printStackTrace();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

