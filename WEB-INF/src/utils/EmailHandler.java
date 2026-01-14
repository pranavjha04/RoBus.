package utils;


import java.io.IOException;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;
import javax.mail.Message;

final public class EmailHandler {

    private static final Properties props = new Properties();  
    private static String FROM;
    private static String KEY;
    private static Authenticator auth;
    private static Session session;
   
    static {
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
    }

    private EmailHandler() {

    }

    // util methods
    public static boolean sendVerificationMail(String to, String name, String verificationLink) {
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(FROM);
            message.setRecipients(Message.RecipientType.TO, to);
            message.setSubject("Verify Your Account Email Address");
            message.setContent(getVerificationEmailMessage(name, verificationLink), "text/html; charset=UTF-8");  
            
            new Thread(() -> {
                try {
                    Transport.send(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        
        } catch(MessagingException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private static String getVerificationEmailMessage(String name, String verificationLink) {
       return "<!DOCTYPE html>"
                + "<html>"
                + "<body style='margin:0; padding:0; font-family: Arial, sans-serif; background:#ffffff;'>"

                + "<div style='max-width:420px; margin:40px auto;"
                + "text-align:center;'>"

                + "<h2 style='margin-bottom:16px; font-weight:600;'>Verify your email</h2>"

                + "<p style='margin:8px 0;'>Hi " + name + ",</p>"

                + "<p style='margin:8px 0 24px 0;'>Click the button below to verify your email address to unlock all services in robus.</p>"

                + "<a href='" + verificationLink + "' "
                + "style='display:inline-block; padding:12px 24px; "
                + "background-color:#0d6efd !important; "
                + "color:#ffffff !important; "
                + "text-decoration:none !important; "
                + "border-radius:12px; "
                + "font-weight:600;'>"
                + "Verify Email"
                + "</a>"

                + "</div>"
                + "</body>"
                + "</html>";

    }

    public static void setFrom(String from) {
        FROM = from;
    }
    public static void setKey(String key) {
        KEY = key;
    }

    public static void setAuth() {
        auth = new Authenticator() {
            @Override
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(
                    FROM,  
                    KEY
                );
            }
        };
        session = Session.getInstance(props, auth);
    }
}
