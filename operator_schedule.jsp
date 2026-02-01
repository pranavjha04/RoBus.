<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<c:if test="${empty sessionScope.operator}">
  <c:redirect url="/" />
</c:if>
<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Schedule Management | RoBus</title>
    <style>
      .norm {
        background: none;
        border: none;
        transition: all 0.25s ease;
      }
      .norm:hover {
        background-color: rgba(215, 215, 215, 0.477);
      }
      .active {
        background-color: #0d6efd;
        color: white;
      }
      .active:hover {
        background-color: #0451c3;
      }

      /* Fix layout for footer */
      body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .dashContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .wrapper {
        flex: 1;
        overflow: auto;
      }

      #pageWrapper {
        min-height: auto;
        flex: 1;
      }
    </style>
  </head>
  <c:set var="operator" value="${sessionScope.operator}" />
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
              data-bs-toggle="modal"
              data-bs-target="#centeredModal"
            ></button>
          </div>

          <div class="modal-body">
            <form id="schedule_bus_form" class="rounded-3">
              <input type="hidden" name="bus_id" value="" id="bus_id" />
              <!-- Journey Date -->
              <div class="mb-3">
                <label for="journey_date" class="form-label fw-semibold"
                  >Journey Date</label
                >
                <input
                  type="date"
                  class="form-control"
                  name="journey_date"
                  id="journey_date"
                  min="${e:currentDate()}"
                  required
                />
              </div>

              <input
                type="hidden"
                value=""
                name="bus_route_weekday_id"
                id="bus_route_weekday_id"
              />

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
              <input
                type="hidden"
                name="operator_route_id"
                name="operator_route_id"
                id="operator_route_id"
              />
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
                <c:choose>
                  <c:when test="${operator.status.statusId eq 1}">
                    <input
                      type="submit"
                      value="Add Schedule"
                      class="btn btn-primary px-4 py-2"
                    />
                  </c:when>
                  <c:otherwise>
                    <input
                      type="submit"
                      value="Add Schedule (Verify your email address)"
                      class="btn btn-primary px-4 py-2"
                      disabled
                    />
                  </c:otherwise>
                </c:choose>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="dashContainer">
      <c:import url="operator_navbar.jsp" />

      <!-- Main content -->
      <main class="content-wrapper bg-light">
        <c:import url="operator_sidebar.jsp" />

        <!-- Dashboard Content -->
        <div class="wrapper">
          <div class="p-4 d-flex flex-column">
            <div class="p-4 d-flex flex-column gap-3" id="pageWrapper">
              <h2>All Schedules</h2>
              <div class="d-flex flex-column gap-3 rounded p-2">
                <div
                  class="d-flex flex-column gap-2 px-3 py-2 bg-white shadow shadow-sm"
                >
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <div class="">
                      <h4>Select Date</h4>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <button
                        class="btn bg-secondary-subtle"
                        id="date_range_back"
                      >
                        &lt;
                      </button>
                      <span id="date_range_display"></span>
                      <button
                        class="btn bg-secondary-subtle"
                        id="date_range_next"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>

                  <div class="row" id="date_range"></div>
                </div>
                <div class="ms-auto d-flex align-items-center gap-2">
                  <div
                    class="d-flex align-items-center bg-white rounded p-1"
                    id="filter_nav"
                  >
                    <button class="btn btn-primary" data-type="upcoming">
                      Upcoming
                    </button>
                    <button class="btn" data-type="ongoing">Ongoing</button>
                    <button class="btn" data-type="completed">Completed</button>
                    <button class="btn" data-type="cancelled">Cancelled</button>
                  </div>
                </div>

                <table
                  class="border rounded table-responsive border-bottom-0"
                  id="schedule_table"
                ></table>
              </div>
            </div>

            <footer class="container mt-4 mb-4"></footer>
          </div>
        </div>
      </main>
    </div>

    <c:import url="operator_footer.jsp" />

    <script type="module" src="static/js/operatorSchedule.js"></script>
  </body>
</html>
