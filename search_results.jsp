<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
      crossorigin="anonymous"
    ></script>
    <script type="module" src="static/js/main.js"></script>
    <title>Bus Search</title>
  </head>
  <body class="d-flex flex-column bg-light text-dark min-vh-100">
    <c:import url="welcome_navbar.jsp" />

    <!-- Search Form -->
    <div class="bg-white shadow-sm py-2 border-bottom">
      <form
        id="bus-search-form"
        class="align-items-center px-3 px-md-5 row g-2"
      >
        <!-- FROM -->
        <div
          class="d-flex align-items-center bg-light px-2 border rounded col-md"
        >
          <label for="from" class="px-2 text-center">
            <img
              src="static/media/images/bus_walk.svg"
              alt="From"
              width="24"
              height="24"
            />
            <div class="small">From</div>
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value="${param.from}"
            class="bg-transparent border-0 form-control"
            placeholder="From (Departure City)"
            required
          />
        </div>

        <!-- TO -->
        <div
          class="d-flex align-items-center bg-light px-2 border rounded col-md"
        >
          <label for="to" class="px-2 text-center">
            <img
              src="static/media/images/bus_walk.svg"
              alt="To"
              width="24"
              height="24"
            />
            <div class="small">To</div>
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value="${param.to}"
            class="bg-transparent border-0 form-control"
            placeholder="To (Destination City)"
            required
          />
        </div>

        <!-- DATE -->
        <div class="col-md">
          <div class="d-flex align-items-center bg-light px-2 border rounded">
            <label for="date" class="px-2 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0
                  002-2V7a2 2 0 00-2-2H5a2 2 0
                  00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div class="small">Date</div>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value="${param.date}"
              class="bg-transparent border-0 form-control"
              required
            />
          </div>
          <span class="text-danger small"></span>
        </div>

        <!-- SEARCH BUTTON -->
        <div class="col-md-auto">
          <input
            type="submit"
            value="Search Buses"
            class="w-100 btn btn-primary"
          />
        </div>
      </form>
    </div>

    <!-- Results Section -->
    <section class="my-3 container">
      <main class="bg-white shadow-sm p-3 rounded">
        <!-- Sorting -->
        <form>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <select class="w-auto form-select">
              <option selected disabled>Sort by Pricing</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
            <select class="w-auto form-select">
              <option selected disabled>Sort by Seats</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </form>

        <!-- Bus Card -->
        <ul class="list-unstyled">
          <li class="shadow-sm mb-3 card">
            <div
              class="d-flex flex-column flex-md-row justify-content-between gap-3 card-body"
            >
              <!-- Operator Info -->
              <div>
                <h5 class="fw-semibold">Jai Mata Di Travels</h5>
                <div class="d-flex gap-2">
                  <span class="bg-primary badge">AC</span>
                  <span class="bg-primary badge">Sleeper</span>
                  <span class="bg-primary badge">2 + 1</span>
                </div>
              </div>

              <!-- Journey Details -->
              <div class="d-flex align-items-center gap-3">
                <div class="text-center">
                  <p class="mb-0 fw-medium">10:00 AM</p>
                  <small class="text-muted">Delhi</small>
                </div>
                <div class="text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <div
                      class="bg-dark rounded-circle"
                      style="width: 6px; height: 6px"
                    ></div>
                    <div
                      class="bg-dark mx-1"
                      style="height: 1px; width: 60px"
                    ></div>
                    <div
                      class="bg-dark rounded-circle"
                      style="width: 6px; height: 6px"
                    ></div>
                  </div>
                  <small class="text-muted">3h:00 mins</small>
                </div>
                <div class="text-center">
                  <p class="mb-0 fw-medium">1:00 AM</p>
                  <small class="text-muted">Kashmir</small>
                </div>
              </div>

              <!-- Price + CTA -->
              <div class="text-end">
                <div class="text-success fs-5 fw-bold">₹850</div>
                <button class="mt-2 btn btn-primary btn-sm">Book Seats</button>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </section>
  </body>
</html>
