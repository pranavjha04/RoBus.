<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<nav class="navbar sticky-top navbar-expand-lg bg-white shadow-sm">
  <div class="container-fluid px-4 md:px-5 py-1">
    <c:import url="logo.jsp" />
    <c:if test="${not empty sessionScope.user}">
      <c:if test="${sessionScope.user.status.statusId eq 1 and sessionScope.user.userType.userTypeId eq 1}">
        <a href="operator_sigup.do">Become an operator</a>
      </c:if>
    </c:if>
    <div class="d-flex ms-auto">
      <a class="btn d-block d-lg-none me-2 btn-primary px-4" href="login.do"
        >Login</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <c:import url="logo.jsp" />
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body">
        <ul class="nav ms-auto flex-column flex-md-row align-items-center">
          <li class="nav-item">
            <a class="btn btn-primary px-4" href="login.do" role="button">
              Login
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center fs-6 fw-medium" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center fs-6 fw-medium" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center fs-6 fw-medium" href="#">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center fs-6 fw-medium" href="#">Help</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
