package models;

public class BusImage {
    private Integer busImageId;
    private String pic;
    private Bus bus;

    public BusImage() {

    }

    public void setBus(Bus bus) {
        this.bus = bus.clone();
    }

    public Bus getBus() {
        return bus.clone();
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getPic() {
        return pic;
    }

    public void setBusImageId(Integer busImageId) {
        this.busImageId = busImageId;
    }

    public Integer getBusImageId() {
        return busImageId;
    }
}