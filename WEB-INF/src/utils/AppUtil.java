package utils;

public final class AppUtil {
    public static final String concat(String ...words) {
        StringBuilder ans = new StringBuilder();
        for(String next : words) {
            ans.append(next);
        }
        return ans.toString();
    }
}