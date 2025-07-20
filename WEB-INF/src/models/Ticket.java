package models;

public class Ticket {
    private Integer ticketId;
    private String seatNumber;
    private Booking booking;
    private Status status;

    public Ticket() {

    }

    public void setStatus(Status status) {
        this.status = status;
    } 

    public Status getStatus() {
        return status;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public Integer getTicketId() {
        return ticketId;
    }
}