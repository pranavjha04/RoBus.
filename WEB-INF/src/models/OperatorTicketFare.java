package models;

public class OperatorTicketFare {
    private Integer operatorTicketFareId;
    private Integer charge;
    private Operator operator;
    private FareFactor fareFactor;

    public OperatorTicketFare() {

    }

    public void setFareFactpr(FareFactor fareFactor) {
        this.fareFactor = fareFactor;
    }

    public FareFactor getFarFactor() {
        return fareFactor;
    }

    public void setOperator(Operator operator) {
        this.operator = operator.clone();
    }

    public Operator getOperator() {
        return operator.clone();
    }

    public void setCharge(Integer charge) {
        this.charge = charge;
    }

    public Integer getCharge() {
        return charge;
    }

    public void setOperatorTicketFareId(Integer operatorTicketFareId) {
        this.operatorTicketFareId = operatorTicketFareId;
    }

    public Integer getOperatorTicketFareId() {
        return operatorTicketFareId;
    }
}