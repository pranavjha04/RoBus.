<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Document</title>
  </head>
  <body>
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 1080"
    ></div>
    <div class="modal fade" id="centeredModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-semibold">Add Fare Factor</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form
              id="fare_factor_form"
              class="gap-2"
              style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, 1fr);
              "
            >
              <div class="dropdown">
                <label
                  for="fare_factor_select"
                  class="form-label small fw-semibold"
                  >Fare Factor</label
                >
                <button
                  class="btn form-select border rounded w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="fare_factor_select"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Fare Factor
                </button>
                <ul
                  id="form_factor_available_list"
                  class="dropdown-menu w-100 shadow overflow-y-scroll"
                  style="max-height: 275px"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Blanket</span>
                      <small class="text-secondary">(Fixed charge)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Wi-Fi</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Recliner Seat</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Wi-Fi</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Recliner Seat</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Wi-Fi</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Recliner Seat</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Wi-Fi</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Recliner Seat</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Wi-Fi</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex flex-column" href="#">
                      <span class="fw-semibold">Recliner Seat</span>
                      <small class="text-secondary">(Per person/km)</small>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <label class="form-label small fw-semibold" for="charge"
                  >Charges</label
                >
                <input
                  type="number"
                  class="form-control"
                  placeholder="Charges (Ranging 1 to 100)"
                  name="charge"
                  id="charge"
                />
              </div>
              <div>
                <input type="hidden" value="" id="fare_factor" />
              </div>
              <div class="align-self-center ms-auto">
                <input
                  type="submit"
                  value="Add Factor"
                  class="btn btn-primary"
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
      <main class="flex-grow-1 d-flex flex-column bg-light">
        <!-- Top Navbar -->
        <c:import url="operator_navbar.jsp" />

        <!-- Dashboard Content -->

        <div class="p-4 d-flex flex-column gap-4">
          <div class="d-flex justify-content-between align-items-center">
            <h3>All Fare Factors</h3>
            <div class="d-flex align-items-center gap-2">
              <div
                class="d-flex align-items-center bg-white rounded p-1"
                id="filter_nav"
              >
                <button class="btn btn-primary">All</button>
                <button class="btn">Fixed charge</button>
                <button class="btn">Person / km</button>
              </div>

              <select
                class="my-select focus-ring rounded border-0"
                id="sort_charges"
              >
                <option value="">Sort by Charges</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#centeredModal"
              >
                + Add Fare Factor
              </button>
            </div>
          </div>

          <table
            class="border rounded-2 border-bottom-0"
            id="fare_factor_table"
          ></table>
        </div>
      </main>
    </div>

    <script type="module" src="static/js/bus_fare.js"></script>
  </body>
</html>
