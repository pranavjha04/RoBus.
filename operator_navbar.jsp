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

<nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
  <div class="container d-flex justify-content-between align-items-center">
    <a class="navbar-brand mb-0" href="/bts">
      <img src="static/media/images/logo.png" height="42" />
    </a>

    <div class="d-flex align-items-center gap-2">
      <a
        class="nav-link d-flex align-items-center gap-2 ${page eq 'help.jsp' ? 'active' : ''}"
        href="/bts/help.do"
      >
        <i class="bi bi-question-circle"></i>
        <span class="d-none d-sm-inline">Help</span>
      </a>

      <div class="dropdown">
        <button
          class="btn bts-user-btn d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            class="bts-avatar"
          />
          <span class="fw-medium d-none d-lg-inline">
            ${sessionScope.operator.fullName}
          </span>
          <i class="bi bi-chevron-down small"></i>
        </button>

        <ul class="dropdown-menu dropdown-menu-end bts-user-dropdown p-0">
          <li>
            <c:choose>
              <c:when test="${page eq 'manage_profile.jsp'}">
                <a class="dropdown-item border-bottom">
                  <i class="bi bi-person me-2"></i>Profile
                </a>
              </c:when>
              <c:otherwise>
                <a
                  class="dropdown-item border-bottom rounded rounded-bottom-0 rounded-4"
                  href="/bts/manage_profile.do"
                >
                  <i class="bi bi-person me-2"></i>Profile
                </a>
              </c:otherwise>
            </c:choose>
          </li>
          <li>
            <button
              class="dropdown-item text-danger rounded rounded-top-0 rounded-4"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
            >
              <i class="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<script type="module" src="static/js/logout.js"></script>
<style>
  .navbar .nav-link {
    font-weight: 500;
    color: #212529;
    padding: 8px 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .navbar .nav-link i {
    font-size: 1rem;
    opacity: 0.85;
  }

  .navbar .nav-link:hover {
    background-color: #f1f3f5;
    color: #212529;
  }

  .navbar .nav-link.active {
    background-color: #e7f0ff;
    color: var(--bs-primary);
  }

  .navbar .nav-link.active i {
    color: var(--bs-primary);
  }

  .navbar .container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .bts-user-btn {
    border: 1px solid #dee2e6;
    background: #fff;
    border-radius: 999px;
    padding: 6px 12px;
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
</style>
