<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ taglib prefix="e" uri="bts" %>

<c:if test="${
            not empty sessionScope.operator
            or not empty sessionScope.user}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <c:import url="essential_page_import.jsp" />
    <title>Signup</title>
  </head>

  <body class="d-flex flex-column bg-light vh-100">
    <c:import url="welcome_navbar.jsp" />
    <!-- Toasts container -->
    <section
      class="d-flex align-items-center justify-content-center flex-grow-1 px-3"
    >
      <form
        method="POST"
        action="signup.do"
        class="bg-white border shadow p-4 rounded-3 w-100"
        style="max-width: 420px"
        id="signup_form"
      >
        <div class="d-flex flex-column align-items-center">
          <c:import url="logo.jsp" />
          <h3 class="mt-2 fw-bold fs-4 text-center">Create an account</h3>
        </div>

        <div id="formWrapper" >
          <div id="page_1" class="d-flex flex-column gap-3 d-block">
            <!-- FULL NAME -->
            <div>
              <label for="full_name" class="form-label small fw-semibold"
                >Full Name</label
              >
              <input
                id="full_name"
                type="text"
                name="full_name"
                class="form-control fld ${empty param.full_name ? '' : 'border-success'}"
                value="${param.full_name}"
                placeholder="Pranav Jha"
              />
            </div>
            <!-- EMAIL -->
            <div>
              <label for="email" class="form-label small fw-semibold"
                >Email address</label
              >
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@email.com"
                autocomplete="email"
                value="${param.email}"
                class="form-control fld ${empty param.email ? '' : 'border-success'}"
              />
            </div>
            <!-- PASSWORD -->
            <div>
              <label for="password" class="form-label small fw-semibold"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                placeholder="<c:out value='********' />"
                value="${param.password}"
                class="form-control fld ${empty param.password ? '' : 'border-success'}"
              />
            </div>
          </div>
          <div id="page_2" class="d-flex flex-column gap-3 d-none">
            <div>
              <label for="contact" class="form-label small fw-semibold"
                >Contact</label
              >
              <input
                id="contact"
                type="tel"
                name="contact"
                class="form-control fld ${empty param.contact ? '' : 'border-success'}"
                value="${param.contact}"
                autocomplete="off"
                minlength="10"
                maxlength="10"
              />
            </div>
    
              <input
                type="button"
                value="Send OTP"
                id="send_otp_btn"
                disabled
                class="btn btn-primary px-4 fw-medium align-self-end"
              />
              <button
                class="ms-auto btn btn-primary d-none"
                id="load_otp_btn"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status" class="fw-medium">Sending OTP</span>
              </button>
              <input
                type="button"
                value="Edit Contact"
                id="edit_contact_btn"
                class="btn btn-primary px-4 fw-medium align-self-end d-none"
              />
              <div id="otp_container" class="d-none">
                <label for="otp-1" class="form-label small fw-semibold"
                  >Enter OTP</label
                >
                <div class="d-flex justify-content-between gap-2">
                  <input
                    type="tel"
                    class="form-control text-center py-md-2"
                    id="otp-1"
                    name="otp"
                    maxlength="1"
                  />
                  <input
                    type="tel"
                    class="form-control text-center py-md-2"
                    id="otp-2"
                    name="otp"
                    maxlength="1"
                  />
                  <input
                    type="tel"
                    class="form-control text-center py-md-2"
                    id="otp-3"
                    name="otp"
                    maxlength="1"
                  />
                  <input
                    type="tel"
                    class="form-control text-center py-md-2"
                    id="otp-4"
                    name="otp"
                    maxlength="1"
                  />
                  <input
                    type="tel"
                    class="form-control text-center py-md-2"
                    id="otp-5"
                    name="otp"
                    maxlength="1"
                  />
                  <input
                    type="tel"
                    class="form-control text-center py-md-2"
                    id="otp-6"
                    name="otp"
                    maxlength="1"
                  />
                </div>
              </div>
              <input
                type="button"
                value="Verify OTP"
                id="verify_otp_btn"
                class="btn btn-primary px-4 fw-medium align-self-end d-none"
              />
          </div>
          <div id="page_3" class="d-flex flex-column gap-3 d-none">
            <div>
              <label for="dob" class="form-label small fw-semibold">
                Date of Birth
              </label>

              <input 
                id="dob" 
                type="date" 
                name="dob" 
                class="form-control fld ${empty param.dob ? '' : 'border-success'}"
                value="${param.dob}" />

            </div>
            <div>
              <label for="gender" class="form-label small fw-semibold"
                >Gender</label
              >
             <select class="form-select fld ${empty param.gender ? '' : 'border-success'}" 
                    id="gender" 
                    name="gender">

              <option value="" ${empty param.gender ? 'selected' : ''}>Select Gender</option>
              <option value="1" ${param.gender == '1' ? 'selected' : ''}>Male</option>
              <option value="2" ${param.gender == '2' ? 'selected' : ''}>Female</option>
              <option value="3" ${param.gender == '3' ? 'selected' : ''}>Others</option>
            </select>
            </div>
            <div class="d-flex justify-content-center">
              <div
                class="g-recaptcha"
                data-sitekey="${initParam.captcha_site_key}"
              ></div>
            </div>
            <input
              type="submit"
              value="Create an account"
              class="btn btn-primary px-4 fw-medium"
              id="submit_form_btn"
            />
          </div>
        </div>

        <div id="pagination" class="mt-4 d-flex justify-content-between"></div>

        <p class="text-center text-muted small mt-3 mb-0">
          Already have an account?
          <a href="login.do" class="text-primary text-decoration-none">Login</a>
        </p>
      </form>
    </section>
    <!-- <script type="module" src="static/js/signup.js"></script> -->
    <script type="module" src="static/js/signup2.js"></script>
  </body>
</html>
