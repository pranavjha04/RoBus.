<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
          Choose Account Type
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div
          class="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4"
        >
          <!-- User -->
          <a
            href="signup.do?type=1"
            role="button"
            class="login-option d-flex flex-column align-items-center gap-2 text-dark text-decoration-none"
          >
            <img
              src="static/media/images/user.png"
              alt="User Login"
              class="img-fluid"
              style="width: 7.5rem"
            />
            <span class="fs-4">User</span>
          </a>

          <!-- Operator -->
          <a
            href="signup.do?type=2"
            role="button"
            class="login-option d-flex flex-column align-items-center gap-2 text-dark text-decoration-none"
          >
            <img
              src="static/media/images/operator.png"
              alt="Bus Operator Login"
              class="img-fluid"
              style="width: 7.5rem"
            />
            <span class="fs-4">Bus Operator</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .login-option {
    padding: 1rem;
    border-radius: 0.75rem;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .login-option:hover {
    background-color: #f1f1f1;
    transform: scale(1.03);
  }
</style>
