package models;

public class OperatorRouteMidCity {
    private Integer operatorRouteMidCityId;
    private Integer haultingTime;
    private OperatorRoute operatorRoute;
    private RouteMidCity routeMidCity;

    public OperatorRouteMidCity() {

    }

    public void setRouteMidCity(RouteMidCity routeMidCity) {
        this.routeMidCity = routeMidCity;
    }

    public RouteMidCity getRouteMidCity() {
        return routeMidCity;
    }

    public void setOperatorRoute(OperatorRoute operatorRoute) {
        this.operatorRoute = operatorRoute;
    }

    public OperatorRoute getOperatorRoute() {
        return operatorRoute;
    }

    public void setHaultingTime(Integer haultingTime) {
        this.haultingTime = haultingTime;
    }
    
    public Integer getHaultingTime() {
        return haultingTime;
    }

    public void setMidCityId(Integer operatorRouteMidCityId) {
        this.operatorRouteMidCityId = operatorRouteMidCityId;
    }

    public Integer getOperatorRouteMidCityId() {
        return operatorRouteMidCityId;
    }
} 