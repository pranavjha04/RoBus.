package models;

public class State {
    private Integer stateId;
    private String name;

    public State(Integer stateId, String name) {
        this.stateId = stateId;
        this.name = name;
    }

    public State() {

    }
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }
}