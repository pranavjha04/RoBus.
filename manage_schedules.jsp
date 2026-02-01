<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if
  test="${empty sessionScope.user or sessionScope.user.userType.userTypeId ne 3}"
>
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <style>
      .bg-purple-subtle {
        background-color: rgba(111, 66, 193, 0.12);
      }
      .text-purple {
        color: #6f42c1;
      }
      .border-purple {
        border: 1px solid #6f42c1;
      }
      .btn-purple {
        --bs-btn-color: #fff;
        --bs-btn-bg: #6f42c1;
        --bs-btn-border-color: #6f42c1;

        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #6035b1;
        --bs-btn-hover-border-color: #5a32a3;

        --bs-btn-focus-shadow-rgb: 111, 66, 193;

        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #5a32a3;
        --bs-btn-active-border-color: #533096;

        --bs-btn-disabled-color: #fff;
        --bs-btn-disabled-bg: #6f42c1;
        --bs-btn-disabled-border-color: #6f42c1;
      }

      :root {
        --trip-bg: #ffffff;
        --trip-primary: #0061ff;
        --trip-success: #198754;
        --trip-danger: #dc3545;
        --trip-text: #0f172a;
        --trip-muted: #64748b;
      }

      .aesthetic-card {
        background: var(--trip-bg);
        border-radius: 16px;
        padding: 20px 26px;
        margin-bottom: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.02);
        animation: fadeSlide 0.3s ease;
      }

      /* Status Left-Borders */
      .card-ongoing {
        border-left: 6px solid #6f42c1;
      }
      .card-upcoming {
        border-left: 6px solid #ffc107;
      }
      .card-completed {
        opacity: 0.85;
        background: #f8fafc;
        border-left: 6px solid #198754;
      }
      .card-cancelled {
        opacity: 0.8;
        background: #fff5f5;
        border-left: 6px solid var(--trip-danger);
      }

      /* Section 1: Icon & Primary Info */
      .bus-identity {
        display: flex;
        align-items: center;
        gap: 20px;
        min-width: 280px;
      }

      .icon-box {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f1f5f9;
        color: var(--trip-text);
        flex-shrink: 0;
      }
      .timeline-container {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 25px;
        flex: 1;
        justify-content: center;
        padding: 0 20px;
      }

      .time-bold {
        font-weight: 850;
        font-size: 1.3rem;
        color: var(--trip-text);
        margin: 0;
        line-height: 1;
      }
      .city-name {
        font-weight: 500;
        font-size: 1.1rem;
        color: var(--trip-muted);
        margin: 4px 0 2px 0;
      }
      .state-name {
        font-size: 0.8rem;
        color: #94a3b8;
        margin: 0;
        font-weight: 500;
      }

      .duration-bridge {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 100px;
      }
      .dash-line {
        width: 100%;
        border-top: 2px dashed #cbd5e1;
        margin-bottom: 6px;
      }
      .duration-text {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--trip-text);
        white-space: nowrap;
      }

      /* Section 3: Data Blocks */
      .divider-v {
        width: 1px;
        height: 45px;
        background: #f1f5f9;
        margin: 0 15px;
      }

      .data-block {
        min-width: 120px;
      }
      .label-tiny {
        font-size: 0.65rem;
        font-weight: 800;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 2px;
      }
      .val-bold {
        font-weight: 700;
        color: var(--trip-text);
        font-size: 0.95rem;
        margin: 0;
      }

      @media (max-width: 1200px) {
        .aesthetic-card {
          flex-wrap: wrap;
        }
        .timeline-container {
          flex: 100%;
          order: 3;
          margin-top: 20px;
          border-top: 1px solid #f1f5f9;
          padding-top: 20px;
        }
      }
      .norm {
        background: none;
        border: none;
        transition: all 0.25s ease;
      }
      .norm:hover {
        background-color: rgba(215, 215, 215, 0.477);
      }
      .active {
        background-color: #0d6efd;
        color: white;
      }
      .active:hover {
        background-color: #0451c3;
      }
    </style>
    <title>Manage Schedules | RoBus</title>
  </head>
  <body class="bg-light min-vh-100 overflow-y-scroll">
    <c:import url="essential_page_display.jsp" />
    <c:import url="logged_navbar.jsp" />
    <div class="container py-5 gap-3" id="pageWrapper">
      <div
        class="page-header pb-4 d-flex justify-content-between align-items-end"
      >
        <div>
          <h3 class="fw-bold mb-1 text-dark">My Trips & Tasks</h3>
          <p class="text-muted mb-0">
            Start your upcoming journeys, manage active trips, and mark
            assignments as complete.
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
              TOTAL SCHEDULES
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
            class="bg-purple-subtle p-3 rounded-circle d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#6f42c1"
              class="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"
              />
            </svg>
          </div>
          <div>
            <p class="mb-1 text-secondary fw-medium" style="font-size: small">
              ONGOING
            </p>
            <h5 class="mb-0 fs-5 fw-medium" data-info-name="ongoing">0</h5>
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
      <div
        class="d-flex flex-column gap-2 px-3 py-2 bg-white shadow shadow-sm mt-3"
      >
        <div class="d-flex align-items-center justify-content-between w-100">
          <div>
            <h4>Select Date</h4>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button class="btn bg-secondary-subtle" id="date_range_back">
              &lt;
            </button>
            <span id="date_range_display"></span>
            <button class="btn bg-secondary-subtle" id="date_range_next">
              &gt;
            </button>
          </div>
        </div>

        <div class="row" id="date_range"></div>
      </div>
      <div id="content_wrapper">
        <div
          class="justify-content-end d-flex align-items-center gap-1 mt-4"
          id="filter_container"
        >
          <button class="btn btn-primary px-4 rounded-pill" data-type="all">
            All Schedules
          </button>
          <button
            class="btn btn-outline-primary px-4 rounded-pill"
            data-type="upcoming"
          >
            Upcoming
          </button>
          <button
            class="btn btn-outline-primary px-4 rounded-pill"
            data-type="ongoing"
          >
            Ongoing
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
          id="schedule_list_container"
          class="mt-4 d-flex flex-column gap-2"
        ></div>
      </div>
    </div>
    <c:import url="user_footer.jsp" />
    <script type="module" src="static/js/manageDriverSchedule.js"></script>
  </body>
</html>
