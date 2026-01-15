<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${empty sessionScope.user and empty sessionScope.operator}">
  <c:redirect url="/" />
</c:if>


<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
    />
    <title>Email Verification</title>
    <style>
      body {
        background-color: #f8f9fa;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
      }
      .verification-card {
        background: #ffffff;
        padding: 2.5rem;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        max-width: 450px;
        width: 100%;
        text-align: center;
        border: 1px solid #e9ecef;
      }
      .icon-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
      }
      .bg-success-soft {
        background-color: #d1e7dd;
        color: #0f5132;
      }
      .bg-warning-soft {
        background-color: #fff3cd;
        color: #664d03;
      }
      .bg-danger-soft {
        background-color: #f8d7da;
        color: #842029;
      }

      .status-icon {
        font-size: 2.5rem;
      }
      .btn-custom {
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        border-radius: 10px;
        transition: all 0.3s ease;
      }
    </style>
  </head>
  <body>
    <div class="verification-card">
      <c:choose>
        <%-- SUCCESS STATE --%>
        <c:when test="${valid}">
          <div class="icon-circle bg-success-soft">
            <i class="bi bi-check-lg status-icon"></i>
          </div>
          <h3 class="fw-bold text-dark">Email Verified</h3>
          <p class="text-muted mb-4">
            Your account is now active. You can continue using all our services
            without interruptions.
          </p>
          <a href="/robus" class="btn btn-success btn-custom w-100">
            <i class="bi bi-house-door me-2"></i>Go to Home
          </a>
        </c:when>

        <%-- EXPIRED STATE --%>
        <c:when test="${expired}">
          <div class="icon-circle bg-warning-soft">
            <i class="bi bi-clock-history status-icon"></i>
          </div>
          <h3 class="fw-bold text-dark">Link Expired</h3>
          <p class="text-muted mb-4">
            This verification link has expired. Please click below to get a new
            one.
          </p>
          <button
            class="btn btn-primary btn-custom w-100"
            id="verify_email_btn"
          >
            <i class="bi bi-send me-2"></i>Resend Verification Link
          </button>
          <script type="module" src="static/js/email_verification.js"></script>
        </c:when>

        <c:when test="${invalid}">
          <div class="icon-circle bg-danger-soft">
            <i class="bi bi-exclamation-triangle status-icon"></i>
          </div>
          <h3 class="fw-bold text-dark">Invalid Link</h3>
          <p class="text-muted mb-4">
            We couldn't verify your email. The link might be broken or the code
            is incorrect.
          </p>
          <a href="/robus" class="btn btn-outline-danger btn-custom w-100">
            <i class="bi bi-arrow-left me-2"></i>Back to Home
          </a>
        </c:when>

        <%-- DEFAULT REDIRECT --%>
        <c:otherwise>
          <c:redirect url="/robus" />
        </c:otherwise>
      </c:choose>
    </div>
  </body>
</html>
