package models;

import java.sql.Date;

public class Booking {
    private Integer bookingId;
    private Integer bookedSeats;
    private Integer totalFare;
    private String transactionPic;
    private Date bookingDate;
    private User user;
    private Schedule schedule;

    public Booking() {

    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setUser(User user) {
        this.user = user.clone();
    }

    public User getUser() {
        return user.clone();
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = new Date(bookingDate.getTime());
    }

    public Date getBookingDate() {
        return new Date(bookingDate.getTime());
    }

    public void setTransactionPic(String transactionPic) {
        this.transactionPic = transactionPic;
    }

    public String getTransactionPic() {
        return transactionPic;
    }

    public void setTotalFare(Integer totalFare) {
        this.totalFare = totalFare;
    }

    public Integer getTotalFare() {
        return totalFare;
    }

    public void setBookedSeats(Integer bookedSeats) {
        this.bookedSeats = bookedSeats;
    }

    public Integer getBookedSeats() {
        return bookedSeats;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public Integer getBookingId() {
        return bookingId;
    }
}