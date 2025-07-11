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
        this.destination = destination;
    }

    public void getDestination() {
        return destination;
    }

    public void setSource(City source) {
        this.source = source;
    }

    public City getSource() {
        return source;
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