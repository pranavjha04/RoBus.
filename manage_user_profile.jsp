<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <title>My Account Settings</title>

    <style>
      .profile-card-header {
        text-align: center;
        margin-bottom: 2.5rem;
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
        border: 5px solid #ffffff;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.25s ease;
      }

      .avatar-container:hover .avatar-img {
        transform: scale(1.03);
      }

      .photo-upload-btn {
        position: absolute;
        bottom: -10px;
        right: -10px;
        background: #0d6efd;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #f8f9fa;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .photo-upload-btn:hover {
        background: #0b5ed7;
        transform: scale(1.1);
      }

      /* ================= CARD ================= */
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
        transform: translateY(-2px);
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
        box-shadow: inset 0 0 0 1px rgba(13, 110, 253, 0.15);
      }

      /* ================= ROWS ================= */
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

      .data-label {
        font-size: 0.85rem;
        color: #6c757d;
        margin-bottom: 2px;
        font-weight: 500;
      }

      .data-value {
        font-weight: 600;
        color: #212529;
      }

      /* ================= BUTTONS ================= */
      .btn-rounded {
        border-radius: 12px;
        padding: 8px 20px;
        font-weight: 600;
        transition: all 0.2s ease;
      }

      .btn-rounded:hover {
        transform: translateY(-1px);
      }

      .btn-edit-main {
        padding: 10px 25px;
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
      }

      .btn-edit-main:hover {
        box-shadow: 0 8px 20px rgba(13, 110, 253, 0.35);
      }
      .btn-light.btn-rounded {
        font-size: 0.85rem;
        padding: 6px 16px;
      }
    </style>
  </head>

  <body>
    <c:import url="logged_navbar.jsp" />
    <c:import url="essential_page_display.jsp" />

    <div class="container py-5" style="max-width: 800px" id="pageWrapper">
      <!-- PROFILE HEADER -->
      <div class="profile-card-header">
        <div class="avatar-container mb-3">
          <img
            src="show_image.do?target=user&id=${sessionScope.user.userId}&name=${sessionScope.user.profilePic}"
            alt="Profile"
            class="avatar-img"
            id="profile_img"
          />
        </div>

        <!-- Upload button beside avatar -->
        <div class="d-flex justify-content-center gap-2 mt-2">
          <label for="imgUpload" class="btn btn-light btn-rounded border">
            Upload photo
          </label>
          <button
            class="btn btn-light btn-rounded border custom-btn-light d-none"
            id="save_profile_pic_change_btn"
          >
            Save changes
          </button>
          <button
            class="btn btn-light btn-rounded border custom-btn-light d-none"
            id="undo_profile_pic_change_btn"
          >
            Undo changes
          </button>
        </div>

        <input type="file" id="imgUpload" hidden accept="image/*" />

        <div class="gen-info">
          <h2 class="fw-bold m-0" id="name">${sessionScope.user.fullName}</h2>
          <p class="text-muted small">
             <strong id="joined_date"></strong>
          </p>
        </div>
      </div>

      <!-- GENERAL INFO -->
      <div class="settings-card mb-4" id="general_info_container">
        <span class="section-badge">General Information</span>

        <div class="row g-2">
          <div class="col-md-6">
            <div class="data-row" id="name_container">
              <div class="view">
                <div class="data-label">Full Name</div>
                <div class="data-value">${sessionScope.user.fullName}</div>
              </div>
              <div class="edit d-none">
                <label for="full_name" class="form-label fw-semibold"
                  >Full Name</label
                >
                <input
                  type="text"
                  class="form-control bg-light"
                  id="full_name"
                  value="${sessionScope.user.fullName}"
                />
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="data-row" id="dob_container">
              <div class="view">
                <div class="data-label">Birth Date</div>
                <div class="data-value"></div>
              </div>
              <div class="edit d-none">
                <label for="dob" class="form-label small fw-semibold">
                  Date of Birth
                </label>
                <input id="dob" type="date" name="dob" class="form-control" />
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="data-row" id="gender_container">
              <div class="view">
                <div class="data-label">Gender</div>
                <div class="data-value"></div>
              </div>
              <div class="edit d-none">
                <select
                  class="form-select fld"
                  id="gender"
                  name="gender"
                  value="${sessionScope.user.gender}"
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="ms-auto d-flex align-items-cente justify-content-end gap-3">
          <button
            class="btn text-end btn-primary rounded-4 gap-2 fw-medium d-flex align-items-center px-3 py-2"
            id="edit_profile_btn"
          >
            <i class="bi bi-pencil-square"></i> <span>Edit Profile</span>
          </button>
          <button
            class="btn btn-primary rounded-4 d-none gap-2 fw-medium d-flex align-items-center px-3 py-2"
            id="save_changes_btn"
          >
            <span>Save Changes</span>
          </button>
          <button
            class="btn btn-secondary d-none rounded-4 gap-2 fw-medium d-flex align-items-center px-3 py-2"
            id="undo_changes_btn"
          >
            <span>Undo Changes</span>
          </button>
        </div>
      </div>

      <!-- LOGIN & SECURITY -->
      <div class="settings-card">
        <span class="section-badge">Login & Security</span>

        <div
          class="data-row d-flex justify-content-between align-items-center mb-2"
        >
          <div>
            <div class="data-label">Email Address</div>
            <div class="data-value">${sessionScope.user.email}</div>
          </div>
          <a href="change_email.do" class="btn btn-outline-primary btn-rounded"
            >Update</a
          >
        </div>

        <div
          class="data-row d-flex justify-content-between align-items-center mb-2"
        >
          <div>
            <div class="data-label">Phone Number</div>
            <div class="data-value">${sessionScope.user.contact}</div>
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
            class="btn btn-outline-danger btn-rounded"
            >Change</a
          >
        </div>
      </div>

      <!-- FOOTER -->
    </div>
    <script type="module" src="static/js/manageUserProfile.js"></script>
    <c:import url="user_footer.jsp" />
  </body>
</html>
