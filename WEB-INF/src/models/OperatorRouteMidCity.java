package models;

public class OperatorRouteMidCity {
    private Integer operatorRouteMidCityId;
    private Integer haltingTime;
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

    public void setHaltingTime(Integer haltingTime) {
        this.haltingTime = haltingTime;
    }
    
    public Integer getHaltingTime() {
        return haltingTime;
    }

    public void setMidCityId(Integer operatorRouteMidCityId) {
        this.operatorRouteMidCityId = operatorRouteMidCityId;
    }

    public Integer getOperatorRouteMidCityId() {
        return operatorRouteMidCityId;
    }
} 