package models;

public class Weekday {
    private Integer weekdayId;
    private String name;

    public Weekday() {

    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setWeekdayId(Integer weekdayId) {
        this.weekdayId = weekdayId;
    }

    public Integer getWeekdayId() {
        return weekdayId;
    }

}