<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Bus Configuration</title>
  </head>
  <body
    class="m-0"
    style="display: grid; grid-template-rows: auto 1fr; height: 100dvh"
  >
    <c:import url="operator_navbar.jsp" />
    <div class="d-flex">
      <main class="flex-grow-1 border bg-light p-3">
        <!-- Main content -->
        Main Content Area
      </main>

      <aside class="border bg-white p-3" style="width: 320px">
        <form class="d-flex flex-column gap-4">
          <!-- Bus Type -->
          <div class="d-flex flex-column gap-2">
            <h4 class="fs-5 mb-1">Bus Type</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="busType"
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
                name="busType"
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
                  class="form-control"
                  placeholder="Left side seats"
                  aria-label="Left seats per row"
                  min="1"
                />
              </div>
              <div class="col-auto fw-bold">+</div>
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Right side seats"
                  aria-label="Right seats per row"
                  min="1"
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
                  placeholder="Auto"
                  aria-label="Total seats"
                  readonly
                />
              </div>
            </div>
          </div>

          <!-- Double Decker -->
          <div class="d-flex flex-column gap-2">
            <h4 class="fs-5 mb-1">Deck Type</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="double_decker"
              />
              <label class="form-check-label fw-medium" for="double_decker">
                Enable Double Decker
              </label>
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
  </body>
</html>
