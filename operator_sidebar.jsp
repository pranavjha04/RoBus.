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
        href="#"
        class="d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2"
      >
        <img src="static/media/images/settings.svg" alt="setting" class="p-0" />
        <span class="fs-4 fw-medium" style="color: oklch(26.8% 0.007 34.298)"
          >Settings</span
        >
      </a>
    </li>
  </ul>
  <div></div>
</aside>
