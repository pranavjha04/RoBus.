package utils;

import org.jasypt.util.password.StrongPasswordEncryptor;

public class EncryptionManager {
    private static final StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

    private EncryptionManager() {

    }

    public static String encryptPassword(String password) {
        return passwordEncryptor.encryptPassword(password);
    }

    public static boolean checkPassword(String plainPassword, String encryptedPassword) {
        return passwordEncryptor.checkPassword(plainPassword, encryptedPassword);
    }
}
