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

      .midcities-btn {
        background-color: oklch(89.4% 0.057 293.283);
        color: oklch(49.1% 0.27 292.581);
        border: none;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.2s;
      }

      .midcities-btn:hover {
        background-color: oklch(89.4% 0.057 293.283);
      }

      .decker-btn {
        background-color: #ffe9d6;
        color: #d46a1f;
        border: none;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.2s;
      }
      .decker-btn:hover {
        background-color: #fee0c7;
      }

      /* Amenities List */
      .amenities-list {
        background-color: #f4f8ff;
        border-radius: 10px;
        padding: 0.8rem;
        margin-top: 0.8rem;
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

      .badge-layout {
        background-color: #20c997;
        color: white;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
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

      .bus {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 12px;
        min-width: 260px;
        width: 260px;
        max-width: 260px;
      }

      .seater_seat {
        width: 30px;
        height: 35px;
      }

      .sleeper_seat {
        width: 40px;
        height: 80px;
      }
      .seat {
        border: 1px solid #0b6b45;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: transparent;
        color: #0b6b45;
        transition: background-color 0.2s ease, color 0.2s ease;
      }

      .seat:hover {
        background-color: #d1e7dd;
        color: #0b6b45;
      }

      .seat:active {
        background-color: #0b6b45;
        color: #ffffff;
      }

      .seat.selected {
        background-color: #0b6b45;
        color: #ffffff;
        border-color: #0b6b45;
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .side-bar {
        max-width: 400px;
      }

      .link {
        gap: 5px;
        transition: all 0.3s;
        &:hover {
          margin-left: 10px;
        }
      }

      .active {
        background-color: #0d6efd;
      }
      .active:hover {
        background-color: #084aae;
      }

      .inactive:hover {
        background-color: #cfe2ff;
        color: rgb(36, 36, 36);
      }

      .seat.booked {
        background-color: #adb5bd;
        border-color: #adb5bd;
        cursor: not-allowed;
      }

      .seat.selected {
        background-color: #0b6b45;
        color: #fff;
        border-color: #0b6b45;
      }
      .seat-list {
        max-height: 330px;
        overflow-y: auto;
      }

      .seat-list::-webkit-scrollbar {
        width: 6px;
      }

      .seat-list::-webkit-scrollbar-thumb {
        background-color: #ced4da;
        border-radius: 10px;
      }
    </style>
  </head>
  <c:import url="essential_page_display.jsp" />
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
                  class="btn-check filter ac"
                  value="ac"
                  name="bus_type_ac"
                  id="ac_lg"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-primary flex-fill rounded-pill"
                  for="ac_lg"
                  >AC</label
                >
                <input
                  type="radio"
                  class="btn-check filter ac"
                  value="non_ac"
                  name="bus_type_ac"
                  id="nac_lg"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-secondary flex-fill rounded-pill"
                  for="nac_lg"
                  >Non AC</label
                >
              </div>

              <div class="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  class="btn-check filter seater seat"
                  name="bus_type_seat"
                  value="seater"
                  id="seater_lg"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-success flex-fill rounded-pill"
                  for="seater_lg"
                  >Seater</label
                >
                <input
                  type="radio"
                  class="btn-check filter sleeper seat"
                  name="bus_type_seat"
                  value="sleeper"
                  id="sleeper_sm"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-warning flex-fill rounded-pill"
                  for="sleeper_sm"
                  >Sleeper</label
                >
              </div>
              <select class="form-select rounded-pill filter sort-departure">
                <option selected value="">Sort by Departure</option>
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
            <form class="row g-3 align-items-end" id="search_bus_form">
              <div class="col-md-3">
                <label for="from" class="form-label fw-medium">From</label>
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    id="from"
                    name="from"
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
                <label for="to" class="form-label fw-medium">To</label>
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    id="to"
                    name="to"
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
                <label for="journey_date" class="form-label fw-medium"
                  >Journey Date</label
                >
                <input
                  type="date"
                  class="form-control rounded-pill"
                  id="journey_date"
                  name="journey_date"
                  min="${e:currentDate()}"
                  value="${param.journey_date}"
                />
              </div>
              <div class="col-md-3">
                <button
                  type="submit"
                  id="submit"
                  class="btn btn-primary rounded-pill w-100"
                >
                  Search
                </button>
              </div>

              <input
                type="hidden"
                name="source"
                value="${param.source}"
                id="source"
              />
              <input
                type="hidden"
                id="destination"
                name="destination"
                value="${param.destination}"
              />
            </form>
          </div>

          <div class="mb-4">
            <p class="mb-2 fw-medium" id="total_result">6 Results Found</p>
            <div class="d-flex flex-wrap gap-2 align-items-center">
              <select
                class="form-select w-auto rounded-pill filter"
                id="sort_price"
              >
                <option selected value="">Sort by Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              <select
                class="form-select w-auto rounded-pill filter"
                id="sort_seat"
              >
                <option selected value="">Sort by Seats</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              <button
                class="btn btn-secondary rounded-pill ms-auto filter"
                id="clear_filter"
                disabled
                type="button"
              >
                <i class="bi bi-trash"></i> Clear Filters
              </button>
            </div>
          </div>
          <ul class="list-unstyled" id="search_result_container"></ul>
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
              class="btn-check filter ac"
              value="ac"
              name="bus_type_ac"
              id="ac_sm"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-primary flex-fill rounded-pill"
              for="ac_sm"
              >AC</label
            >
            <input
              type="radio"
              class="btn-check filter ac"
              name="bus_type_ac"
              value="non_ac"
              id="nac_sm"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-secondary flex-fill rounded-pill"
              for="nac_sm"
              >Non AC</label
            >
          </div>
          <div class="d-flex align-items-center gap-2">
            <input
              type="radio"
              class="btn-check filter seater seat"
              name="bus_type_seat"
              value="seater"
              id="seater_sm"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-success flex-fill rounded-pill"
              for="seater_sm"
              >Seater</label
            >
            <input
              type="radio"
              class="btn-check filter sleeper seat"
              name="bus_type_seat"
              id="sleeper_sm"
              value="sleeper"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-warning flex-fill rounded-pill"
              for="sleeper_sm"
              >Sleeper</label
            >
          </div>
          <select class="form-select rounded-pill filter sort-departure">
            <option selected value="">Sort by Departure</option>
            <option value="low">Early</option>
            <option value="high">Late</option>
          </select>
        </div>
      </div>
    </div>
    <%-- ####################### FILTER SIDE BAR END #######################
    --%>
  </body>
  <script type="module" src="static/js/searchResult.js"></script>
</html>
