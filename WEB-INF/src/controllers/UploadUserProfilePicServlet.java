package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.io.File;

import java.util.List;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import models.User;

import utils.FileManager;

@WebServlet("/upload_user_profile_pic.do")
public class UploadUserProfilePicServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("user") == null) {
            response.sendRedirect("/bts");
            return;
        }

        User user = (User) session.getAttribute("user");
        if(!ServletFileUpload.isMultipartContent(request)) {
            response.getWriter().println("invalid");
            return;
        }

        try {
            List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
            if(items.isEmpty() || items.size() > 1) {
                throw new Exception("Invalid Request");
            }

            FileItem target = null;
            for(FileItem next : items) {
                if(next.getFieldName().equals("pic")) {
                    target = next;
                    break;
                }
            }

            boolean isFileValid = FileManager.validateFileSize(target.getSize())
                            && FileManager.validateFileExtension(target.getName(), "image");
            
            if(!isFileValid) throw new Exception("Invalid File Type or size");

            // check for already existing image
            File uploadDir = new File(getServletContext().getRealPath("/WEB-INF/uploads/user"), user.getUserId() + "");

            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            else {
                for(File oldImageFile : uploadDir.listFiles()) {
                    oldImageFile.delete();
                }
            }

            String fileName = FileManager.generateFileName(target.getName());
            File currFile = new File(uploadDir, fileName);
            target.write(currFile);
            boolean isUpdated = User.updateProfilePic(fileName, user.getUserId());
            if(!isUpdated) throw new Exception();

            user.setProfilePic(fileName);
            session.setAttribute("user", user);
            response.getWriter().println("ok");
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