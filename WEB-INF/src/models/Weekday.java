package models;

public class Weekday {
    private Integer weekdayId;
    private String name;

    public Weekday() {

    }

    public Weekday(Integer weekdayId, String name) {
        this.weekdayId = weekdayId;
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWeekdayId(Integer weekdayId) {
        this.weekdayId = weekdayId;
    }

    public String getName() {
        return name;
    }

    public Integer getWeekdayId() {
        return weekdayId;
    }

}