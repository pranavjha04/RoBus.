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
            <h5 class="modal-title fw-semibold">Add Route</h5>
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
          <h2>All Routes</h2>
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
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  TOTAL ROUTES
                </p>
                <h5 class="mb-0 fs-5 fw-medium" id="total_route">0</h5>
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
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  ACTIVE ROUTES
                </p>
                <h5 class="mb-0 fs-5 fw-medium" id="total_active">0</h5>
              </div>
            </div>
            <div
              class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
            >
              <div
                class="bg-danger-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#dc3545"
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  INACTIVE ROUTES
                </p>
                <h5 class="mb-0 fs-5 fw-medium" id="total_inactive">0</h5>
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
                <button class="btn">Active</button>
                <button class="btn">Inactive</button>
              </div>

              <select
                class="my-select focus-ring rounded border-0"
                id="sort_duration"
              >
                <option value="">Sort by Duration</option>
                <option value="low">Shortest to Longest</option>
                <option value="high">Longest to Shortest</option>
              </select>
              <select
                class="my-select focus-ring rounded border-0"
                id="sort_distance"
              >
                <option value="">Sort by Distance</option>
                <option value="low">Nearest to Farthest</option>
                <option value="high">Farthest to Nearest</option>
              </select>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#centeredModal"
              >
                + Add Route
              </button>
            </div>
          </div>
          <div class="d-flex align-self-end gap-2">
            <input
              type="search"
              id="source_search"
              placeholder="Enter Source City"
              class="form-control"
            />
            <input
              type="search"
              id="destination_search"
              placeholder="Enter Destination City"
              class="form-control"
            />
          </div>

          <table
            class="border rounded table-responsive border-bottom-0"
            id="route_table"
          >
            <thead class="border border-bottom text-center">
              <th class="p-3">Source</th>
              <th class="p-3">Destination</th>
              <th class="p-3">Distance</th>
              <th class="p-3">Duration</th>
              <th class="p-3">Status</th>
              <th class="p-3">Options</th>
            </thead>
            <tbody>
              <tr class="text-center border-bottom">
                <td class="p-3">Jabalpur</td>
                <td class="p-3">Sagar</td>
                <td class="p-3">180<small class="small">km</small></td>
                <td class="p-3">
                  4<small class="small">h</small> 30<small class="small"
                    >mins</small
                  >
                </td>
                <td class="p-3">
                  <span
                    class="badge border text-success bg-success-subtle border-success"
                    >ACTIVE</span
                  >
                </td>
                <td class="p-3">
                  <div class="dropdown">
                    <button
                      class="btn bg-transparent option-btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="static/media/images/options_sm.svg"
                        alt="option"
                      />
                    </button>
                    <ul class="dropdown-menu">
                      <li class="border-bottom">
                        <a class="dropdown-item option-link" href="#">Edit</a>
                      </li>
                      <li class="border-bottom">
                        <a
                          class="dropdown-item option-link"
                          href="bus_seating_configuration.do?bus_id=${busId}&back_url=operator_buses.do"
                          >Seating</a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item option-link" href="#"
                          >Schedule</a
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <script type="module" src="static/js/bus_routes.js"></script>
  </body>
</html>
