package utils;

public class DashBoardFormatHelper {

    private Integer noOfBookings;
    private Integer revenueGenerated;
    private Integer totalBuses;
    private Integer totalDrivers;

    // No-args constructor
    public DashBoardFormatHelper() {
    }

    public DashBoardFormatHelper(Integer noOfBookings, Integer revenueGenerated, Integer totalBuses, Integer totalDrivers
    ) {
        this.noOfBookings = noOfBookings;
        this.revenueGenerated = revenueGenerated;
        this.totalBuses = totalBuses;
        this.totalDrivers = totalDrivers;
    }

    public Integer getNoOfBookings() {
        return noOfBookings;
    }

    public void setNoOfBookings(Integer noOfBookings) {
        this.noOfBookings = noOfBookings;
    }

    public Integer getRevenueGenerated() {
        return revenueGenerated;
    }

    public void setRevenueGenerated(Integer revenueGenerated) {
        this.revenueGenerated = revenueGenerated;
    }

    public Integer getTotalBuses() {
        return totalBuses;
    }

    public void setTotalBuses(Integer totalBuses) {
        this.totalBuses = totalBuses;
    }

    public Integer getTotalDrivers() {
        return totalDrivers;
    }

    public void setTotalDrivers(Integer totalDrivers) {
        this.totalDrivers = totalDrivers;
    }
}
