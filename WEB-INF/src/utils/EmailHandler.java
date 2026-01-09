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
   
    static {
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
    }

    private static final Authenticator auth = new Authenticator() {
        @Override
        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(
                Email.getFrom(),   
                Email.getKey()   
            );
        }
    };

    private EmailHandler() {

    }

    private EmailHandler getInstance() {
        return new EmailHandler();
    }

    // util methods
    public void sendVerificationMail(String to, String name, String verificationCode) {
        try {
            Session session = Session.getInstance(props, auth);
            MimeMessage message = new MimeMessage(session);

            message.setFrom(Email.getFrom());
            message.setRecipients(Message.RecipientType.TO, to);
            message.setSubject("Verify Your Account Email Address");
            message.setText(getVerificationEmailMessage(name, verificationCode));  
            
            Transport.send(message);

        } catch(MessagingException e) {
            e.printStackTrace();
        }
    }

    private static String getVerificationEmailMessage(String name, String verificationCode) {
        return "<!DOCTYPE html>"
            + "<html>"
            + "<head>"
            + "    <link rel='preconnect' href='https://fonts.googleapis.com' />"
            + "    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />"
            + "    <link href='https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap' rel='stylesheet' />"
            + "    <meta charset='UTF-8' />"
            + "    <style>"
            + "        body { font-family: 'Outfit', sans-serif; background: #f4f7f9; padding: 40px 20px; }"
            + "        .card { max-width: 450px; margin: auto; background: white; padding: 32px; border-radius: 12px; }"
            + "        .btn { display: block; background: #0052cc; color: white; padding: 14px; text-align: center; border-radius: 8px; text-decoration: none; }"
            + "    </style>"
            + "</head>"
            + "<body>"
            + "    <div class='card'>"
            + "        <p>Hi " + name + ",</p>"
            + "        <p>Tap the button below to verify your email.</p>"
            + "        <a href='" + verificationCode + "' class='btn'>Verify Email Address</a>"
            + "    </div>"
            + "</body>"
            + "</html>";
    }
}
