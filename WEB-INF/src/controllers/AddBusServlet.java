package controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import models.Bus;
import models.BusImage;
import models.Operator;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.gson.Gson;

import utils.FileManager;

@WebServlet("/add_bus.do")
public class AddBusServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        HttpSession session = request.getSession();

        if (session.getAttribute("operator") == null) {
            response.getWriter().println("Invalid req");
            return;
        }

        if (!ServletFileUpload.isMultipartContent(request)) {
            response.getWriter().println("Invalid");
            return;
        }

        try {
            List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

            if (items.isEmpty()) {
                response.getWriter().println("Invalid req");
                return;
            }

            List<FileItem> validFiles = new ArrayList<>();
            ServletContext context = this.getServletContext();
            Operator operator = (Operator) session.getAttribute("operator");

            Bus bus = new Bus();
            bus.setOperator(operator);

            StringBuilder errorMessage = new StringBuilder();
            boolean hasInvalidFiles = false;

            for (FileItem item : items) {
                String fieldName = item.getFieldName();

                if (item.isFormField()) {
                    String value = item.getString().trim();
                    errorMessage.append(bus.setField(fieldName, value));
                } else {
                    boolean isFileValid = FileManager.validateFileSize(item.getSize())
                            && FileManager.validateFileExtension(item.getName(), "image");

                    if (isFileValid) {
                        validFiles.add(item);
                    } else {
                        hasInvalidFiles = true;
                    }
                }
            }

            if (hasInvalidFiles) {
                errorMessage.append("3");
            }

            if (errorMessage.length() > 0) {
                response.getWriter().println(errorMessage.toString());
                return;
            }

            int generatedId = bus.addRecord();
            if (generatedId == -1) {
                response.getWriter().println("Internal server error");
                return;
            }

            bus.setBusId(generatedId);

            File uploadDir = new File(context.getRealPath("/WEB-INF/uploads/bus"), String.valueOf(generatedId));
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            for (FileItem item : validFiles) {
                String fileName = FileManager.generateFileName(item.getName());
                BusImage busImg = new BusImage(fileName, bus);
                busImg.addRecord();

                File currFile = new File(uploadDir, fileName);
                item.write(currFile);
            }

            response.getWriter().println(new Gson().toJson(bus));

        } catch (FileUploadException e) {
            e.printStackTrace();
            response.getWriter().println("File upload error");
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("Internal error");
        }
    }
}
