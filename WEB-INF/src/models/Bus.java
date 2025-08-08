package models;

public class Bus  {
    private Integer busId;
    private String busNumber;
    private Integer seats;
    private String manufacturer;
    private String seatingType;
    private Operator operator;

    public Bus() {
        
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setSeatingType(String seatingType) {
        this.seatingType = seatingType;
    }

    public String getSeatingType() {
        return seatingType;
    }
    
    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    } 

    public Integer getSeats() {
        return seats;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getBusNumber() {
        return busNumber;
    }    

    public void setBusId(Integer busId) {
        this.busId = busId;
    }

    public Integer getBusId() {
        return busId;
    }
}