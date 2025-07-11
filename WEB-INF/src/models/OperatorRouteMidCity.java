package models;

public class OperatorRouteMidCity {
    private Integer operatorRouteMidCityId;
    private Integer haultingTime;
    private OperatorRoute OperatorRoute;
    private RouteMidCity routeMidCity;

    public OperatorRouteMidCity() {

    }

    public void setRouteMidCity(RouteMidCity routeMidCity) {
        return routeMidCity;
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

    public void setOperatorRouteMidCityId(Integer operatorRouteMidCityId) {
        this.operatorRouteMidCityId = operatorRouteMidCityId;
    }

    public Integer getOperatorRouteMidCityId() {
        return operatorRouteMidCityId;
    }
} 