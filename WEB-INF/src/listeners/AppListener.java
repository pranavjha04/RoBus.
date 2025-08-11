package listeners;


// SERVLET 
import javax.servlet.ServletContextListener;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebListener;

// JAVA UTILS
import java.util.ArrayList;

// APP UTILS
import utils.DBManager;

// APP MODELS
import utils.DBManager;
import models.City;
import models.State;

@WebListener
public class AppListener implements ServletContextListener {
    public void contextInitialized(ServletContextEvent ev) {
        ServletContext context = ev.getServletContext();
        
        System.out.println("-------- BTS App is Starting --------");
        setDbConfiguration(context);
        setParameters(context);
    }

    private static void setDbConfiguration(ServletContext context) {
        System.out.println("-------- DB Config Starting --------");
        DBManager.setDbDriver(context.getInitParameter("dbdriver"));
        DBManager.setDbProtocol(context.getInitParameter("dbprotocol"));
        DBManager.setDbHost(context.getInitParameter("dbhost"));
        DBManager.setDbPort(context.getInitParameter("dbport"));
        DBManager.setDbName(context.getInitParameter("dbname"));
        DBManager.setDbUser(context.getInitParameter("dbuser"));
        DBManager.setDbPassword(context.getInitParameter("dbpassword"));
        DBManager.configureDatabase();
    }

    private void setParameters(ServletContext context) {
        ArrayList<City> cities = City.collectAllRecords();
        ArrayList<State> states = State.collectAllRecords();
        context.setAttribute("cities", cities);
        context.setAttribute("states", states);
    }
}