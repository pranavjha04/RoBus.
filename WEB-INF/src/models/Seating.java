package models;

public class Seating {
    private Integer seatingId;
    private Integer lsCount;
    private Integer rsCount;
    private Integer rowCount;
    private Boolean deck;
    private Boolean isSleeper;
    private Bus bus;

    public Seating() {

    }       

    private void setBus(Bus bus) {
        this.bus = bus.clone();
    }

    private Bus getBus() {
        return bus.clone();
    }

    private void setIsSleeper(Boolean isSleeper) {
        this.isSleeper = isSleeper;
    }

    public Boolean getIsSleeper() {
        return isSleeper;
    }

    private void setDeck(Boolean deck) {
        this.deck = deck;
    }

    private Boolean getDeck() {
        return deck;
    }

    private void setRowCount(Integer rowCount) {
        this.rowCount = rowCount;
    }

    public Integer getRowCount() {
        return rowCount;
    }

    public void setRsCount(Integer rsCount) {
        this.rsCount = rsCount;
    }

    public Integer getRsCount() {
        return rsCount;
    }

    public void setLsCount(Integer lsCount) {
        this.lsCount = lsCount;
    }

    public Integer getLsCount() {
        return lsCount;
    }

    public void setSeatingId(Integer seatingId) {
        this.seatingId = seatingId;
    }

    public Integer getSeatingId() {
        return seatingId;
    }
}