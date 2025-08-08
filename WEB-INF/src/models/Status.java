package models;

public class Status {
    private Integer statusId;
    private String name;
    
    public Status(Integer statusId, String name) {
        this.statusId = statusId;
        this.name = name;
    }

    public Status() {

    }

    public String getName() {
        return name;
    }

    public void setName() {
        this.name = name;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }
}