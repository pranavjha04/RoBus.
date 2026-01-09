package utils;

public class Email {
    private static String FROM;
    private static String KEY;

    public static void setFrom(String from) {
        FROM = from;
    }
    public static void setKey(String key) {
        KEY = key;
    }
    public static String getFrom() {
        return FROM;
    }
    public static String getKey() {
        return KEY;
    }
}