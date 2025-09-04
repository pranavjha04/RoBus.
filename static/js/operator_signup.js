import { OTPHandler } from "./otpHandler.js";
import { Pagination } from "./pagination.js";
import { signupEmailHandler } from "./service.js";
import { toast } from "./toast.js";

import {
  displayInputError,
  fileUpload,
  nameHandler,
  passwordHandler,
  addressHandler,
  websiteHandler,
  baseChargeHandler,
} from "./util.js";

const invalidFieldMessages = [
  "captcha", // 0
  "name", // 1
  "email", // 2
  "password", // 3
  "contact", // 4
  "address", // 5
  "website", // 6
  "base Charge", // 7
  "certificate file", // 8
  "logo file", // 9
  "banner file", // 10
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

const certificate = document.querySelector("#certificate");
const logo = document.querySelector("#logo");
const banner = document.querySelector("#banner");

const certificatePreview = document.querySelector("#certificate_preview");
const logoPreview = document.querySelector("#logo_preview");
const bannerPreview = document.querySelector("#banner_preview");

const allFields = Array.from(document.querySelectorAll(".fld"));
const signUpForm = document.querySelector("#signup_form");

(function () {
  new Pagination({
    parentElement: document.getElementById("formWrapper"),
  });
  const urlParams = new URLSearchParams(window.location.search);
  const blankForm = urlParams.get("blank_form");
  const invalidReq = urlParams.get("server_invalid");
  if (blankForm && blankForm === "true") {
    toast.error("Empty Form");
    return;
  }
  if (invalidReq && invalidReq === "true") {
    toast.error("Internal Server error");
    return;
  }
  let errorMessage = urlParams.get("error_message");
  if (errorMessage && errorMessage.length > 0) {
    errorMessage = errorMessage.slice(1);
  }
  if (!errorMessage) return;
  errorMessage = errorMessage.split(",");
  console.log(errorMessage);
  if (errorMessage.length > 1) {
    errorMessage.pop();
  }

  let message =
    "Invalid " +
    errorMessage.map((num) => invalidFieldMessages[+num]).join(", ");

  toast.error(message);
})();

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let flag = true;
  let error = "Invalid ";
  for (let i = 0; i < allFields.length; i++) {
    const next = allFields[i];
    if (next != null && !next.classList.contains("border-success")) {
      if (next === website && website.value === "") continue;
      flag = false;
      error += invalidFieldMessages[i + 1] + ", ";
      displayInputError(next);
    }
  }
  if (!flag) {
    toast.error(error);
  }

  if (flag) {
    signUpForm.submit();
  }
});

banner.addEventListener("change", (e) => {
  fileUpload(e, bannerPreview);
});

logo.addEventListener("change", (e) => {
  fileUpload(e, logoPreview);
});

certificate.addEventListener("change", (e) => {
  fileUpload(e, certificatePreview);
});

baseCharge.addEventListener("change", baseChargeHandler);
website.addEventListener("blur", websiteHandler);
address.addEventListener("blur", addressHandler);

new OTPHandler(
  contact,
  sendOtpBtn,
  loadingOtpBtn,
  verifyOtpBtn,
  editContactBtn,
  otpContainer,
  otpFields
);

password.addEventListener("blur", passwordHandler);
email.addEventListener("blur", signupEmailHandler);
fullName.addEventListener("blur", nameHandler);
