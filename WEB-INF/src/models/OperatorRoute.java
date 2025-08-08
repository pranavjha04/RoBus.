package models;

public class OperatorRoute {
    private Integer operatorRouteId;
    private Operator operator;
    private Route route;

    public OperatorRoute() {

    }

    public void setRoute(Route route) {
        this.route = route;
    }
    
    public Route getRoute() {
        return route;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperatorRouteId(Integer operatorRouteId) {
        this.operatorRouteId = operatorRouteId;
    }

    public Integer getOperatorRouteId() {
        return operatorRouteId;
    }
}