package models;

public final class Weekday {
    private final Integer weekdayId;
    private final String weekday;

    public Weekday() {

    }

    public Weekday(Integer weekdayId, String weekday) {
        this.weekdayId = weekdayId;
        this.weekday = weekday;
    }

    public String getWeekday() {
        return name;
    }

    public Integer getWeekdayId() {
        return weekdayId;
    }

}