<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Route Information</title>
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

      .section-title {
        color: #6c757d;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .section-content {
        color: #212529;
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0;
        display: flex;
        align-items: center;
      }

      .route-card {
        border-bottom: 1px solid #e0e0e0;
        background: #fff;
        transition: all 0.3s ease;
      }
    </style>
  </head>
  <body>
    <c:import url="essential_page_display.jsp" />
    <div class="modal fade" id="centeredModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-semibold">Add Bus Schedule</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form id="schedule_bus_form" class="rounded-3">
              <!-- Journey Date -->
              <div class="mb-3">
                <label for="journey_date" class="form-label fw-semibold"
                  >Journey Date</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="journey_date"
                  min="${e:currentDate()}"
                  required
                />
              </div>

              <input type="hidden" value="" id="bus_route_weekday_id" />

              <!-- Show Routes -->
              <div class="mb-3 text-end">
                <button
                  type="button"
                  class="btn btn-primary rounded-2 px-4"
                  id="show_available_routes"
                  disabled
                >
                  Show Available Routes
                </button>
              </div>

              <!-- Route Select -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Route</label>

                <div class="dropdown w-100">
                  <button
                    class="btn border rounded w-100 d-flex justify-content-between align-items-center form-select text-start"
                    type="button"
                    id="route_select"
                    data-bs-toggle="dropdown"
                    disabled
                    aria-expanded="false"
                  >
                    <span class="text-secondary">Select Route</span>
                    <span class="ms-2 small text-muted">&#9662;</span>
                  </button>

                  <ul
                    id="route_available_list"
                    class="dropdown-menu w-100 shadow-sm overflow-y-scroll"
                    style="max-height: 275px"
                    aria-labelledby="route_select"
                  ></ul>
                </div>
              </div>

              <!-- Times -->
              <div class="row mb-3">
                <div class="col">
                  <label for="departure_time" class="form-label fw-semibold"
                    >Departure Time</label
                  >
                  <input
                    type="time"
                    class="form-control"
                    id="departure_time"
                    name="departure_time"
                    required
                  />
                </div>

                <div class="col">
                  <label for="arrival_time" class="form-label fw-semibold"
                    >Arrival Time</label
                  >
                  <input
                    type="time"
                    class="form-control bg-light"
                    id="arrival_time"
                    name="arrival_time"
                    readonly
                    required
                  />
                </div>
              </div>

              <!-- Driver Selection -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Driver</label>

                <div class="dropdown w-100">
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

                  <input type="hidden" name="driver_id" id="driver_id" />

                  <ul
                    id="driver_available_list"
                    class="dropdown-menu w-100 shadow-sm overflow-y-scroll"
                    style="max-height: 250px"
                    aria-labelledby="driver_select"
                  ></ul>
                </div>
              </div>

              <!-- Fare Section -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Fare Details</label>

                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label small"
                      >Additional Charges (Operator)</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      name="additional_charges"
                      id="additional_charges"
                      value="0"
                    />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label small">Seater Fare</label>
                    <input
                      type="number"
                      class="form-control"
                      name="seater_fare"
                      id="seater_fare"
                      value="0"
                    />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label small">Sleeper Fare</label>
                    <input
                      type="number"
                      class="form-control"
                      name="sleeper_fare"
                      id="sleeper_fare"
                      value="0"
                    />
                  </div>

                  <div class="col-md-4 mt-2">
                    <label class="form-label small">Total Charges (Auto)</label>
                    <input
                      type="number"
                      class="form-control bg-light"
                      name="total_charges"
                      id="total_charges"
                      readonly
                      value="0"
                    />
                  </div>
                </div>
              </div>

              <!-- Submit -->
              <div class="d-flex justify-content-end">
                <input
                  type="submit"
                  value="Add Schedule"
                  class="btn btn-primary px-4 py-2"
                />
              </div>
            </form>
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
            href="operator_buses.do"
            class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link back-link align-self-start"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>
          <div class="container mt-2 mb-4" id="pageWrapper">
            <div class="route-card p-4 card-border-accent">
              <div
                class="d-flex flex-column flex-md-row align-items-center justify-content-between"
              >
                <!-- Route Section -->
                <div
                  class="route-section text-center text-md-start mb-3 mb-md-0"
                >
                  <div class="section-title">Bus</div>
                  <div class="section-content">
                    <div class="d-flex flex-column gap-0">
                      <span class="fs-4" id="bus_number">-</span>
                      <span
                        class="small text-muted small fs-6 fw-normal"
                        id="bus_decker"
                        >-</span
                      >
                    </div>
                  </div>
                </div>

                <div class="divider d-none d-md-block"></div>
                <div class="divider d-md-none"></div>

                <!-- Journey Time Section -->
                <div class="time-section text-center mb-3 mb-md-0">
                  <div class="section-title">Manufacturer</div>
                  <div class="section-content fs-4" id="manufacturer">=</div>
                </div>

                <div class="divider d-none d-md-block"></div>
                <div class="divider d-md-none"></div>

                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#centeredModal"
                >
                  &plus; Add Schedule
                </button>
              </div>
            </div>
          </div>
          <div
            class="d-flex flex-column gap-3 bg-white shadow shadow-sm rounded p-2"
          >
            <div class="d-flex flex-column gap-2 px-3 py-2">
              <div
                class="d-flex align-items-center justify-content-between w-100"
              >
                <div class="">
                  <h4>Select Date</h4>
                </div>

                <div class="d-flex align-items-center gap-2">
                  <button class="btn bg-secondary-subtle">&lt;</button>
                  <span>Nov 9 - Nov 15, 2025 </span>
                  <button class="btn bg-secondary-subtle">&gt;</button>
                </div>
              </div>

              <div class="row">
                <button
                  class="col d-flex flex-column text-center btn btn-primary justify-content-center"
                >
                  <h4>Sun</h4>
                  <span class="fs-4">4</span>
                </button>
                <button
                  class="col d-flex flex-column text-center btn justify-content-center"
                >
                  <h4>Mon</h4>
                  <span class="fs-4">5</span>
                </button>
                <button
                  class="col d-flex flex-column text-center btn justify-content-center"
                >
                  <h4>Tue</h4>
                  <span class="fs-4">6</span>
                </button>
                <button
                  class="col d-flex flex-column text-center btn justify-content-center"
                >
                  <h4>Wed</h4>
                  <span class="fs-4">7</span>
                </button>
                <button
                  class="col d-flex flex-column text-center btn justify-content-center"
                >
                  <h4>Thu</h4>
                  <span class="fs-4">8</span>
                </button>
                <button
                  class="col d-flex flex-column text-center btn justify-content-center"
                >
                  <h4>Fri</h4>
                  <span class="fs-4">9</span>
                </button>
                <button
                  class="col d-flex flex-column text-center btn justify-content-center"
                >
                  <h4>Sat</h4>
                  <span class="fs-4">10</span>
                </button>
              </div>
            </div>
          </div>

          <footer class="container mt-4 mb-4"></footer>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/busSchedule.js"></script>
  </body>
</html>
