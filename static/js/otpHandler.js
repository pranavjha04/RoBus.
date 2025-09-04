import {
  sendOtpHandler,
  checkOTP,
  checkContactExistRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  disableElements,
  displayInputError,
  displayInputSuccess,
  enableElements,
  hideElement,
  removeInputError,
  removeInputSuccess,
  showElement,
  readOnlyElements,
  removeReadOnlyElements,
} from "./util.js";

export class OTPHandler {
  contact;
  sendOTPBtn;
  loadingOTPBtn;
  verifyOTPBtn;
  otpContainer;
  editContactBtn;
  otpFields;

  constructor(
    contact,
    sendOTPBtn,
    loadingOTPBtn,
    verifyOTPBtn,
    editContactBtn,
    otpContainer,
    otpFields
  ) {
    this.contact = contact;
    this.sendOTPBtn = sendOTPBtn;
    this.loadingOTPBtn = loadingOTPBtn;
    this.verifyOTPBtn = verifyOTPBtn;
    this.editContactBtn = editContactBtn;
    this.otpContainer = otpContainer;
    this.otpFields = otpFields;

    this.otpEvent = this.otpEvent.bind(this);

    this.contact.addEventListener("blur", this.contactBlurEvent.bind(this));
    this.sendOTPBtn.addEventListener("click", this.sendOTPEvent.bind(this));
    this.editContactBtn.addEventListener(
      "click",
      this.editContactEvent.bind(this)
    );
    this.verifyOTPBtn.addEventListener("click", this.verifyOTPEvent.bind(this));
    this.init();
  }

  async contactBlurEvent() {
    if (this.contact.readOnly) return;
    removeInputSuccess(this.contact);
    try {
      const response = await checkContactExistRequest(this.contact.value);
      this.contactInvalid(response);
    } catch (err) {
      toast.error(err.message);
    }
  }

  contactInvalid = (response) => {
    if (response === "Invalid") {
      toast.error("Invalid contact number");
      displayInputError(this.contact);
      disableElements(this.sendOTPBtn);
    } else if (response === "true") {
      toast.error("Contact number already in use");
      disableElements(this.sendOTPBtn);
    } else {
      enableElements(this.sendOTPBtn);
      removeInputError(this.contact);
    }
  };

  async sendOTPEvent() {
    const response = await checkContactExistRequest(this.contact.value);
    this.contactInvalid(response);

    if (response === "true" || response === "Invalid") return;

    hideElement(this.sendOTPBtn);
    showElement(this.loadingOTPBtn);

    setTimeout(async () => {
      try {
        const otpResponse = await sendOtpHandler(this.contact.value);
        if (otpResponse === true) {
          toast.success(`OTP sent to ${this.contact.value}`);
          hideElement(this.sendOTPBtn);
          hideElement(this.loadingOTPBtn);
          showElement(this.editContactBtn);
          showElement(this.otpContainer);

          this.otpFields.forEach((otp) => (otp.value = ""));
          readOnlyElements(this.contact);
        } else {
          throw new Error("An error occurred");
        }
      } catch (err) {
        enableElements(this.sendOTPBtn);
        removeReadOnlyElements(this.contact);
        hideElement(this.loadingOTPBtn);
        showElement(this.sendOTPBtn);
        toast.error(err.message);
      }
    }, 500);
  }

  editContactEvent() {
    removeReadOnlyElements(this.contact);
    hideElement(this.otpContainer);
    hideElement(this.editContactBtn);
    showElement(this.sendOTPBtn);
    hideElement(this.verifyOTPBtn);
  }

  async verifyOTPEvent() {
    const otpValue = this.otpFields.map((otp) => otp.value).join("");
    if (otpValue.trim().length < 6) return;

    try {
      const serverResponse = await checkOTP(otpValue);
      if (serverResponse === "1") {
        toast.error("Invalid OTP");
        document.querySelector("#otp-1").focus();
      } else if (serverResponse === "2") {
        throw new Error("Session Expired");
      } else if (serverResponse === "3") {
        this.otpContainer.remove();
        this.verifyOTPBtn.remove();
        this.sendOTPBtn.remove();
        this.editContactBtn.remove();
        this.loadingOTPBtn.remove();
        displayInputSuccess(this.contact);
        toast.success("Number verified successfully");
      } else {
        toast.warning(serverResponse);
      }
    } catch (err) {
      toast.error(err.message);
      hideElement(this.otpContainer);
      hideElement(this.editContactBtn);
      hideElement(this.verifyOTPBtn);
      showElement(this.sendOTPBtn);
    }
  }

  init() {
    this.otpFields.forEach((otp) => {
      otp.addEventListener("input", this.otpEvent);
    });
  }

  otpEvent(e) {
    const allFilled = this.otpFields.every((next) => next.value !== "");
    if (allFilled) showElement(this.verifyOTPBtn);
    else hideElement(this.verifyOTPBtn);

    const currId = +e.target.getAttribute("id").slice(-1);
    const nextTarget = document.querySelector(
      `#otp-${Math.min(currId + 1, 6)}`
    );

    if (currId === 6 && e.target.value !== "") this.verifyOTPBtn.focus();
    if (currId < 6 && nextTarget && e.target.value !== "") nextTarget.focus();
  }
}
