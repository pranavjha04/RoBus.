package elfuncs;

import java.util.Calendar;

public class ActiveYearElFunc {
    public static Integer activeYear() {
        return Calendar.getInstance().get(Calendar.YEAR);
    }
}