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
          <a class="nav-link active"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="hero"
               </c:when>
               <c:otherwise>
                 href="/bts"
               </c:otherwise>
             </c:choose>
          >
            Home
          </a>
        </li>

        <!-- Search Buses -->
        <li class="nav-item">
          <a class="nav-link"
             <c:choose>
               <c:when test="${page eq 'home.jsp' or page eq 'search_results.jsp'}">
                 data-target="search_bus_form"
               </c:when>
               <c:otherwise>
                 href="/bts"
               </c:otherwise>
             </c:choose>
          >
            Search Buses
          </a>
        </li>

        <!-- Services -->
        <li class="nav-item">
          <a class="nav-link"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="service"
               </c:when>
               <c:otherwise>
                 href="/bts/services.do"
               </c:otherwise>
             </c:choose>
          >
            Services
          </a>
        </li>

        <!-- Operators -->
        <li class="nav-item">
          <a class="nav-link"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="operator"
               </c:when>
               <c:otherwise>
                 href="/bts/operators.do"
               </c:otherwise>
             </c:choose>
          >
            Operators
          </a>
        </li>

        <!-- Help -->
        <li class="nav-item">
          <a class="nav-link"
             <c:choose>
               <c:when test="${page eq 'home.jsp'}">
                 data-target="help"
               </c:when>
               <c:otherwise>
                 href="/bts/help.do"
               </c:otherwise>
             </c:choose>
          >
            Help
          </a>
        </li>

      </ul>

      <!-- Right: Login / Signup -->
      <div class="dropdown">
        <button
          class="btn bts-auth-btn d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-fill"></i>
          <span>Login / Sign Up</span>
        </button>

        <ul class="dropdown-menu dropdown-menu-end bts-auth-dropdown">
          <li><a class="dropdown-item" href="login.do">Login</a></li>
          <li><a class="dropdown-item" href="signup.do">Sign Up</a></li>
        </ul>
      </div>

    </div>
  </div>
</nav>


<style>
  /* --- General Navbar Styling --- */
  .bts-navbar {
    /* Use min-height so the bar can expand when the mobile menu opens */
    min-height: 72px;
    background-color: #ffffff !important;
    z-index: 1050; /* Ensures it stays above page content */
  }

  /* Center menu spacing */
  .bts-nav-links {
    gap: 30px;
  }

  /* Nav link styling */
  .bts-nav-links .nav-link {
    font-weight: 500;
    color: #212529;
    padding: 6px 0;
    position: relative;
  }

  /* Underline animation */
  .bts-nav-links .nav-link::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--bs-primary);
    transition: width 0.25s ease;
  }

  .bts-nav-links .nav-link:hover::after,
  .bts-nav-links .nav-link.active::after {
    width: 100%;
  }

  .bts-nav-links .nav-link.active {
    color: var(--bs-primary);
  }

  /* --- Login / Signup Button --- */
  .bts-auth-btn {
    border: 1px solid #dee2e6;
    background-color: #fff;
    border-radius: 999px;
    padding: 8px 18px;
    font-weight: 500;
    color: #212529;
    transition: all 0.2s ease;
  }

  .bts-auth-btn i {
    font-size: 1.1rem;
    color: var(--bs-primary);
  }

  .bts-auth-btn:hover {
    border-color: var(--bs-primary);
    background-color: #f5f8ff;
  }

  /* --- Dropdown Menu Styling --- */
  .bts-auth-dropdown {
    border-radius: 12px;
    padding: 8px 0;
    min-width: 160px;
    border: none;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .bts-auth-dropdown .dropdown-item {
    font-weight: 500;
    padding: 10px 16px;
  }

  .bts-auth-dropdown .dropdown-item:hover {
    background-color: #f1f5ff;
    color: var(--bs-primary);
  }

  @media (max-width: 991.98px) {
    .navbar-collapse {
      background-color: #ffffff;

      padding: 20px;

      margin-top: 10px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .bts-nav-links {
      gap: 10px;
      margin-bottom: 20px;
    }

    .bts-auth-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
