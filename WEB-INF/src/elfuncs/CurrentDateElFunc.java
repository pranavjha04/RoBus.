package elfuncs;

import java.util.Calendar;

public class CurrentDateElFunc {
    public static String currentDate() {
    Calendar cld = Calendar.getInstance();
    int year = cld.get(Calendar.YEAR);
    int month = cld.get(Calendar.MONTH) + 1; 
    int dayOfMonth = cld.get(Calendar.DAY_OF_MONTH);

    return String.format("%04d-%02d-%02d", year, month, dayOfMonth);
    }
}