package models;

public class Status {
    private Integer statusId;
    private String name;

    public Status() {

    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public Integer getStatusId() {
        return statusId;
    }
}