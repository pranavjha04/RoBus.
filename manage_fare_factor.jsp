<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Document</title>
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
          <div class="align-self-start mt-2">
            <div
              class="p-4 rounded-4 shadow-sm border-start border-4 border-primary d-flex flex-column gap-3"
              style="max-width: 420px"
            >
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <span class="fs-6 fw-semibold text-secondary text-uppercase"
                    >Fare Factor Name</span
                  >
                  <h4 class="fw-bold text-dark mt-1 mb-0" id="factor_name"></h4>
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center border-top pt-3"
              >
                <div>
                  <span class="fs-6 fw-semibold text-secondary text-uppercase"
                    >Type</span
                  >
                  <h4 class="fw-bold text-dark mt-1 mb-0" id="charge_type"></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="align-self-start mt-2">
            <label class="form-label small fw-semibold fs-6" for="charges"
              >Charges</label
            >
          </div>
          <div class="align-self-start">
            <div class="d-flex align-items-center gap-2">
              <input
                type="number"
                class="form-control fs-5"
                placeholder="Charges"
                name="charges"
                id="charges"
                readonly
              />
              <button class="btn btn-primary px-4" id="edit_btn">Edit</button>
              <button class="btn btn-danger px-4" id="delete_btn">
                Delete
              </button>
            </div>
          </div>

          <table
            class="border rounded table-responsive border-bottom-0 mt-2"
            id="operator_ticket_fare_bus_table"
          >
            <thead>
              <tr class="border border-bottom text-center">
                <th class="p-3">Bus Number</th>
                <th class="p-3">Manufacturer</th>
                <th class="p-3">Status</th>
                <th class="p-3">Action</th>
              </tr>
            </thead>
            <tbody id="bus_table_body">
              <tr class="text-center border-bottom">
                <td class="p-3">MP20 KU 387</td>
                <td class="p-3">Tata Motors</td>

                <td class="p-3 charge">
                  <span
                    class="badge border text-success bg-success-subtle border-success"
                    >ACTIVE</span
                  >
                </td>
                <td class="p-3">
                  <button
                    class="btn delete-icon border-danger-subtle py-2 px-2"
                  >
                    <img
                      src="static/media/images/delete_sm_red.svg"
                      width="18"
                      height="18"
                    />
                    <span class="text-danger">Remove</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/manageFareFactor.js"></script>
  </body>
</html>
