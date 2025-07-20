package models;

public final class State {
    private final Integer stateId;
    private final String state;

    public State() {

    }

    public State(Integer stateId, String state) {
        this.stateId = stateId;
        this.state = state;
    }

    public String getState() {
        return name;
    }
    
    public Integer getStateId() {
        return stateId;
    }
}