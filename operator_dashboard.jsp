<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${empty sessionScope.operator}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <title>${sessionScope.operator.fullName} Dashboard</title>
    <style>
      body,
      html {
        height: 100%;
        margin: 0;
      }
      .sidebar {
        width: 300px;
      }
      .sidebar .nav-link.active {
        background-color: #f0f4ff;
        color: #0d6efd;
        border-radius: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div class="d-flex h-100">
      <!-- Sidebar -->
      <aside
        class="sidebar bg-white border-end p-5 px-0 d-flex flex-column justify-content-between align-items-center"
      >
        <div class="mb-4">
          <div style="transform: scale(1.35)"><c:import url="logo.jsp" /></div>
        </div>
        <ul
          class="nav flex-column w-100 p-0 justify-content-center align-items-center"
        >
          <li class="w-100 border-bottom">
            <a
              href="#"
              class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
            >
              <img src="static/media/images/home.svg" alt="home" class="p-0" />
              <span
                class="fs-3 fw-medium"
                style="color: oklch(26.8% 0.007 34.298)"
                >Home</span
              >
            </a>
          </li>
          <li class="w-100 border-bottom">
            <a
              href="#"
              class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
            >
              <img src="static/media/images/bus.svg" alt="bus" class="p-0" />
              <span
                class="fs-3 fw-medium"
                style="color: oklch(26.8% 0.007 34.298)"
                >Buses</span
              >
            </a>
          </li>
          <li class="w-100 border-bottom">
            <a
              href="#"
              class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
            >
              <img src="static/media/images/route.svg" alt="home" class="p-0" />
              <span
                class="fs-3 fw-medium"
                style="color: oklch(26.8% 0.007 34.298)"
                >Routes</span
              >
            </a>
          </li>
          <li class="w-100 border-bottom">
            <a
              href="#"
              class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
            >
              <img
                src="static/media/images/account.svg"
                alt="driver"
                class="p-0"
              />
              <span
                class="fs-3 fw-medium"
                style="color: oklch(26.8% 0.007 34.298)"
                >Drivers</span
              >
            </a>
          </li>
          <li class="w-100 border-bottom">
            <a
              href="#"
              class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
            >
              <img
                src="static/media/images/settings.svg"
                alt="setting"
                class="p-0"
              />
              <span
                class="fs-3 fw-medium"
                style="color: oklch(26.8% 0.007 34.298)"
                >Settings</span
              >
            </a>
          </li>
        </ul>
        <div></div>
      </aside>

      <!-- Main content -->
      <main class="flex-grow-1 d-flex flex-column bg-light">
        <!-- Top Navbar -->
        <nav class="navbar navbar-light bg-white border-bottom px-4 p-1 gap-2">
          <div
            class="ms-auto d-flex align-items-center gap-2 focus-ring-info p-1 rounded-5"
          >
            <img
              src="static/media/images/WhatsApp Image 2025-08-31 at 22.26.31_d0474dbd.jpg"
              class="rounded-circle border border"
              style="width: 50px; height: 50px; object-fit: contain"
              alt="User"
            />
            <span class="fs-5 fw-medium"
              >${sessionScope.operator.fullName}</span
            >
          </div>
          <div class="d-flex align-items-center gap-2">
            <button
              class="bg-transparent border-0 focus-ring"
              style="transition: all 0.3s"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#0d6efd"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                />
              </svg>
            </button>
            <button
              class="bg-transparent border-0 focus-ring"
              style="transition: all 0.3s"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#0d6efd"
                class="bi bi-moon-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
                />
              </svg>
            </button>
            <button
              class="bg-transparent border-0 focus-ring"
              style="transition: all 0.3s"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#0d6efd"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </button>
          </div>
        </nav>

        <!-- Dashboard Content -->
        <div class="p-4 d-flex flex-column gap-3">
          <h2>Dashboard</h2>
          <div
            class="align-items-center gap-2"
            style="
              display: grid;
              grid-template-columns: repeat(4, 1fr);

              justify-content: space-between;
            "
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
                  fill="#0d6efd"
                  class="bi bi-suitcase2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 0a.5.5 0 0 0-.5.5V3H5a2 2 0 0 0-2 
           2v8a2 2 0 0 0 1.031 1.75A1.003 
           1.003 0 0 0 5 16a1 1 0 0 0 
           1-1h4a1 1 0 1 0 1.969-.25A2 
           2 0 0 0 13 13V5a2 2 0 0 0-2-2h-1V.5a.5.5 
           0 0 0-.5-.5zM9 3H7V1h2zm3 
           10a1 1 0 0 1-1 1H5a1 1 
           0 0 1-1-1V7h8zM5 4h6a1 1 
           0 0 1 1 1v1H4V5a1 1 0 0 1 1-1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  BOOKINGS
                </p>
                <h5 class="mb-0 fs-5 fw-medium">20</h5>
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
                  class="bi bi-currency-rupee"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  REVENUE
                </p>
                <h5 class="mb-0 fs-5 fw-medium">32,000</h5>
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
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  BUSES
                </p>
                <h5 class="mb-0 fs-5 fw-medium">25</h5>
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
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="mb-1 text-secondary fw-medium"
                  style="font-size: small"
                >
                  DRIVERS
                </p>
                <h5 class="mb-0 fs-5 fw-medium">30</h5>
              </div>
            </div>
          </div>
          <div
            class="align-items-stretch gap-3"
            style="display: grid; grid-template-columns: repeat(2, 1fr)"
          >
            <!-- Left Container (Table) -->
            <div class="bg-white rounded-3 border p-4 d-flex flex-column">
              <h3 class="fw-semibold fs-4 mb-3">Today</h3>
              <div class="table-responsive flex-grow-1">
                <table class="table table-striped align-middle">
                  <thead class="table-light">
                    <tr>
                      <th scope="col">BUS</th>
                      <th scope="col">MANUFACTURER</th>
                      <th scope="col">ROUTE</th>
                      <th scope="col">TIMING</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Volvo AC Sleeper</td>
                      <td>Jabalpur to Sagar</td>
                      <td>06:30 AM to 10:30 AM</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Ashok Leyland Express</td>
                      <td>Bhopal to Indore</td>
                      <td>08:00 AM to 11:15 AM</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Tata Starbus</td>
                      <td>Sagar to Damoh</td>
                      <td>09:00 AM to 11:00 AM</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Eicher Semi-Sleeper</td>
                      <td>Indore to Ujjain</td>
                      <td>10:30 AM to 12:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mt-3"
              >
                <button class="btn btn-outline-secondary px-4">Prev</button>
                <button class="btn btn-primary px-4">Next</button>
              </div>
            </div>

            <!-- Right Container (Pie Chart) -->
            <div class="bg-white rounded-3 border p-4 d-flex flex-column">
              <h3 class="fw-semibold fs-4 mb-3">
                Buses total and type summary
              </h3>
              <div
                class="flex-grow-1 d-flex align-items-center justify-content-center"
              >
                <canvas id="myPieChart" style="max-height: 250px"></canvas>
              </div>
              <div class="d-flex flex-column text-center">
                <p class="text-center">Total Buses</p>
                <p>20</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script>
      const ctx = document.getElementById("myPieChart");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["AC", "NON AC", "Sleeper", "Seater"],
          datasets: [
            {
              data: [30, 50, 20, 10],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#223292"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    </script>
  </body>
</html>
