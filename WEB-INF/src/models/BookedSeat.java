package models;

public class BookedSeat {
    
    private Integer bookedSeatId;
    private Integer seatNumber;
    private Booking booking;
    private Seating seating;

    public BookedSeat() {
    }

    public BookedSeat(Integer bookedSeatId, Integer seatNumber, Booking booking, Seating seating) {
        this.bookedSeatId = bookedSeatId;
        this.seatNumber = seatNumber;
        this.booking = booking;
        this.seating = seating;
    }

    public Integer getBookedSeatId() {
        return bookedSeatId;
    }

    public void setBookedSeatId(Integer bookedSeatId) {
        this.bookedSeatId = bookedSeatId;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Seating getSeating() {
        return seating;
    }

    public void setSeating(Seating seating) {
        this.seating = seating;
    }
}
