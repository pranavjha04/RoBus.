<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <title>Login</title>
  </head>

  <body class="d-grid bg-light min-vh-100">
    <c:import url="welcome_navbar.jsp" />

    <!-- Login Section -->
    <section class="d-flex align-items-center justify-content-center px-3">
      <form
        method="post"
        class="bg-white shadow p-4 border rounded-3 w-100"
        style="max-width: 420px"
      >
        <!-- Logo + Title -->
        <div class="mb-4 text-center">
          <c:import url="logo.jsp" />
          <h3 class="mt-2 fw-bold fs-4">Login to your account</h3>
        </div>

        <!-- Email -->
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
          />
        </div>

        <!-- Password -->
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

        <!-- reCAPTCHA -->
        <div class="d-flex justify-content-center mb-3">
          <div
            class="g-recaptcha"
            data-sitekey="${initParam.captcha_site_key}"
          ></div>
        </div>

        <!-- Login Button -->
        <div class="d-grid mb-3">
          <input
            type="submit"
            value="Login"
            class="btn btn-primary fw-medium"
          />
        </div>

        <!-- Signup Link -->
        <p class="text-muted text-center small">
          New here?
          <a href="signup.do" class="text-primary text-decoration-none"
            >Create an account</a
          >
        </p>
      </form>
    </section>
  </body>
</html>
