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
            <ul class="nav nav-tabs" id="busTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="basic_nav"
                  data-bs-toggle="tab"
                  data-bs-target="#basic"
                  type="button"
                >
                  Basic Info
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="feature_nav"
                  disabled
                  data-bs-toggle="tab"
                  data-bs-target="#features"
                  type="button"
                >
                  Features
                </button>
              </li>
            </ul>

            <!-- Tab Content -->
            <div class="tab-content mt-3">
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
                    class="d-grid gap-2"
                    style="grid-template-columns: repeat(4, 1fr)"
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
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <!-- Features -->
              <div class="tab-pane fade" id="features">
                <table class="table" id="feature_table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">Fare Factor</th>
                      <th scope="col" class="text-center">Charge</th>
                      <th scope="col" class="text-center">Status</th>
                      <th scope="col" class="text-center">Options</th>
                    </tr>
                  </thead>
                  <tbody id="feature_table_body">
                    <tr class="text-center">
                      <td>AC</td>
                      <td>235</td>
                      <td>Fixed Charge</td>
                      <td>
                        <button class="feature-btn">
                          <img
                            src="static/media/images/edit_sm_blue.svg"
                            class="feature-icon"
                          />
                        </button>
                        <button class="feature-btn ms-2">
                          <img
                            src="static/media/images/delete_sm_red.svg"
                            class="feature-icon"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr class="text-center">
                      <td>AC</td>
                      <td>235</td>
                      <td>Per person per km</td>
                      <td>
                        <button class="feature-btn">
                          <img
                            src="static/media/images/edit_sm_blue.svg"
                            class="feature-icon"
                          />
                        </button>
                        <button class="feature-btn ms-2">
                          <img
                            src="static/media/images/delete_sm_red.svg"
                            class="feature-icon"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <form id="features_form" class="d-flex flex-column gap-3">
                  <!-- AC Type -->
                  <div
                    class="d-flex align-items-center justify-content-center gap-4"
                  >
                    <div class="d-flex flex-column">
                      <label
                        for="fare_factor"
                        class="form-label small fw-semibold"
                        >Fare factor</label
                      >
                      <select
                        class="form-select fld"
                        id="fare_factor"
                        name="fare_factor"
                      >
                        <option value="">Select Factor</option>
                        <option value="1">AC</option>
                        <option value="2">Sleeper</option>
                        <option value="3">Wifi</option>
                      </select>
                    </div>

                    <div class="d-flex flex-column">
                      <label for="charge" class="form-label small fw-semibold"
                        >Price</label
                      >
                      <input
                        id="charge"
                        type="number"
                        name="charge"
                        class="form-control"
                        placeholder="Amount ranging between 0 to 100"
                      />
                    </div>

                    <div class="d-flex flex-column">
                      <div class="form-check mt-4">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="fixed_charge"
                          id="fixed_charge"
                        />
                        <label class="form-check-label" for="fixed_charge"
                          >Fixed charge</label
                        >
                        <img
                          src="static/media/images/help_sm_blue.svg"
                          class="bi bi-question-circle-fill text-muted"
                          tabindex="0"
                          data-bs-toggle="popover"
                          data-bs-trigger="focus"
                          data-bs-content="If not checked then charge will be assumed as per person per km"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
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
        <div class="p-4 d-flex flex-column align-items-end gap-3">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#centeredModal"
          >
            + Add Bus
          </button>

          <input
            type="search"
            id="search_bus"
            class="form-control w-auto"
            placeholder="Search bus by number"
            style="min-width: 250px"
          />
        </div>
      </main>
    </div>

    <script type="module" src="static/js/bus_setting.js"></script>
  </body>
</html>
