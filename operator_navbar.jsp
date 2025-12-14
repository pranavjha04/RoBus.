<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="modal fade" tabindex="-1" id="logoutModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Logout</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to logout?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary" id="logout_btn">
          Yes
        </button>
      </div>
    </div>
  </div>
</div>

<nav
  class="navbar navbar-light bg-white border-bottom px-4 p-1 gap-2 position-sticky top-0"
  style="z-index: 1030"
>
  <div
    class="ms-auto d-flex align-items-center gap-2 focus-ring-info p-1 rounded-5"
  >
    <img
      src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
      class="rounded-circle border border"
      style="width: 50px; height: 50px; object-fit: contain"
      alt="User"
    />
    <span class="fs-5 fw-medium">${sessionScope.operator.fullName}</span>
  </div>
  <div class="d-flex align-items-center gap-2">
    <button
      class="bg-transparent border-0 focus-ring"
      style="transition: all 0.3s"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="#0d6efd"
        class="bi bi-person"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
        />
      </svg>
    </button>

    <button
      class="bg-transparent border-0 focus-ring"
      style="transition: all 0.3s"
      data-bs-toggle="modal"
      data-bs-target="#logoutModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="#0d6efd"
        class="bi bi-box-arrow-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
        />
        <path
          fill-rule="evenodd"
          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
        />
      </svg>
    </button>
  </div>
  <script type="module" src="static/js/logout.js"></script>
</nav>
