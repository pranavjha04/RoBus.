package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import models.User;
import models.Operator;

import utils.RecaptchaManager;
import utils.FieldManager;

import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;

import java.io.File;
import java.io.IOException;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

@WebServlet("/operator_signup.do")
public class OperatorSignupServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }
        request.getRequestDispatcher("operator_signup.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        String backURL = request.getParameter("back_url");
        
        if(backURL == null) {
            backURL = "/bts";
        }

        // user logged in nahi hai so kick to home page;
        if(session.getAttribute("user") == null) {
            response.sendRedirect(backURL);
            return;
        }

        // user jo logged in uska status verified nahi hai ya phir uska type driver hai toh show him invalid request;
        User user = (User) session.getAttribute("user");
        if(user.getStatus().getStatusId() != 1 || user.getUserType().getUserTypeId() == 3) {
            response.sendRedirect(backURL + "?invalid=true");
            return;
        }

        String errorMessage = ",";
        String params = "";
        
        // check kro multipart content hai kya nahi

        if(ServletFileUpload.isMultipartContent(request)) {
            try {
                // Saare form fields ko get krdo store kro list mei
                List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
                
                // check kro ki form mei kuch hai bhi ya nahi
                if(items.size() == 0) {
                    response.sendRedirect("operator_signup.do?empty_form=true");
                    return;
                }

                // content object 
                ServletContext context = getServletContext();
                // operator ka object bnao empty
                Operator operator = new Operator();

                // operator mei current user set krdo ye help krega userId foregin key daalne mei
                operator.setUser(user);

                // ye mera temp List hai jisme insert hone ke baad mai isse files ko write krunga
                List<FileItem> storedFiles = new ArrayList<>();
                
                // ye mapping zaruir hai fieldName ko fileke random name se link krne mei
                HashMap<String,String> fileMap = new HashMap<>();

                // iterate kro
                for(FileItem item: items) {
                    // fieldName name store kro
                    String fieldName = item.getFieldName();
                    // check kro ki wo simple input field ho koi file input nahi
                    if(item.isFormField()) {
                        // value of the that input field
                        String value = item.getString();
                        // captcha wala alag handle kro
                        if(fieldName.equals("g-recaptcha-response")) {
                            // match nahi hua toh seedha bhaga do or kuch krne he nahi do
                            if(!RecaptchaManager.checkCaptchaValid(value, context.getInitParameter("captcha_secret_key"))) {
                                // captcha invalid hai toh kick user to sign up page
                                response.sendRedirect("operator_signup.do?error_message=" + 0 + ",&" + params);
                                return;
                            }
                        }
                        else {
                            // jo error response code mila hai wo get kro store kro
                            String result = operator.setField(fieldName, value);
                            // agr empty nahi hai mtlb gadbad hai
                            if(!result.equals("")) {
                                errorMessage += result + ',';
                            }
                            else {
                                // password ko hm params mei nahi dikhayge kyuki usme special symbol hote
                                // + secuirity reason baakiyo ko params mei store krdo 
                                // wrna user baar baar input daalega same same
                                if(!fieldName.equals("password")) {
                                    params += fieldName + "=" + value + "&";
                                }
                            }
                        }   
                    }
                    else {
                        
                        // Ab ye saari file inputs hai
                        // inko set krdo and map bhi krdo name, random name se
                        String result = operator.setFile(fieldName, item.getName(), item.getSize(), fileMap);
                        // same check kro response empty toh nahi hai
                        if(!result.equals("")) {
                            errorMessage += result + ',';
                        }
                        // nahi hai toh hamari tempList mei store krdo
                        else {
                            storedFiles.add(item);
                        }
                    }
                }

                // kuch error aaya toh seedha kick krdo error message ke saath and jo params sahi the unke saath 
                if(errorMessage.length() > 1) {
                    response.sendRedirect("operator_signup.do?error_message=" + errorMessage + "&" + params);
                    return;
                }

                // ab generatedId le aao
                int generatedId = operator.addRecord();
                
                // saved record krte time error aagyi
                if(generatedId == -1) { 
                    response.sendRedirect("operator_signup.do?server_invalid=true");
                    return;
                }

                // ek dir bnao jisme store kroge operator ke saari cheeze ko
                File file = new File(context.getRealPath("/WEB-INF/uploads/operator"), generatedId + "");
                file.mkdir();

                // ab wo temp List hai usme iterate krdo and ek ek krke unko write krte jao 
                for(FileItem item : storedFiles) {
                    File currFile = new File(file, fileMap.get(item.getFieldName()));
                    item.write(currFile);
                }

                // user ka type update krdo from passenger to operator
                user.updateUserType(2); // 2 means operator krdo
                // update hone ke baad session mei change krdo user ko with updated values
                session.setAttribute("user", operator.getUser());
                // ab login page bhejdo 
                response.sendRedirect(backURL +"?success=true");
                return;
            }
            catch(FileUploadException e) {
                e.printStackTrace();
                response.sendRedirect("operator_signup.do?server_invalid=true");
                return;
            }
            catch(Exception e) {
                e.printStackTrace();
                response.sendRedirect("operator_signup.do?server_invalid=true");
                return;
            }
        }
        else {
            response.sendRedirect("operator_signup.do?server_invalid=true");
            return;
        }
    }
}