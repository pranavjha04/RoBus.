package models;

public final class City {
    private final Integer cityId;
    private final String city;
    private final State state;

    public City() {

    }

    public City(Integer cityId, String city, State state) {
        this.cityId = cityId;
        this.city = city;
        this.state = state;
    }

    public State getState() {
        return state;
    }

    public String getCity() {
        return name;
    }
    
    public Integer getCityId() {
        return cityId;
    }
}