package utils;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.util.Date;

import models.User;
import models.Operator;


public final class FieldManager {
    
    private FieldManager() {

    }
   
    public static final boolean validateName(String name) {
        Pattern pattern = Pattern.compile("^[A-Za-z .-]{6,75}$");
        Matcher matcher = pattern.matcher(name);

        return matcher.matches();
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

    public static final boolean validateDob(String value) {
       if(value == null || value.isEmpty()) return false;

       return true;
    }

    public static final boolean validateGender(Integer gender) {
        return gender != null && gender > 0 && gender < 4;
    }
    
    public static final boolean validateAddress(String address) {
        Pattern pattern = Pattern.compile("^[a-zA-Z0-9\\s,.'-]{5,100}$");
        Matcher matcher = pattern.matcher(address);
        
        return matcher.matches();
    }

    public static final boolean validateWebsite(String website) {
        if(website == null)  return true;
        Pattern pattern = Pattern.compile("^(https?:\\/\\/)?(www\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}(/.*)?$");
        Matcher matcher = pattern.matcher(website);
        return matcher.matches();
    }

    public static final boolean validateBaseCharge(Integer baseCharge) {
        return baseCharge >= 0 && baseCharge <= 200;
    }

    public static final boolean validateBusNumber(String busNumber) {
        Pattern pattern = Pattern.compile("^[A-Z]{2}\\d{1,2}\\s?[A-Z]{1,3}\\s?\\d{1,4}$");
        Matcher matcher = pattern.matcher(busNumber.trim());
        return matcher.matches();
    }

}