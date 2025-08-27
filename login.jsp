<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <c:import url="essential_page_import.jsp" />
    <title>Login</title>
  </head>

  <body class="d-flex flex-column bg-light vh-100">
    <c:import url="welcome_navbar.jsp" />

    <section
      class="d-flex align-items-center justify-content-center px-3 flex-grow-1"
    >
      <form
        method="post"
        class="bg-white shadow p-4 border rounded-3 w-100"
        style="max-width: 420px"
      >
        <div class="mb-4 text-center">
          <c:import url="logo.jsp" />
          <h3 class="mt-2 fw-bold fs-4">Login to your account</h3>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label small fw-semibold"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@email.com"
            autocomplete="off"
            class="form-control"
            autofocus
          />
        </div>

        <div class="mb-3">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <label for="password" class="form-label small fw-semibold"
              >Password</label
            >
            <a href="#" class="text-primary text-decoration-none small"
              >Forgot Password?</a
            >
          </div>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="<c:out value='********' />"
            class="form-control"
          />
        </div>

        <div class="d-flex justify-content-center mb-3">
          <div
            class="g-recaptcha"
            data-sitekey="${initParam.captcha_site_key}"
          ></div>
        </div>

        <div class="d-grid mb-3">
          <input
            type="submit"
            value="Login"
            class="btn btn-primary fw-medium"
          />
        </div>

        <p class="text-muted text-center small">
          New here?
          <a
            href="signup.do"
            class="text-primary border-0 text-decoration-none"
            style="background: none"
          >
            Create an account
          </a>
        </p>
      </form>
    </section>
  </body>
</html>
