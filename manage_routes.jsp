<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Route Information</title>
    <style>
      /* Existing styles */
      .dropdown-menu {
        width: 350px;
        max-height: 320px;
        overflow-y: auto;
      }
      .form-check {
        border-radius: 0.75rem;
        transition: background-color 0.15s ease;
      }
      .form-check:hover {
        background-color: var(--bs-light);
      }
      .bus-number {
        font-weight: 600;
        font-size: 1rem;
      }
      .bus-meta {
        font-size: 0.875rem;
        color: var(--bs-secondary-color);
      }

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
        margin-bottom: 0.5rem;
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

      .location-icon {
        font-size: 1rem;
        margin-right: 0.25rem;
      }

      .origin {
        color: #dc3545;
      }

      .destination {
        color: #198754;
      }

      .arrow {
        color: #6c757d;
        margin: 0 0.5rem;
        font-weight: 400;
      }

      .warning {
        border: 1px solid #ff8c00;
        color: #ff8c00;
      }

      .route-card {
        border-bottom: 1px solid #e0e0e0;
        background: #fff;
        transition: all 0.3s ease;
      }

      .route-item {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: #212529;
        padding: 12px 16px;
        transition: all 0.25s ease;
      }

      .route-item:hover {
        background: #f8f9fa;
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      .route-header {
        display: flex;
        flex-direction: column;
        margin-bottom: 6px;
      }

      .route-title {
        font-weight: 600;
        font-size: 1rem;
        color: #343a40;
      }

      .route-subtitle {
        color: #6c757d;
        font-size: 0.85rem;
      }

      .route-info {
        display: flex;
        gap: 18px;
        margin-top: 4px;
        font-size: 0.9rem;
        color: #6c757d;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    </style>
  </head>
  <body>
    <c:import url="essential_page_display.jsp" />

    <div class="modal fade" id="centeredModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-semibold">Add Route Mid City</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form id="add_route_form" class="gap-3">
              <!-- Route Selection -->
              <input type="hidden" name="route_id" id="route_id" />
              <input
                type="hidden"
                name="operator_route_id"
                id="operator_route_id"
              />
              <div class="mb-3">
                <p class="form-label fw-semibold small">Route</p>
                <div class="route-card" id="active_route"></div>
              </div>

              <!-- Mid City & Haling Time -->
              <div class="row g-3 mb-3">
                <input type="hidden" id="route_midcity_id" />
                <!-- Mid City -->
                <div class="col-md-6 position-relative">
                  <label
                    for="route_midcity_select"
                    class="form-label small fw-semibold"
                    >Mid City</label
                  >
                  <div class="dropdown">
                    <button
                      class="btn form-select border rounded w-100 d-flex justify-content-between align-items-center"
                      type="button"
                      id="route_midcity_select"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="text-secondary">Select Mid City</span>
                    </button>
                    <ul
                      id="route_midcity_available_list"
                      class="dropdown-menu w-100 shadow"
                      style="max-height: 200px; overflow-y: auto"
                    >
                      <li
                        role="button"
                        class="dropdown-item py-2 d-flex justify-content-between align-items-center"
                        data-routeMidCityId="${routeMidCityId}"
                        data-routeid="${currRoute.routeId}"
                      >
                        <div class="d-flex flex-column">
                          <span class="city">&#128205; Katangi</span>
                          <small class="text-muted state">Madhya Pradesh</small>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                          <span class="small text-muted distance">60 km</span>
                          <span class="small text-muted">|</span>
                          <span class="small text-muted duration">1h 37m</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Halting Time -->
                <div class="col-md-6">
                  <label for="halting_time" class="form-label small fw-semibold"
                    >Halting Time</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">&#9201;</span>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Halting Time (mins)"
                      disabled
                      id="halting_time"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div class="rounded">
                      <table
                        class="table table-responsive table-bordered text-center align-middle mb-0"
                        id="mid_city_selected_table"
                      ></table>
                      <tbody></tbody>
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-end mt-2">
                  <button
                    type="button"
                    id="add_midcity_btn"
                    disabled
                    class="btn text-primary py-0 border-primary bg-primary-subtle align-self-end ms-auto"
                  >
                    &plus; Add Mid City
                  </button>
                </div>
              </div>

              <!-- Select mid ICyt List-->
              <div id="selected_midcity_list"></div>

              <!-- Submit Button -->
              <div class="d-flex align-items-end">
                <input
                  type="submit"
                  id="submit_add_route_btn"
                  value="Add Route"
                  class="btn btn-primary align-self-end ms-auto px-4 py-2"
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
            href="operator_routes.do"
            class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link back-link align-self-start"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>

          <div class="container mt-2 mb-4" id="pageWrapper">
            <!-- Route Information Card -->
            <div class="route-card p-4 card-border-accent">
              <div
                class="d-flex flex-column flex-md-row align-items-center justify-content-between"
              >
                <!-- Route Section -->
                <div
                  class="route-section text-center text-md-start mb-3 mb-md-0"
                >
                  <div class="section-title">Route</div>
                  <div class="section-content">
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

                <div class="divider d-none d-md-block"></div>
                <div class="divider d-md-none"></div>

                <!-- Journey Time Section -->
                <div class="time-section text-center mb-3 mb-md-0">
                  <div class="section-title">Journey Time</div>
                  <div class="section-content fs-4" id="duration_info"></div>
                </div>

                <div class="divider d-none d-md-block"></div>
                <div class="divider d-md-none"></div>

                <!-- Distance Section -->
                <div class="distance-section text-center">
                  <div class="section-title">Distance</div>
                  <div class="section-content fs-4">
                    <span id="distance_info"></span> km
                  </div>
                </div>

                <div class="time-section text-center mb-3 mb-md-0">
                  <div class="section-title">Status</div>
                  <div class="section-content fs-4" id="status"></div>
                </div>
              </div>
            </div>

            <div class="d-flex gap-2 align-items-center mt-4 mb-0" id="nav">
              <button
                class="btn btn-primary rounded-pill"
                data-target="route_time_line"
              >
                Route Timeline
              </button>
              <button
                class="btn text-primary border border-primary rounded-pill"
                data-target="route_mid_city_cont"
              >
                Mid Cities
              </button>
              <button
                class="btn text-primary border border-primary rounded-pill"
              >
                Buses
              </button>
            </div>
          </div>
          <div class="d-flex flex-column gap-3">
            <div
              class="bg-white p-4 rounded shadow-sm d-flex flex-column"
              id="route_time_line"
            >
              <h2 class="fs-3">Route TimeLine & Mid Cities</h2>
              <div
                class="d-flex flex-column align-items-start pt-4"
                id="route_timeline_cont"
              ></div>
            </div>
            <div
              class="bg-white p-4 rounded shadow-sm d-flex flex-column gap-3"
              id="route_mid_city_cont"
            >
              <h2 class="fs-3">Route Mid Cities</h2>
              <button
                class="btn btn-primary align-self-end"
                data-bs-toggle="modal"
                data-bs-target="#centeredModal"
              >
                &plus; Add Mid Cities
              </button>
              <table
                class="border rounded table-responsive w-100"
                id="route_mid_city_table"
              ></table>
            </div>
          </div>

          <!-- Rest of your existing content -->
          <footer class="container mt-4 mb-4">
            <!-- Your existing fare factor and table content here -->
          </footer>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/manageRoute.js"></script>
  </body>
</html>
