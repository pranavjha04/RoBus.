import { Pagination } from "./pagination.js";
import {
  checkEmailValid,
  checkContactValid,
  sendOtpHandler,
  checkOTP,
} from "./service.js";
import { toast } from "./toast.js";

import {
  displayInputError,
  displayInputSuccess,
  validateAddress,
  validateBaseCharge,
  validateWebsite,
  disableElements,
  enableElements,
  hideElement,
  readOnlyElements,
  removeInputError,
  removeInputSuccess,
  removeReadOnlyElements,
  showElement,
  validateName,
  validatePassword,
} from "./util.js";

const invalidFieldMessages = [
  "Invalid captcha",
  "Invalid name",
  "Invalid email",
  "Invalid password",
  "Invalid contact",
  "Invalid address",
  "Invalid website",
  "Invalid base Charge",
];

const fullName = document.querySelector("#full_name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const contact = document.querySelector("#contact");
const sendOtpBtn = document.querySelector("#send_otp_btn");
const editContactBtn = document.querySelector("#edit_contact_btn");
const loadingOtpBtn = document.querySelector("#load_otp_btn");
const otpContainer = document.querySelector("#otp_container");
const otpFields = Array.from(document.querySelectorAll("input[name='otp']"));
const verifyOtpBtn = document.querySelector("#verify_otp_btn");

const address = document.querySelector("#address");
const website = document.querySelector("#website");
const baseCharge = document.querySelector("#base_charge");
const allFields = Array.from(document.querySelectorAll(".fld"));
const signUpForm = document.querySelector("#signup_form");

(function () {
  new Pagination({
    parentElement: document.getElementById("formWrapper"),
  });

  const errorMessage = new URLSearchParams(window.location.search).get(
    "error_message"
  );
  if (!errorMessage) return;
  errorMessage
    .split("")
    .map((num) => +num)
    .forEach((id) => {
      if (invalidFieldMessages[id]) {
        toast.error(invalidFieldMessages[id]);
      }
    });
})();

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let flag = true;

  for (let i = 0; i < allFields.length; i++) {
    const next = allFields[i];
    console.log(next);
    if (next != null && !next.classList.contains("border-success")) {
      if (next === website && website.value === "") continue;
      flag = false;
      toast.error(invalidFieldMessages[i + 1]);
      displayInputError(next);
    }
  }

  if (flag) {
    signUpForm.submit();
  }
});

baseCharge.addEventListener("change", () => {
  const isValid = validateBaseCharge(baseCharge.value);
  if (isValid) {
    displayInputSuccess(baseCharge);
  } else {
    toast.error(invalidFieldMessages[7]);
    displayInputError(baseCharge);
  }
});

website.addEventListener("blur", () => {
  if (website.value === "") {
    removeInputError(website);
    return;
  }
  const isValid = validateWebsite(website.value);
  if (website.value === "" || isValid) {
    displayInputSuccess(website);
  } else {
    toast.error(invalidFieldMessages[6]);
    displayInputError(website);
  }
});

address.addEventListener("blur", () => {
  const isValid = validateAddress(address.value);
  if (isValid) {
    displayInputSuccess(address);
  } else {
    toast.error(invalidFieldMessages[5]);
    displayInputError(address);
  }
});

verifyOtpBtn?.addEventListener("click", async () => {
  const otpValue = otpFields.map((otp) => otp.value).join("");
  if (otpValue.trim().length < 6) return;

  try {
    const serverResponse = await checkOTP(otpValue);
    if (serverResponse === "1") {
      toast.error("Invalid OTP");
      document.querySelector("#otp-1").focus();
    } else if (serverResponse === "2") {
      throw new Error("Session Expired");
    } else if (serverResponse === "3") {
      otpContainer.remove();
      verifyOtpBtn.remove();
      sendOtpBtn.remove();
      editContactBtn.remove();
      loadingOtpBtn.remove();
      displayInputSuccess(contact);
      toast.success("Number verified successfully");
    } else {
      toast.warning(serverResponse);
    }
  } catch (err) {
    toast.error(err.message);
    hideElement(otpContainer);
    hideElement(editContactBtn);
    hideElement(verifyOtpBtn);
    showElement(sendOtpBtn);
  }
});

otpFields?.forEach((otp) => {
  otp.addEventListener("input", (e) => {
    const allFilled = otpFields.every((next) => next.value !== "");
    if (allFilled) showElement(verifyOtpBtn);
    else hideElement(verifyOtpBtn);
    const currId = +e.target.getAttribute("id").slice(-1);
    const nextTarget = document.querySelector(
      `#otp-${Math.min(currId + 1, 6)}`
    );

    if (currId === 6 && e.target.value !== "") verifyOtpBtn.focus();

    if (currId < 6 && nextTarget && e.target.value !== "") nextTarget.focus();
  });
});

editContactBtn?.addEventListener("click", () => {
  removeReadOnlyElements(contact);
  hideElement(otpContainer);
  hideElement(editContactBtn);
  showElement(sendOtpBtn);
  hideElement(verifyOtpBtn);
});

sendOtpBtn?.addEventListener("click", async () => {
  const response = await checkContactValid(contact.value);
  contactInvalid(response);
  if (!response || response === "Invalid Contact") return;
  hideElement(sendOtpBtn);
  showElement(loadingOtpBtn);
  setTimeout(async () => {
    try {
      const otpResponse = await sendOtpHandler(contact.value);
      if (otpResponse === true) {
        toast.success(`OTP sent to ${contact.value}`);
        hideElement(sendOtpBtn);
        hideElement(loadingOtpBtn);
        showElement(editContactBtn);
        showElement(otpContainer);
        otpFields.forEach((otp) => (otp.value = ""));
        readOnlyElements(contact);
      } else {
        throw new Error("An error occured");
      }
    } catch (err) {
      enableElements(sendOtpBtn);
      removeReadOnlyElements(contact);
      hideElement(loadingOtpBtn);
      showElement(sendOtpBtn);
      toast.error(err.message);
    }
  }, 500);
});

const contactInvalid = (response) => {
  if (response === "Invalid Contact") {
    toast.error(invalidFieldMessages[4]);
    displayInputError(contact);
    disableElements(sendOtpBtn);
  } else if (response === true) {
    enableElements(sendOtpBtn);
    removeInputError(contact);
  } else {
    toast.error("Duplicate Contact");
    disableElements(sendOtpBtn);
  }
};

contact.addEventListener("blur", async () => {
  if (contact.readOnly) return;
  removeInputSuccess(contact);
  try {
    const response = await checkContactValid(contact.value);
    contactInvalid(response);
  } catch (err) {
    toast.error(err.message);
  }
});

password.addEventListener("blur", () => {
  const isValid = validatePassword(password.value);
  if (isValid) {
    displayInputSuccess(password);
  } else {
    toast.error(invalidFieldMessages[3]);
    displayInputError(password);
  }
});

email.addEventListener("blur", async () => {
  try {
    const response = await checkEmailValid(email.value);

    if (response === "Invalid Email") {
      toast.error(invalidFieldMessages[2]);
      displayInputError(email);
    }
    if (response === true) {
      displayInputSuccess(email);
    } else if (response === false) {
      toast.error("Duplicate Email");
      displayInputError(email);
    }
  } catch (err) {
    toast.error(err.message);
  }
});

fullName.addEventListener("blur", () => {
  const response = validateName(fullName.value);
  if (response) {
    displayInputSuccess(fullName);
  } else {
    toast.error(invalidFieldMessages[1]);
    displayInputError(fullName);
  }
});
