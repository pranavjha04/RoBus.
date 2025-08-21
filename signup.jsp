<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ page
import="java.util.Calendar" %> <%@ taglib prefix="e" uri="bts" %>

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
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 1080"
    ></div>

    <section
      class="d-flex align-items-center justify-content-center flex-grow-1 px-3"
    >
      <form
        method="get"
        class="bg-white border shadow p-4 rounded-3 w-100"
        style="max-width: 420px"
        id="signup_form"
      >
        <div class="d-flex flex-column align-items-center">
          <c:import url="logo.jsp" />
          <h3 class="mt-2 fw-bold fs-4 text-center">Create an account</h3>
        </div>

        <div id="formWrapper">
          <!-- ################ ACCOUNT ESSENTIALS PAGE 1 ################ -->
          <div id="page_1" class="d-flex flex-column gap-3 d-block">
            <!-- ############ ACCOUNT FULL NAME START ############ -->
            <div>
              <label for="full_name" class="form-label small fw-semibold"
                >Full Name</label
              >
              <input
                id="full_name"
                type="text"
                name="full_name"
                class="form-control"
                placeholder="${param.type == 1 ? 'Pranav Jha' : 'Pranav Travels'}"
              />
            </div>
            <!-- ############ ACCOUNT FULL NAME END ############ -->

            <!-- ############ ACCOUNT EMAIL START ############ -->
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
                class="form-control"
              />
            </div>
            <!-- ############ ACCOUNT EMAIL END ############ -->

            <!-- ############ ACCOUNT PASSWORD START ############ -->
            <div>
              <label for="password" class="form-label small fw-semibold"
                >Password</label
              >
              <input type="password" name="password" id="password"
              placeholder="<c:out value="********" />" class="form-control" />
            </div>
            <!-- ############ ACCOUNT PASSWORD END ############ -->
          </div>
          <!-- ############ ACCOUNT ESSENTIAL PAGE 2  ############ -->
          <div id="page_2" class="d-flex flex-column gap-3 d-none">
            <!-- ############ ACCOUNT ESSENTIAL CONTACT START  ############ -->
            <div>
              <label for="contact" class="form-label small fw-semibold"
                >Contact</label
              >
              <input
                id="contact"
                type="tel"
                name="contact"
                class="form-control"
                autocomplete="off"
              />
            </div>
            <!-- ############ ACCOUNT ESSENTIAL CONTACT END  ############ -->

            <!-- ############ ACCOUNT ESSENTIAL SEND OTP BUTTON START  ############ -->
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
            <!-- ############ ACCOUNT ESSENTIAL SEND OTP BUTTON END  ############ -->

            <!-- ############ ACCOUNT ESSENTIAL  OTP INPUT START  ############ -->
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

            <!-- ############ ACCOUNT ESSENTIAL  OTP INPUT END  ############ -->

            <!-- ############ ACCOUNT ESSENTIAL VERIFY OTP BUTTON START  ############ -->

            <input
              type="button"
              value="Verify OTP"
              id="verify_otp_btn"
              class="btn btn-primary px-4 fw-medium align-self-end d-none"
            />
            <!-- ############ ACCOUNT ESSENTIAL VERIFY OTP BUTTON END  ############ -->
          </div>
          <c:choose>
            <c:when test="${param.type == 1}">
              <div id="page_3" class="d-flex flex-column gap-3 d-none">
                <div class="d-flex justify-content-between align-items-center">
                  <!-- ############ USER TYPE DATE OF BIRTH START  ############ -->
                  <div>
                    <label for="dob" class="form-label small fw-semibold"
                      >Date of Birth</label
                    >
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      class="form-control"
                      min="${e:currentDate()}"
                    />
                  </div>
                  <!-- ############ USER TYPE DATE OF BIRTH END  ############ -->

                  <!-- ############ USER TYPE SELECT GENDER START  ############ -->
                  <div>
                    <label for="gender" class="form-label small fw-semibold"
                      >Gender</label
                    >
                    <select
                      id="gender"
                      class="form-select"
                      aria-label="Select Gender"
                      name="gender"
                    >
                      <option selected disabled>Select Your Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Others</option>
                    </select>
                  </div>
                  <!-- ############ USER TYPE SELECT GENDER END  ############ -->
                </div>
                <!-- ############ USER TYPE PROFILE PIC FILE START  ############ -->
                <div>
                  <label for="profile_pic" class="form-label small fw-semibold"
                    >Profile Pic</label
                  >
                  <input
                    class="form-control"
                    type="file"
                    id="profile_pic"
                    name="profile_pic"
                  />
                </div>
                <!-- ############ USER TYPE PROFILE PIC FILE END  ############ -->

                <div class="text-end">
                  <input
                    type="submit"
                    value="Create an account"
                    class="btn btn-primary w-100"
                  />
                  <!-- ############ USER TYPE ESSENTIAL PAGE 1  ############ -->
                </div>
              </div>
            </c:when>
            <c:when test="${param.type == 2}">
              <!-- ############ BUS OPERATOR ESSENTIAL PAGE 1  ############ -->
              <div id="page_4" class="d-flex flex-column gap-3 d-none">
                <!-- ############ BUS OPERATOR ADDRESS START  ############ -->
                <div>
                  <label for="address" class="form-label small fw-semibold"
                    >Address</label
                  >
                  <textarea
                    id="address"
                    class="form-control"
                    rows="3"
                    style="resize: none"
                  ></textarea>
                </div>
                <!-- ############ BUS OPERATOR ADDRESS END  ############ -->

                <!-- ############ BUS OPERATOR WEBSITE URL START  ############ -->
                <div>
                  <label for="website" class="form-label small fw-semibold"
                    >Website URL
                  </label>
                  <input
                    id="website"
                    type="url"
                    name="website"
                    class="form-control"
                  />
                </div>
                <!-- ############ BUS OPERATOR WEBSITE URL END  ############ -->

                <!-- ############ BUS OPERATOR BASE CHARGE START  ############ -->
                <div>
                  <label for="base_charge" class="form-label small fw-semibold"
                    >Base Charge</label
                  >
                  <input
                    id="base_charge"
                    type="number"
                    name="base_charge"
                    class="form-control"
                  />
                </div>
                <!-- ############ BUS OPERATOR BASE CHARGE END  ############ -->
              </div>

              <!-- ############ BUS OPERATOR ESSENTIAL PAGE 2  ############ -->
              <div id="page_5" class="d-flex flex-column gap-3 d-none">
                <!-- ############ BUS OPERATOR CERTIFICATE FILE START  ############ -->
                <div>
                  <label for="certificate" class="form-label small fw-semibold"
                    >Certificate</label
                  >
                  <input class="form-control" type="file" id="certificate" />
                </div>
                <!-- ############ BUS OPERATOR CERTIFICATE FILE END  ############ -->

                <!-- ############ BUS OPERATOR LOGO FILE START  ############ -->
                <div>
                  <label for="logo" class="form-label small fw-semibold"
                    >Logo</label
                  >
                  <input class="form-control" type="file" id="logo" />
                </div>
                <!-- ############ BUS OPERATOR LOGO FILE END  ############ -->

                <!-- ############ BUS OPERATOR BANNER FILE START  ############ -->
                <div>
                  <label for="banner" class="form-label small fw-semibold"
                    >Banner</label
                  >
                  <input class="form-control" type="file" id="banner" />
                </div>
                <!-- ############ BUS OPERATOR BANNER FILE END  ############ -->
                <div class="text-end">
                  <input
                    type="submit"
                    value="Create an account"
                    class="btn btn-primary"
                  />
                </div>
              </div>
            </c:when>
            <c:otherwise>
              <c:redirect url="login.do" />
            </c:otherwise>
          </c:choose>
        </div>

        <div id="pagination" class="mt-4 d-flex justify-content-between"></div>

        <p class="text-center text-muted small mt-3 mb-0">
          Already have an account?
          <a href="login.do" class="text-primary text-decoration-none">Login</a>
        </p>
      </form>
    </section>
    <script type="module" src="static/js/signup.js"></script>
  </body>
</html>
