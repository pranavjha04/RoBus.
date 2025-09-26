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
      <div class="modal-dialog modal-lg modal-dialog-centered">
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
            <form id="add_route_form" class="gap-3">
              <!-- Source & Destination -->
              <div class="row g-3 mb-3">
                <!-- Source -->
                <div class="col-md-6 position-relative">
                  <label for="route_source" class="form-label fw-semibold small"
                    >Source</label
                  >
                  <input
                    type="search"
                    name="source"
                    id="route_source"
                    placeholder="Enter Source City"
                    class="form-control"
                    autocomplete="off"
                  />
                  <input type="hidden" id="source_search_id" />
                  <ul
                    id="source_list"
                    class="dropdown-menu w-100 shadow d-none overflow-y-auto position-absolute py-0"
                    style="z-index: 1000; max-height: 200px"
                  ></ul>
                </div>

                <!-- Destination -->
                <div class="col-md-6 position-relative">
                  <label
                    for="route_destination"
                    class="form-label fw-semibold small"
                    >Destination</label
                  >
                  <input
                    type="search"
                    name="destination"
                    id="route_destination"
                    placeholder="Enter Destination City"
                    class="form-control"
                    autocomplete="off"
                  />
                  <input type="hidden" id="destination_search_id" />
                  <ul
                    id="destination_list"
                    class="dropdown-menu w-100 shadow d-none overflow-y-auto position-absolute py-0"
                    style="z-index: 1000; max-height: 200px"
                  ></ul>
                </div>
              </div>

              <!-- Route Selection -->
              <div class="mb-3">
                <label for="route_select" class="form-label fw-semibold small"
                  >Route</label
                >
                <div class="dropdown">
                  <button
                    class="btn border rounded w-100 d-flex justify-content-between align-items-center form-select"
                    type="button"
                    id="route_select"
                    data-bs-toggle="dropdown"
                    disabled
                    aria-expanded="false"
                  >
                    <span class="text-secondary">Select Route</span>
                  </button>
                  <input type="hidden" name="route_id" id="route_id" />
                  <ul
                    id="route_available_list"
                    class="dropdown-menu w-100 shadow-sm overflow-y-scroll"
                    style="max-height: 275px"
                    aria-labelledby="route_select"
                  ></ul>
                </div>
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
                    ></ul>
                  </div>
                </div>

                <!-- Halting Time -->
                <div class="col-md-6">
                  <label
                    for="halting_time"
                    class="form-label small fw-semibold"
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
                <!-- <div class="">
                  <div class="">
                    <div class="rounded">
                      <table
                        class="table table-responsive table-bordered text-center align-middle mb-0"
                      >
                        <thead class="table-light">
                          <tr>
                            <th class="p-2">Mid City</th>
                            <th class="p-2">Distance</th>
                            <th class="p-2">Duration</th>
                            <th class="p-2">Halting Time</th>
                            <th class="p-2">Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="p-2">Katnagi</td>
                            <td class="p-2">240 km</td>
                            <td class="p-2">4h 30m</td>
                            <td class="p-2 w-25">
                              <span
                                ><input
                                  class="input text-center p-0 rounded-2 focus-ring"
                                  value="15"
                              /></span>
                            </td>
                            <td class="p-2">
                              <button
                                type="button"
                                class="feature-btn"
                                data-type="edit"
                              >
                                <img
                                  src="static/media/images/edit_sm_blue.svg"
                                  class="feature-icon"
                                />
                              </button>
                              <button
                                type="button"
                                class="feature-btn ms-2"
                                data-type="delete"
                              >
                                <img
                                  src="static/media/images/delete_sm_red.svg"
                                  class="feature-icon"
                                />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> -->

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
            <div>
              <label class="form-label small fw-semibold" for="source_search"
                >Source</label
              >
              <input
                type="search"
                id="source_search"
                placeholder="Enter Source City"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="form-label small fw-semibold"
                for="destination_search"
                >Destination</label
              >
              <input
                type="search"
                id="destination_search"
                placeholder="Enter Destination City"
                class="form-control"
              />
            </div>
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
