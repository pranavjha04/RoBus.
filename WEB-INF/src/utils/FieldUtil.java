package utils;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import models.User;
import models.Operator;


public final class FieldUtil {
    private FieldUtil() {

    }
    public static final boolean validateField(String field, String value) {
        boolean flag = true;
        
        switch(field) {
            case "full_name":
                flag = validateName(value);
                break;
            case "contact":
                flag = validateContact(value) && User.checkUniqueContact(value) && Operator.checkUniqueContact(value);
                break;
            case "email":
                flag = validateEmail(value) && User.checkUniqueEmail(value) && Operator.checkUniqueEmail(value);
                break;
            case "password":
                flag = validatePassword(value);
                break;
            case "dob":
                flag = validateDob(value);
                break;
            case "gender":
                flag = validateGender(Integer.parseInt(value));
                break;
            case "address":
                flag = validateAddress(value);
                break;
            case "website":
                flag = validateWebsite(value);
                break;
            case "base_charge":
                flag = validateBaseCharge(Integer.parseInt(value));
                break;
            default:
                flag = false;
                break;
        }
        return flag;
    } 
    public static final boolean validateName(String name) {
        Pattern pattern = Pattern.compile("^[A-Za-z .-]{6,75}$");
        Matcher matcher = pattern.matcher(name);

        return matcher.find();
    }

    public static final boolean validateEmail(String email) {
        Pattern pattern = Pattern.compile("^[\\w.-]+@[\\w-]+(\\.[\\w-]{2,4})+$");
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

    public static final boolean validatePassword(String password) {
        Pattern pattern = Pattern.compile("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$");
        Matcher matcher = pattern.matcher(password);

        return matcher.matches();
    }

    public static final boolean validateContact(String contact) {
        Pattern pattern = Pattern.compile("^[6-9][0-9]{9}$");
        Matcher matcher = pattern.matcher(contact);

        return matcher.matches();
    }

    public static final boolean validateDob(String date) {
       return true;
    }

    public static final boolean validateGender(Integer gender) {
        return gender > 0 && gender < 4;
    }
    
    public static final boolean validateAddress(String address) {
        Pattern pattern = Pattern.compile("^[a-zA-Z0-9\\s,.'-]{5,100}$");
        Matcher matcher = pattern.matcher(address);
        
        return matcher.find();
    }

    public static final boolean validateWebsite(String website) {
        Pattern pattern = Pattern.compile("^(https?:\\/\\/)?(www\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}(/.*)?$");
        Matcher matcher = pattern.matcher(website);
        return matcher.matches();
    }

    public static final boolean validateBaseCharge(Integer baseCharge) {
        return baseCharge >= 100 && baseCharge <= 1000;
    }

    public static final boolean validateFileExtension(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        String[] accceptedImageExtensions = {"png","avif","jpeg","jpg","webp","svg"};
        boolean flag = false;
        for(int i = 0; i < accceptedImageExtensions.length; i++) {
            if(extension.equalsIgnoreCase(accceptedImageExtensions[i])) {
                flag = true;
                break;
            }
        }
        return flag;
    }
}