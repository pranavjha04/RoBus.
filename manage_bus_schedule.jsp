<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Manage Bus Schedule</title>
    <style>
      .route-card {
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.08);
        transition: all 0.2s ease;
        overflow: hidden;
      }

      .route-card:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }

      .card-border-accent {
        border-left: 4px solid #0d6efd;
      }
    </style>
  </head>
  <body>
    <c:import url="essential_page_display.jsp" />

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
            <div class="d-flex gap-2 align-items-center mt-4 mb-0" id="nav">
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
                data-target="route_cont"
              >
                Route
              </button>
            </div>
            <div class="d-flex flex-column gap-4">
              <!--Overview Container-->
              <div class="card shadow-sm border-0" id="overview_cont">
                <div class="card-header bg-white border-0 pb-0">
                  <h4 class="mb-1 fw-medium">Schedule Overview</h4>
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

                    <!-- Journey Time -->
                    <div class="col-md-4">
                      <label for="departure_time" class="form-label fw-semibold"
                        >Journey Time</label
                      >
                      <input
                        type="time"
                        class="form-control bg-light"
                        id="departure_time"
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
            </div>

            <footer class="container mt-4 mb-4"></footer>
          </div>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/manageSchedule.js"></script>
  </body>
</html>
