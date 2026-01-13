<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${not empty sessionScope.operator}">
  <c:redirect url="operator_dashboard.do" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Book Bus Tickets Online | RoBus</title>

    <style>
      .logo-img {
        max-height: 40px;
        width: auto;
      }

      /* HERO */
      .hero-section {
        background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
          url("${pageContext.request.contextPath}/static/src/unnamed (1).jpg");
        background-size: cover;
        background-position: center;
        min-height: 65vh;
        padding-bottom: 80px;
      }

      .hero-title {
        font-size: 3rem;
        font-weight: 700;
      }

      .hero-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
      }

      /* SEARCH CARD */
      .search-card {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
        padding: 18px;
        max-width: 1000px;
        margin: 0 auto;
      }

      /* FEATURES */
      .feature-card {
        border-radius: 16px;
        transition: 0.3s;
      }

      .feature-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
      }

      /* STATS */
      .stats-section {
        background: #0d6efd;
        color: #fff;
      }

      /* FOOTER */
      .footer {
        background: #212529;
        color: #adb5bd;
      }

      .footer a {
        text-decoration: none;
        color: #dee2e6;
      }

      .footer a:hover {
        color: #ffffff;
      }
    </style>
  </head>

  <body class="bg-light" style="overflow: scroll">
    <c:import url="essential_page_display.jsp" />
   

    <!-- NAVBAR -->
    <c:choose>
      <c:when test="${empty sessionScope.user}">
        <c:import url="welcome_navbar.jsp" />
      </c:when>
      <c:otherwise>
        <c:import url="logged_navbar.jsp" />
      </c:otherwise>
    </c:choose>

    <!-- HERO -->
    <section class="hero-section d-flex align-items-center">
      <div class="container text-center text-white">
        <h1 class="hero-title">Simple. Fast. Reliable.</h1>
        <p class="hero-subtitle mb-4">
          Book bus tickets across India with live seat availability
        </p>

        <div class="row justify-content-center text-black">
          <div class="col-lg-9 col-md-11">
            <div class="search-card">
              <c:import url="search_bus_form.jsp" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="container py-5">
      <div class="text-center mb-5">
        <h2 class="fw-bold">Why Choose RoBus?</h2>
        <p class="text-muted">Everything you need for comfortable travel</p>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="card feature-card h-100 text-center p-4">
            <i class="bi bi-phone fs-1 text-primary mb-3"></i>
            <h5 class="fw-semibold">Easy Booking</h5>
            <p class="text-muted">
              Book tickets in seconds with a smooth experience
            </p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card feature-card h-100 text-center p-4">
            <i class="bi bi-shield-check fs-1 text-success mb-3"></i>
            <h5 class="fw-semibold">Safe & Secure</h5>
            <p class="text-muted">Secure payments and reliable bus operators</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card feature-card h-100 text-center p-4">
            <i class="bi bi-clock-history fs-1 text-warning mb-3"></i>
            <h5 class="fw-semibold">Live Tracking</h5>
            <p class="text-muted">Real-time updates for every journey</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section py-4">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4">
            <h3 class="fw-bold">10,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="col-md-4">
            <h3 class="fw-bold">500+</h3>
            <p>Bus Operators</p>
          </div>
          <div class="col-md-4">
            <h3 class="fw-bold">1,200+</h3>
            <p>Routes Covered</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0">© 2025 RoBus. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <a href="#" class="me-3">Privacy</a>
            <a href="#" class="me-3">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </body>
</html>
