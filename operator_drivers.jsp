<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Document</title>
  </head>
  <body>
    <c:import url="essential_page_display.jsp" />
    <div class="modal fade" id="centeredModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-semibold">Add New Driver</h5>
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
                  id="add_driver_form"
                  enctype="multipart/form-data"
                  class="d-flex flex-column gap-3"
                >
                  <div>
                    <label for="email" class="form-label small fw-semibold"
                      >Email</label
                    >
                    <input
                      id="email"
                      type="email"
                      name="email"
                      class="form-control"
                      placeholder="pranavjha@gmail.com"
                    />
                  </div>

                  <div class="d-none" id="form_container_essential">
                    <div class="d-flex justify-content-between">
                      <div>
                        <label
                          for="licence_no"
                          class="form-label small fw-semibold"
                          >Licence Number</label
                        >
                        <input
                          type="date"
                          name="start_date"
                          id="start_date"
                          class="form-control custome-date"
                          min="${e:currentDate()}"
                          value="${e:currentDate()}"
                        />
                      </div>

                      <div>
                        <label
                          for="licence_no"
                          class="form-label small fw-semibold"
                          >Licence Number</label
                        >
                        <input
                          id="licence_no"
                          type="text"
                          name="licence_no"
                          class="form-control"
                          placeholder="e.g. MH12 20150012345"
                        />
                      </div>
                    </div>

                    <div class="mt-2">
                      <label
                        for="licence_pic"
                        class="form-label small fw-semibold"
                        >Licence Pic</label
                      >
                      <input
                        class="form-control"
                        type="file"
                        id="licence_pic"
                        name="licence_pic"
                        accept="image/*"
                      />
                    </div>

                    <div
                      class="gap-2 prevcontainer mt-2"
                      id="licence_pic_preview"
                    ></div>

                    <div id="profile_pic_container"></div>
                    <div class="ms-auto text-end align-self-end mt-2">
                      <button
                        type="submit"
                        class="btn btn-primary px-4 fw-medium ms-1"
                        form="add_driver_form"
                      >
                        Add Bus
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Features -->
            </div>
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
        <div class="p-4 d-flex flex-column overflow-scroll">
          <h2>All Drivers</h2>
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
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  TOTAL DRIVERS
                </p>
                <h5 class="mb-0 fs-5 fw-medium">0</h5>
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
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  ACTIVE DRIVERS
                </p>
                <h5 class="mb-0 fs-5 fw-medium">0</h5>
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
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  INACTIVE DRIVERS
                </p>
                <h5 class="mb-0 fs-5 fw-medium">25</h5>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="ms-auto d-flex align-items-center gap-2">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#centeredModal"
              >
                + Add Driver
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script type="module" src="static/js/operatorDrivers.js"></script>
  </body>
</html>
