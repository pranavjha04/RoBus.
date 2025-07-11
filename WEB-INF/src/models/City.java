package models;

public class City {
    private Integer cityId;
    private String name;
    private State state;

    public City() {

    }

    public void setState(State state) {
        this.state = state;
    }

    public State getState() {
        return state;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
    
    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public Integer getCityId() {
        return cityId;
    }
}