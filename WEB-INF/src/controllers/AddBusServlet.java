package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.IOException;
import java.io.File;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

import utils.FileManager;

import models.Operator;
import models.Bus;
import models.BusImage;

@WebServlet("/add_bus.do")
public class AddBusServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();

        if(session.getAttribute("operator") == null) {
            response.getWriter().println("Invalid req");
            return;
        } 

        if(ServletFileUpload.isMultipartContent(request)) {
            try {
                List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

                if(items.size() == 0) {
                    response.getWriter().println("Invalid req");
                    return;
                }

                List<FileItem> storedItems = new ArrayList<>();
                ServletContext context = getServletContext();

                Operator operator = (Operator) session.getAttribute("operator");

                Bus bus = new Bus();

                bus.setOperator(operator);
                String errorMessage = "";
                boolean wasFileInvalid = false;
                for(FileItem item : items) {
                    String fieldName = item.getFieldName();
                    if(item.isFormField()) {
                        String value = item.getString();
                        errorMessage += bus.setField(fieldName, value.trim());
                    }
                    else {
                        boolean isFileValid = FileManager.validateFileSize(item.getSize()) && FileManager.validateFileExtension(item.getName(), "image");
                        if(isFileValid) {
                            storedItems.add(item);
                        }
                        else {
                            wasFileInvalid = true;
                        }
                    }
                }

                if(wasFileInvalid) {
                    errorMessage += "3";
                }

                if(errorMessage.length() > 0) {
                    response.getWriter().println(errorMessage);
                    return;
                }

                int generatedId = bus.addRecord();
                if(generatedId == -1) {
                    response.getWriter().println("Internal server error");
                    return;
                }
                bus.setBusId(generatedId);
                File file = new File(context.getRealPath("/WEB-INF/uploads/bus"), generatedId + "");
                file.mkdir();

                for(FileItem item: storedItems) {
                    String randomFileName = FileManager.generateFileName(item.getName());

                    BusImage image = new BusImage(randomFileName, bus);
                    image.addRecord();

                    File currFile = new File(file, randomFileName);
                    item.write(currFile);
                }

                response.getWriter().println("success");
                return;
            }
            catch(FileUploadException e) {
                e.printStackTrace();
            }
            catch(Exception e) {
                e.printStackTrace();
            }
        }
        else {
            response.getWriter().println("Invalid req");
            return;
        }
    }
}