export class FilterNav {
  #parentElement;
  #childrens;

  constructor() {
    this.#parentElement = document.querySelector("#filter_nav");
    this.#childrens = Array.from(this.#parentElement.children);
    this.#parentElement.addEventListener("click", this.#event.bind(this));
  }

  static start() {
    new FilterNav();
  }

  #event(e) {
    if (!e.target.classList.contains("btn")) return;
    this.#childrens.forEach((children) => {
      children.classList.remove("btn-primary");
    });
    e.target.classList.add("btn-primary");
  }
}
