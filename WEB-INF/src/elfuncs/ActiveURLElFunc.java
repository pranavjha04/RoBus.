package elfuncs;

import javax.servlet.http.HttpServletRequest;

public class ActiveURLElFunc {
    public static String activeURL(HttpServletRequest request) {
        if(request == null) return "";
        String requestURLPath = request.getServletPath().substring(1);
        return requestURLPath;
    }
}