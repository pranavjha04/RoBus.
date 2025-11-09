class Toast {
  #parentElement;
  #message;
  #toastEl;
  delay;
  #currToast;
  static #toastNum = 1;
  constructor(message, delay = 3000) {
    this.#message = message;
    this.delay = delay;
    this.#parentElement = document.querySelector(".toast-container");
    this.#currToast = Toast.#toastNum++;

    this.#init();
  }

  #init() {
    this.#parentElement.insertAdjacentHTML("afterbegin", this.#createToast());
    this.#toastEl = document.querySelector(`#toast_${this.#currToast}`);
  }

  #createToast() {
    return ` <div
        class="toast align-items-center border-0 mt-2"
        role="alert"
        id="toast_${this.#currToast}"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">${this.#message}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>`;
  }

  #displayToast() {
    const toast = new bootstrap.Toast(this.#toastEl, { delay: this.delay });
    toast.show();
    this.#removeToast();
  }

  #removeToast() {
    setTimeout(() => {
      this.#toastEl.remove();
    }, this.delay);
  }

  error(message, delay) {
    const toast = new Toast(message, delay);
    toast.#toastEl.classList.add("text-bg-danger");
    toast.#displayToast();
  }

  warning(message, delay) {
    const toast = new Toast(message, delay);
    toast.#toastEl.classList.add("text-bg-warning");
    toast.#displayToast();
  }

  normal(message, delay) {
    const toast = new Toast(message, delay);
    toast.#toastEl.classList.add("text-bg-primary");
    toast.#displayToast();
  }

  success(message, delay) {
    const toast = new Toast(message, delay);
    toast.#toastEl.classList.add("text-bg-success");
    toast.#displayToast();
  }
}

export const toast = new Toast();
