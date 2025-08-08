package models;

public class Ticket {
    private Integer ticketId;
    private String seatNumber;
    private Booking booking;
    private Status status;

    public Ticket() {

    }

    public void setStatus(Status status) {
        this.status = new Status(status.getStatusId(), status.getName());
    } 

    public Status getStatus() {
        return new Status(status.getStatusId(), status.getName());
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