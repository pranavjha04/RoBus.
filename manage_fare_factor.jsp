<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Document</title>
    <style>
      .dropdown-menu {
        width: 350px;
        max-height: 320px;
        overflow-y: auto;
      }
      .form-check {
        border-radius: 0.75rem;
        transition: background-color 0.15s ease;
      }
      .form-check:hover {
        background-color: var(--bs-light);
      }
      .bus-number {
        font-weight: 600;
        font-size: 1rem;
      }
      .bus-meta {
        font-size: 0.875rem;
        color: var(--bs-secondary-color);
      }

      .fare-factor-card {
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.08);
        transition: all 0.2s ease;
        overflow: hidden;
        max-width: 100%;
      }

      .fare-factor-card:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }

      .card-border-accent {
        border-left: 4px solid #0d6efd;
      }

      .section-title {
        color: #6c757d;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }

      .section-content {
        color: #212529;
        font-weight: 700;
        font-size: 1.25rem;
        margin-bottom: 0;
      }

      .divider {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        padding-right: 1.5rem;
        margin-right: 1.5rem;
      }

      .divider:last-child {
        border-right: none;
        padding-right: 0;
        margin-right: 0;
      }

      .fare-factor-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
      }

      .fare-factor-section {
        flex: 1;
        padding: 0 1rem;
      }

      @media (max-width: 768px) {
        .fare-factor-row {
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .fare-factor-section {
          width: 100%;
          padding: 0;
        }

        .divider {
          border-right: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding-right: 0;
          margin-right: 0;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <c:import url="essential_page_display.jsp" />
    <div class="modal fade" id="centeredModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-semibold">Add Fare Factor</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form
              id="add_bus_fare_factor_form"
              class="gap-3"
              style="display: grid; grid-template-columns: 1fr; row-gap: 1rem"
            >
              <!-- Dropdown -->
              <input type="hidden" name="operator_ticket_fare_id" value="" />
              <div class="dropdown" data-bs-auto-close="outside">
                <p class="form-label small fw-semibold mb-2">Available Buses</p>

                <button
                  class="btn btn-outline-primary dropdown-toggle rounded-pill px-4 me-5"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Buses
                </button>

                <ul
                  class="dropdown-menu shadow-lg border-0 py-0 rounded-4 w-100 mt-2"
                  data-bs-auto-close="outside"
                  id="bus_select"
                  style="max-height: 250px; overflow-y: auto"
                ></ul>
              </div>

              <!-- Selected Buses -->
              <div>
                <label class="form-label small fw-semibold"
                  >Selected Buses</label
                >
                <div
                  id="selected_bus"
                  class="d-flex flex-wrap align-items-center gap-2 p-2 rounded-4 border border-secondary-subtle bg-body-tertiary shadow-sm"
                >
                  <span class="text-muted p-0 small" data-empty="true"
                    >No Bus Selected</span
                  >
                </div>
              </div>

              <div class="text-end">
                <input
                  type="submit"
                  value="Add Buses"
                  class="btn btn-primary rounded-pill px-4"
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
        <div class="p-4 d-flex flex-column overflow-scroll">
          <a
            href="operator_fare_factor.do"
            class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link align-self-start"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>
          <footer class="container mt-2 mb-4">
            <!-- Row Layout Fare Factor Card -->
            <div class="container d-flex">
              <div class="fare-factor-card p-0 card-border-accent w-100">
                <div class="fare-factor-row">
                  <!-- Fare Factor Name Section -->
                  <div class="fare-factor-section divider">
                    <div class="section-title">Fare Factor Name</div>
                    <div class="section-content" id="factor_name">
                      Standard Rate
                    </div>
                  </div>

                  <!-- Type Section -->
                  <div class="fare-factor-section divider">
                    <div class="section-title">Type</div>
                    <div class="section-content" id="charge_type">
                      Fixed Amount
                    </div>
                  </div>

                  <!-- Charges Section -->
                  <div class="fare-factor-section">
                    <div class="section-title">Charges</div>
                    <div class="section-content" id="charges_display">
                      &#8377; <span id="charge_display_text"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="align-self-start mt-4">
              <label class="form-label small fw-semibold fs-6" for="charges">
                Charges
              </label>
            </div>

            <div class="align-self-start">
              <div class="d-flex align-items-center gap-3 flex-wrap">
                <input
                  type="number"
                  class="form-control fs-5"
                  placeholder="Charges"
                  name="charges"
                  id="charges"
                  readonly
                  style="max-width: 200px"
                />
                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-primary" id="edit_btn">Edit</button>
                  <button class="btn btn-danger" id="delete_btn">Delete</button>
                  <button
                    class="btn btn-success"
                    id="add_bus_btn"
                    data-bs-toggle="modal"
                    data-bs-target="#centeredModal"
                  >
                    + Add Bus
                  </button>
                </div>
              </div>
            </div>
          </footer>

          <table
            class="border rounded table-responsive border-bottom-0 mt-2"
            id="operator_ticket_fare_bus_table"
          ></table>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/manageFareFactor.js"></script>
  </body>
</html>
