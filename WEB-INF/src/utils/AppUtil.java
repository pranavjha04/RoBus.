package utils;

import java.util.Random;
public final class AppUtil {
    private static final Random random = new Random();
    
    private AppUtil() {

    }
    
    public static final String concat(String ...words) {
        return String.join("", words);
    }

    public static final int generateRandomOTP() {
        return random.nextInt(888888) + 111111;
    }
}