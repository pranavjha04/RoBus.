package controllers;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

@WebServlet("/show_image.do")
public class ShowImageServlet extends HttpServlet {
    private static String[] acceptedParameterList = {"target", "id", "name"};
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        for(String next : acceptedParameterList) {
            if(request.getParameter(next) == null) {
                return;
            }
        }

        ServletContext context = getServletContext();

        String target = request.getParameter("target");
        String name = request.getParameter("name");
        Integer id = Integer.parseInt(request.getParameter("id"));
        String targetPath = context.getRealPath("/WEB-INF/uploads/" + target + "/" + id);

        File directory = new File(targetPath);
        File imageFile = new File(directory, name);
        if(!directory.isDirectory()) {
            if(target.equals("user")) {
                targetPath = context.getRealPath("/WEB-INF/uploads/commons");
                directory = new File(targetPath);
                imageFile = new File(directory, "user.png");
            }
            else {
                return;
            }
        }

        if(!imageFile.isFile()) return;
        InputStream is = new FileInputStream(imageFile);
        OutputStream os = response.getOutputStream();

        byte[] bff = new byte[4096];
        int reader;
        while((reader = is.read(bff)) != -1) {
            os.write(bff, 0, reader);
        }
        is.close();
        os.flush();
        os.close();
    }
}