import { Pagination } from "./pagination.js";
import {
  checkEmailValid,
  checkContactValid,
  sendOtpHandler,
  checkOTP,
} from "./service.js";
import {
  disableElements,
  displayInputError,
  displayInputSuccess,
  enableElements,
  hideElement,
  readOnlyElements,
  removeInputError,
  removeReadOnlyElements,
  showElement,
  validateName,
  validatePassword,
  validateUserAge,
} from "./util.js";

import { toast } from "./toast.js";

(function () {
  new Pagination({
    parentElement: document.getElementById("formWrapper"),
  });
})();

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

const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");

const signUpForm = document.querySelector("#signup_form");
const submitBtn = document.querySelector("#submit_form_btn");

const allFields = document.querySelectorAll(".fld");
const invalidFieldMessages = [
  "Invalid name",
  "Invalid email",
  "Invalid password",
  "Invalid contact",
  "Invalid date of birth",
  "Invalid gender",
];

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let flag = true;
  allFields.forEach((next, i) => {
    if (!next.classList.contains("border-success")) {
      flag = false;
      toast.error(invalidFieldMessages[i]);
      displayInputError(next);
    }
  });

  if (flag) {
  }
});

gender.addEventListener("change", (e) => {
  const value = e.target.value;
  const isValid = !isNaN(value) && value > 0 && value < 3;
  if (isValid) {
    displayInputSuccess(gender);
  } else {
    displayInputError(gender);
  }
});

dob.addEventListener("blur", () => {
  const isValid = validateUserAge(dob.value);
  if (isValid) {
    displayInputSuccess(dob);
  } else {
    displayInputError(dob);
  }
});

verifyOtpBtn.addEventListener("click", async () => {
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

otpFields.forEach((otp) => {
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

editContactBtn.addEventListener("click", () => {
  removeReadOnlyElements(contact);
  hideElement(otpContainer);
  hideElement(editContactBtn);
  showElement(sendOtpBtn);
  hideElement(verifyOtpBtn);
});

sendOtpBtn.addEventListener("click", async () => {
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
    displayInputError(contact);
    disableElements(sendOtpBtn);
  }
  if (response === true) {
    enableElements(sendOtpBtn);
    removeInputError(contact);
  } else {
    disableElements(sendOtpBtn);
  }
};

contact.addEventListener("blur", async () => {
  if (contact.readOnly) return;
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
    displayInputError(password);
  }
});

email.addEventListener("blur", async () => {
  try {
    const response = await checkEmailValid(email.value);

    if (response === "Invalid Email") {
      displayInputError(email);
    }
    if (response === true) {
      displayInputSuccess(email);
    } else {
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
    displayInputError(fullName);
  }
});
