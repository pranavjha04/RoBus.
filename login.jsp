<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${not empty sessionScope.operator or not empty sessionScope.user}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>Login | RoBus</title>
    <style>
      body {
        background-color: #f8f9fa;
      }

      .login-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 56px - 60px);
      }

      .login-card {
        max-width: 420px;
        width: 100%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        border: 1px solid #dee2e6;
      }

      .form-control {
        border-radius: 4px;
      }

      .form-control:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.1);
        border-color: #80bdff;
      }

      .btn-primary {
        padding: 0.5rem;
        font-weight: 500;
      }

      .logo-container {
        display: inline-block;
        margin-bottom: 0.5rem;
      }

      .welcome-text {
        color: #333;
        font-weight: 500;
      }

      .login-links a {
        transition: color 0.2s ease;
      }

      .login-links a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div
      style="display: grid; grid-template-rows: auto 1fr auto"
      class="min-vh-100"
    >
      <c:import url="welcome_navbar.jsp" />

      <section class="login-wrapper px-3">
        <div class="bg-white shadow-sm p-4 border rounded login-card">
          <form method="post" action="login.do" id="login_form">
            <div class="mb-4 text-center">
              <div class="logo-container">
                <c:import url="logo.jsp" />
              </div>
              <h3 class="mt-2 fw-semibold fs-4 welcome-text">
                Login to your account
              </h3>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label small fw-semibold"
                >Email address</label
              >
              <input
                type="email"
                id="email"
                name="email"
                value="${param.email}"
                required
                placeholder="example@email.com"
                autocomplete="off"
                class="form-control ${empty param.email ? '' : 'border-success'}"
                autofocus
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label small fw-semibold"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
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
          </form>

          <div class="login-links">
            <p class="text-center small mb-2">
              <a
                href="forgot-password.do"
                id="forget_password"
                class="text-primary text-decoration-none"
              >
                Forgot Password?
              </a>
            </p>

            <p class="text-muted text-center small mb-0">
              New here?
              <a
                target="_parent"
                href="signup.do"
                class="text-primary border-0 text-decoration-none"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>

      <c:import url="user_footer.jsp" />
    </div>

    <script src="static/js/login.js" type="module"></script>
  </body>
</html>
