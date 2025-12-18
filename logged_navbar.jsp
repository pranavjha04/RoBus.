<%@ taglib prefix="e" uri="bts" %>

<nav class="navbar navbar-expand-lg bg-white shadow-sm bts-navbar">
  <div class="container">
    <!-- Logo -->
    <a class="navbar-brand" href="/bts">
      <img src="static/media/images/logo.png" alt="Logo" height="42" />
    </a>

    <!-- Mobile Toggle -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#btsNavbarLoggedIn"
      aria-controls="btsNavbarLoggedIn"
      aria-expanded="false"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="btsNavbarLoggedIn">
      <!-- Right Navigation -->
      <ul class="navbar-nav ms-auto bts-nav-links align-items-lg-center">
        <li class="nav-item">
          <a class="nav-link active" href="/bts">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">Search Buses</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/bts/bookings">Manage Bookings</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/bts/help">Help</a>
        </li>

        <!-- User Dropdown -->
        <li class="nav-item dropdown ms-lg-3">
          <button
            class="btn bts-user-btn d-flex align-items-center gap-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="Profile"
              class="bts-avatar"
            />
            <span class="d-none d-lg-inline fw-medium">
              ${sessionScope.user.fullName}
            </span>
            <i class="bi bi-chevron-down small"></i>
          </button>

          <ul class="dropdown-menu dropdown-menu-end bts-user-dropdown">
            <li>
              <a class="dropdown-item" href="/bts/profile">
                <i class="bi bi-person me-2"></i>Profile
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item text-danger" href="/bts/logout">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  /* User button styles (keep your existing ones) */
  .bts-user-btn {
    border: 1px solid #dee2e6;
    background-color: #fff;
    border-radius: 999px;
    padding: 6px 12px;
    font-weight: 500;
    color: #212529;
    transition: all 0.2s ease;
  }

  .bts-user-btn:hover {
    border-color: var(--bs-primary);
    background-color: #f5f8ff;
  }

  .bts-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .bts-user-dropdown {
    border-radius: 12px;
    padding: 8px 0;
    min-width: 180px;
  }

  .bts-user-dropdown .dropdown-item {
    font-weight: 500;
    padding: 10px 16px;
  }

  .bts-user-dropdown .dropdown-item:hover {
    background-color: #f1f5ff;
    color: var(--bs-primary);
  }

  /* Navbar link styles */
  .bts-nav-links .nav-link {
    font-weight: 500;
    color: #212529;
    transition: color 0.2s ease;
  }

  /* Active link: primary blue */
  .bts-nav-links .nav-link.active {
    color: var(--bs-primary) !important;
  }

  /* Hover effect: lighter/blurred primary */
  .bts-nav-links .nav-link:hover {
    color: rgba(var(--bs-primary-rgb), 0.7); /* 70% opacity primary */
  }
</style>
