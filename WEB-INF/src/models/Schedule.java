package models;

public class Schedule {
    private Integer scheduleId;
    private Date date;
    private Integer additionalCharge;
    private Integer seaterSeatsBooked;
    private Integer sleeperSeatsBooked;
    private Integer sleeperFare;
    private Integer seaterFare;
    private BusRouteWeekday busRouteWeekday;
    private Driver driver;
    private Bus bus;


    public Schedule() {

    }

    public void setSleeperSeatsBooked(Integer sleeperSeatsBooked) {
        this.sleeperSeatsBooked = sleeperSeatsBooked;
    }

    public void getSleeperSeatsBooked()

    public void setAdditionalCharge(Integer additionalCharge) {
        this.additionalCharge = additionalCharge;
    }

    public void getAdditionalCharge() {
        return additionalCharge;
    }

    public void setDate(Date date) {
        this.date = new Date(date.getTime());
    } 

    public Date getDate() {
        return new Date(date.getTime());
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    } 

    public Integer getScheduleId() {
        return scheduleId;
    }
}