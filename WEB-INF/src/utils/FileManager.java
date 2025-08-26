package utils;
import java.util.Date;

public final class FileManager {
    public static final long acceptedSize = 5 * 1024L * 1024L; 
    public static final String[] acceptedImageExtensions = {"png", "avif", "jpeg", "jpg", "webp", "svg"};

    public static boolean validateFileSize(long size) {
        return size != 0 && size <= acceptedSize;
    }

    public static final String generateFileName(String fileName) {
        return new Date().getTime() + AppUtil.generateRandomInt() + fileName;
    }

    public static final boolean validateFileExtension(String fileName, String expectedType) {
        String extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        boolean flag = false;

        switch(expectedType) {
            case "image":
                for(int i = 0; i < acceptedImageExtensions.length; i++) {
                    if(extension.equalsIgnoreCase(acceptedImageExtensions[i])) {
                        flag = true;
                        break;
                    }
                }
                break;
            case "video":
                break;
            case "audio":
                break;
            default:
                break;
        }
        return flag;
    }
}