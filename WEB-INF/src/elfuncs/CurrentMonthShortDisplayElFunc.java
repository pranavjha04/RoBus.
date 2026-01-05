package elfuncs;

import java.util.Calendar;
import java.util.Locale;

public class CurrentMonthShortDisplayElFunc {
    public static String monthShort() {
        Calendar cal = Calendar.getInstance();
        String shortMonth = cal.getDisplayName(
                Calendar.MONTH,
                Calendar.SHORT,
                Locale.ENGLISH
        );
        return shortMonth;
    }
}