<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${not empty sessionScope.operator}">
  <c:redirect url="/operator_dashboard.do" />
</c:if>

<c:if test="${not empty sessionScope.user}">
  <c:if test="${sessionScope.user.userType.userTypeId eq 3}">
    <c:redirect url="/" />
  </c:if>
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Join as a Operator | RoBus</title>

    <style>
      .page {
        display: flex;
        min-height: 100vh;
        background-color: #ffffff;
      }

      .left {
        flex: 1;
        background-color: #eef4ff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
      }

      .left img {
        max-width: 100%;
        height: auto;
      }

      .right {
        flex: 1;
        padding: 80px 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .right h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #0f172a;
      }

      .right p {
        font-size: 1.1rem;
        color: #475569;
        max-width: 520px;
        line-height: 1.7;
        margin-bottom: 30px;
      }

      .points {
        margin-bottom: 40px;
      }

      .point {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        font-size: 1rem;
        color: #1e293b;
      }

      .point span {
        margin-right: 10px;
        color: #2563eb;
        font-weight: bold;
      }
      @media (max-width: 900px) {
        .page {
          flex-direction: column;
        }

        .right {
          padding: 50px 30px;
        }

        .right h1 {
          font-size: 2.3rem;
        }
      }
    </style>
  </head>

  <body>
    <c:if test="${empty sessionScope.user}">
      <c:import url="welcome_navbar.jsp" />
    </c:if>
    <c:if test="${not empty sessionScope.user}">
      <c:import url="logged_navbar.jsp" />
    </c:if>
    <div class="page">
      <div class="left">
        <img
          src="${pageContext.request.contextPath}/static/media/images/e2cd5da9-3692-4449-9905-f6c7d12bc81b.jpg"
          alt="Bus Operator Illustration"
        />
      </div>

      <div class="right">
        <h1>Are you an operator?</h1>

        <p>
          Robus gives bus operators a simple and powerful way to manage buses,
          routes, drivers, and daily operations &dash; all from one reliable
          platform.
        </p>

        <div class="points">
          <div class="point">
            <div>Manage your entire fleet from one dashboard</div>
          </div>

          <div class="point">
            <div>Create and control routes with ease</div>
          </div>

          <div class="point">
            <div>Assign drivers and manage schedules</div>
          </div>

          <div class="point">
            <div>Track performance and operations in real time</div>
          </div>
        </div>

        <c:if test="${empty sessionScope.user}">
          <a
            href="/robus/login.do"
            class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
          >
            Join now
          </a>
        </c:if>
        <c:if test="${not empty sessionScope.user}">
          <c:choose>
            <c:when test="${sessionScope.user.status.statusId eq 2}">
              <button
                role="button"
                disabled
                class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
              >
                Join now (Verify Yourself)
              </button>
            </c:when>
            <c:otherwise>
              <a
                href="/robus/operator_signup.do"
                class="btn btn-primary fs-4 px-4 py-2 rounded-pill fw-medium"
              >
                Join now
              </a></c:otherwise
            >
          </c:choose>
        </c:if>
      </div>
    </div>
    <c:import url="user_footer.jsp" />
  </body>
</html>
