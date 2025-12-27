<%@ taglib prefix="e" uri="bts" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="page" value="${e:activeURL(pageContext.request)}" />

<nav class="navbar navbar-expand-lg bg-white shadow-sm bts-navbar z-3">
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
      data-bs-target="#btsNavbar"
      aria-controls="btsNavbar"
      aria-expanded="false"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar Content -->
    <div class="collapse navbar-collapse z-3" id="btsNavbar">

      <!-- Center Navigation -->
      <ul class="navbar-nav mx-auto bts-nav-links">

        <!-- Home -->
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2
             ${page eq 'home.jsp' ? 'active' : ''}"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="hero"
               </c:when>
               <c:otherwise>
                 href="/bts"
               </c:otherwise>
             </c:choose>
          >
            <i class="bi bi-house-door"></i>
            <span>Home</span>
          </a>
        </li>

        <!-- Search Buses -->
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2"
             <c:choose>
               <c:when test="${page eq 'search_results.jsp'}">
                 data-target="search_bus_form"
               </c:when>
               <c:otherwise>
                 href="/bts/search_results.do"
               </c:otherwise>
             </c:choose>
          >
            <i class="bi bi-search"></i>
            <span>Search Buses</span>
          </a>
        </li>

        <!-- Services -->
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="service"
               </c:when>
               <c:otherwise>
                 href="/bts/services.do"
               </c:otherwise>
             </c:choose>
          >
            <i class="bi bi-gear"></i>
            <span>Services</span>
          </a>
        </li>

        <!-- Operators -->
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="operator"
               </c:when>
               <c:otherwise>
                 href="/bts/operators.do"
               </c:otherwise>
             </c:choose>
          >
            <i class="bi bi-building"></i>
            <span>Operators</span>
          </a>
        </li>

        <!-- Help -->
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="help"
               </c:when>
               <c:otherwise>
                 href="/bts/help.do"
               </c:otherwise>
             </c:choose>
          >
            <i class="bi bi-question-circle"></i>
            <span>Help</span>
          </a>
        </li>

      </ul>

      <!-- Right: Login / Signup -->
      <div class="dropdown">
        <button
          class="btn bts-auth-btn d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
        >
          <i class="bi bi-person-fill"></i>
          <span>Login / Sign Up</span>
        </button>

        <ul class="dropdown-menu dropdown-menu-end bts-auth-dropdown p-0">

        <!-- Login -->
        <li>
          <c:choose>
            <c:when test="${page eq 'login.jsp'}">
              <a class="dropdown-item border-bottom rounded-top-3 active">
                Login
              </a>
            </c:when>
            <c:otherwise>
              <a class="dropdown-item border-bottom rounded-top-3"
                href="/bts/login.do">
                Login
              </a>
            </c:otherwise>
          </c:choose>
        </li>

        <!-- Sign Up -->
        <li>
          <c:choose>
            <c:when test="${page eq 'signup.jsp'}">
              <a class="dropdown-item rounded-bottom-3 active">
                Sign Up
              </a>
            </c:when>
            <c:otherwise>
              <a class="dropdown-item rounded-bottom-3"
                href="/bts/signup.do">
                Sign Up
              </a>
            </c:otherwise>
          </c:choose>
        </li>
      </ul>
      </div>
    </div>
  </div>
</nav>

<style>

.bts-navbar {
  min-height: 72px;
  background-color: #fff !important;
  z-index: 1050;
}

.bts-navbar a {
  cursor: pointer;
}

.bts-nav-links {
  gap: 24px;
}

.bts-nav-links .nav-link {
  font-weight: 500;
  color: #212529;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background-color .2s ease, color .2s ease;
}

.bts-nav-links .nav-link i {
  font-size: 1rem;
  opacity: 0.85;
}

/* Hover */
.bts-nav-links .nav-link:hover {
  background-color: #f1f3f5;
  color: #212529;
}

/* Active */
.bts-nav-links .nav-link.active {
  background-color: #e7f0ff;
  color: var(--bs-primary);
}

.bts-nav-links .nav-link.active i {
  color: var(--bs-primary);
}

/* --- Login Button --- */
.bts-auth-btn {
  border: 1px solid #dee2e6;
  background-color: #fff;
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 500;
  transition: all .2s ease;
}

.bts-auth-btn i {
  color: var(--bs-primary);
}

.bts-auth-btn:hover {
  border-color: var(--bs-primary);
  background-color: #f5f8ff;
}

/* Dropdown */
.bts-auth-dropdown {
  border-radius: 12px;
  min-width: 160px;
  border: none;
  box-shadow: 0 10px 25px rgba(0,0,0,.1);
}

.bts-auth-dropdown .dropdown-item {
  padding: 12px 16px;
  font-weight: 500;
}

.bts-auth-dropdown .dropdown-item:hover {
  background-color: #f1f5ff;
  color: var(--bs-primary);
}

/* Mobile */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: #fff;
    padding: 20px;
    margin-top: 10px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,.15);
  }

  .bts-nav-links {
    gap: 8px;
    margin-bottom: 20px;
  }

  .bts-auth-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
