import { Pagination } from "./pagination.js";
import { emailHandler } from "./service.js";
import {
  displayInputError,
  dobHandler,
  genderHandler,
  nameHandler,
  passwordHandler,
} from "./util.js";

import { toast } from "./toast.js";
import { OTPHandler } from "./otpHandler.js";

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
const allFields = Array.from(document.querySelectorAll(".fld"));

const invalidFieldMessages = [
  "Invalid captcha",
  "Invalid name",
  "Invalid email",
  "Invalid password",
  "Invalid contact",
  "Invalid date of birth",
  "Invalid gender",
];

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

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let flag = true;
  for (let i = 0; i < allFields.length; i++) {
    const next = allFields[i];
    console.log(next);
    if (next != null && !next.classList.contains("border-success")) {
      flag = false;
      toast.error(invalidFieldMessages[i + 1]);
      displayInputError(next);
    }
  }
  if (flag) {
    signUpForm.submit();
  }
});

gender.addEventListener("change", genderHandler);
dob.addEventListener("blur", dobHandler);

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
email.addEventListener("blur", emailHandler);
fullName.addEventListener("blur", nameHandler);
