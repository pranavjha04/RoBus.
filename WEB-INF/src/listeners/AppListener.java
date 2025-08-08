package listeners;

import javax.servlet.ServletContextListener;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebListener;
import utils.DBManager;

@WebListener
public class AppListener implements ServletContextListener {
    public void contextInitialized(ServletContextEvent ev) {
        ServletContext context = ev.getServletContext();


        System.out.println("-------- BTS App is Starting --------");
        System.out.println("-------- DB Config Starting --------");
        setDbConfiguration(context);
    }

    private static void setDbConfiguration(ServletContext context) {
        DBManager.setDbDriver(context.getInitParameter("dbdriver"));
        DBManager.setDbProtocol(context.getInitParameter("dbprotocol"));
        DBManager.setDbHost(context.getInitParameter("dbhost"));
        DBManager.setDbPort(context.getInitParameter("dbport"));
        DBManager.setDbName(context.getInitParameter("dbname"));
        DBManager.setDbUser(context.getInitParameter("dbuser"));
        DBManager.setDbPassword(context.getInitParameter("dbpassword"));
    }
}