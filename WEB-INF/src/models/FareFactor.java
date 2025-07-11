package models;

public class FareFactor {
    public Integer fareFactorId;
    private String factor;
    private Boolean fixedCharge; 

    public FareFactor() {
        
    }

    public void setFactor(String fareFactor) {
        this.fareFactor = fareFactor;
    }

    public void getFactor() {
        return factor;
    }

    public void setFareFactorId(Integer fareFactorId) {
        this.fareFactorId = fareFactorId;
    }

    public Integer getFareFactorId() {
        return fareFactorId;
    }
}