package utils;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.util.Date;

import models.User;
import models.Operator;


public final class FieldManager {
    
    private FieldManager() {

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
        Pattern pattern = Pattern.compile("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$");
        Matcher matcher = pattern.matcher(password);

        return matcher.matches();
    }

    public static final Boolean validateContact(String contact) {
        Pattern pattern = Pattern.compile("^[6-9][0-9]{9}$");
        Matcher matcher = pattern.matcher(contact);

        return matcher.matches();
    }

    public static final Boolean validateDob(String value) {
       if(value == null || value.isEmpty()) return false;

       return true;
    }

    public static final Boolean validateGender(Integer gender) {
        return gender != null && gender > 0 && gender < 4;
    }
    
    public static final Boolean validateAddress(String address) {
        Pattern pattern = Pattern.compile("^[a-zA-Z0-9\\s,.'-]{5,100}$");
        Matcher matcher = pattern.matcher(address);
        
        return matcher.matches();
    }

    public static final Boolean validateWebsite(String website) {
        if(website == null)  return true;
        Pattern pattern = Pattern.compile("^(https?:\\/\\/)?(www\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}(/.*)?$");
        Matcher matcher = pattern.matcher(website);
        return matcher.matches();
    }

    public static final Boolean validateBaseCharge(Integer baseCharge) {
        return baseCharge >= 0 && baseCharge <= 200;
    }

    public static final Boolean validateBusNumber(String busNumber) {
        Pattern pattern = Pattern.compile("^[A-Z]{2}\\d{1,2}\\s?[A-Z]{1,3}\\s?\\d{1,4}$");
        Matcher matcher = pattern.matcher(busNumber.trim());
        return matcher.matches();
    }

    public static final Boolean validateCharge(int charge) {
        return charge > 0 && charge <= 100;
    }

    public static final Boolean validateSeatCount(int count, int maxLimit) {
        return count >= 1 && count <= maxLimit;
    }

    public static final Boolean validateRowCount(int rowCount) {
        return rowCount >= 4 && rowCount <= 16;
    }

    public static final Boolean validateHaltingTime(int haltingTime) {
        return haltingTime > 0 && haltingTime <= 120;
    }

    public static final Boolean validateLicenceNumber(String licenceNumber) {
        Pattern pattern = Pattern.compile("^[A-Z]{2}\\d{2}[-\\s]?\\d{4}\\d{7}$");
        Matcher matcher = pattern.matcher(licenceNumber);
        return matcher.matches();
    }
}