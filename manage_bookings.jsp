<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${empty sessionScope.user}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Manage Bookings | RoBus</title>

    <style>
      .ticket-card {
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.05) !important;
        position: relative;
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

      #booking_list_container,
      .ticket-card {
        animation: fadeSlide 0.3s ease;
      }
    </style>
  </head>

  <!-- Modal -->
  <div
    class="modal fade"
    id="busTicketModal"
    tabindex="-1"
    aria-labelledby="busTicketLabel"
    aria-hidden="true"
  ></div>
  <div class="modal fade" tabindex="-1" id="cancelBookingModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Cancel Booking</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to cancel booking?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <button class="btn btn-danger" id="cancel_btn">Yes</button>
        </div>
      </div>
    </div>
  </div>

  <body class="bg-light min-vh-100 overflow-y-scroll">
    <c:import url="essential_page_display.jsp" />
    <c:import url="logged_navbar.jsp" />

    <div class="container py-5 gap-3" id="pageWrapper">
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

      <div
        class="businfo gap-2 align-items-center justify-content-between"
        id="info_container"
      >
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
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="upcoming">0</h5>
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
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="completed">0</h5>
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
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="cancelled">0</h5>
          </div>
        </div>
      </div>
      <div id="content_wrapper">
        <div
          class="justify-content-end d-flex align-items-center gap-1 mt-4"
          id="filter_container"
        >
          <button class="btn btn-primary px-4 rounded-pill" data-type="all">
            All Bookings
          </button>
          <button
            class="btn btn-outline-primary px-4 rounded-pill"
            data-type="upcoming"
          >
            Upcoming
          </button>
          <button
            class="btn btn-outline-primary px-4 rounded-pill"
            data-type="completed"
          >
            Completed
          </button>
          <button
            class="btn btn-outline-primary px-4 rounded-pill"
            data-type="cancelled"
          >
            Cancelled
          </button>
        </div>

        <div
          class="mt-4 d-flex flex-column gap-2"
          id="booking_list_container"
        ></div>
      </div>
    </div>
    <c:import url="user_footer.jsp" />

    <script type="module" src="static/js/manageBookings.js"></script>
  </body>
</html>
