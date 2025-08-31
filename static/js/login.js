import { checkEmailExist } from "./service.js";
import { toast } from "./toast.js";
import {
  displayInputError,
  displayInputSuccess,
  validateEmail,
  validatePassword,
} from "./util.js";

const invalidFieldMessages = [
  "Invalid email",
  "Invalid password",
  "Wrong password",
  "No Account found",
];

(() => {
  const urlParams = new URLSearchParams(window.location.search);

  const invalidReq = urlParams.get("server_invalid");
  if (invalidReq && invalidReq === "true") {
    toast.error("Internal Server error");
    return;
  }
  const success = urlParams.get("success");
  if (success && success == "true") {
    toast.success("Account created successfully");
    return;
  }

  let errorMessage = urlParams?.get("error_message");
  errorMessage = errorMessage?.split("");
  if (errorMessage && errorMessage?.length > 0) {
    let message =
      "Invalid " +
      errorMessage.map((num) => invalidFieldMessages[+num]).join(", ");

    toast.error(message);
  }
})();

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const forgetPassword = document.querySelector("#forget_password");
const loginForm = document.querySelector("#login_form");

loginForm.addEventListener("click", (e) => {
  e.preventDefault();
  let flag = true;
  flag = email.value !== "" && password.value !== "";

  if (flag) {
    loginForm.submit();
  }
});

password.addEventListener("blur", () => {
  const isValid = validatePassword(password.value);
  if (!isValid) {
    toast.error("Invalid password");
  }
});

email.addEventListener("blur", async () => {
  const isValidEmail = validateEmail(email.value);
  if (!isValidEmail) return;
  try {
    const response = await checkEmailExist(email.value);
    if (response === "Invalid email") {
      toast.error(response);
      displayInputError(email);
    } else if (response === "true") {
      toast.error("No account found with this email address.");
      displayInputError(email);
    } else {
      displayInputSuccess(email);
    }
  } catch (err) {
    toast.error(err.message);
  }
});
