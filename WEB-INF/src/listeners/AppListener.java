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
import models.Route;
import models.RouteMidCity;

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
        System.out.println("-------- City Config Starting --------");
        ArrayList<City> cityList = City.collectAllRecords();
        context.setAttribute("cities", cityList);

        System.out.println("-------- State Config Starting --------");
        ArrayList<State> stateList = State.collectAllRecords();
        context.setAttribute("states", stateList);

        System.out.println("-------- Route Config Starting --------");
        ArrayList<Route> routeList = Route.collectAllRecords();
        context.setAttribute("routes", routeList);

        System.out.println("-------- Route MidCity Config Starting --------");
        ArrayList<RouteMidCity> routeMidCityList = RouteMidCity.collectAllRecords();
        context.setAttribute("routeMidCities", routeMidCityList);
    }
}