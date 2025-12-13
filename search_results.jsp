<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <c:import url="essential_page_import.jsp" />
    <title>Bus Search</title>
    <style>
      /* Custom styles for improved UI */
      body {
        background-color: #f8f9fa; /* Softer light background */
        overflow: scroll;
      }
      .navbar {
        background-color: #007bff; /* Primary blue for navbar */
      }
      .filter-sidebar {
        background-color: #ffffff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      .bus-card {
        border: none;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .bus-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
      .badge-custom {
        font-size: 0.85rem;
        padding: 0.4em 0.8em;
        border-radius: 20px; /* More pill-like */
      }
      .badge-ac {
        background-color: #0d6efd; /* Blue for AC */
        color: white;
      }
      .badge-non-ac {
        background-color: #6c757d; /* Gray for Non-AC */
        color: white;
      }
      .badge-seater {
        background-color: #198754; /* Green for Seater */
        color: white;
      }
      .badge-sleeper {
        background-color: #ffc107; /* Yellow for Sleeper */
        color: #212529;
      }
      .badge-seats {
        background-color: #20c997; /* Teal for seats config */
        color: white;
      }
      .price {
        color: #212529; /* Green for price */
      }
      .seats-available {
        color: #dc3545; /* Red for urgency */
        font-size: 0.9rem;
      }
      .duration-line {
        border-top: 1px dashed #6c757d;
        width: 80px;
        margin: 0 auto;
      }
      .search-form {
        background-color: #ffffff;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 2rem;
      }
      .btn-search {
        background-color: #007bff;
        border: none;
        padding: 0.75rem 1.5rem;
        font-weight: 500;
      }
      .btn-search:hover {
        background-color: #0056b3;
      }
      .form-control:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
      }
      /* Amenities Button */
      .amenities-btn {
        background-color: #e8f1ff;
        color: #0d47a1;
        border: none;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.2s;
      }

      .amenities-btn:hover {
        background-color: #d7e7ff;
      }

      /* Amenities List */
      .amenities-list {
        background-color: #f4f8ff;
        border-radius: 10px;
        padding: 0.8rem;
        margin-top: 0.8rem;
        display: none;
        animation: fadeSlide 0.3s ease;
      }

      .amenity-item {
        background: #e8f1ff;
        color: #0d47a1;
        padding: 0.35rem 0.75rem;
        border-radius: 16px;
        font-size: 0.85rem;
        display: inline-block;
        margin: 4px;
      }

      @keyframes fadeSlide {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Seat Layout Badge (always visible) */
      .badge-layout {
        background-color: #20c997;
        color: white;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
      }
      .layout-badge {
        background: #ffe9d6; /* very light peach */
        color: #d46a1f; /* soft orange text */
        padding: 6px 16px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 0.9rem;
        border: 1px solid #ffd2b0;
      }

      .layout-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #0b6b45;
        display: inline-block;
      }
      /* Suggestion box */
      .suggestion-box {
        position: absolute;
        background: #ffffff;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #e2e6ea;
        border-radius: 12px;
        margin-top: 2px;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      }

      .suggestion-item {
        padding: 10px 14px;
        cursor: pointer;
        border-bottom: 1px solid #f1f3f5;
        font-size: 0.95rem;
      }

      .suggestion-item:last-child {
        border-bottom: none;
      }

      .suggestion-item:hover {
        background: #f8f9fa;
      }
    </style>
  </head>
  <body class="d-flex flex-column text-dark min-vh-100">
    <c:import url="welcome_navbar.jsp" />
    <section class="container-fluid px-3 mt-4">
      <div class="row g-4">
        <aside class="col-lg-3 d-none d-lg-block">
          <div class="filter-sidebar">
            <h5 class="fw-bold mb-4 text-primary">Filters</h5>
            <%-- #################### BUS TYPE #################### --%>
            <div class="d-flex flex-column gap-3">
              <h6 class="fw-semibold">Bus Type</h6>
              <div class="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_ac"
                  id="ac"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-primary flex-fill rounded-pill"
                  for="ac"
                  >AC</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_ac"
                  id="non_ac"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-secondary flex-fill rounded-pill"
                  for="non_ac"
                  >Non AC</label
                >
              </div>
              <div class="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_seat"
                  id="seater"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-success flex-fill rounded-pill"
                  for="seater"
                  >Seater</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_seat"
                  id="sleeper"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-warning flex-fill rounded-pill"
                  for="sleeper"
                  >Sleeper</label
                >
              </div>
              <select class="form-select rounded-pill">
                <option selected disabled>Sort by Departure</option>
                <option value="low">Early</option>
                <option value="high">Late</option>
              </select>
            </div>
          </div>
        </aside>
        <main class="col-12 col-lg-9">
          <div class="d-lg-none mb-3">
            <button
              class="btn btn-outline-primary rounded-pill"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterOffcanvas"
            >
              <img
                src="static/media/images/filter_list_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.svg"
                alt="Filters"
              />
              Filters
            </button>
          </div>

          <!-- Added Search Form Above Results -->
          <div class="search-form">
            <h5 class="fw-bold mb-4 text-primary">Search Buses</h5>
            <form class="row g-3 align-items-end">
              <div class="col-md-3">
                <label for="fromCity" class="form-label fw-medium">From</label>
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    id="from"
                    value="${param.from}"
                    placeholder="e.g., Delhi"
                  />
                  <ul
                    id="from_suggestion"
                    class="list-group position-absolute w-100 bg-white border-top-0 border rounded shadow-sm top-100 z-3 overflow-auto d-none"
                    style="max-height: 200px"
                  ></ul>
                </div>
              </div>
              <div class="col-md-3">
                <label for="toCity" class="form-label fw-medium">To</label>
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    id="to"
                    value="${param.to}"
                    placeholder="e.g., Kashmir"
                  />
                  <ul
                    id="to_suggestion"
                    class="list-group position-absolute w-100 bg-white border-top-0 border rounded shadow-sm top-100 z-3 overflow-auto d-none"
                    style="max-height: 200px"
                  ></ul>
                </div>
              </div>
              <div class="col-md-3">
                <label for="journeyDate" class="form-label fw-medium"
                  >Journey Date</label
                >
                <input
                  type="date"
                  class="form-control rounded-pill"
                  id="journey_date"
                  min="${e:currentDate()}"
                  value="${param.journey_date}"
                />
              </div>
              <div class="col-md-3">
                <button
                  type="submit"
                  class="btn btn-primary rounded-pill w-100"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <form class="mb-4">
            <p class="mb-2 fw-medium">6 Results Found</p>
            <div class="d-flex flex-wrap gap-2 align-items-center">
              <select class="form-select w-auto rounded-pill">
                <option selected disabled>Sort by Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              <select class="form-select w-auto rounded-pill">
                <option selected disabled>Sort by Seats</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </form>
          <ul class="list-unstyled">
            <li class="bus-card mb-4 bg-white">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 p-4"
              >
                <!-- LEFT SIDE (Title + Badges + Amenity Button) -->
                <div class="flex-grow-1">
                  <h5 class="fw-bold mb-2">Jai Mata Di Travels</h5>

                  <!-- Always visible seat layout -->
                  <span class="layout-badge">2 + 1</span>

                  <!-- Amenities Button -->
                  <button
                    class="amenities-btn mt-2"
                    onclick="toggleAmenities(this)"
                  >
                    View Amenities
                  </button>

                  <!-- Amenities List (Hidden by default) -->
                  <div class="amenities-list">
                    <span class="amenity-item">AC</span>
                    <span class="amenity-item">Sleeper</span>
                    <span class="amenity-item">Charging Point</span>
                    <span class="amenity-item">Blanket</span>
                    <span class="amenity-item">Reading Light</span>
                    <span class="amenity-item">Water Bottle</span>
                  </div>
                </div>

                <!-- MIDDLE SECTION (Timing) -->
                <div class="d-flex align-items-center gap-4">
                  <div class="text-center">
                    <p class="mb-1 fw-bold fs-5">10:00 AM</p>
                    <small class="text-muted">Delhi</small>
                  </div>

                  <div class="text-center">
                    <div class="duration-line my-2"></div>
                    <small class="text-muted fw-medium">3h 00m</small>
                  </div>

                  <div class="text-center">
                    <p class="mb-1 fw-bold fs-5">1:00 PM</p>
                    <small class="text-muted">Kashmir</small>
                  </div>
                </div>

                <!-- RIGHT SECTION (Price + Button) -->
                <div class="text-md-end d-flex flex-column align-items-md-end">
                  <div class="price fs-4 fw-bold mb-1">&#x20B9;850</div>
                  <span class="seats-available mb-2">29 Seats Available</span>
                  <a
                    href="#"
                    class="btn btn-primary rounded-pill px-4 py-2 fw-medium"
                    >Book Seats</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </section>
    <%-- ####################### FILTER SIDE BAR START #######################
    --%>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="filterOffcanvas">
      <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title fw-bold text-primary">Filters</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex flex-column gap-3">
          <h6 class="fw-semibold">Bus Type</h6>
          <div class="d-flex align-items-center gap-2">
            <input
              type="radio"
              class="btn-check"
              name="bus_type_ac"
              id="ac-mobile"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-primary flex-fill rounded-pill"
              for="ac-mobile"
              >AC</label
            >
            <input
              type="radio"
              class="btn-check"
              name="bus_type_ac"
              id="non_ac-mobile"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-secondary flex-fill rounded-pill"
              for="non_ac-mobile"
              >Non AC</label
            >
          </div>
          <div class="d-flex align-items-center gap-2">
            <input
              type="radio"
              class="btn-check"
              name="bus_type_seat"
              id="seater-mobile"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-success flex-fill rounded-pill"
              for="seater-mobile"
              >Seater</label
            >
            <input
              type="radio"
              class="btn-check"
              name="bus_type_seat"
              id="sleeper-mobile"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-warning flex-fill rounded-pill"
              for="sleeper-mobile"
              >Sleeper</label
            >
          </div>
          <select class="form-select rounded-pill">
            <option selected disabled>Sort by Departure</option>
            <option value="low">Early</option>
            <option value="high">Late</option>
          </select>
        </div>
      </div>
    </div>
    <%-- ####################### FILTER SIDE BAR END #######################
    --%>
  </body>
  <script>
    function toggleAmenities(btn) {
      const list = btn.nextElementSibling;
      if (list.style.display === "block") {
        list.style.display = "none";
        btn.innerText = "View Amenities";
      } else {
        list.style.display = "block";
        btn.innerText = "Hide Amenities";
      }
    }
  </script>
</html>
