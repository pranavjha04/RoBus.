<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Manage Bus Schedule</title>
    <style>
      .warning {
        border: 1px solid #ff8c00;
        color: #ff8c00;
      }
      .violet {
        border: 1px solid #8a2be2;
        color: #8a2be2;
      }
    </style>
  </head>
  <body>
    <c:import url="essential_page_display.jsp" />
    <div class="modal fade" tabindex="-1" id="centeredModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to cancel this schedule?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              id="cancel_schedule_btn"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="dashContainer">
      <!-- Sidebar -->
      <c:import url="operator_sidebar.jsp" />

      <!-- Main content -->
      <main
        class="flex-grow-1 d-flex flex-column bg-light"
        style="overflow: auto"
      >
        <!-- Top Navbar -->
        <c:import url="operator_navbar.jsp" />

        <!-- Dashboard Content -->
        <div class="p-4 d-flex flex-column overflow-scroll">
          <a
            class="link-primary link-underline-opacity-0 cursor-pointer fw-medium fs-4 d-flex link back-link align-self-start"
            href="operator_schedules.do"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>
          <div class="container mt-2 mb-4" id="pageWrapper">
            <div class="d-flex gap-2 align-items-center mt-4 mb-2" id="nav">
              <button
                class="btn btn-primary rounded-pill"
                data-target="overview_cont"
              >
                Overview
              </button>
              <button
                class="btn text-primary border border-primary rounded-pill"
                data-target="bus_cont"
              >
                Bus
              </button>
              <button
                class="btn text-primary border border-primary rounded-pill"
                data-target="driver_cont"
              >
                Driver
              </button>
              <button
                class="btn text-primary border border-primary rounded-pill"
                data-target="charge_cont"
              >
                Charges
              </button>
              <button
                class="btn text-primary border border-primary rounded-pill"
                data-target="route_cont"
              >
                Route
              </button>
            </div>
            <div class="d-flex flex-column gap-4">
              <!--Overview Container-->
              <div class="card shadow-sm border-0" id="overview_cont">
                <div
                  class="card-header bg-white border-0 pb-0 d-flex justify-content-between"
                >
                  <h4 class="mb-1 fw-medium">Schedule Overview</h4>
                  <div
                    class="d-flex gap-2 align-items-center"
                    id="status_container"
                  >
                    <button
                      class="btn btn-warning"
                      id="cancel_schedule_trigger_btn"
                      data-bs-toggle="modal"
                      data-bs-target="#centeredModal"
                    >
                      Cancel Schedule
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <div class="row g-4">
                    <!-- Journey Date -->
                    <div class="col-md-4">
                      <label for="journey_date" class="form-label fw-semibold"
                        >Journey Date</label
                      >
                      <input
                        type="date"
                        class="form-control bg-light"
                        id="journey_date"
                        readonly
                      />
                    </div>

                    <!-- Journey Time -->
                    <div class="col-md-4">
                      <label for="departure_time" class="form-label fw-semibold"
                        >Departure Time</label
                      >
                      <input
                        type="time"
                        class="form-control bg-light"
                        id="departure_time"
                        readonly
                      />
                    </div>

                    <!-- Arrival Time -->
                    <div class="col-md-4">
                      <label for="arrival_time" class="form-label fw-semibold"
                        >Arrival Time</label
                      >
                      <input
                        type="time"
                        class="form-control bg-light"
                        id="arrival_time"
                        readonly
                      />
                    </div>

                    <!-- Seater Seats -->
                    <div class="col-md-4">
                      <label
                        for="seater_seats_booked"
                        class="form-label fw-semibold"
                        >Seater Seats Booked</label
                      >
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="seater_seats_booked"
                        readonly
                      />
                    </div>

                    <!-- Sleeper Seats -->
                    <div class="col-md-4">
                      <label
                        for="sleeper_seats_booked"
                        class="form-label fw-semibold"
                        >Sleeper Seats Booked</label
                      >
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="sleeper_seats_booked"
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--Bus Container-->
              <div class="card shadow-sm border-0" id="bus_cont">
                <div class="card-header bg-white border-0 pb-0">
                  <h4 class="mb-1 fw-medium">Bus Overview</h4>
                </div>

                <div class="card-body">
                  <div class="row g-4">
                    <!-- Bus Number -->
                    <div class="col-md-4">
                      <label for="bus_number" class="form-label fw-semibold"
                        >Bus Number</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="bus_number"
                        readonly
                      />
                    </div>

                    <!-- Manufacturer -->
                    <div class="col-md-4">
                      <label for="manufacturer" class="form-label fw-semibold"
                        >Manufacturer</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="manufacturer"
                        readonly
                      />
                    </div>
                    <!--Bus Type-->
                    <div class="col-md-4">
                      <label for="bus_type" class="form-label fw-semibold"
                        >Bus Type</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="bus_type"
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--Driver Container-->
              <div class="card shadow-sm border-0" id="driver_cont">
                <div class="card-header bg-white border-0 pb-0">
                  <h4 class="mb-1 fw-medium">Driver Overview</h4>
                </div>

                <div class="card-body">
                  <div class="row g-4">
                    <!-- Driver Name -->
                    <div class="col-md-4">
                      <label class="form-label fw-semibold">Driver</label>
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="driver"
                        readonly
                      />
                      <div
                        class="dropdown w-100 d-none"
                        id="driver_select_cont"
                      >
                        <button
                          class="btn border rounded w-100 d-flex justify-content-between align-items-center form-select text-start"
                          type="button"
                          id="driver_select"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span class="text-secondary">Select Driver</span>
                          <span class="ms-2 small text-muted">&#9662;</span>
                        </button>

                        <ul
                          id="driver_available_list"
                          class="dropdown-menu w-100 shadow-sm overflow-y-scroll"
                          style="max-height: 250px"
                          aria-labelledby="driver_select"
                        ></ul>
                      </div>
                    </div>

                    <!-- Contact -->
                    <div class="col-md-4">
                      <label for="contact" class="form-label fw-semibold"
                        >Contact</label
                      >
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="contact"
                        readonly
                      />
                    </div>

                    <!-- Email -->
                    <div class="col-md-4">
                      <label for="email" class="form-label fw-semibold"
                        >Email</label
                      >
                      <input
                        type="email"
                        class="form-control bg-light"
                        id="email"
                        autocomplete="email"
                        readonly
                      />
                    </div>

                    <!-- License Number -->
                    <div class="col-md-4">
                      <label for="licence_no" class="form-label fw-semibold"
                        >License Number</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="licence_no"
                        readonly
                      />
                    </div>

                    <!-- Buttons aligned to right -->
                    <div class="col-12 text-end">
                      <button
                        class="btn btn-secondary me-2 d-none"
                        id="undo_driver_change_btn"
                      >
                        Undo Changes
                      </button>
                      <button
                        class="btn btn-primary d-none"
                        id="save_driver_change_btn"
                      >
                        Save Changes
                      </button>
                      <button class="btn btn-primary" id="change_driver_btn">
                        Change Driver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--Charges COntainer-->
              <div class="card shadow-sm border-0" id="charge_cont">
                <div class="card-header bg-white border-0 pb-0">
                  <h4 class="mb-1 fw-medium">Charges Overview (&#x20B9;)</h4>
                </div>

                <div class="card-body">
                  <div class="row g-4">
                    <!-- Bus Number -->
                    <div class="col-md-4">
                      <label
                        for="additional_charge"
                        class="form-label fw-semibold"
                        >Additional Charge
                      </label>
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="additional_charge"
                        readonly
                      />
                    </div>

                    <!-- Seater Fare -->
                    <div class="col-md-4">
                      <label for="seater_fare" class="form-label fw-semibold"
                        >Seater Fare</label
                      >
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="seater_fare"
                        readonly
                      />
                    </div>
                    <!-- Sleeper Fare -->
                    <div class="col-md-4">
                      <label for="sleeper_fare" class="form-label fw-semibold"
                        >Sleeper Fare</label
                      >
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="sleeper_fare"
                        readonly
                      />
                    </div>
                    <!-- Total Charges -->
                    <div class="col-md-4">
                      <label for="total_charge" class="form-label fw-semibold"
                        >Total Charges</label
                      >
                      <input
                        type="number"
                        class="form-control bg-light"
                        id="total_charge"
                        readonly
                      />
                    </div>
                    <div class="col-12 text-end">
                      <button
                        class="btn btn-secondary me-2 d-none"
                        id="undo_charge_change_btn"
                      >
                        Undo Changes
                      </button>
                      <button
                        class="btn btn-primary d-none"
                        id="save_charge_change_btn"
                      >
                        Save Changes
                      </button>
                      <button class="btn btn-primary" id="update_charge_btn">
                        Update Charge
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--Route Container-->
              <div class="card shadow-sm border-0" id="route_cont">
                <div class="card-header bg-white border-0 pb-0">
                  <h4 class="mb-1 fw-medium">Route Overview</h4>
                </div>

                <div class="card-body">
                  <div class="row g-4">
                    <div class="text-center text-md-start mb-3 mb-md-0">
                      <div
                        class="d-flex align-items-center gap-4"
                        id="route_overview"
                      >
                        <div class="d-flex flex-column gap-0">
                          <span class="fs-4" id="source_info_city"></span>
                          <span
                            class="small text-muted small fs-6 fw-normal"
                            id="source_info_state"
                          ></span>
                        </div>
                        <span class="arrow">&rarr;</span>
                        <div class="d-flex flex-column gap-0">
                          <span class="fs-4" id="destination_info_city"></span>
                          <span
                            class="small text-muted small fs-6 fw-normal"
                            id="destination_info_state"
                          ></span>
                        </div>
                      </div>
                    </div>

                    <!-- Distance -->
                    <div class="col-md-4">
                      <label for="distance" class="form-label fw-semibold"
                        >Distance (KM)</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="distance"
                        readonly
                      />
                    </div>
                    <!-- Duration -->
                    <div class="col-md-4">
                      <label for="duration" class="form-label fw-semibold"
                        >Duration</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="duration"
                        readonly
                      />
                    </div>
                    <!--Weekday-->
                    <div class="col-md-4">
                      <label for="weekday" class="form-label fw-semibold"
                        >Weekday</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="weekday"
                        readonly
                      />
                    </div>
                  </div>
                  <div
                    class="d-flex flex-column align-items-start pt-4"
                    id="route_timeline_cont"
                  ></div>
                </div>
              </div>
            </div>

            <footer class="container mt-4 mb-4"></footer>
          </div>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/manageSchedule.js"></script>
  </body>
</html>
