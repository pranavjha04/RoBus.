<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Bus Configuration</title>
  </head>
  <style>
    .bus {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 12px;

      max-width: fit-content;
    }

    .bus-row {
    }

    .seater_seat {
      width: 30px;
      aspect-ratio: 1 / 1;
    }

    .sleeper_seat {
      width: 40px;
      aspect-ratio: 1 / 2;
    }
    .seat {
      border: 2px solid #198754;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.3s;
    }

    .seat:hover {
      background-color: #198754;
      color: white;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  </style>
  <div
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index: 1080"
  ></div>
  <body
    class="m-0"
    style="display: grid; grid-template-rows: auto 1fr; height: 100dvh"
  >
    <c:import url="operator_navbar.jsp" />
    <div class="d-flex">
      <main
        class="flex-grow-1 border bg-light gap-4 p-3 justify-content-center d-flex align-items-center"
      >
        <!-- Main content -->

        <div>
          <h5 class="text-center">Single Decker</h5>
          <div class="border rounded border-primary">
            <div
              class="d-flex align-items-center justify-content-between py-2 px-2 border-bottom border-primary"
            >
              <div class="d-flex flex-column align-items-center">
                <img
                  src="static/media/images/conductor.svg"
                  style="width: 30px; height: 30px"
                />
                <span>Conductor</span>
              </div>
              <div class="d-flex flex-column align-items-center">
                <img
                  src="static/media/images/steering_wheel.svg"
                  style="width: 30px; height: 30px"
                />
                <span>Driver</span>
              </div>
            </div>
            <div class="bus"></div>
          </div>
        </div>
      </main>

      <aside class="border bg-white p-3" style="width: 320px">
        <form class="d-flex flex-column gap-4" id="bus_config_form">
          <!-- Bus Type -->
          <div class="d-flex flex-column gap-2">
            <h4 class="fs-5 mb-1">Bus Type</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="sleeper"
                id="bus_seater"
                checked
              />
              <label class="form-check-label fw-medium" for="bus_seater">
                Seater
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="sleeper"
                id="bus_sleeper"
              />
              <label class="form-check-label fw-medium" for="bus_sleeper">
                Sleeper
              </label>
            </div>
          </div>

          <!-- Seating Layout -->
          <div class="d-flex flex-column gap-2">
            <h4 class="fs-5 mb-1">Seating Layout (per row)</h4>
            <div class="row g-2 align-items-center">
              <div class="col">
                <input
                  type="number"
                  min="1"
                  max="3"
                  step="1"
                  required
                  class="form-control"
                  placeholder="Left side seats"
                  id="ls_count"
                  name="ls_count"
                  aria-label="Left seats per row"
                />
              </div>
              <div class="col-auto fw-bold">+</div>
              <div class="col">
                <input
                  type="number"
                  min="1"
                  max="3"
                  step="1"
                  required
                  class="form-control"
                  id="rs_count"
                  name="rs_count"
                  placeholder="Right side seats"
                  aria-label="Right seats per row"
                />
              </div>
            </div>
            <small class="text-muted"> Example: 2 + 2 = 4 seats per row </small>
          </div>

          <!-- Rows & Seats -->
          <div class="d-flex flex-column gap-2">
            <h4 class="fs-5 mb-1">Rows & Total Seats</h4>
            <div class="row g-2 align-items-center">
              <div class="col">
                <label for="rows_count" class="form-label">Total Rows</label>
                <input
                  type="number"
                  class="form-control"
                  id="rows_count"
                  step="1"
                  required
                  name="row_count"
                  placeholder="e.g. 10"
                  aria-label="Rows count"
                  min="1"
                />
              </div>
              <div class="col">
                <label for="total_seats" class="form-label">Total Seats</label>
                <input
                  type="number"
                  class="form-control"
                  id="total_seats"
                  name="seats"
                  placeholder="Auto"
                  aria-label="Total seats"
                  readonly
                />
              </div>
            </div>
          </div>

  

          <div class="d-flex gap-2 justify-content-between">
            <input type="reset" class="btn btn-secondary px-4" value="Reset" />
            <input
              type="submit"
              class="btn btn-primary px-4"
              value="Save Changes"
            />
          </div>
        </form>
      </aside>
    </div>
    <script type="module" src="static/js/bus_config.js"></script>
  </body>
</html>
