<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Robus | Our Services</title>

    <style>
      :root {
        --black: #0f0f0f;
        --dark-gray: #1a1a1a;
        --gray: #6b7280;
        --light-gray: #f5f5f5;
        --white: #ffffff;
      }

      body {
        background-color: var(--light-gray);
        color: var(--black);
      }

      /* ================= HEADER ================= */
      .page-header {
        color: var(--white);
        padding: 90px 0 70px;
        text-align: center;
      }

      .page-header h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 16px;
      }

      .page-header p {
        font-size: 1.1rem;
        color: #d1d5db;
        max-width: 720px;
        margin: 0 auto;
      }

      /* ================= SERVICE CARD ================= */
      .service-section {
        background: var(--white);
        border-radius: 18px;
        padding: 50px;
        margin-bottom: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .service-section:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
      }

      .service-image {
        height: 340px;
        border-radius: 14px;
        overflow: hidden;
        background: #e5e7eb;
      }

      .service-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .service-number {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--gray);
        letter-spacing: 1px;
        margin-bottom: 10px;
        display: block;
      }

      .service-content h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 18px;
      }

      .service-content p {
        font-size: 1.05rem;
        color: var(--gray);
        line-height: 1.75;
        margin-bottom: 25px;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin-bottom: 30px;
      }

      .features-list li {
        padding: 6px 0;
        font-size: 0.95rem;
        color: var(--dark-gray);
      }
      .cta-banner {
        border-radius: 20px;
        padding: 70px 40px;
        text-align: center;
        margin: 80px 0;
      }

      .cta-banner h3 {
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 20px;
      }

      .cta-banner p {
        font-size: 1.1rem;
        max-width: 700px;
        margin: 0 auto 35px;
      }

      .cta-banner a {
        margin: 6px;
      }
      @media (max-width: 768px) {
        .page-header h1 {
          font-size: 2.2rem;
        }

        .service-section {
          padding: 30px 22px;
        }

        .service-image {
          height: 260px;
          margin-bottom: 25px;
        }

        .service-content h2 {
          font-size: 1.6rem;
        }
      }
    </style>
  </head>
  <c:choose>
    <c:when test="${not empty sessionScope.operator}"> </c:when>
    <c:otherwise>
      <body>
        <c:choose>
          <c:when test="${not empty sessionScope.user}">
            <c:import url="logged_navbar.jsp" />
          </c:when>
          <c:otherwise>
            <c:import url="welcome_navbar.jsp" />
          </c:otherwise>
        </c:choose>

        <!-- HEADER -->
        <section class="page-header bg-primary">
          <div class="container">
            <h1>Services built for modern bus travel</h1>
            <p>
              Robus simplifies ticket booking, travel management, and operator
              operations through a clean, reliable, and fully digital platform.
            </p>
          </div>
        </section>

        <!-- CONTENT -->
        <div class="container" style="max-width: 1140px; margin-top: 70px">
          <!-- SERVICE 1 -->
          <div class="service-section">
            <div class="row align-items-center g-4">
              <div class="col-lg-6">
                <div class="service-image">
                  <img
                    src="${pageContext.request.contextPath}/static/media/images/Gemini_Generated_Image_9e3w389e3w389e3w.jpg"
                    alt="Bus Booking"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <span class="service-number">SERVICE 01</span>
                <div class="service-content">
                  <h2>Smart & effortless ticket booking</h2>
                  <p>
                    Search routes, compare buses, choose your preferred seat,
                    and confirm your journey in minutes - without queues or
                    confusion.
                  </p>
                  <ul class="features-list">
                    <li>Live seat availability</li>
                    <li>Secure and fast checkout</li>
                    <li>Instant booking confirmation</li>
                  </ul>
                  <c:choose>
                    <c:when test="${not empty sessionScope.user}">
                      <a
                        role="button"
                        href="/robus/"
                        class="btn btn-primary rounded-pill fs-4 fw-semibold fs-6 px-4 py-2"
                        >Book a Ticket</a
                      >
                    </c:when>
                    <c:otherwise>
                      <a
                        role="button"
                        href="/robus/login.do"
                        class="btn btn-primary rounded-pill fs-4 fw-semibold fs-6 px-4 py-2"
                        >Book a Ticket</a
                      >
                    </c:otherwise>
                  </c:choose>
                </div>
              </div>
            </div>
          </div>

          <!-- SERVICE 2 -->
          <div class="service-section">
            <div class="row align-items-center g-4">
              <div class="col-lg-6 order-lg-2">
                <div class="service-image">
                  <img
                    src="${pageContext.request.contextPath}/static/media/images/ChatGPT Image Jan 31, 2026, 07_07_12 PM.jpg"
                    alt="Digital Ticket"
                  />
                </div>
              </div>
              <div class="col-lg-6 order-lg-1">
                <span class="service-number">SERVICE 02</span>
                <div class="service-content">
                  <h2>Digital tickets that never get lost</h2>
                  <p>
                    Your tickets are always accessible - from email, booking
                    history, or your dashboard. No printouts required.
                  </p>
                  <ul class="features-list">
                    <li>Email delivery instantly after booking</li>
                    <li>Centralized booking history</li>
                  </ul>
                  <c:choose>
                    <c:when test="${empty sessionScope.user}">
                      <a
                        role="button"
                        href="/robus/login.do"
                        class="btn btn-primary rounded-pill fs-4 fw-semibold fs-6 px-4 py-2"
                        >View My Tickets</a
                      >
                    </c:when>
                    <c:otherwise>
                      <a
                        role="button"
                        href="/robus/manage_bookings.do"
                        class="btn btn-primary rounded-pill fs-4 fw-semibold fs-6 px-4 py-2"
                        >View My Tickets</a
                      >
                    </c:otherwise>
                  </c:choose>
                </div>
              </div>
            </div>
          </div>

          <!-- SERVICE 3 -->
          <div class="service-section">
            <div class="row align-items-center g-4">
              <div class="col-lg-6">
                <div class="service-image">
                  <img
                    src="${pageContext.request.contextPath}/static/media/images/ChatGPT Image Jan 31, 2026, 07_11_11 PM.jpg"
                    alt="Operator Dashboard"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <span class="service-number">SERVICE 03</span>
                <div class="service-content">
                  <h2>Operator dashboard built for control</h2>
                  <p>
                    A powerful yet simple dashboard that helps operators manage
                    buses, drivers, schedules, and performance - all in one
                    place.
                  </p>
                  <ul class="features-list">
                    <li>Bus & driver management</li>
                    <li>Schedule control</li>
                    <li>Analytics & insights</li>
                  </ul>
                  <c:choose>
                    <c:when test="${not empty sessionScope.user}">
                      <a
                        role="button"
                        href="/robus/manage_bookings.do"
                        class="btn btn-primary rounded-pill fs-4 fw-semibold fs-6 px-4 py-2"
                        >Join as Operator</a
                      >
                    </c:when>
                    <c:otherwise>
                      <a
                        role="button"
                        href="/robus/login.do"
                        class="btn btn-primary rounded-pill fs-4 fw-semibold fs-6 px-4 py-2"
                        >Join as Operator</a
                      >
                    </c:otherwise>
                  </c:choose>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="cta-banner bg-white text-dark">
            <h3>Start your journey with Robus</h3>
            <p>
              Whether you're a traveler or a bus operator, Robus gives you the
              tools to move faster, smarter, and stress-free.
            </p>
            <c:choose>
              <c:when test="${not empty sessionScope.user}">
                <a
                  href="/robus/"
                  class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
                  >Book Your First Ride</a
                >
              </c:when>
              <c:otherwise>
                <a
                  href="/robus/login.do"
                  class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
                  >Book Your First Ride</a
                >
              </c:otherwise>
            </c:choose>
            <c:choose>
              <c:when test="${not empty sessionScope.user}">
                <a
                  href="/robus/help.do"
                  class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
                  >Contact Support</a
                >
              </c:when>
              <c:otherwise>
                <a
                  href="/robus/login.do"
                  class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
                  >Contact Support</a
                >
              </c:otherwise>
            </c:choose>
          </div>
        </div>
      </body>
    </c:otherwise>
  </c:choose>
</html>
