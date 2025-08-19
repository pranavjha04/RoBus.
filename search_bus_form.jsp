<div class="bg-white rounded-3 shadow p-3 p-md-4">
  <form id="bus-search-form" class="row g-3 justify-content-center">
    <div class="col-12 col-md-6 col-lg">
      <div class="input-group focusable-group">
        <span
          class="input-group-text p-3 bg-light border d-flex flex-column align-items-center"
        >
          <img
            src="static/media/images/bus_walk.svg"
            alt="From"
            style="width: 24px; height: 24px"
          />
          <span class="fs-6 text-secondary">From</span>
        </span>
        <input
          type="text"
          class="form-control form-control-lg bg-light text-secondary fw-bold"
          id="from"
          name="from"
          placeholder="Departure City"
          value="Nagpur"
          autofocus
          aria-autocomplete="none"
          required
        />
      </div>
    </div>

    <div class="col-12 col-md-6 col-lg">
      <div class="input-group focusable-group">
        <span
          class="input-group-text p-3 bg-light border d-flex flex-column align-items-center"
        >
          <img
            src="static/media/images/bus_walk.svg"
            alt="To"
            style="width: 24px; height: 24px"
          />
          <span class="fs-6 text-secondary">To</span>
        </span>
        <input
          type="text"
          class="form-control form-control-lg bg-light text-secondary fw-bold"
          id="to"
          name="to"
          placeholder="Destination City"
          value="Sagar"
          required
        />
      </div>
    </div>

    <div class="col-12 col-md-6 col-lg">
      <div class="input-group focusable-group">
        <label
          for="date"
          class="input-group-text p-3 bg-light border d-flex flex-column align-items-center"
        >
          <img
            src="static/media/images/date.svg"
            alt="date"
            style="width: 24px; height: 24px"
          />
          <span class="fs-6 text-secondary">Date</span>
        </label>
        <input
          type="date"
          class="form-control form-control-lg bg-light text-secondary fw-bold"
          id="date"
          name="date"
          value="2025-08-16"
          required
        />
      </div>
    </div>

    <div class="col-12 col-md-6 col-lg d-flex align-items-center">
      <button type="submit" class="btn btn-primary btn-lg w-100">
        Search Buses
      </button>
    </div>
  </form>
</div>
