import { OTPHandler } from "./otpHandler.js";
import { Pagination } from "./pagination.js";
import { toast } from "./toast.js";
import {
  createURLParams,
  showElement,
  displayInputSuccess,
  displayInputValid,
  hideElement,
  removeInputError,
  removeInputSuccess,
  removeInputValid,
  validateContact,
  validateEmail,
  validateName,
  validatePassword,
} from "./util.js";

const signUpForm = document.querySelector("#signup_form");

const fullName = document.querySelector("#full_name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const contact = document.querySelector("#contact");
const otp = document.querySelectorAll("input[name='otp']");
const otpContainer = document.querySelector("#otp_container");
const sendOTPBtn = document.querySelector("#send_otp_btn");
const editContactBtn = document.querySelector("#edit_contact_btn");
const verifyOTPBtn = document.querySelector("#verify_otp_btn");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

const checkDuplicateEmailRequest = async () => {
  const queryParams = createURLParams({
    email: email.value,
  });

  const response = await fetch(
    "check_duplicate_email.do?" + queryParams.toString()
  );
  if (!response.ok) throw new Error("Server Problem");
  const data = await response.text();
  return data === "true";
};

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(Object.fromEntries(new FormData(signUpForm)));
});

new OTPHandler(
  "#send_otp_btn",
  "#edit_contact_btn",
  "#verify_otp_btn",
  "#otp_container",
  "input[name='otp']",
  "#contact",
  "#load_otp_btn"
);

password.addEventListener("blur", () => {
  const isValid = validatePassword(password.value);

  if (isValid) {
    displayInputSuccess(password);
  } else {
    removeInputSuccess(password);
    toast.error("Invalid Password");
  }
});

email.addEventListener("blur", () => {
  const isValidEmail = validateEmail(email.value);

  if (isValidEmail) {
    checkDuplicateEmailRequest()
      .then((data) => {
        if (!data) displayInputValid(email);
        else {
          removeInputValid(email);
          toast.error("Duplicate Email");
        }
      })
      .catch((err) => {
        removeInputValid(email);
        toast.error("Server Problem");
      });
  } else {
    removeInputValid(email);
    toast.error("Invalid Email");
  }
});

fullName.addEventListener("blur", () => {
  const isValid = validateName(fullName.value);

  if (isValid) {
    displayInputValid(fullName);
  } else {
    removeInputValid(fullName);
    toast.error("Invalid Full Name");
  }
});

const formPaginationInitialize = () => {
  new Pagination({
    parentElement: document.getElementById("formWrapper"),
  });
};

password.addEventListener("focus", () => {
  removeInputError(password);
});

email.addEventListener("focus", () => {
  removeInputError(email);
});

fullName.addEventListener("focus", () => {
  removeInputError(fullName);
});

formPaginationInitialize();
