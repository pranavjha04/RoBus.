export class Pagination {
  page;
  buttonContainer;
  parentElement;
  pages;
  currPageNum;
  numOfPages;
  static pageNum = 1;

  constructor(obj = { pages: [], parentElement: null }) {
    this.parentElement = obj.parentElement;
    this.init();
  }

  init() {
    this.page = 0;
    this.pages = this.parentElement.children;
    this.numOfPages = this.pages.length - 1;
    this.buttonContainer = document.querySelector("#pagination");
    this.currPageNum = Pagination.pageNum++;
    this.update();
  }

  clearContainer() {
    this.buttonContainer.innerHTML = "";
  }

  update() {
    this.clearContainer();
    const firstElement = this.pages[this.page].querySelector(
      "input, date, textarea, file"
    );

    if (firstElement) {
      firstElement.focus();
    }
    if (this.page == 0 && this.page < this.numOfPages) {
      this.buttonContainer.insertAdjacentHTML("afterbegin", this.#getNextBtn());
    }

    if (this.page > 0 && this.page < this.numOfPages) {
      this.buttonContainer.insertAdjacentHTML(
        "afterbegin",
        this.#getPrevNext()
      );
    }

    if (this.page == this.numOfPages) {
      this.buttonContainer.insertAdjacentHTML("afterbegin", this.#getPrevBtn());
    }

    this.#addEvents();
  }

  #getPrevBtn() {
    return `<input type='button' value='Prev' id=${`prev_${this.currPageNum}`} class="prev btn btn-secondary px-4 me-auto fw-medium"/>`;
  }

  #getNextBtn() {
    return `<input type='button' value='Next' id=${`next_${this.currPageNum}`} class="next btn btn-primary px-4 ms-auto fw-medium"/>`;
  }

  #getPrevNext() {
    return `
      <input type='button' value='Prev' id=${`prev_${this.currPageNum}`} class="prev btn btn-secondary px-4 me-auto fw-medium"/>
      <input type='button' value='Next' id=${`next_${this.currPageNum}`} class="next btn btn-primary px-4 ms-auto fw-medium"/>
    `;
  }

  #addEvents() {
    const prevBtn = document.querySelector(`#prev_${this.currPageNum}`);
    const nextBtn = document.querySelector(`#next_${this.currPageNum}`);

    if (prevBtn) prevBtn.addEventListener("click", this.prev.bind(this));
    if (nextBtn) nextBtn.addEventListener("click", this.next.bind(this));
  }

  next() {
    this.pages[this.page].classList.replace("d-block", "d-none");
    this.page = Math.min(this.page + 1, this.numOfPages);
    this.pages[this.page].classList.replace("d-none", "d-block");
    this.update();
  }

  prev() {
    this.pages[this.page].classList.replace("d-block", "d-none");
    this.page = Math.max(this.page - 1, 0);
    this.pages[this.page].classList.replace("d-none", "d-block");
    this.update();
  }
}
