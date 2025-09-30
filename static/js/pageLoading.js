export class PageLoading {
  static startLoading() {
    const loader = document.querySelector("#page_loader");
    if (!loader) throw new Error("No Loader");
    loader.classList.add("d-block");
  }
  static stopLoading() {
    const loader = document.querySelector("#page_loader");
    if (!loader) throw new Error("No Loader");
    loader.classList.add("d-none");
  }
}
