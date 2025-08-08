package models;

public class BusFareFactor {
    private Integer busFareFactorId;
    private Integer price;
    private Bus bus;
    private FareFactor fareFactor;

    public BusFareFactor() {

    }

    public void setFareFactor(FareFactor fareFactor) {
        this.fareFactor = fareFactor;
    }

    public FareFactor getFareFactor() {
        return fareFactor;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public Bus getBus() {
        return bus;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPrice() {
        return price;
    }

    public void setBusFareFactorId(Integer busFareFactorId) {
        this.busFareFactorId = busFareFactorId;
    } 

    public Integer getBusFareFactorId() {
        return busFareFactorId;
    }
}