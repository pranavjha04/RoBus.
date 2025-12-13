package models;

public class Seat {
    private Integer seatId;
    private Integer seatNumber;
    private Seating seating;
    private Status status;
    private SeatType seatType;

    public Seat() {
    }

    public Seat(Integer seatId, Integer seatNumber, Seating seating, Status status, SeatType seatType) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.seating = seating;
        this.status = status;
        this.seatType = seatType;
    }

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
        this.seatId = seatId;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Seating getSeating() {
        return seating;
    }

    public void setSeating(Seating seating) {
        this.seating = seating;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
    }
}
