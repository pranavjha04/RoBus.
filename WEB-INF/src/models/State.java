package models;

public class State {
    private Integer stateId;
    private String name;

    public State() {

    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }
    
    public Integer getStateId() {
        return stateId;
    }
}