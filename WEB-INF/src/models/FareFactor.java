package models;

public class FareFactor {
    private Integer fareFactorId;
    private String factor;
    private Boolean fixedCharge; 

    public FareFactor() {
        
    }

    public void setFixedCharge(Boolean fixedCharge) {
        this.fixedCharge = fixedCharge;
    }

    public Boolean getFixedCharge() {
        return fixedCharge;
    }

    public void setFactor(String factor) {
        this.factor = factor;
    }

    public String getFactor() {
        return factor;
    }

    public void setFareFactorId(Integer fareFactorId) {
        this.fareFactorId = fareFactorId;
    }

    public Integer getFareFactorId() {
        return fareFactorId;
    }
}