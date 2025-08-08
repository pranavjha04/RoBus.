package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
    private static String dbDriver;
    private static String dbProtocol;
    private static String dbHost;
    private static String dbPort;
    private static String dbName;
    private static String dbUser;
    private static String dbPassword;
    private static String dbURL;

    public DBManager() {

    }
    
    public static Connection getConnection() {
        Connection con = null;
        try {
            con = DriverManager.getConnection(dbURL, dbUser, dbPassword);
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return con;
    }
    public static void configureDatabase() {
        try {
            Class.forName(dbDriver);
            setDbURL();
        }
        catch(ClassNotFoundException e) {
            e.printStackTrace();
        }
    }


    private static void setDbURL() {
        dbURL = AppUtil.concat(dbProtocol,"://",dbHost,":",dbPort,"/",dbName);
    }

    public static void setDbDriver(String dbDriver) {
        DBManager.dbDriver = dbDriver;
    }

    public static void setDbProtocol(String dbProtocal) {
        DBManager.dbDriver = dbDriver;
    }

    public static void setDbHost(String dbHost) {
        DBManager.dbHost = dbHost;
    }

    public static void setDbPort(String dbPort) {
        DBManager.dbPort = dbPort;
    }

    public static void setDbName(String dbName) {
        DBManager.dbName = dbName;
    }

    public static void setDbUser(String dbUser) {
        DBManager.dbUser = dbUser;
    }

    public static void setDbPassword(String dbPassword) {
        DBManager.dbPassword = dbPassword;
    }
}