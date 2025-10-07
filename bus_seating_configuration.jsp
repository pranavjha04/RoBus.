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
      min-width: 220px;
      max-width: fit-content;
    }

    .bus-row {
    }

    .seater_seat {
      width: 30px;
      aspect-ratio: 2 / 1;
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

    .side-bar {
      max-width: 400px;
    }

    .link {
      gap: 5px;
      transition: all 0.3s;
      &:hover {
        margin-left: 10px;
      }
    }
  </style>
  <c:import url="essential_page_display.jsp" />
  <body>
    <div class="dashContainer">
      <aside
        class="border bg-white p-3 d-flex flex-column gap-5 side-bar gap-4 h-100 bg-da"
        style="overflow: auto"
      >
        <a
          href="operator_buses.do"
          class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link align-self-start"
        >
          <span>&larr;</span>
          <span>Back</span>
        </a>
        <div
          class="btn-group w-100"
          role="group"
          id="deck_cont"
          aria-label="Deck Toggle"
        >
          <input
            type="radio"
            class="btn-check"
            name="deck"
            id="lower"
            autocomplete="off"
            checked
          />
          <label class="btn btn-outline-primary" for="lower">Lower Deck</label>

          <input
            type="radio"
            class="btn-check"
            name="deck"
            id="upper"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="upper">Upper Deck</label>
        </div>

        <form
          class="d-flex flex-column flex-grow-1 gap-4 align-self-end"
          id="bus_config_form"
        >
          <!-- DECK Type -->
          <div class="d-flex flex-column gap-2">
            <h4 class="fs-5 mb-1">Deck Type</h4>
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
                  class="form-control fld"
                  placeholder="Left side seats"
                  id="lsCount"
                  name="lsCount"
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
                  class="form-control fld"
                  id="rsCount"
                  name="rsCount"
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
                <label for="rowCount" class="form-label">Total Rows</label>
                <input
                  type="number"
                  class="form-control fld"
                  id="rowCount"
                  step="1"
                  required
                  name="rowCount"
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

          <div
            class="d-flex align-items-center justify-content-between mt-auto gap-2"
            id="pageWrapper"
          >
            <input
              type="reset"
              class="btn btn-secondary px-4 w-100"
              value="Reset"
            />
            <input
              type="submit"
              class="btn btn-primary px-4 w-100"
              value="Save Changes"
            />
          </div>
        </form>
      </aside>
      <main class="flex-grow-1 d-flex flex-column bg-light overflow-auto">
        <!-- Main content -->
        <c:import url="operator_navbar.jsp" />
        <div
          class="p-4 d-flex flex-column gap-3 align-items-center overflow-scroll"
        >
          <h5 class="text-center" id="curr_deck">Lower Decker</h5>
          <div class="border rounded-5 border-primary">
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
    </div>
    <script type="module" src="static/js/bus_config.js"></script>
  </body>
</html>
