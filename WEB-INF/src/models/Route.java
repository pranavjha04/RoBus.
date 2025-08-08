package models;

public class Route {
    private Integer routeId;
    private Integer distance;
    private Integer duration;
    private City source;
    private City destination;

    public Route() {
        
    }

    public void setDestination(City destination) {
        this.destination = new City(destination.getCityId(), destination.getName(), destination.getState());
    }

    public City getDestination() {
        return new City(destination.getCityId(), destination.getName(), destination.getState());
    }

    public void setSource(City source) {
        this.source = new City(source.getCityId(), source.getName(), source.getState());
    }

    public City getSource() {
        return new City(source.getCityId(), source.getName(), source.getState());
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
    
    public Integer getDuration() {
        return duration;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setRouteId(Integer routeId) {
        this.routeId = routeId;
    }

    public Integer getRouteId(){
        return routeId;
    }
}