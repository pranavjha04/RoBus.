<%@ taglib prefix="e" uri="bts" %>

<form id="search_bus_form">
  <div class="row g-3 align-items-end">
    <div class="col-md-4">
      <label for="from" class="form-label fw-semibold">From</label>
      <div class="input-group input-group-lg position-relative">
        <span class="input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
        <input
          type="text"
          name="from"
          id="from"
          class="form-control"
          placeholder="Leaving from"
          required
          autocomplete="off"
        />
        <ul
          id="from_suggestion"
          class="list-group d-none position-absolute w-100 bg-white border-top-0 border rounded shadow-sm top-100 z-3 overflow-y-auto"
        >
          <li
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-end p-2"
          >
            <i class="bi bi-geo-alt-fill me-2 text-primary fs-5"></i>
            <div class="d-flex align-items-center gap-1">
              <span class="fw-semibold">Mumbai</span>
              ,
              <small class="text-muted">Maharashtra</small>
            </div>
          </li>
          <li
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-end p-2"
          >
            <i class="bi bi-geo-alt-fill me-2 text-primary fs-5"></i>
            <div class="d-flex align-items-center gap-1">
              <span class="fw-semibold">Mumbai</span>
              ,
              <small class="text-muted">Maharashtra</small>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-1 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-primary rounded-circle d-flex align-items-center fw-bold text-center justify-content-center"
        id="swapper"
        style="width: 48px; height: 48px"
      >
        &LeftArrowRightArrow;
      </button>
    </div>

    <div class="col-md-4">
      <label for="to" class="form-label fw-semibold">To</label>
      <div class="input-group input-group-lg position-relative">
        <span class="input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
        <input
          type="text"
          name="to"
          id="to"
          class="form-control"
          placeholder="Going to"
          required
          autocomplete="off"
        />
        <ul
          id="to_suggestion"
          class="list-group position-absolute d-none w-100 bg-white border border-top-0 rounded shadow-sm top-100 z-3 overflow-y-auto"
        >
          <li
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-end p-2"
          >
            <i class="bi bi-geo-alt-fill me-2 text-primary fs-5"></i>
            <div class="d-flex align-items-center gap-1">
              <span class="fw-semibold">Mumbai</span>
              ,
              <small class="text-muted">Maharashtra</small>
            </div>
          </li>
          <li
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-end p-2"
          >
            <i class="bi bi-geo-alt-fill me-2 text-primary fs-5"></i>
            <div class="d-flex align-items-center gap-1">
              <span class="fw-semibold">Mumbai</span>
              ,
              <small class="text-muted">Maharashtra</small>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-3 mt-3 mt-md-0">
      <label for="journey_date" class="form-label fw-semibold"
        >Journey Date</label
      >
      <input
        type="date"
        name="journey_date"
        id="journey_date"
        class="form-control form-control-lg"
        value="${e:currentDate()}"
        min="${e:currentDate()}"
        required
      />
    </div>

    <div class="col-12 d-grid mt-3">
      <button type="submit" class="btn btn-primary btn-lg">
        <i class="bi bi-search me-2"></i>Search Buses
      </button>
    </div>
  </div>
  <script type="module" src="static/js/searchBus.js"></script>
</form>
