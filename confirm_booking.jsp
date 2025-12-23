<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Confirm Booking</title>

    <style>
      body {
        background-color: #f6f8fb;
      }

      .card-soft {
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      }

      .section-title {
        font-weight: 600;
        font-size: 0.95rem;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        margin-bottom: 0.75rem;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
      }

      .info-row span:first-child {
        color: #64748b;
      }

      .amenities-btn {
        background-color: #e8f1ff;
        color: #1d4ed8;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8rem;
      }

      .sticky-pay {
        position: sticky;
        top: 88px;
      }

      .divider {
        border-top: 1px dashed #e2e8f0;
        margin: 0.75rem 0;
      }
    </style>
  </head>

  <body class="overflow-scroll">
    <c:import url="logged_navbar.jsp" />

    <main class="container my-4">
      <div class="row g-4">
        <!-- LEFT -->
        <section class="col-lg-8 d-flex flex-column gap-3">
          <!-- HERO SUMMARY -->
          <div class="card-soft p-4 text-white" style="background: #2563eb">
            <h4 class="fw-bold mb-1">Jabalpur &rarr; Sagar</h4>
            <div class="small opacity-75">
              Dec&nbsp;23,&nbsp;2025 &bull; 09:56&nbsp;PM &ndash; 02:02&nbsp;AM
              &bull; 4&nbsp;hrs
            </div>
            <div class="small opacity-75 mt-1">
              Distance&nbsp;:&nbsp;210&nbsp;km
            </div>
          </div>

          <!-- OPERATOR & BUS -->
          <div class="card-soft p-4">
            <div class="section-title">Bus &amp; Operator</div>

            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-semibold">Pranav Travels</div>
                <small class="text-muted">
                  MP20&nbsp;VH&nbsp;588 &bull; Mercedes-Benz
                </small>
              </div>
              <span class="badge bg-success-subtle text-success">
                Single Decker
              </span>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-3">
              <span class="amenities-btn">Entertainment Screen</span>
              <span class="amenities-btn">Charging Point</span>
              <span class="amenities-btn">GPS Tracking</span>
            </div>
          </div>

          <!-- ROUTE TIMELINE -->
          <div class="card-soft p-4">
            <div class="section-title">Route Details</div>

            <div class="info-row">
              <span>Departure</span>
              <span>Jabalpur&nbsp;(ISBT)&nbsp;&bull;&nbsp;09:56&nbsp;PM</span>
            </div>

            <div class="border-start ps-3 ms-2 text-muted small">
              Damoh&nbsp;(4&nbsp;min halt)
            </div>

            <div class="info-row mt-2">
              <span>Arrival</span>
              <span>Sagar&nbsp;&bull;&nbsp;02:02&nbsp;AM</span>
            </div>
          </div>

          <!-- SEATS -->
          <div class="card-soft p-4">
            <div class="section-title">Selected Seats</div>

            <div class="d-flex gap-2 flex-wrap">
              <span class="badge rounded-pill border px-3 py-2">A1</span>
              <span class="badge rounded-pill border px-3 py-2">A2</span>
            </div>
          </div>

          <!-- DRIVER -->
          <div class="card-soft p-4">
            <div class="section-title">Driver Details</div>

            <div class="info-row">
              <span>Name</span>
              <span>Pranav&nbsp;Jh</span>
            </div>

            <div class="info-row">
              <span>Licence No.</span>
              <span>MP14-20240012341</span>
            </div>

            <div class="info-row">
              <span>Contact</span>
              <span>98475&nbsp;75755</span>
            </div>
          </div>
        </section>

        <!-- RIGHT -->
        <section class="col-lg-4">
          <div class="card-soft p-4 sticky-pay">
            <div class="section-title">Fare Summary</div>

            <div class="info-row">
              <span>Base Fare</span>
              <span>&#8377;&nbsp;200</span>
            </div>

            <div class="info-row">
              <span>Seat Fare</span>
              <span>&#8377;&nbsp;400</span>
            </div>

            <div class="divider"></div>

            <div class="info-row fw-semibold fs-5">
              <span>Total</span>
              <span>&#8377;&nbsp;600</span>
            </div>

            <button class="btn btn-primary w-100 rounded-pill py-2 mt-3">
              Confirm&nbsp;&amp;&nbsp;Pay
            </button>

            <p class="text-muted small text-center mt-3">
              By continuing, you agree to our
              <a href="#">Terms</a>
              &amp;
              <a href="#">Cancellation Policy</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </body>
</html>
