package models;

public class BusRouteWeekday {
    private Integer busRouteWeekdayId;
    private Weekday weekday;
    private OperatorRoute operatorRoute;

    public BusRouteWeekday() {

    }

    public void setOperatorRoute(OperatorRoute operatorRoute) {
        this.operatorRoute = operatorRoute;
    }

    public OperatorRoute getOperatorRoute() {
        return operatorRoute;
    }

    public void setWeekday(Weekday weekday) {
        this.weekday = new Weekday(weekday.getWeekdayId(), weekday.getName());
    }

    public Weekday getWeekday() {
        return new Weekday(weekday.getWeekdayId(), weekday.getName());
    }

    public void setBusRouteWeekdayId(Integer busRouteWeekdayId) {
        this.busRouteWeekdayId = busRouteWeekdayId;
    }

    public Integer getBusRouteWeekdayId() {
        return busRouteWeekdayId;
    }
}