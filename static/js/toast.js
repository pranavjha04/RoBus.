class Toast {
  #parentElement;
  defaultDelay = 3000; // visible time
  exitDuration = 300; // animation time

  constructor() {
    this.#parentElement = document.querySelector(".toast-container");

    if (!this.#parentElement) {
      const el = document.createElement("div");
      el.className = "toast-container";
      el.style.position = "fixed";
      el.style.top = "1rem";
      el.style.right = "1rem";
      el.style.zIndex = "9999";
      document.body.appendChild(el);
      this.#parentElement = el;
    }
  }

  #createToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `rht-toast ${type}`;

    toast.innerHTML = `
      <div class="rht-bar"></div>
      <div class="rht-content">${message}</div>
      <button class="rht-close">&times;</button>
    `;

    toast.querySelector(".rht-close").onclick = () => this.#removeToast(toast);
    return toast;
  }

  #removeToast(el) {
    el.classList.add("rht-exit");
    setTimeout(() => el.remove(), this.exitDuration);
  }

  #show(message, type, delay) {
    const toast = this.#createToast(message, type);
    this.#parentElement.insertAdjacentElement("afterbegin", toast);

    setTimeout(() => this.#removeToast(toast), delay ?? this.defaultDelay);
  }

  success(msg, delay) {
    this.#show(msg, "success", delay);
  }
  error(msg, delay) {
    this.#show(msg, "error", delay);
  }
  warning(msg, delay) {
    this.#show(msg, "warning", delay);
  }
  normal(msg, delay) {
    this.#show(msg, "normal", delay);
  }
}

export const toast = new Toast();
