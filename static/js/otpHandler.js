import { toast } from "./toast.js";
import {
  createURLParams,
  displayInputSuccess,
  hideElement,
  removeInputSuccess,
  showElement,
  validateContact,
} from "./util.js";

export class OTPHandler {
  #sendOTPBtn;
  #editContactBtn;
  #verifyOTPBtn;
  #otpContainer;
  #otpFields;
  #contactField;
  #loadingBtn;

  constructor(
    sendOTPBtn,
    editContactBtn,
    verifyOTPBtn,
    otpContainer,
    otpFields,
    contactField,
    loadingBtn
  ) {
    this.#sendOTPBtn = document.querySelector(`${sendOTPBtn}`);
    this.#editContactBtn = document.querySelector(`${editContactBtn}`);
    this.#verifyOTPBtn = document.querySelector(`${verifyOTPBtn}`);
    this.#otpContainer = document.querySelector(`${otpContainer}`);
    this.#otpFields = document.querySelectorAll(`${otpFields}`);
    this.#contactField = document.querySelector(`${contactField}`);
    this.#loadingBtn = document.querySelector(`${loadingBtn}`);
    this.#init();
    this.#contactField.addEventListener("blur", this.#contactEvent.bind(this));
    this.#verifyOTPBtn.addEventListener("click", this.#verifyEvent.bind(this));
  }

  #init() {
    showElement(this.#contactField);
    this.#enableElements(this.#contactField);
    this.#disableElements(
      this.#sendOTPBtn,
      this.#editContactBtn,
      this.#verifyOTPBtn,
      this.#otpContainer,
      this.#otpFields,
      this.#loadingBtn
    );
  }

  async sendOTPRequest() {
    const queryParams = createURLParams({
      contact: this.#contactField.value,
    });
    const response = await fetch("send_otp.do?" + queryParams.toString());
    if (!response.ok) throw new Error("Servler Problem");
    const data = await response.text();
    return data === "true";
  }

  async verifyOTPRequest() {
    const controller = new AbortController();
    const queryParams = createURLParams({
      otp: Array.from(this.#otpFields)
        .map((otp) => otp.value)
        .join(""),
    });
    const response = await fetch("verify_otp.do?" + queryParams.toString(), {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Session Expired");
    const data = await response.text();
    controller.abort();
    return +data;
  }

  #sendOTPEvent() {
    if (!validateContact(this.#contactField.value)) {
      this.#init();
      return;
    }

    this.#disableElements(this.#contactField, this.#sendOTPBtn);
    hideElement(this.#sendOTPBtn);
    showElement(this.#loadingBtn);

    this.sendOTPRequest()
      .then((data) => {
        if (!data) throw new Error("Server Problem");

        toast.success(`OTP Sent Successfully to ${this.#contactField.value}`);
        this.#enableElements(this.#editContactBtn);
        hideElement(this.#loadingBtn);
        showElement(this.#editContactBtn);
        this.#editContactBtn.addEventListener(
          "click",
          this.#editBtnEvent.bind(this)
        );
        this.#sendOTPBtn.removeEventListener(
          "click",
          this.#sendOTPEvent.bind(this)
        );
        showElement(this.#otpContainer);
        this.#observeOTP();
      })
      .catch((err) => {
        this.#closeAll();
        toast.error("Server Problem Please Try Again");
      });
  }

  #editBtnEvent() {
    this.#closeAll();
    this.#contactField.focus();
  }

  #contactEvent() {
    const isValid = validateContact(this.#contactField.value);

    if (isValid) {
      this.#enableElements(this.#sendOTPBtn);
      this.#sendOTPBtn.removeEventListener(
        "click",
        this.#sendOTPEvent.bind(this)
      );
      this.#sendOTPBtn.addEventListener("click", this.#sendOTPEvent.bind(this));
    } else {
      toast.error("Invalid Contact");
      removeInputSuccess(this.#contactField); 
      this.#sendOTPBtn.removeEventListener(
        "click",
        this.#sendOTPEvent.bind(this)
      );
      this.#init();
    }
  }

  #verifyEvent() {
    const otpArray = Array.from(this.#otpFields);
    const allFilled = otpArray.every((otp) => otp.value !== "");
    if (!allFilled) return;

    otpArray.forEach((otp) => (otp.disabled = true));
    this.#disableElements(
      this.#editContactBtn,
      this.#contactField,
      this.#verifyOTPBtn
    );

    setTimeout(() => {
      this.verifyOTPRequest()
        .then((data) => {
          if (data === 2) {
            // OTP MISMATCHED
            toast.error("OTP Mismatched. Please try Again");
            this.#otpTryAgain();
          }
          if (data === 3) {
            hideElement(this.#otpContainer);
            hideElement(this.#verifyOTPBtn);
            toast.success(`Number Verified`);
            hideElement(this.#editContactBtn);
          }
        })
        .catch((err) => {
          toast.error("Session Expired");
          this.#otpTryAgain();
        });
    }, 1000);
  }

  #otpTryAgain() {
    Array.from(this.#otpFields).forEach((otp) => (otp.disabled = false));
    this.#enableElements(this.#editContactBtn, this.#contactField);
    hideElement(this.#verifyOTPBtn);
  }

  #closeAll() {
    this.#init();
    hideElement(this.#editContactBtn);
    showElement(this.#sendOTPBtn);
    hideElement(this.#otpContainer);
    hideElement(this.#verifyOTPBtn);
    this.#sendOTPBtn.removeEventListener(
      "click",
      this.#sendOTPEvent.bind(this)
    );
    this.#editContactBtn.removeEventListener(
      "click",
      this.#editBtnEvent.bind(this)
    );
  }

  #observeOTP() {
    this.#otpFields.forEach((otp) => {
      otp.addEventListener("input", (e) => {
        const allFilled = Array.from(this.#otpFields).every(
          (next) => next.value != ""
        );

        if (e.target.value !== "") this.#otpEvent(otp, this.#getNextTargetOTP);
        if (allFilled) {
          showElement(this.#verifyOTPBtn);
          this.#enableElements(this.#verifyOTPBtn);
        } else {
          hideElement(this.#verifyOTPBtn);
          this.#disableElements(this.#verifyOTPBtn);
        }
      });
    });

    if (Array.from(this.#otpFields).every((otp) => otp.disabled === true))
      return;
    document.addEventListener("keydown", (e) => {
      const activeElement = document.activeElement;
      const key = e.key;

      if (activeElement.getAttribute("name") !== "otp") return;

      if (key === "ArrowRight") {
        this.#otpEvent(activeElement, this.#getNextTargetOTP);
      }
      if (key === "ArrowLeft") {
        this.#otpEvent(activeElement, this.#getPrevTargetOTP);
      }
    });
  }

  #otpEvent(otp, handler) {
    const currIdNum = +otp.getAttribute("id").slice(-1);
    const nextTarget = handler(currIdNum);
    const element = document.querySelector(nextTarget);

    if (element) {
      element.focus();
      setTimeout(() => {
        element.select();
      }, 0);
    }
  }

  #getNextTargetOTP(currId) {
    return `#otp-${Math.min(currId + 1, 6)}`;
  }

  #getPrevTargetOTP(currId) {
    return `#otp-${Math.max(currId - 1, 1)}`;
  }

  #disableElements(...elements) {
    elements.forEach((next) => (next.disabled = true));
  }
  #enableElements(...elements) {
    elements.forEach((next) => (next.disabled = false));
  }
}
