<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <c:import url="essential_page_import.jsp" />
    <title>Bus Search</title>
  </head>
  <body class="d-flex flex-column bg-light text-dark min-vh-100">
    <c:import url="welcome_navbar.jsp" />

    <c:import url="search_bus_form.jsp" />

    <section class="container-fluid px-3 mt-3">
      <div class="row g-3">
        <aside class="col-lg-3 d-none d-lg-block">
          <form class="bg-white shadow-sm rounded p-3 border">
            <h5 class="fw-semibold mb-3">Filters</h5>
            <%-- #################### BUS TYPE #################### --%>
            <div class="d-flex flex-column gap-2">
              <h3 class="fs-6">Bus Type</h3>
              <div class="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_ac"
                  id="ac"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-primary flex-fill text-center"
                  for="ac"
                  >AC</label
                >

                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_ac"
                  id="non_ac"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-primary flex-fill text-center"
                  for="non_ac"
                  >Non AC</label
                >
              </div>

              <div class="d-flex align-items-center gap-3 mt-2">
                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_seat"
                  id="seater"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-primary flex-fill text-center"
                  for="seater"
                  >Seater</label
                >

                <input
                  type="radio"
                  class="btn-check"
                  name="bus_type_seat"
                  id="sleeper"
                  autocomplete="off"
                />
                <label
                  class="btn btn-outline-primary flex-fill text-center"
                  for="sleeper"
                  >Sleeper</label
                >
              </div>
              <select class="form-select mt-2">
                <option selected disabled>Sort by Departure</option>
                <option value="low">Early</option>
                <option value="high">Late</option>
              </select>
            </div>
          </form>
        </aside>

        <main class="col-12 col-lg-9">
          <div class="d-lg-none mb-3">
            <button
              class="btn btn-outline-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterOffcanvas"
            >
              <img
                src="static/media/images/filter_list_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.svg"
              />
              Filters
            </button>
          </div>

          <form class="mb-3">
            <p class="mb-0">Results 1 of 6</p>
            <div class="d-flex flex-wrap gap-2 align-items-center">
              <select class="form-select w-auto">
                <option selected disabled>Sort by Pricing</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              <select class="form-select w-auto">
                <option selected disabled>Sort by Seats</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </form>

          <ul class="list-unstyled">
            <li class="shadow-sm mb-3 card">
              <div
                class="d-flex flex-column flex-md-row justify-content-between gap-3 card-body"
              >
                <div>
                  <h5 class="fw-semibold">Jai Mata Di Travels</h5>
                  <div class="d-flex gap-2">
                    <span class="text-bg-primary badge fw-medium">AC</span>
                    <span class="text-bg-warning badge fw-medium">Sleeper</span>
                    <span class="text-bg-success badge fw-medium">2 + 1</span>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3">
                  <div class="text-center">
                    <p class="mb-0 fw-medium fs-5">10:00 AM</p>
                    <small class="text-muted">Delhi</small>
                  </div>
                  <div class="text-center">
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
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
                    <small class="text-muted">3h 00m</small>
                  </div>
                  <div class="text-center">
                    <p class="mb-0 fw-medium fs-5">1:00 PM</p>
                    <small class="text-muted">Kashmir</small>
                  </div>
                </div>

                <div class="text-end d-flex flex-column">
                  <div class="text-success fs-5 fw-bold">&#x20B9;850</div>
                  <span class="text-danger">29 Seats Available</span>
                  <a
                    href="#"
                    class="mt-2 align-self-end btn btn-primary px-4 fw-medium"
                  >
                    Book Seats
                  </a>
                </div>
              </div>
            </li>
             <li class="shadow-sm mb-3 card">
              <div
                class="d-flex flex-column flex-md-row justify-content-between gap-3 card-body"
              >
                <div>
                  <h5 class="fw-semibold">Jai Mata Di Travels</h5>
                  <div class="d-flex gap-2">
                    <span class="text-bg-primary badge fw-medium">AC</span>
                    <span class="text-bg-warning badge fw-medium"
                      >Sleeper</span
                    >
                    <span class="text-bg-success badge fw-medium">2 + 1</span>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3">
                  <div class="text-center">
                    <p class="mb-0 fw-medium fs-5">10:00 AM</p>
                    <small class="text-muted">Delhi</small>
                  </div>
                  <div class="text-center">
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
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
                    <small class="text-muted">3h 00m</small>
                  </div>
                  <div class="text-center">
                    <p class="mb-0 fw-medium fs-5">1:00 PM</p>
                    <small class="text-muted">Kashmir</small>
                  </div>
                </div>

                <div class="text-end d-flex flex-column">
                  <div class="text-success fs-5 fw-bold">&#x20B9;850</div>
                  <span class="text-danger">29 Seats Available</span>
                  <a
                    href="#"
                    class="mt-2 align-self-end btn btn-primary px-4 fw-medium"
                  >
                    Book Seats
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </section>

    <%-- ####################### FILTER SIDE BAR START #######################
    --%>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="filterOffcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Filters</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex flex-column gap-2">
          <h3 class="fs-6">Bus Type</h3>
          <div class="d-flex align-items-center gap-3">
            <input
              type="radio"
              class="btn-check"
              name="bus_type_ac"
              id="ac"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-primary flex-fill text-center"
              for="ac"
              >AC</label
            >

            <input
              type="radio"
              class="btn-check"
              name="bus_type_ac"
              id="non_ac"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-primary flex-fill text-center"
              for="non_ac"
              >Non AC</label
            >
          </div>

          <div class="d-flex align-items-center gap-3 mt-2">
            <input
              type="radio"
              class="btn-check"
              name="bus_type_seat"
              id="seater"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-primary flex-fill text-center"
              for="seater"
              >Seater</label
            >

            <input
              type="radio"
              class="btn-check"
              name="bus_type_seat"
              id="sleeper"
              autocomplete="off"
            />
            <label
              class="btn btn-outline-primary flex-fill text-center"
              for="sleeper"
              >Sleeper</label
            >
          </div>
          <select class="form-select mt-2">
            <option selected disabled>Sort by Departure</option>
            <option value="low">Early</option>
            <option value="high">Late</option>
          </select>
        </div>
      </div>
    </div>
    <%-- ####################### FILTER SIDE BAR END #######################
    --%>
  </body>
</html>
