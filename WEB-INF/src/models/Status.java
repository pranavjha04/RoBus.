package models;

public class Status implements Cloneable {
    private Integer statusId;
    private String name;
    
    public Status(Integer statusId, String name) {
        this.statusId = statusId;
        this.name = name;
    }

    public Status() {
    }

    @Override
    public Status clone() {
        return new Status(getStatusId(), getName());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }
}
