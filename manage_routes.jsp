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
              <button class="btn btn-primary align-self-end">
                &plus; Add Mid Cities
              </button>
              <table
                class="border rounded table-responsive w-100"
                id="route_mid_city_table"
              >
                <thead
                  class="border border-bottom text-center"
                  style="background-color: rgb(248, 249, 250)"
                >
                  <tr>
                    <th class="p-3">Mid City</th>
                    <th class="p-3">Distance</th>
                    <th class="p-3">Duration</th>
                    <th class="p-3">Halting Time</th>
                    <th class="p-3">Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center border-bottom">
                    <td class="p-3 text-center">Katni</td>
                    <td class="p-3 text-center">60km</td>
                    <td class="p-3 text-center">180mins</td>
                    <td class="p-3 text-center">24mins</td>
                    <td
                      class="p-3 text-center d-flex gap-2 justify-content-center align-items-center"
                    >
                      <button
                        class="btn manage-icon border-primary-subtle py-2 px-2"
                      >
                        <img
                          src="static/media/images/edit_sm_blue.svg"
                          width="18"
                          height="18"
                        />
                        <span class="text-primary">Edit</span>
                      </button>
                      <button
                        class="btn delete-icon border-danger-subtle py-2 px-2"
                      >
                        <img
                          src="static/media/images/delete_sm_red.svg"
                          width="18"
                          height="18"
                        />
                        <span class="text-danger">Remove</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
