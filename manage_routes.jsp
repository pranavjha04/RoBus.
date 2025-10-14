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
            href="operator_fare_factor.do"
            class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link align-self-start"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>

          <div class="container mt-2 mb-4">
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
                    <i class="bi bi-geo-alt-fill location-icon origin"></i
                    >Jabalpur
                    <span class="arrow">&rarr;</span>
                    <i class="bi bi-geo-alt-fill location-icon destination"></i
                    >Sagar
                  </div>
                </div>

                <div class="divider d-none d-md-block"></div>
                <div class="divider d-md-none"></div>

                <!-- Journey Time Section -->
                <div class="time-section text-center mb-3 mb-md-0">
                  <div class="section-title">Journey Time</div>
                  <div class="section-content">5 hrs 20 mins</div>
                </div>

                <div class="divider d-none d-md-block"></div>
                <div class="divider d-md-none"></div>

                <!-- Distance Section -->
                <div class="distance-section text-center">
                  <div class="section-title">Distance</div>
                  <div class="section-content">197 km</div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-4 mb-0">
              <a role="button" class="btn btn-primary rounded-pill">
                Route Timeline
              </a>
              <button
                class="btn text-primary border border-primary rounded-pill"
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
          <div class="bg-white p-4 rounded shadow-sm" id="route_time_line">
            <h2 class="fs-3">Route TimeLine & Mid Cities</h2>
            <div
              class="d-flex flex-column align-items-start gap-3 border-start border-black"
            >
              <div
                class="d-flex flex-column align-items-center justify-content-center gap-1 position-relative px-4"
              >
                <div
                  style="
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    left: -5px;
                  "
                  class="position-absolute top-0 bg-danger"
                ></div>

                <h4 class="fs-5 align-self-start">Katni</h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary"
                  >
                    <span>60</span>km from source
                  </p>
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border"
                    style="color: orange"
                  >
                    <span>10</span>mins Halting time
                  </p>
                </div>
              </div>
              <div
                class="d-flex flex-column align-items-center justify-content-center gap-1 position-relative px-4"
              >
                <div
                  style="
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    left: -5px;
                  "
                  class="position-absolute top-0 bg-danger"
                ></div>

                <h4 class="fs-5 align-self-start">Katni</h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary"
                  >
                    <span>60</span>km from source
                  </p>
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border"
                    style="color: orange"
                  >
                    <span>10</span>mins Halting time
                  </p>
                </div>
              </div>
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
