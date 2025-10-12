export class ModalHandler {
  static show(modalElement) {
    try {
      const modal = this.#getModal(modalElement);
      modal.show();
    } catch (err) {
      throw err;
    }
  }

  static hide(modalElement) {
    try {
      const modal = this.#getModal(modalElement);
      modal.hide();
    } catch (err) {
      throw err;
    }
  }

  static #getModal(modalElement) {
    if (!this.#validateModal(modalElement)) {
      throw new Error("Invalid Modal Element");
    }
    return bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  static #validateModal(modalElement) {
    return (
      modalElement instanceof HTMLElement &&
      modalElement.classList.contains("modal")
    );
  }
}
