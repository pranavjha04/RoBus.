<%@ taglib prefix="e" uri="bts" %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>

<!-- Logout Modal -->
<div class="modal fade" tabindex="-1" id="logoutModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Logout</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to logout?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button class="btn btn-danger" id="logout_btn">Logout</button>
      </div>
    </div>
  </div>
</div>

<c:set var="page" value="${e:activeURL(pageContext.request)}" />

<c:if test="${not empty sessionScope.user}">
  <c:if test="${sessionScope.user.status.statusId eq 2}">
    <c:import url="email_verification.jsp" />
  </c:if>
</c:if>
<nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
  <div class="container">
    <!-- Logo -->
    <a class="navbar-brand" href="/robus">
      <img src="static/media/images/logo.png" height="42" />
    </a>

    <!-- Mobile Toggle -->
    <button
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#btsNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="btsNavbar">
      <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
        <!-- Home -->
        <li class="nav-item">
          <a
            class="nav-link d-flex align-items-center gap-2 ${page eq 'home.jsp' ? 'active' : ''}"
            href="/robus"
          >
            <i class="bi bi-house-door"></i>
            <span>Home</span>
          </a>
        </li>

        <!-- Search -->
        <li class="nav-item">
          <a
            class="nav-link d-flex align-items-center gap-2 ${page eq 'search_results.jsp' ? 'active' : ''}"
            href="/robus/search_results.do"
          >
            <i class="bi bi-search"></i>
            <span>Search Buses</span>
          </a>
        </li>

        <!-- Bookings -->
        <li class="nav-item">
          <a
            class="nav-link d-flex align-items-center gap-2 ${page eq 'manage_bookings.jsp' ? 'active' : ''}"
            href="/robus/manage_bookings.do"
          >
            <i class="bi bi-ticket-perforated"></i>
            <span>Manage Bookings</span>
          </a>
        </li>

        <!-- Operator -->
        <c:if test="${sessionScope.user.userType.userTypeId eq 2}">
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2 ${page eq 'operators_accounts.jsp' ? 'active' : ''}"
              href="/robus/operator_accounts.do"
            >
              <i class="bi bi-building"></i>
              <span>Operator Accounts</span>
            </a>
          </li>
        </c:if>

        <!-- Driver -->
        <c:if test="${sessionScope.user.userType.userTypeId eq 3} ${page eq 'manage_schedules.jsp' ? 'active' : ''}">
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              href="/robus/manage_schedules.do"
            >
              <i class="bi bi-calendar2-check"></i>
              <span>Schedules</span>
            </a>
          </li>
        </c:if>

        <!-- Help -->
        <li class="nav-item">
          <a
            class="nav-link d-flex align-items-center gap-2 ${page eq 'help.jsp' ? 'active' : ''}"
            href="/robus/help.do"
          >
            <i class="bi bi-question-circle"></i>
            <span>Help</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2 ${page eq 'services.jsp' ? 'active' : ''}" href="/robus/services.do">
            <i class="bi bi-gear"></i>
            <span>Services</span>
          </a>
        </li>

        <!-- User Dropdown -->
        <li class="nav-item dropdown ms-lg-3">
          <button
            class="btn bts-user-btn d-flex align-items-center gap-2"
            data-bs-toggle="dropdown"
          >
            <img
              src="show_image.do?target=user&id=${sessionScope.user.userId}&name=${sessionScope.user.profilePic}"
              class="bts-avatar object-fit-cover"
              id="user_profile_pic"
            />
            <span class="d-none d-lg-inline"
              >${sessionScope.user.fullName}</span
            >
            <i class="bi bi-chevron-down small"></i>
          </button>

          <ul class="dropdown-menu dropdown-menu-end bts-user-dropdown p-0">
            <li class="border-bottom">
              <c:choose>
                <c:when test="${page eq manage_profile.jsp}">
                  <a
                    class="dropdown-item p-2 rounded rounded-4 rounded-bottom-0"
                  >
                    <i class="bi bi-person me-2"></i>Profile
                  </a>
                </c:when>
                <c:otherwise>
                  <a
                    class="dropdown-item p-2 rounded rounded-4 rounded-bottom-0"
                    href="/robus/manage_profile.do"
                  >
                    <i class="bi bi-person me-2"></i>Profile
                  </a>
                </c:otherwise>
              </c:choose>
            </li>
            <li>
              <button
                class="dropdown-item text-danger p-2 rounded rounded-4 rounded-top-0"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<script type="module" src="static/js/logout.js"></script>

<style>
  /* Nav links */
  .navbar .nav-link {
    font-weight: 500;
    color: #212529;
    padding: 8px 14px;
    border-radius: 8px;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .navbar .nav-link i {
    font-size: 1rem;
    opacity: 0.85;
  }

  /* Hover */
  .navbar .nav-link:hover {
    background-color: #f1f3f5;
    color: #212529;
  }

  /* Active */
  .navbar .nav-link.active {
    background-color: #e7f0ff;
    color: var(--bs-primary);
  }

  .navbar .nav-link.active i {
    color: var(--bs-primary);
  }

  /* User button */
  .bts-user-btn {
    border: 1px solid #dee2e6;
    background: #fff;
    border-radius: 999px;
    padding: 6px 12px;
  }

  .bts-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  /* Dropdown */
  .bts-user-dropdown {
    border-radius: 12px;
    padding: 8px 0;
  }
</style>
