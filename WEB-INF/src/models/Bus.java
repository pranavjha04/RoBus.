package models;

public class Bus implements Cloneable {
    private Integer busId;
    private String busNumber;
    private Integer seatCount;
    private String manufacturer;
    private String seatingType;
    private Operator operator;

    public Bus() {
        
    }

    @Override
    public Bus clone() {
        Bus bus;
        try {
            bus = (Bus) super.clone();
            bus.operator = this.operator.clone();
        }   
        catch(CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return bus;
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

    public void setSeatCount(Integer seatCount) {
        this.seatCount = seatCount;
    } 

    public Integer getSeatCount() {
        return seatCount;
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