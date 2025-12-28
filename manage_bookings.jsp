<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${empty sessionScope.user}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Manage Bookings | TravelEase</title>

    <style>
      :root {
        --primary-soft: #f0f4ff;
        --border-color: #eef0f2;
      }

      body {
        letter-spacing: -0.01em;
      }

      /* Enhanced Card Styling */
      .stat-card {
        border: 1px solid var(--border-color);
        border-radius: 16px;
        background: #ffffff;
        padding: 1.25rem;
        transition: transform 0.2s ease;
      }

      .stat-card:hover {
        transform: translateY(-3px);
      }

      .booking-card {
        border: 1px solid var(--border-color);
        border-radius: 20px;
        background: #ffffff;
        padding: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .booking-card:hover {
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        border-color: #d1d9e6;
      }

      /* Left Accent Border on Hover */
      .booking-card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: transparent;
        transition: background 0.3s;
      }
      .booking-card:hover::before {
        background: #0d6efd;
      }

      /* Status Badges */
      .badge-status {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.5rem 1rem;
        border-radius: 50px;
      }

      .confirmed {
        background: #e6fcf5;
        color: #0ca678;
      }
      .cancelled {
        background: #fff5f5;
        color: #fa5252;
      }
      .completed {
        background: #f0f4ff;
        color: #339af0;
      }

      /* Typography & Utilities */
      .route-text {
        font-size: 1.1rem;
        font-weight: 600;
        color: #212529;
      }

      .meta-text {
        font-size: 0.875rem;
        color: #6c757d;
      }

      .btn-action {
        border-radius: 10px;
        font-weight: 500;
        padding: 0.5rem 1rem;
        transition: 0.2s;
      }

      .search-filter-bar {
        border-radius: 16px;
        border: 1px solid var(--border-color) !important;
      }
    </style>
  </head>

  <body class="bg-light min-vh-100">
    <c:import url="logged_navbar.jsp" />

    <div class="container py-5 gap-3">
      <div
        class="page-header pb-4 d-flex justify-content-between align-items-end"
      >
        <div>
          <h3 class="fw-bold mb-1 text-dark">Manage Bookings</h3>
          <p class="text-muted mb-0">
            Track your travel history and manage upcoming reservations&period;
          </p>
        </div>
      </div>

      <div class="businfo gap-2 align-items-center justify-content-between">
        <div
          class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
        >
          <div
            class="bg-primary-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#0056b3"
              class="bi bi-bus-front"
              viewBox="0 0 16 16"
            >
              <path
                d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"
              />
              <path
                d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"
              />
            </svg>
          </div>
          <div>
            <p class="mb-1 text-secondary fw-medium" style="font-size: small">
              TOTAL BOOKINGS
            </p>
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="total">0</h5>
          </div>
        </div>
        <div
          class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
        >
          <div
            class="bg-warning-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#ffc107"
              class="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
              />
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
              />
            </svg>
          </div>
          <div>
            <p class="mb-1 text-secondary fw-medium" style="font-size: small">
              UPCOMING
            </p>
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="active">0</h5>
          </div>
        </div>
        <div
          class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
        >
          <div
            class="bg-success-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#198754"
              class="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
              />
              <path
                d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
              />
            </svg>
          </div>
          <div>
            <p class="mb-1 text-secondary fw-medium" style="font-size: small">
              COMPLETED
            </p>
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="inActive">0</h5>
          </div>
        </div>
        <div
          class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border"
        >
          <div
            class="bg-danger-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#dc3545"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <div>
            <p class="mb-1 text-secondary fw-medium" style="font-size: small">
              CANCELLED
            </p>
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="inActive">0</h5>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center gap-1 mt-4">
        <button class="btn btn-outline-primary px-4 rounded-pill">
          All Bookings
        </button>
        <button class="btn btn-outline-primary px-4 rounded-pill">
          Upcoming
        </button>
        <button class="btn btn-outline-primary px-4 rounded-pill">
          Completed
        </button>
        <button class="btn btn-outline-primary px-4 rounded-pill">
          Cancelled
        </button>
      </div>

      <div>
        <style>
          .ticket-card {
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
            position: relative;
          }

          /* Subtle ticket notches on the sides */
          .ticket-card::before,
          .ticket-card::after {
            content: "";
            position: absolute;
            top: 72%;
            width: 20px;
            height: 20px;
            background-color: #f8f9fa; /* Match your page background color */
            border-radius: 50%;
            z-index: 1;
          }
          .ticket-card::before {
            left: -10px;
          }
          .ticket-card::after {
            right: -10px;
          }

          .ticket-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
          }

          .label-muted {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-weight: 700;
            color: #9da4a9;
            margin-bottom: 4px;
            display: block;
          }

          .seat-badge {
            background: #e9ecef;
            color: #495057;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
          }
        </style>

        <div class="card ticket-card shadow-sm rounded-4 mb-3">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-4">
              <div class="d-flex gap-3">
                <div
                  class="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center"
                  style="width: 50px; height: 50px"
                >
                  <i class="bi bi-bus-front-fill fs-3 text-primary"></i>
                </div>
                <div>
                  <h5 class="mb-0 fw-bold text-dark">New York to Boston</h5>
                  <div class="d-flex align-items-center gap-2">
                    <span class="text-muted small">Greyhound Express</span>
                    <span class="text-muted small">&bull;</span>
                    <span class="text-muted small">ID: BK-NY2401</span>
                  </div>
                </div>
              </div>
              <span
                class="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 fw-semibold"
              >
                Upcoming
              </span>
            </div>

            <div class="row g-4 mb-2">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-6">
                    <span class="label-muted">Booking Date</span>
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-calendar-check text-secondary"></i>
                      <span class="fw-semibold">Jan 12, 2025</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <span class="label-muted">Journey Date</span>
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-calendar2-event-fill text-primary"></i>
                      <span class="fw-semibold text-primary">Jan 15, 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-6">
                    <span class="label-muted">Schedule</span>
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-clock-fill text-secondary"></i>
                      <span class="fw-semibold">08:00 AM</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <span class="label-muted">Seats</span>
                    <div class="d-flex flex-wrap gap-1">
                      <span class="seat-badge">1</span>
                      <span class="seat-badge">2</span>
                      <span class="seat-badge">3</span>
                      <span class="seat-badge">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr
              class="my-4 opacity-50"
              style="border-top: 2px dashed #dee2e6"
            />

            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="label-muted">Total Paid</span>
                <div class="fw-bold fs-4 text-dark">
                  $180.00
                  <span class="text-muted fs-6 fw-normal">($45 x 4)</span>
                </div>
              </div>

              <div class="d-flex align-items-center gap-2">
                <button
                  class="btn btn-outline-danger border-2 rounded-pill px-4 fw-bold btn-sm"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-primary rounded-pill px-4 fw-bold btn-sm shadow-sm"
                >
                  View Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
