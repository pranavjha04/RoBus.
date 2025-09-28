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
                ></ul>
              </div>
              <div>
                <label class="form-label small fw-semibold" for="charge"
                  >Charges</label
                >
                <input
                  type="number"
                  class="form-control"
                  placeholder="Charges"
                  name="charge"
                  id="charge"
                />
              </div>
              <div>
                <input
                  type="hidden"
                  value=""
                  name="fare_factor_id"
                  id="fare_factor"
                />
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
      <main
        class="flex-grow-1 d-flex flex-column bg-light"
        style="overflow: auto"
      >
        <!-- Top Navbar -->
        <c:import url="operator_navbar.jsp" />

        <!-- Dashboard Content -->

        <div class="p-4 d-flex flex-column gap-3 overflow-scroll">
          <h2>All Fare Factors</h2>
          <div class="businfo justify-content-between align-items-center gap-2">
            <div
              class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
            >
              <div
                class="bg-primary-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#0d6efd"
                  class="bi bi-credit-card"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 7v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  TOTAL FARE FACTOR
                </p>
                <h5 class="mb-0 fs-5 fw-medium" id="total_fare">0</h5>
              </div>
            </div>
            <div
              class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
            >
              <div
                class="bg-success-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#198754"
                  class="bi bi-currency-rupee"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  TOTAL FARE CHARGES
                </p>
                <h5 class="mb-0 fs-5 fw-medium" id="total_charges">0</h5>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="ms-auto d-flex align-items-center gap-2">
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
            class="border rounded table-responsive border-bottom-0"
            id="fare_factor_table"
          ></table>
        </div>
      </main>
    </div>

    <script type="module" src="static/js/bus_fare.js"></script>
  </body>
</html>
