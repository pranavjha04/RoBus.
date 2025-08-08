package models;

public class City {
    private Integer cityId;
    private String name;
    private State state;

    public City(Integer cityId, String name, State state) {
        this.cityId = cityId;
        this.name = name;
        this.state = new State(state.getStateId(), state.getName());
    }

    public City() {

    }
    
    public State getState() {
        return new State(state.getStateId(), state.getName());
    }

    public void setState(State state) {
        this.state = new State(state.getStateId(), state.getName());
    }

    public String getName() {
        return name;
    } 

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }
}