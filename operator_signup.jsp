<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="e" uri="bts" %>

<!-- user bina login kuch ni kr payega -->

<c:choose>
  <c:when
    test="${empty sessionScope.user 
            or sessionScope.user.status.statusId == 2 
            or sessionScope.user.userType.userTypeId > 2}"
  >
    <c:redirect url="/" />
  </c:when>
</c:choose>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <c:import url="essential_page_import.jsp" />
    <title>Operator Signup</title>
  </head>

  <body class="d-flex flex-column bg-light vh-100">
    <c:import url="welcome_navbar.jsp" />
    <!-- Toasts container -->
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 1080"
    ></div>

    <section
      class="d-flex align-items-center justify-content-center flex-grow-1 px-3"
    >
      <form
        method="POST"
        action="operator_signup.do"
        enctype="multipart/form-data"
        class="bg-white border shadow p-4 rounded-3 w-100"
        style="max-width: 420px"
        id="signup_form"
      >
        <div class="d-flex flex-column align-items-center">
          <c:import url="logo.jsp" />
          <h3 class="mt-2 fw-bold fs-4 text-center">
            Create an Operator account
          </h3>
        </div>

        <div id="formWrapper">
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
                placeholder="Pranav Travels"
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
                placeholder="pranavtravels@gmail.com"
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
            <!-- CONTACT -->
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

            <!-- OTP CONTAINER -->
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
            <!-- ADDRESS -->
            <div>
              <label for="address" class="form-label small fw-semibold"
                >Address</label
              >
              <textarea
                id="address"
                name="address"
                class="form-control fld h-100 text-start fld ${empty param.address ? '' : 'border-success'}"
                rows="3"
                maxlength="500"
                placeholder="Enter your address here..."
              >
${empty param.address ? '' : param.address}</textarea
              >
            </div>
            <!-- WEBSITE -->
            <div>
              <label for="website" class="form-label small fw-semibold"
                >Website (Optional)</label
              >
              <input
                id="website"
                type="text"
                name="website"
                class="form-control fld ${empty param.website ? '' : 'border-success'}"
                value="${param.website}"
                placeholder="https://www.pranavtravels.com"
              />
            </div>
            <!-- BASE CHARGE -->
            <div>
              <label for="base_charge" class="form-label small fw-semibold"
                >Base charge</label
              >
              <input
                id="base_charge"
                type="number"
                min="0"
                max="200"
                name="base_charge"
                class="form-control fld ${empty param.base_charge ? '' : 'border-success'}"
                value="${param.base_charge}"
                placeholder="Amount Ranging from 0 to 200"
              />
            </div>
          </div>
          <div id="page_4" class="d-flex flex-column gap-3 d-none">
            <!-- CERTIFICATE -->
            <div>
              <label for="certificate" class="form-label small fw-semibold"
                >Certificate</label
              >
              <input
                class="form-control fld"
                type="file"
                name="certificate"
                id="certificate"
                accept="image/*"
              />
            </div>
            <!-- LOGO -->
            <div>
              <label for="logo" class="form-label small fw-semibold"
                >Logo</label
              >
              <input
                class="form-control fld"
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
              />
            </div>
            <!-- BANNER -->
            <div>
              <label for="banner" class="form-label small fw-semibold"
                >Banner</label
              >
              <input
                class="form-control fld"
                type="file"
                id="banner"
                name="banner"
                accept="image/*"
              />
            </div>
            <!-- PREVIEW OF CERTIFICATE,LOGO,BANNER -->
            <div>
              <div
                class="d-flex gap-4 align-items-start justify-content-between flex-wrap"
              >
                <!-- Certificate -->
                <div class="d-flex flex-column text-center">
                  <span class="fw-semibold mb-2">Certificate</span>
                  <div
                    class="border rounded overflow-hidden"
                    style="width: 120px; height: 120px"
                  >
                    <img
                      id="certificate_preview"
                      class="w-100 h-100 object-fit-cover"
                      alt="Certificate Preview"
                    />
                  </div>
                </div>

                <!-- Logo -->
                <div class="d-flex flex-column text-center">
                  <span class="fw-semibold mb-2">Logo</span>
                  <div
                    class="border rounded overflow-hidden"
                    style="width: 120px; height: 120px"
                  >
                    <img
                      id="logo_preview"
                      class="w-100 h-100 object-fit-cover"
                      alt="Logo Preview"
                    />
                  </div>
                </div>

                <!-- Banner -->
                <div class="d-flex flex-column text-center">
                  <span class="fw-semibold mb-2">Banner</span>
                  <div
                    class="border rounded overflow-hidden"
                    style="width: 120px; height: 120px"
                  >
                    <img
                      id="banner_preview"
                      class="w-100 h-100 object-fit-cover"
                      alt="Banner Preview"
                    />
                  </div>
                </div>
              </div>
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
    <script type="module" src="static/js/operator_signup.js"></script>
  </body>
</html>
