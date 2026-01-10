<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${empty sessionScope.user}">
  <c:redirect url="login.do?back_url='confirm_booking.do'" />
</c:if>
<c:if test="${sessionScope.user.status.statusId ne 1}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Confirm Booking</title>

    <style>
      body {
        background-color: #f6f8fb;
      }

      /* ROUTE SUMMARY */
      .route-card {
        background-color: #ffffff;
        border-radius: 14px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        transition: all 0.2s ease;
      }

      .route-card:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
      }
      /* EMPHASIZE ROUTE CARD TEXT */
      .route-card h5 {
        font-size: 1.3rem; /* bigger route text */
        font-weight: 600;
      }

      .route-card .source,
      .route-card .destination {
        letter-spacing: 0.3px;
      }

      .route-card .small {
        font-size: 0.95rem; /* info row text */
      }

      .route-card i {
        color: #2563eb;
        font-size: 1rem; /* icons scale with text */
      }

      /* SOFT CARDS */
      .card-soft {
        background: #ffffff;
        border-radius: 14px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      }

      /* SECTION TITLES */
      .section-title {
        font-weight: 600;
        font-size: 0.75rem;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 1rem;
      }

      /* INFO ROWS */
      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        margin-bottom: 0.6rem;
      }

      .info-row span:first-child {
        color: #64748b;
      }

      .info-row span:last-child {
        color: #0f172a;
        font-weight: 500;
      }

      .amenities-btn {
        background-color: #e8f1ff;
        color: #0d47a1;
        border: 1px solid #0d47a1;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.2s;
      }

      .amenities-btn:hover {
        background-color: #d7e7ff;
      }

      .show-images-btn {
        background-color: #e6f7f1;
        color: #0f766e;
        border: 1px solid #0f766e;
        padding: 0.35rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s;
      }

      .show-images-btn:hover {
        background-color: #d1f2e7;
        transform: translateY(-1px);
      }

      /* STICKY PAYMENT */
      .sticky-pay {
        position: sticky;
        top: 90px;
      }

      /* DIVIDER */
      .divider {
        border-top: 1px dashed #e2e8f0;
        margin: 1rem 0;
      }

      /* SEATS */
      .badge.rounded-pill.border {
        background-color: #f8fafc;
        color: #0f172a;
        font-weight: 500;
      }

      /* PAY BUTTON */
      .btn-primary {
        box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
      }

      .amenities-list {
        background-color: #f4f8ff;
        border-radius: 10px;
        padding: 0.8rem;
        margin-top: 0.8rem;
        animation: fadeSlide 0.3s ease;
      }

      .amenity-item {
        background: #e8f1ff;
        color: #0d47a1;
        padding: 0.35rem 0.75rem;
        border-radius: 16px;
        font-size: 0.85rem;
        display: inline-block;
        margin: 4px;
      }

      .image-list {
        margin-top: 0.75rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        padding: 0.5rem;
        animation: fadeSlide 0.3s ease;
      }

      .image-list img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 12px;
        background-color: #f1f5f9;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .image-list img:hover {
        transform: scale(1.03);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      .selected-seat-item {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
      }

      .seat-left {
        display: flex;
        flex-direction: column;
      }

      .seat-title {
        font-weight: 600;
        font-size: 0.95rem;
        color: #0f172a;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .seat-sub {
        font-size: 0.8rem;
        color: #64748b;
        display: flex;
        align-items: center;
        margin-top: 2px;
      }

      /* Seat type pills */
      .seat-type {
        font-size: 0.7rem;
        font-weight: 500;
        padding: 0.2rem 0.55rem;
        border-radius: 999px;
      }

      .seat-type.sleeper {
        background-color: #fee2e2;
        color: #dc2626;
      }

      .seat-type.seater {
        background-color: #dbeafe;
        color: #2563eb;
      }
      .seat-price {
        font-size: 0.95rem;
      }
    </style>
  </head>

  <body class="overflow-scroll">
    <c:import url="logged_navbar.jsp" />

    <main class="container my-4">
      <div class="row g-4">
        <!-- LEFT SECTION -->
        <section
          class="col-lg-8 d-flex flex-column gap-3 journey-info-container"
        >
          <span
            class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link"
            style="cursor: pointer"
            onclick="history.back()"
          >
            <span>&larr;</span>
            <span>Back</span>
          </span>
          <!-- ROUTE SUMMARY -->
          <div
            class="route-card p-3 border border-end-0 border-top-0 border-bottom-0 border-4 border-primary"
          >
            <div class="d-flex align-items-center mb-2">
              <i class="bi bi-geo-alt-fill me-2 fs-5"></i>
              <h5 class="fw-semibold mb-0">
                <span class="source"></span>
                &nbsp;<i class="bi bi-arrow-right text-muted"></i>&nbsp;
                <span class="destination"></span>
              </h5>
            </div>

            <div class="d-flex flex-wrap gap-4 small text-muted">
              <div class="d-flex align-items-center">
                <i class="bi bi-calendar-event me-1"></i>
                <span class="journey-date"></span>
              </div>

              <div class="d-flex align-items-center">
                <i class="bi bi-clock me-1"></i>
                <span class="departure-time"></span>
                &nbsp;&ndash;&nbsp;
                <span class="arrival-time"></span>
              </div>

              <div class="d-flex align-items-center">
                <i class="bi bi-hourglass-split me-1"></i>
                <span class="total-duration"></span>
              </div>

              <div class="d-flex align-items-center">
                <i class="bi bi-signpost-2 me-1"></i>
                <span class="distance"></span>
              </div>
            </div>
          </div>

          <!-- OPERATOR & BUS -->
          <div class="card-soft p-4 bus-operator-info-container">
            <div class="section-title">Bus &amp; Operator</div>

            <div class="d-flex justify-content-between align-items-start">
              <div>
                <div class="fw-semibold operator-name">Pranav Travels</div>
                <small class="text-muted d-flex align-items-center gap-2">
                  <i class="bi bi-truck"></i>
                  <span class="bus-number"></span> &bull;
                  <span class="manufacturer"></span>
                </small>
              </div>
              <span class="badge bg-success-subtle text-success">
                <span class="deck"></span>
              </span>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-3">
              <button data-type="amenities" class="amenities-btn">
                Amenities
              </button>
              <button class="show-images-btn" data-type="images">
                Bus Images
              </button>
            </div>

            <div class="amenities-list d-none"></div>
            <div class="image-list d-none"></div>
          </div>

          <!-- ROUTE DETAILS -->
          <div class="card-soft p-4">
            <div class="section-title">Route Details</div>

            <div
              class="route-info-timeline-container d-flex flex-column align-items-start pt-1 time-line"
            ></div>
          </div>

          <!-- SEATS -->
          <div class="card-soft p-4">
            <div class="section-title">Selected Seats</div>

            <div
              class="d-flex flex-column gap-2 selected-seat-container overflow-y-auto"
              style="max-height: 400px"
            ></div>
          </div>

          <!-- DRIVER -->
          <div class="card-soft p-4 driver-info-container">
            <div class="section-title">Driver Details</div>

            <div class="info-row">
              <span><i class="bi bi-person me-1"></i>Name</span>
              <span class="driver-name"></span>
            </div>

            <div class="info-row">
              <span><i class="bi bi-card-text me-1"></i>Licence No.</span>
              <span class="licence-no"></span>
            </div>

            <div class="info-row">
              <span><i class="bi bi-telephone me-1"></i>Contact</span>
              <span class="contact"></span>
            </div>
          </div>
        </section>

        <!-- RIGHT SECTION -->
        <form class="col-lg-4" id="book-ticket-form">
          <div class="seat-container"></div>
          <input type="hidden" name="schedule_id" id="schedule_id" />
          <input type="hidden" name="total_fare" id="total_fare" />
          <input type="hidden" name="journey_date" id="journey_date" />
          <input type="hidden" name="source" id="source" />
          <input type="hidden" name="destination" id="destination" />
          <div class="card-soft p-4 sticky-pay X">
            <div class="section-title">Fare Summary</div>

            <div class="booking-fare-info-container">
              <div class="divider"></div>
            </div>

            <button class="btn btn-primary w-100 rounded-pill py-2 mt-3">
              Confirm &amp; Pay
            </button>
          </div>
        </form>
      </div>
    </main>

    <script type="module" src="static/js/bookTicket.js"></script>
  </body>
</html>
