package controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import java.sql.Date;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import models.Operator;
import models.Driver;
import models.User;

import utils.FieldManager;
import utils.FileManager;

@WebServlet("/add_driver.do")
public class AddDriverServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/bts");
            return;
        }
        if(!ServletFileUpload.isMultipartContent(request)) {
            response.getWriter().println("invalid");
            return;
        }
        try {
            List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
            if(items.isEmpty()) {
                throw new Exception("invalid");
            }
            List<FileItem> validFiles = new ArrayList<>();
            Operator operator = (Operator) session.getAttribute("operator");
            Integer operatorId = operator.getOperatorId();
            String licenceNumber = null;
            Integer userId = null;
            Date startDate = null;

            for(FileItem item : items) {
                String fieldName = item.getFieldName();
                if(item.isFormField()) {
                    String value = item.getString().trim();
                    if(fieldName.equals("licence_no")) {
                        licenceNumber = value;
                        boolean isValid = FieldManager.validateLicenceNumber(licenceNumber);
                        if(!isValid) throw new Exception();

                        boolean isExist = Driver.checkLicenceNumberExist(licenceNumber);
                        if(isExist) throw new Exception();
                    }
                    else if(fieldName.equals("user_id")) {
                        userId = Integer.parseInt(value);
                    }
                    else if(fieldName.equals("start_date")) {
                        startDate = Date.valueOf(value);
                    }
                }
                else {
                    boolean isFileValid = FileManager.validateFileSize(item.getSize())
                            && FileManager.validateFileExtension(item.getName(), "image");

                    if(isFileValid) {
                        validFiles.add(item);
                    }
                    else {
                        throw new Exception();
                    }
                }
            }

            if(licenceNumber == null || userId == null || startDate == null || validFiles.size() == 0) {
                throw new Exception();
            }

            // check for files
            FileItem licencePic = null;
            for(FileItem item: validFiles) {
                String fieldName = item.getFieldName();
                if(fieldName.equals("profile_pic")) {
                    File uploadDir = new File(getServletContext().getRealPath("/WEB-INF/uploads/user"), userId + "");
                    if(!uploadDir.exists()) {
                        uploadDir.mkdirs();
                    }
                    else {
                        for(File oldImageFile : uploadDir.listFiles()) {
                            oldImageFile.delete();
                        }
                    }
                    String fileName = FileManager.generateFileName(item.getName());
                    File currFile = new File(uploadDir, fileName);
                    item.write(currFile);
                    boolean isUpdated = User.updateProfilePic(fileName, userId);
                    if(!isUpdated) throw new Exception();
                }
                else if(fieldName.equals("licence_pic")) {
                    licencePic = item;
                }
            }
            if(licencePic == null) {
                throw new Exception();
            }   

            // handling licence pic upload
            String licencePicName = FileManager.generateFileName(licencePic.getName());
            int generatedKey = Driver.addRecord(licenceNumber, licencePicName, startDate, userId, operatorId);
            File uploadDir = new File(getServletContext().getRealPath("/WEB-INF/uploads/driver"), generatedKey + "");
            File licenceFile = new File(uploadDir, licencePicName);
            licencePic.write(licenceFile);

            // change user role to driver
            boolean isUpdated = User.updateUserType(userId, 3);
            if(!isUpdated) throw new Exception();

            response.getWriter().println("success");

            // remove cache
            session.removeAttribute("driverList");
        }
        catch(FileUploadException e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
        catch(Exception e) {
            e.printStackTrace();
            response.getWriter().println("invalid");
            return;
        }
    }
}
