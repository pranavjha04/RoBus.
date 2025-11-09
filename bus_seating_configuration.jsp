<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Route Information</title>
  </head>
  <body>
    <div class="dashContainer">
      <!-- Sidebar -->
      <c:import url="operator_sidebar.jsp" />

      <!-- Main content -->
      <main
        class="flex-grow-1 d-flex flex-column bg-light"
        style="overflow: auto"
      >
        <!-- Top Navbar -->
        <c:import url="operator_navbar.jsp" />

        <!-- Dashboard Content -->
        <div class="p-4 d-flex flex-column overflow-scroll">
          <a
            href="operator_buses.do"
            class="link-primary link-underline-opacity-0 fw-medium fs-4 d-flex link back-link align-self-start"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>

          <div class="container mt-2 mb-4" id="pageWrapper"></div>
          <div class="d-flex flex-column gap-3"></div>

          <footer class="container mt-4 mb-4"></footer>
        </div>
      </main>
    </div>
    <script type="module" src="static/js/busSchedule.js"></script>
  </body>
</html>
