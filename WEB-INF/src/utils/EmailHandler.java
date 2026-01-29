package utils;

import java.util.Map;
import java.time.format.DateTimeFormatter;

import models.Schedule;

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
    public static boolean sendTicketMail(String to, Schedule schedule, Map<Integer, Pair> selectedSeats, Integer bookingId, Integer totalFare) {
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(FROM);
            message.setRecipients(Message.RecipientType.TO, to);
            message.setSubject("Your Bus Ticket");
            message.setContent(getBusTicketEmail(schedule, selectedSeats, bookingId, totalFare), "text/html; charset=UTF-8");  
            
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
    private static String getBusTicketEmail(Schedule schedule, Map<Integer, Pair> selectedSeats, Integer bookingId, Integer totalFare) {
        String sourceCity = schedule.getBusRouteWeekday().getOperatorRoute().getRoute().getSource().getName();
        String sourceState = schedule.getBusRouteWeekday().getOperatorRoute().getRoute().getSource().getState().getName();
        String destinationCity = schedule.getBusRouteWeekday().getOperatorRoute().getRoute().getDestination().getName();
        String destinationState = schedule.getBusRouteWeekday().getOperatorRoute().getRoute().getDestination().getState().getName();
        String departureTime = schedule.getDepartureTime().toString().substring(0, 5);
        String arrivalTime = schedule.getArrivalTime().toString().substring(0, 5);
        String journeyDate = schedule.getJourneyDate().toLocalDate().format(DateTimeFormatter.ofPattern("EEEE, dd MMM yyyy"));
        String operatorName = schedule.getBus().getOperator().getFullName();
        String busNumber = schedule.getBus().getBusNumber();
        String driverName = schedule.getDriver().getUser().getFullName();

        StringBuilder selectedSeatsString = new StringBuilder();
        
        for(int seat : selectedSeats.keySet()) {
            selectedSeatsString.append(seat).append(", ");
        }
        selectedSeatsString.setLength(selectedSeatsString.length() - 2);
        
        return "<!DOCTYPE html>"
            + "<html>"
            + "<head>"
            + "<meta charset='UTF-8' />"
            + "<title>Bus Ticket</title>"
            + "</head>"

            + "<body style='margin:0; padding:0; background:#f5f5f5;"
            + "font-family: Arial, Helvetica, sans-serif;'>"

            + "<table width='100%' cellpadding='0' cellspacing='0' style='padding:20px;'>"
            + "<tr>"
            + "<td align='center'>"

            + "<table width='560' cellpadding='0' cellspacing='0' "
            + "style='background:#ffffff; border-radius:6px;'>"

            // Header
            + "<tr>"
            + "<td style='padding:16px 20px; border-bottom:1px solid #eee;'>"
            + "<strong style='font-size:16px;'>Bus Ticket</strong><br/>"
            + "<span style='font-size:12px; color:#666;'>"
            + "Booking ID: " + bookingId 
            + "</span>"
            + "</td>"
            + "</tr>"

            // Route
            + "<tr>"
            + "<td style='padding:16px 20px;'>"

            + "<table width='100%'>"
            + "<tr>"

            + "<td style='font-size:14px;'>"
            + "<strong>" + sourceCity + ", " +  sourceState + "</strong><br/>"
            + "<span style='font-size:12px; color:#666;'>" + departureTime +"</span>"
            + "</td>"

            + "<td align='center' style='font-size:12px; color:#999;'>&#8594;</td>"

            + "<td align='right' style='font-size:14px;'>"
            + "<strong>" + destinationCity + ", " +  destinationState + "</strong><br/>"
            + "<span style='font-size:12px; color:#666;'>" + arrivalTime +"</span>"
            + "</td>"

            + "</tr>"
            + "</table>"

            + "<div style='margin-top:8px; font-size:12px; color:#666;'>"
            + "Journey Date: " + journeyDate 
            + "</div>"

            + "</td>"
            + "</tr>"

            // Info
            + "<tr>"
            + "<td style='padding:0 20px 16px;'>"

            + "<table width='100%' style='font-size:13px; color:#444;'>"
            + "<tr><td>Operator</td><td align='right'>" + operatorName + "</td></tr>"
            + "<tr><td>Bus No</td><td align='right'>" + busNumber + "</td></tr>"
            + "<tr><td>Driver</td><td align='right'>" + driverName + "</td></tr>"
            + "<tr><td>Seats</td><td align='right'>" + selectedSeatsString.toString() + "</td></tr>"
            + "</table>"

            + "</td>"
            + "</tr>"

            // Fare
            + "<tr>"
            + "<td style='padding:12px 20px; border-top:1px solid #eee;'>"
            + "<table width='100%' style='font-size:14px;'>"
            + "<tr>"
            + "<td><strong>Total Paid</strong></td>"
            + "<td align='right'><strong>&#x20B9;" + totalFare +"</strong></td>"
            + "</tr>"
            + "</table>"
            + "</td>"
            + "</tr>"

            + "</table>"
            + "</td>"
            + "</tr>"
            + "</table>"

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
