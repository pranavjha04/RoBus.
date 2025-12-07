<%@ taglib prefix="e" uri="bts" %>

<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
  <div class="container">
    <!-- Brand / Logo -->
    <a class="navbar-brand d-flex align-items-center" href="/bts">
      <img
        src="static/media/images/logo.png"
        alt="Logo"
        height="40"
        style="width: auto"
        class="me-2 object-fit-contain"
      />
    </a>

    <!-- Hamburger button for responsive menu -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
      aria-controls="navbarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar links -->
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="/">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="#">Search Buses</a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="#">About</a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="#">Service</a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="#">Operator</a>
        </li>
      </ul>

      <!-- Login button -->
      <div class="d-flex text-sm-end">
        <a href="login.do" class="btn px-4 btn-primary rounded-2">Login</a>
      </div>
    </div>
  </div>
</nav>
