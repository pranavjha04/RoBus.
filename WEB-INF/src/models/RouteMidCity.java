package models;

public class RouteMidCity {
    private Integer routeMidCityId;
    private Integer distanceFromSource;
    private Integer durationFromSource;
    private Route route;
    private City midCity;

    public RouteMidCity() {
        
    }

    public void setMidCity(City midCity) {
        this.midCity = new City(midCity.getCityId(), midCity.getName(), midCity.getState());
    }

    public City getMidCity() {
        return new City(midCity.getCityId(), midCity.getName(), midCity.getState());
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Route getRoute() {
        return route;
    }

    public void setDistanceFromSource(Integer distanceFromSource) {
        this.distanceFromSource = distanceFromSource;
    }

    public Integer getDistanceFromSource() {
        return distanceFromSource;
    }

    public void setDurationFromSource(Integer durationFromSource) {
        this.durationFromSource = durationFromSource;
    }

    public Integer getDurationFromSource() {
        return durationFromSource;
    }

    public void setRouteMidCityId(Integer routeMidCityId) {
        this.routeMidCityId = routeMidCityId;
    }

    public Integer getRouteMidCityId() {
        return routeMidCityId;
    }
}