class FilterNav {
  #parentElement;
  #childrens;

  constructor() {
    this.#parentElement = document.querySelector("#filter_nav");
    this.#childrens = Array.from(this.#parentElement.children);
    this.#parentElement.addEventListener("click", this.#event.bind(this));
    this.init();
  }
  start() {
    new FilterNav();
  }
  init() {
    this.#childrens.forEach((child) => {
      child.classList.remove("btn-primary");
      child.style.border = "none";
    });

    this.#childrens[0].classList.add("btn-primary");
  }

  disable() {
    this.#childrens.forEach((child) => {
      child.disabled = true;
    });
  }

  enable() {
    this.#childrens.forEach((child) => {
      child.disabled = false;
    });
  }

  #event(e) {
    if (!e.target.classList.contains("btn")) return;
    this.#childrens.forEach((children) => {
      children.classList.remove("btn-primary");
    });
    e.target.classList.add("btn-primary");
  }
}

export const filterNav = new FilterNav();
