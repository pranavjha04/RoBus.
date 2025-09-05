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
    <div
      class="modal fade"
      id="centeredModal"
      tabindex="-1"
      aria-labelledby="centeredModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <form
          class="modal-content"
          id="add_bus_form"
          enctype="multipart/form-data"
        >
          <div class="modal-header">
            <h5 class="modal-title fs-3" id="centeredModalLabel">
              Add Bus Details
            </h5>
            <button
              type="reset"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex flex-column gap-3">
            <div>
              <label for="bus_number" class="form-label small fw-semibold"
                >Bus Number</label
              >
              <input
                id="bus_number"
                type="text"
                name="bus_number"
                class="form-control fld bfld"
                placeholder="MP20 1202"
              />
            </div>
            <div>
              <label for="manufacturer" class="form-label small fw-semibold"
                >Manufacturer</label
              >
              <select
                class="form-select fld bfld"
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
                >Bus images</label
              >
              <input
                class="form-control fld bfld"
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
          </div>
          <div class="modal-footer">
            <button
              type="reset"
              class="btn btn-secondary fw-medium"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <input
              type="submit"
              class="btn btn-primary px-4 fw-medium"
              value="Add Bus"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="d-flex h-100">
      <!-- Sidebar -->
      <c:import url="operator_sidebar.jsp" />

      <!-- Main content -->
      <main class="flex-grow-1 d-flex flex-column bg-light">
        <!-- Top Navbar -->
        <c:import url="operator_navbar.jsp" />

        <div class="p-4 d-flex flex-column align-items-end gap-3">
          <!-- Add Bus Button -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#centeredModal"
          >
            + Add bus
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
    <script type="module" src="static/js/add_bus.js"></script>
  </body>
</html>
