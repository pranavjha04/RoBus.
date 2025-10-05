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
import models.BusFareFactor;

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
                response.getWriter().println("Invalid");
                return;
            }
            ServletContext context = this.getServletContext();

            List<FileItem> validFiles = new ArrayList<>();
            List<FileItem> fareFactors = new ArrayList<>();
            Integer manufacturerId = -1;
            
            Operator operator = (Operator) session.getAttribute("operator");

            Bus bus = new Bus();
            bus.setOperator(operator);

            StringBuilder errorMessage = new StringBuilder();
            boolean hasInvalidFiles = false;

            for (FileItem item : items) {
                String fieldName = item.getFieldName();
                if (item.isFormField()) {
                    if(fieldName.equals("fare_factor")) {
                        fareFactors.add(item);
                        continue;
                    }
                    String value = item.getString().trim();

                    // enum values
                    if(fieldName.equals("manufacturer_id")) {
                        manufacturerId = Integer.parseInt(value);
                        continue;
                    }

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

            if(fareFactors.size() == 0) {
                response.getWriter().println("Invalid");
                return;
            }

            if (hasInvalidFiles) {
                errorMessage.append("3");
            }

            if (errorMessage.length() > 0) {
                response.getWriter().println(errorMessage.toString());
                return;
            }

            if(manufacturerId <= 0) {
                response.getWriter().println("Invalid");
                return;
            }

            int generatedId = bus.addRecord(manufacturerId); // passing enums
            if (generatedId == -1) {
                response.getWriter().println("Internal server error");
                return;
            }

            bus.setBusId(generatedId);

            for(FileItem item : fareFactors) {
                Integer operatorTicketFareId = Integer.parseInt(item.getString().trim());

                boolean success = BusFareFactor.addRecord(bus.getBusId(), operatorTicketFareId);

                if(!success) {
                    response.getWriter().println("Invalid");
                    return;
                }
            }

            File uploadDir = new File(context.getRealPath("/WEB-INF/uploads/bus"), String.valueOf(generatedId));
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            for (FileItem item : validFiles) {
                String fileName = FileManager.generateFileName(item.getName());
                boolean success = BusImage.addRecord(fileName, bus.getBusId());
                if(!success) {
                    response.getWriter().println("Invalid");
                    return;
                }

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
