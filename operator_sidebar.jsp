<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .sidebar {
    width: 100px;
  }

  .sidebar .nav-link.active {
    background-color: #f0f4ff;
    color: #0d6efd;
    border-radius: 0.5rem;
  }

  .dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    overflow-x: auto;
  }

  @media (max-width: 992px) {
    .sidebar {
      display: none;
    }
  }

  /* Navbar responsiveness */
  @media (max-width: 576px) {
    .navbar .ms-auto {
      flex-direction: column;
      text-align: center;
    }
    .navbar img {
      width: 40px;
      height: 40px;
    }
  }
</style>
<aside
  class="sidebar bg-white border-end px-0 d-flex flex-column justify-content-between align-items-center"
>
  <ul
    class="nav flex-column w-100 p-0 justify-content-center align-items-center"
  >
    <li class="w-100 border-bottom">
      <button
        data-link="operator_dashboard.do"
        class="d-flex flex-column justify-content-center text-decoration-none align-items-center gap-0 side-bar-link w-100 p-2 btn rounded-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#0d6efd"
          class="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
          />
        </svg>
        <span class="fs-6 fw-medium text-primary">Home</span>
      </button>
    </li>
    <li class="w-100 border-bottom">
      <button
        data-link="operator_buses.do"
        class="d-flex flex-column justify-content-center text-decoration-none align-items-center gap-0 side-bar-link w-100 p-2 btn rounded-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#0d6efd"
          class="bi bi-bus-front-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1"
          />
        </svg>
        <span class="fs-6 fw-medium text-primary">Buses</span>
      </button>
    </li>
    <li class="w-100 border-bottom">
      <button
        data-link="operator_routes.do"
        class="d-flex flex-column justify-content-center text-decoration-none align-items-center gap-0 side-bar-link w-100 p-2 btn rounded-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#0d6efd"
          class="bi bi-geo-alt"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"
          />
          <path
            d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
          />
        </svg>
        <span class="fs-6 fw-medium text-primary">Routes</span>
      </button>
    </li>

    <li class="w-100 border-bottom">
      <button
        data-link="operator_schedules.do"
        class="d-flex flex-column justify-content-center text-decoration-none align-items-center gap-0 side-bar-link w-100 p-2 btn rounded-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#0d6efd"
          class="bi bi-calendar"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
          />
        </svg>
        <span class="fs-6 fw-medium text-primary">Schedules</span>
      </button>
    </li>

    <li class="w-100 border-bottom">
      <button
        data-link="operator_drivers.do"
        class="d-flex flex-column justify-content-center text-decoration-none align-items-center gap-0 side-bar-link w-100 p-2 btn rounded-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#0d6efd"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
        <span class="fs-6 fw-medium text-primary">Drivers</span>
      </button>
    </li>

    <li class="w-100 border-bottom">
      <button
        class="d-flex flex-column justify-content-center text-decoration-none align-items-center gap-0 side-bar-link w-100 p-2 btn rounded-0"
        data-link="operator_fare_factor.do"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#0d6efd"
          class="bi bi-ticket"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z"
          />
        </svg>
        <span class="fs-6 fw-medium text-primary">Ticket Fare</span>
      </button>
    </li>
  </ul>
  <div></div>
</aside>
<script>
  const navContainer = document.querySelector(".nav");
  const APP_URL = "http://localhost:8989/bts";
  const currentLink = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const allSideBarLinkButtons = document.querySelectorAll(".side-bar-link");

  navContainer.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const { link } = target.dataset;
    if (link !== currentLink) {
      window.location.href = APP_URL + "/" + link;
    }
  });

  const init = () => {
    allSideBarLinkButtons.forEach((button) => {
      const { link } = button.dataset;
      const svg = button.querySelector("svg");
      const span = button.querySelector("span");
      if (link === currentLink) {
        svg.setAttribute("fill", "#fff");
        span.classList.add("text-white");
        span.classList.remove("text-primary");
        button.classList.add("bg-primary");
      } else {
        svg.setAttribute("fill", "#0d6efd");
        span.classList.remove("text-white");
        span.classList.add("text-primary");
        button.classList.remove("bg-white");
      }
    });
  };

  init();
</script>
