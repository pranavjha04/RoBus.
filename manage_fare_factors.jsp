<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Document</title>
  </head>
  <body>
    <!-- <c:import url="essential_page_display.jsp" /> -->
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
            href="operator_fare_factor.do"
            class="link-primary link-underline-opacity-0 fw-medium fs-3 d-flex link align-self-start"
          >
            <span>&larr;</span>
            <span>Back</span>
          </a>
          <div class="align-self-start">
            <input
              type="number"
              name="charges"
              class="form-control p-2"
              placeholder="Edit Charges"
              value="23"
              id=""
            />
          </div>
        </div>
      </main>
    </div>
  </body>
</html>
