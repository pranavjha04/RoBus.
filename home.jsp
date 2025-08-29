<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${not empty sessionScope.operator}">
  <c:redirect url="operator_dashboard.do" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <c:import url="essential_page_import.jsp" />
    <title>Book Your Bus Tickets Online | RoBus</title>
  </head>
  <body class="bg-body-tertiary">
    <c:if test="${not empty sessionScope.user}">
      <c:if test="${sessionScope.user.status.statusId eq 2}">
        <div class="bg-danger py-2 text-white text-center">
          <a href="#" class="text-white fs-6"
            >Complete your email verification and unlock everything &#8594;</a
          >
        </div>
      </c:if>
    </c:if>
    <c:import url="welcome_navbar.jsp" />

    <header
      class="container-fluid position-relative d-flex align-items-center justify-content-center text-white"
      style="
        background-image: url('https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/324800/banner6.jpg');
        background-size: cover;
        background-position: center;
        height: 100vh;
      "
    >
      <div
        class="position-absolute top-0 start-0 w-100 h-100"
        style="background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px)"
      ></div>

      <div class="container position-relative text-center">
        <h1 class="fw-bold display-3 mb-4">
          Book Your Buses with <span class="text-primary">RoBus</span>
        </h1>

        <c:import url="search_bus_form.jsp" />
      </div>
    </header>

    <section></section>
  </body>
</html>
