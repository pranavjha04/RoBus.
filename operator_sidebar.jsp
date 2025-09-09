<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
  }

  /* Sidebar */
  .sidebar {
    width: 300px;
  }

  .sidebar .nav-link.active {
    background-color: #f0f4ff;
    color: #0d6efd;
    border-radius: 0.5rem;
  }

  /* Dashboard cards responsive grid */
  .dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  /* Chart container */
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    overflow-x: auto;
  }

  /* Responsive sidebar for small screens */
  @media (max-width: 992px) {
    .sidebar {
      display: none; /* hide sidebar on tablets/mobiles */
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
        href="/bts"
        class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
      >
        <img src="static/media/images/home.svg" alt="home" class="p-0" />
        <span class="fs-4 fw-medium" style="color: oklch(26.8% 0.007 34.298)"
          >Home</span
        >
      </a>
    </li>
    <li class="w-100 border-bottom">
      <a
        href="operator_buses.do"
        class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
      >
        <img src="static/media/images/bus.svg" alt="bus" class="p-0" />
        <span class="fs-4 fw-medium" style="color: oklch(26.8% 0.007 34.298)"
          >Buses</span
        >
      </a>
    </li>
    <li class="w-100 border-bottom">
      <a
        href="operator_routes.do"
        class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
      >
        <img src="static/media/images/route.svg" alt="home" class="p-0" />
        <span class="fs-4 fw-medium" style="color: oklch(26.8% 0.007 34.298)"
          >Routes</span
        >
      </a>
    </li>
    <li class="w-100 border-bottom">
      <a
        href="operator_buses.do"
        class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
      >
        <img src="static/media/images/account.svg" alt="driver" class="p-0" />
        <span class="fs-4 fw-medium" style="color: oklch(26.8% 0.007 34.298)"
          >Drivers</span
        >
      </a>
    </li>
    <li class="w-100 border-bottom">
      <a
        href="operator_fare_factor.do"
        class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-cash-coin"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
          />
          <path
            d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"
          />
          <path
            d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"
          />
          <path
            d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"
          />
        </svg>
        <span class="fs-4 fw-medium" style="color: oklch(26.8% 0.007 34.298)"
          >Fare Factors</span
        >
      </a>
    </li>
  </ul>
  <div></div>
</aside>
