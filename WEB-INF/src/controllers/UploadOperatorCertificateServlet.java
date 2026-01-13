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

import models.Operator;

import utils.FileManager;

@WebServlet("/upload_operator_certificate.do")
public class UploadOperatorCertificateServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session.getAttribute("operator") == null) {
            response.sendRedirect("/robus");
            return;
        }

        Operator operator = (Operator) session.getAttribute("operator");
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
                if(next.getFieldName().equals("certificate")) {
                    target = next;
                    break;
                }
            }

            boolean isFileValid = FileManager.validateFileSize(target.getSize())
                            && FileManager.validateFileExtension(target.getName(), "image");
            
            if(!isFileValid) throw new Exception("Invalid File Type or size");

            // check for already existing image
            File uploadDir = new File(getServletContext().getRealPath("/WEB-INF/uploads/operator"), operator.getOperatorId() + "");

            if(!uploadDir.exists()) {
                throw new Exception();
            }
            File oldCertificateFile = null;

            File[] files = uploadDir.listFiles();
            if (files != null) {
                for (File oldImageFile : files) {
                    if (oldImageFile.getName().contains(operator.getCertificate())) {
                        oldCertificateFile = oldImageFile;
                        break;
                    }
                }
            }

            if (oldCertificateFile != null) {
                boolean deleted = oldCertificateFile.delete();

                if (!deleted) {
                    throw new Exception("Old Certificate could not be deleted");
                }
            }

            String fileName = FileManager.generateFileName(target.getName());
            File currFile = new File(uploadDir, fileName);
            target.write(currFile);
            boolean isUpdated = Operator.updateCertificate(fileName, operator.getOperatorId());
            if(!isUpdated) throw new Exception();

            operator.setCertificate(fileName);
            session.setAttribute("operator", operator);
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