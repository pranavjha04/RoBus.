package models;

import java.sql.Date;

public class Schedule {
    private Integer scheduleId;
    private Date journeyDate;
    private Integer additionalCharge;
    private Integer seaterSeatsBooked;
    private Integer sleeperSeatsBooked;
    private Integer seaterFare;
    private Integer sleeperFare;
    private Bus bus;
    private Driver driver;
    private BusRouteWeekday busRouteWeekday;


    public Schedule() {

    }

    public void setBus(Bus bus) {
        this.bus = bus.clone();
    }

    public Bus getBus() {
        return bus.clone();
    }

    public void setDriver(Driver driver) {
        this.driver = driver.clone();
    }

    public Driver getDriver() {
        return driver.clone();
    }

    public void setBusRouteWeekday(BusRouteWeekday busRouteWeekday) {
        this.busRouteWeekday = busRouteWeekday;
    }

    public BusRouteWeekday getBusRouteWeekday() {
        return busRouteWeekday;
    }

    public void setSleeperFare(Integer sleeperFare) {
        this.sleeperFare = sleeperFare;
    }

    public Integer getSleeperFare() {
        return sleeperFare;
    }

    public void setSeaterFare(Integer seaterFare) {
        this.seaterFare = seaterFare;
    }

    public Integer getSeaterFare() {
        return seaterFare;
    }

    public void setSleeperSeatsBooked(Integer sleeperSeatsBooked) {
        this.sleeperSeatsBooked = sleeperSeatsBooked;
    }

    public Integer getSleeperSeatsBooked() {
        return sleeperSeatsBooked;
    }

    public void setSeaterSeatsBooked(Integer seaterSeatsBooked) {
        this.seaterSeatsBooked = seaterSeatsBooked;
    }

    public Integer getSeaterSeatsBooked() {
        return seaterSeatsBooked;
    }

    public void setAdditionalCharge(Integer additionalCharge) {
        this.additionalCharge = additionalCharge;
    }

    public Integer getAdditionalCharge() {
        return additionalCharge;
    }

    public void setJourneyDate(Date journeyDate) {
        this.journeyDate = new Date(journeyDate.getTime());
    } 

    public Date getJourneyDate() {
        return new Date(journeyDate.getTime());
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    } 

    public Integer getScheduleId() {
        return scheduleId;
    }
}