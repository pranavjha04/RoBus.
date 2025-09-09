package models;

public class FareFactor implements Cloneable {
    private Integer fareFactorId;
    private String name;
    private Boolean fixedCharge; 

    public FareFactor(Integer fareFactorId, String name, boolean fixedCharge) {
        this(name, fixedCharge);
        this.fareFactorId = fareFactorId;
    }

    public FareFactor(String name, boolean fixedCharge) {
        this.name = name;
        this.fixedCharge = fixedCharge;
    }

    public FareFactor() {
        
    }

    public FareFactor clone() {
        return new FareFactor(fareFactorId, name, fixedCharge);
    }



    public void setFixedCharge(Boolean fixedCharge) {
        this.fixedCharge = fixedCharge;
    }

    public Boolean getFixedCharge() {
        return fixedCharge;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setFareFactorId(Integer fareFactorId) {
        this.fareFactorId = fareFactorId;
    }

    public Integer getFareFactorId() {
        return fareFactorId;
    }
}