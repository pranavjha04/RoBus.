package models;

public class BookedSeat {
    private Integer bookedSeatId;
    private Seat seat;
    private Booking booking;

    public BookedSeat() {
    }

    public BookedSeat(Integer bookedSeatId, Seat seat, Booking booking) {
        this(seat, booking);
        this.bookedSeatId = bookedSeatId;
    }
    public BookedSeat(Seat seat, Booking booking) {
        this.seat = seat;
        this.booking = booking;
    }
    public Integer getBookedSeatId() {
        return bookedSeatId;
    }

    public void setBookedSeatId(Integer bookedSeatId) {
        this.bookedSeatId = bookedSeatId;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
