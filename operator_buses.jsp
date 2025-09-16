<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Bus Management</title>
  </head>
  <body>
    <!-- Toasts -->
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 1080"
    ></div>

    <!-- Modal -->
    <div class="modal fade" id="centeredModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-semibold">Add New Bus</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <!-- Nav Tabs -->
            <!-- Tab Content -->
            <div class="tab-content">
              <!-- Basic Info -->
              <div class="tab-pane fade show active" id="basic">
                <form
                  id="basic_form"
                  enctype="multipart/form-data"
                  class="d-flex flex-column gap-3"
                >
                  <div>
                    <label for="bus_number" class="form-label small fw-semibold"
                      >Bus Number</label
                    >
                    <input
                      id="bus_number"
                      type="text"
                      name="bus_number"
                      class="form-control"
                      placeholder="MP20 1202"
                    />
                  </div>

                  <div>
                    <label
                      for="manufacturer"
                      class="form-label small fw-semibold"
                      >Manufacturer</label
                    >
                    <select
                      class="form-select"
                      id="manufacturer"
                      name="manufacturer"
                    >
                      <option value="">Select Manufacturer</option>
                      <option value="tata">Tata Motors</option>
                      <option value="ashok-leyland">Ashok Leyland</option>
                      <option value="eicher">Eicher Motors</option>
                      <option value="volvo">Volvo Buses</option>
                      <option value="mahindra">Mahindra & Mahindra</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="double_decker"
                      class="form-label small fw-semibold"
                      >Double Decker</label
                    >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="double_decker"
                        id="double_decker"
                      />
                      <label class="form-check-label" for="double_decker">
                        Double Decker
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="form-label small fw-semibold"
                      >Amenities
                    </label>
                    <ul
                      id="feature_list"
                      class="d-flex flex-wrap checkbox-grid list-unstyled"
                    ></ul>
                  </div>

                  <div>
                    <label for="bus_images" class="form-label small fw-semibold"
                      >Bus Images</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      multiple
                      id="bus_images"
                      name="bus_image"
                      accept="image/*"
                    />
                  </div>

                  <div
                    class="gap-2 prevcontainer"
                    id="preview_img_container"
                  ></div>
                  <div class="ms-auto">
                    <button
                      type="reset"
                      class="btn btn-secondary fw-medium"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary px-4 fw-medium ms-1"
                      form="basic_form"
                    >
                      Add Bus
                    </button>
                  </div>
                </form>
              </div>

              <!-- Features -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div class="dashContainer">
      <!-- Sidebar -->
      <c:import url="operator_sidebar.jsp" />

      <!-- Main Content -->
      <main
        class="flex-grow-1 d-flex flex-column bg-light"
        style="overflow: auto"
      >
        <!-- Navbar -->
        <c:import url="operator_navbar.jsp" />

        <!-- Page Header -->
        <div class="p-4 d-flex flex-column gap-3 overflow-scroll">
          <h2>All Buses</h2>
          <div class="businfo gap-2 align-items-center justify-content-between">
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
                  class="bi bi-bus-front"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"
                  />
                  <path
                    d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  TOTAL BUSES
                </p>
                <h5 class="mb-0 fs-5 fw-medium">25</h5>
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
                  class="bi bi-bus-front"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"
                  />
                  <path
                    d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  ACTIVE BUSES
                </p>
                <h5 class="mb-0 fs-5 fw-medium">25</h5>
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
                  class="bi bi-bus-front"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"
                  />
                  <path
                    d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  INACTIVE BUSES
                </p>
                <h5 class="mb-0 fs-5 fw-medium">25</h5>
              </div>
            </div>
            <div
              class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
            >
              <div
                class="bg-warning-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#ffc107"
                  class="bi bi-bus-front"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"
                  />
                  <path
                    d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  INCOMPLETE BUSES
                </p>
                <h5 class="mb-0 fs-5 fw-medium">25</h5>
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
                + Add Bus
              </button>
            </div>
          </div>
          <table
            class="border rounded table-responsive border-bottom-0"
            id="bus_table"
          >
            <thead>
              <tr class="border border-bottom text-center">
                <th class="p-3">Bus Number</th>
                <th class="p-3">Manufacturer</th>
                <th class="p-3">Status</th>
                <th class="p-3">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center border-bottom"
                data-id="${operatorTicketFareId}"
              >
                <td class="p-3">MP20 KM 3767</td>
                <td class="p-3">Tata Moters</td>

                <td class="p-3 charge">
                  <span
                    class="badge border text-danger bg-danger-subtle border-danger"
                    >ACTIVE</span
                  >
                </td>
                <td class="p-3">
                  <div class="dropdown">
                    <button
                      class="btn bg-transparent"
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
                        <a class="dropdown-item" href="#">Edit</a>
                      </li>
                      <li class="border-bottom">
                        <a class="dropdown-item" href="#">Seating</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Schedule</a>
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

    <script type="module" src="static/js/bus_setting.js"></script>
  </body>
</html>
