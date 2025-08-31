import {
  createURLParams,
  validateContact,
  validateEmail,
  displayInputSuccess,
  displayInputError,
} from "./util.js";
import { toast } from "./toast.js";

export const checkEmailExist = async (value) => {
  const res = await fetch(`check_email_exist.do`, {
    method: "POST",
    body: createURLParams({
      email: value,
    }),
  });
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

const checkUniqueEmailRequest = async (value) => {
  const res = await fetch(`check_unique_email.do?email=${value}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim() === "true";
};

const checkUniqueContactRequest = async (value) => {
  const res = await fetch(`check_unique_contact.do?contact=${value}`);
  if (!res.ok) throw new Error("Interval server error");

  const data = await res.text();
  return data.trim() === "true";
};

const sendOtpRequest = async (value) => {
  const res = await fetch(`send_otp.do?contact=${value}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim() === "true";
};

const signUpRequest = async (value) => {
  const urlParams = createURLParams(value);
  const res = await fetch("signup.do", {
    method: "POST",
    body: urlParams,
  });
  if (!res.ok) throw new Error("Internal server error");
  return await res.text();
};

export const signupUser = async (value) => {
  let result = "";
  try {
    result = await signUpRequest(value);
  } catch (err) {
    throw new Error(err);
  }
  return result.trim();
};

const verifyOTPRequest = async (value) => {
  const res = await fetch(`verify_otp.do?otp=${value}`);
  if (!res.ok) throw new Error("Interval server error");
  const data = await res.text();
  return data.trim();
};

export const checkOTP = async (value) => {
  const isOTPValid = value.trim().length === 6;
  if (!isOTPValid) return "Invalid OTP";

  let result = "";
  try {
    result = await verifyOTPRequest(value);
  } catch (err) {
    throw new Error(err);
  }
  return result.trim();
};

export const sendOtpHandler = async (value) => {
  const isRegexValid = validateContact(value);
  if (!isRegexValid) return "Invalid contact";

  let result = false;
  try {
    result = await sendOtpRequest(value);
  } catch (err) {
    throw new Error(err);
  }
  return result;
};

export const checkContactValid = async (value) => {
  const isRegexValid = validateContact(value);
  if (!isRegexValid) return "Invalid Contact";

  let result = false;
  try {
    result = await checkUniqueContactRequest(value);
  } catch (err) {
    throw new Error(err);
  }
  return result;
};

export const checkEmailValid = async (value) => {
  const isRegexValid = validateEmail(value);
  if (!isRegexValid) return "Invalid Email";

  let result = false;
  try {
    result = await checkUniqueEmailRequest(value);
  } catch (err) {
    throw new Error(err);
  }
  return result;
};

export const emailHandler = async (e) => {
  try {
    const response = await checkEmailValid(e.target.value);

    if (response === "Invalid Email") {
      toast.error("Invalid Email");
      displayInputError(e.target);
    }
    if (response === true) {
      displayInputSuccess(e.target);
    } else if (response === false) {
      toast.error("Email already in use");
      displayInputError(e.target);
    }
  } catch (err) {
    toast.error(err.message);
  }
};
