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
        border-radius: 28px;
        padding: 24px 30px;
        margin-bottom: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.02);
      }

      /* Status Left-Borders */
      .card-ongoing {
        border-left: 6px solid var(--trip-primary);
      }
      .card-upcoming {
        border-left: 6px solid var(--trip-success);
      }
      .card-completed {
        opacity: 0.85;
        background: #f8fafc;
        border-left: 6px solid #cbd5e1;
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

      /* Section 2: The Ticket Timeline (From Image) */
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

      /* Section 4: Actions */
      .btn-trip {
        border-radius: 14px;
        padding: 12px 20px;
        font-weight: 700;
        font-size: 0.85rem;
        border: none;
        min-width: 150px;
        transition: 0.2s;
      }
      .btn-primary-fill {
        background: var(--trip-primary);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 97, 255, 0.2);
      }
      .btn-success-fill {
        background: var(--trip-success);
        color: white;
        box-shadow: 0 4px 12px rgba(25, 135, 84, 0.2);
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
    </style>
    <title>Manage Schedules</title>
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
              class="bi bi-hourglass-bottom"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z"
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

        <div id="schedule_list_container" class="mt-4 d-flex flex-column gap-2">
          <div class="aesthetic-card card-ongoing">
            <div class="bus-identity">
              <div class="icon-box"><i class="bi bi-bus-front fs-3"></i></div>
              <div>
                <div class="label-tiny">Trip ID: #RT-9921</div>
                <p class="val-bold">MH-12-AS-9090</p>
                <span class="badge bg-primary bg-opacity-10 text-primary small"
                  >Ongoing Now</span
                >
              </div>
            </div>

            <div class="divider-v"></div>

            <div class="data-block">
              <p class="label-tiny">Manifest</p>
              <p class="val-bold">
                <i class="bi bi-people-fill me-1"></i> 42 / 50
              </p>
            </div>

            <div class="timeline-container">
              <div class="point">
                <p class="time-bold">08:43 PM</p>
                <p class="city-name">Jabalpur</p>
                <p class="state-name">Madhya Pradesh</p>
              </div>
              <div class="duration-bridge">
                <div class="dash-line"></div>
                <span class="duration-text">4h 6mins</span>
              </div>
              <div class="point">
                <p class="time-bold">12:49 AM</p>
                <p class="city-name">Sagar</p>
                <p class="state-name">Madhya Pradesh</p>
              </div>
            </div>

            <button class="btn btn-trip btn-primary-fill">End Journey</button>
          </div>

          <div class="aesthetic-card card-upcoming">
            <div class="bus-identity">
              <div class="icon-box"><i class="bi bi-bus-front fs-3"></i></div>
              <div>
                <div class="label-tiny">Trip ID: #RT-5011</div>
                <p class="val-bold">KA-01-MG-1234</p>
                <span class="badge bg-success bg-opacity-10 text-success small"
                  >Scheduled</span
                >
              </div>
            </div>

            <div class="divider-v"></div>

            <div class="data-block">
              <p class="label-tiny">Driver</p>
              <p class="val-bold">Rajesh Kumar</p>
            </div>

            <div class="timeline-container">
              <div class="point">
                <p class="time-bold">10:30 PM</p>
                <p class="city-name">Pune</p>
                <p class="state-name">Maharashtra</p>
              </div>
              <div class="duration-bridge">
                <div class="dash-line"></div>
                <span class="duration-text">14h 20mins</span>
              </div>
              <div class="point">
                <p class="time-bold">12:50 PM</p>
                <p class="city-name">Bangalore</p>
                <p class="state-name">Karnataka</p>
              </div>
            </div>

            <button class="btn btn-trip btn-success-fill">Start Journey</button>
          </div>

          <div class="aesthetic-card card-completed">
            <div class="bus-identity">
              <div class="icon-box"><i class="bi bi-bus-front fs-3"></i></div>
              <div>
                <div class="label-tiny">Trip ID: #RT-2210</div>
                <p class="val-bold">MP-20-HA-4455</p>
                <p class="text-success small fw-bold mb-0">Completed</p>
              </div>
            </div>

            <div class="divider-v"></div>

            <div class="timeline-container">
              <div class="point">
                <p class="time-bold text-muted">06:00 AM</p>
                <p class="city-name">Bhopal</p>
              </div>
              <div class="duration-bridge">
                <div class="dash-line"></div>
                <span class="duration-text">3h 30m</span>
              </div>
              <div class="point">
                <p class="time-bold text-muted">09:30 AM</p>
                <p class="city-name">Indore</p>
              </div>
            </div>

            <button class="btn btn-trip btn-light border text-muted" disabled>
              History
            </button>
          </div>
          <div class="aesthetic-card card-cancelled">
            <div class="bus-identity">
              <div class="icon-box" style="background: #fee2e2; color: #dc2626">
                <i class="bi bi-bus-front-fill fs-3"></i>
              </div>
              <div>
                <div class="label-tiny">Trip ID: #RT-1102</div>
                <p class="val-bold">UP-32-BZ-5544</p>
                <span class="badge bg-danger bg-opacity-10 text-danger small"
                  >Cancelled</span
                >
              </div>
            </div>

            <div class="divider-v"></div>

            <div class="data-block">
              <p class="label-tiny">Reason</p>
              <p class="val-bold text-danger">Mechanical Issue</p>
            </div>

            <div class="timeline-container" style="opacity: 0.6">
              <div class="point">
                <p class="time-bold">04:00 PM</p>
                <p class="city-name">Indore</p>
                <p class="state-name">Madhya Pradesh</p>
              </div>
              <div class="duration-bridge">
                <div class="dash-line" style="border-color: #f87171"></div>
                <span
                  class="duration-text"
                  style="color: #dc2626; text-decoration: line-through"
                  >8h 30mins</span
                >
              </div>
              <div class="point">
                <p class="time-bold">12:30 AM</p>
                <p class="city-name">Gwalior</p>
                <p class="state-name">Madhya Pradesh</p>
              </div>
            </div>

            <button class="btn btn-trip btn-light text-muted border" disabled>
              No Actions
            </button>
          </div>
        </div>
      </div>
    </div>
    <script type="module" src="static/js/manageDriverSchedule.js"></script>
  </body>
</html>
