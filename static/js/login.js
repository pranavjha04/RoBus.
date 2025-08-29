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
  const signUpSuccess = urlParams?.get("success");
  if (signUpSuccess) {
    toast.success("Account Created Successfully");
    return;
  }

  const errorMessage = urlParams?.get("error_message");
  if (errorMessage) {
    errorMessage
      .split("")
      .map((num) => num - 1)
      .forEach((num) => {
        toast.error(invalidFieldMessages[num]);
      });
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
