package utils;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public final class RegexUtil {
    private RegexUtil() {

    }
    public static final Boolean validateName(String name) {
        Pattern pattern = Pattern.compile("^[A-Za-z .-]{6,75}$");
        Matcher matcher = pattern.matcher(name);

        return matcher.matches();
    }

    public static final Boolean validateEmail(String email) {
        Pattern pattern = Pattern.compile("^[\\w.-]+@[\\w-]+(\\.[\\w-]{2,4})+$");
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

    public static final Boolean validatePassword(String password) {
        Pattern pattern = Pattern.compile("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        Matcher matcher = pattern.matcher(password);

        return matcher.matches();
    }

    public static final Boolean validateContact(String contact) {
        Pattern pattern = Pattern.compile("^[6-9][0-9]{9}$");
        Matcher matcher = pattern.matcher(contact);

        return matcher.matches();
    }

}