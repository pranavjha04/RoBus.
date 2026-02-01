<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>My Account Settings</title>

    <style>
      .profile-container {
        background: #ffffff;
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid #e9ecef;
        margin-bottom: 2.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
      }

      .banner-wrapper {
        position: relative;
        height: 220px;
        background: #e9ecef;
        overflow: hidden;
      }

      .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .banner-overlay-tools {
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
        gap: 10px;
      }

      .banner-edit-btn {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 8px 16px;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
        color: #212529;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .banner-edit-btn:hover {
        background: #ffffff;
      }
      .data-label {
        font-size: 0.85rem;
        color: #6c757d;
        margin-bottom: 4px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .data-value {
        font-weight: 600;
        color: #212529;
        font-size: 1rem;
      }

      .profile-card-header {
        margin-top: -65px;
        position: relative;
        z-index: 2;
        text-align: center;
      }

      .avatar-container {
        position: relative;
        display: inline-block;
      }

      .avatar-img {
        width: 130px;
        height: 130px;
        border-radius: 40px;
        object-fit: cover;
        border: 6px solid #ffffff;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transition: transform 0.25s ease;
        background: white;
      }

      .settings-card {
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        transition: box-shadow 0.25s ease, transform 0.25s ease;
      }

      .settings-card:hover {
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
      }

      .section-badge {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #0d6efd;
        background: rgba(13, 110, 253, 0.1);
        padding: 5px 12px;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        display: inline-block;
      }

      .data-row {
        padding: 1rem;
        border-radius: 12px;
        transition: background 0.2s ease;
      }

      .data-row:hover {
        background: linear-gradient(
          90deg,
          rgba(13, 110, 253, 0.04),
          transparent
        );
      }

      .btn-rounded {
        border-radius: 12px;
        padding: 8px 20px;
        font-weight: 600;
      }
      .certificate-preview-container {
        background: #f8f9fa;
        padding: 30px;
        border-radius: 16px;
        border: 1px dashed #dee2e6;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .certificate-wrapper {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
        border-radius: 14px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        background: #e9ecef;
        border: 2px solid #ffffff;
      }

      .certificate-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .cert-edit-label {
        position: absolute;
        top: 20px;
        left: 20px;
        background: #0d6efd;
        color: white;
        padding: 10px 16px;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
        z-index: 10;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      }

      .cert-edit-label:hover {
        background: #0b5ed7;
      }

      .cert-overlay-tools {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 12px;
        z-index: 10;
      }
      
      /* Fix layout for footer */
      body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      #pageWrapper {
        flex: 1;
        padding-bottom: 2rem;
      }
    </style>
  </head>

  <body>
    <c:import url="essential_page_display.jsp" />
    <c:import url="operator_navbar.jsp" />

    <div class="container py-5" style="max-width: 850px" id="pageWrapper">
      <div class="profile-container">
        <div class="banner-wrapper">
          <img
            src="show_image.do?target=operator&id=${sessionScope.operator.operatorId}&name=${sessionScope.operator.banner}"
            alt="Cover Banner"
            class="banner-img"
            id="banner_img"
          />

          <div class="banner-overlay-tools">
            <label for="banner_img_rcv" class="banner-edit-btn">
              <i class="bi bi-camera-fill"></i> Change Banner
            </label>
            <button
              class="btn btn-primary rounded-4 d-none gap-2 fw-medium d-flex align-items-center px-3 py-2"
              id="save_banner_btn"
            >
              <span>Save Changes</span>
            </button>
            <button
              class="btn btn-secondary d-none rounded-4 gap-2 fw-medium d-flex align-items-center px-3 py-2"
              id="undo_banner_btn"
            >
              <span>Undo Changes</span>
            </button>
          </div>
          <input type="file" id="banner_img_rcv" hidden accept="image/*" />
        </div>

        <div class="profile-card-header">
          <div class="avatar-container mb-2">
            <img
              src="show_image.do?target=operator&id=${sessionScope.operator.operatorId}&name=${sessionScope.operator.logo}"
              alt="Logo"
              class="avatar-img"
              id="logo_img"
            />
          </div>

          <div class="d-flex justify-content-center gap-2 mt-2">
            <label
              for="logo_img_rcv"
              class="btn btn-light btn-rounded border btn-sm"
            >
              Change Photo
            </label>
            <button
              class="btn btn-primary rounded-4 d-none gap-2 fw-medium d-flex align-items-center px-3 py-2"
              id="save_logo_btn"
            >
              <span>Save Changes</span>
            </button>
            <button
              class="btn btn-secondary d-none rounded-4 gap-2 fw-medium d-flex align-items-center px-3 py-2"
              id="undo_logo_btn"
            >
              <span>Undo Changes</span>
            </button>
          </div>
          <input type="file" id="logo_img_rcv" hidden accept="image/*" />

          <div class="gen-info mt-3 pb-4">
            <h2 class="fw-bold m-0" id="name-display">
              ${sessionScope.operator.fullName}
            </h2>
            <p class="text-muted small" id="joined_date"></p>
          </div>
        </div>
      </div>

      <div class="settings-card mb-4" id="general_info_container">
        <span class="section-badge">General Information</span>

        <div class="row g-2">
          <div class="col-md-6">
            <div class="data-row" id="name_container">
              <div class="view">
                <div class="data-label">Full Name</div>
                <div class="data-value">${sessionScope.operator.fullName}</div>
              </div>
              <div class="edit d-none">
                <label for="full_name" class="form-label fw-semibold"
                  >Full Name</label
                >
                <input
                  type="text"
                  class="form-control bg-light"
                  id="full_name"
                  value="${sessionScope.operator.fullName}"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="data-row" id="website_container">
              <div class="view">
                <div class="data-label">Website</div>
                <div class="data-value">${sessionScope.operator.website}</div>
              </div>
              <div class="edit d-none">
                <label for="website" class="form-label fw-semibold"
                  >Website</label
                >
                <input
                  type="text"
                  class="form-control bg-light"
                  id="website"
                  value="${sessionScope.operator.website}"
                />
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="data-row" id="address_container">
              <div class="view">
                <div class="data-label">Address</div>
                <div class="data-value">${sessionScope.operator.address}</div>
              </div>
              <div class="edit d-none">
                <label for="address" class="form-label fw-semibold"
                  >Address</label
                >
                <input
                  type="text"
                  class="form-control bg-light"
                  id="address"
                  value="${sessionScope.operator.address}"
                />
              </div>
            </div>
          </div>

          <div class="col-12 mt-4">
            <div class="data-label px-2">Operator Certificate</div>
            <div class="certificate-preview-container">
              <div class="certificate-wrapper">
                <label for="cert_img_rcv" class="cert-edit-label">
                  <i class="bi bi-camera-fill me-2"></i> Update Certificate
                </label>

                <img
                  src="show_image.do?target=operator&id=${sessionScope.operator.operatorId}&name=${sessionScope.operator.certificate}"
                  alt="Certificate"
                  class="certificate-img"
                  id="cert_img"
                />

                <div class="cert-overlay-tools">
                  <button
                    class="btn btn-primary d-none rounded-4 fw-semibold"
                    id="save_cert_btn"
                  >
                    Save Changes
                  </button>
                  <button
                    class="btn btn-secondary d-none rounded-4 fw-semibold"
                    id="undo_cert_btn"
                  >
                    Undo
                  </button>
                </div>

                <input type="file" id="cert_img_rcv" hidden accept="image/*" />
              </div>
            </div>
          </div>
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-primary btn-rounded" id="profile_edit">
            <i class="bi bi-pencil-square me-2"></i>Edit Profile
          </button>
          <button
            class="btn btn-secondary btn-rounded d-none"
            id="undo_profile_edit"
          >
            <span>Undo Changes</span>
          </button>
          <button
            class="btn btn-primary btn-rounded d-none"
            id="save_profile_edit"
          >
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div class="settings-card">
        <span class="section-badge">Login & Security</span>
        <div
          class="data-row d-flex justify-content-between align-items-center mb-2"
        >
          <div>
            <div class="data-label">Email Address</div>
            <div class="data-value">${sessionScope.operator.email}</div>
          </div>
          <a
            href="change_email.do"
            class="btn btn-outline-primary btn-rounded btn-sm"
            >Update</a
          >
        </div>
        <div
          class="data-row d-flex justify-content-between align-items-center mb-2"
        >
          <div>
            <div class="data-label">Phone Number</div>
            <div class="data-value">${sessionScope.operator.contact}</div>
          </div>
          <a
            href="change_contact.do"
            class="btn btn-outline-primary btn-rounded"
            >Change</a
          >
        </div>

        <div class="data-row d-flex justify-content-between align-items-center">
          <div>
            <div class="data-label">Password</div>
            <div class="data-value">**********</div>
          </div>
          <a
            href="change_password.do"
            class="btn btn-outline-danger btn-rounded btn-sm"
            >Change</a
          >
        </div>
      </div>
    </div>
    
    <c:import url="operator_footer.jsp" />

    <script type="module" src="static/js/manageOperatorProfile.js"></script>
  </body>
</html>