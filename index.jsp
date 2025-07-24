<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ page
contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="${pageContext.request.contextPath}/static/css/style.css"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <script
      defer
      src="${pageContext.request.contextPath}/static/js/script.js"
    ></script>

    <title><c:out value="YatrikBus" /></title>
  </head>
  <body>
    <%-- ########## NAVBAR START ########## --%>
    <nav class="nav">
      <a class="logo" href="#"><c:out value="YatrikBus" /></a>
      <div class="nav-right">
        <a href="#" class="nav-link"><c:out value="Home" /></a>
        <a href="#" class="nav-link"><c:out value="About" /></a>
        <a href="#" class="nav-link"><c:out value="Contact" /></a>
        <button class="btn btn-primary">
          <a href="#"><c:out value="Login" /></a>
        </button>
      </div>
    </nav>
    <%-- ########## NAVBAR END ########## --%>

    <main class="home-main">
      <header>
        <h1><c:out value="Your Journey Starts with YatrikBus" /></h1>
        <p>
          <c:out
            value="Book bus tickets across India with ease. Safe, comfortable, and
          reliable travel at your fingertips."
          />
        </p>
      </header>

      <form class="city-input-container" action="act.do">
        <div class="city-input-div">
          <div class="city-img-text">
            <img
              src="${pageContext.request.contextPath}/static/media/images/bus_person.svg"
              alt="logo"
            />
            <label for="start-location"><c:out value="From" /></label>
          </div>
          <div class="city-input-actual-container">
            <input
              type="text"
              class="input home-city-input"
              id="start-location"
              placeholder="From"
              required
              autocomplete="off"
            />
          </div>
        </div>
        <div class="city-input-div">
          <div class="city-img-text">
            <img
              src="${pageContext.request.contextPath}/static/media/images/bus_person.svg"
              alt="logo"
              class="flip"
            />
            <label for="end-location"><c:out value="To" /></label>
          </div>

          <div class="city-input-actual-container">
            <input
              type="text"
              class="input home-city-input"
              id="end-location"
              placeholder="To"
              required
              autocomplete="off"
            />
          </div>
        </div>
        <div class="city-input-date-container">
          <label for="journey-date"><c:out value="Journey date" /></label>
          <input type="date" class="input" id="journey-date" />
        </div>
        <input class="btn btn-primary" type="submit" value="🔍 Search Buses" />
      </form>
    </main>
    <div class="ill-img-container">
      <img
        src="${pageContext.request.contextPath}/static/media/images/bus.svg"
        alt="bus"
        class="bus_ill"
        draggable="false"
      />
    </div>

    <%-- ########## MAIN END ########## --%>

    <div></div>
  </body>
</html>
