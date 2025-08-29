package utils;

import org.jasypt.util.password.StrongPasswordEncryptor;
import exceptions.PasswordMismatchException;

public class EncryptionManager {
    private static final StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

    private EncryptionManager() {

    }

    public static String encryptPassword(String password) {
        return passwordEncryptor.encryptPassword(password);
    }

    public static boolean checkPassword(String plainPassword, String encryptedPassword) 
        throws PasswordMismatchException {
    
        if (!passwordEncryptor.checkPassword(plainPassword, encryptedPassword)) {
            throw new PasswordMismatchException("Wrong password");
        }
        return true;
    }
}
