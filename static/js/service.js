import {
  createURLParams,
  validateContact,
  validateEmail,
  displayInputSuccess,
  displayInputError,
  validateBusNumber,
} from "./util.js";
import { toast } from "./toast.js";

const checkUniqueEmailRequest = async (value) => {
  const res = await fetch(`check_unique_email.do?email=${value}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim() === "true";
};

export const checkUniqueBusNumberRequest = async (value) => {
  const res = await fetch(`check_unique_bus_number.do?bus_number=${value}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
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

export const checkBusNumberValid = async (value) => {
  const isRegexValid = validateBusNumber(value);
  if (!isRegexValid) return "Invalid";

  let result = false;
  try {
    result = await checkUniqueBusNumberRequest(value);
  } catch (err) {
    throw new Error(err);
  }
  return result.trim();
};

export const busNumberHandler = async (e) => {
  try {
    const response = await checkBusNumberValid(e.target.value);
    console.log(response);
    if (response === "Invalid") {
      displayInputError(e.target);
    } else if (response === "true" || response === true) {
      displayInputError(e.target);
      toast.error("Number already registered");
    } else if (response === "false") {
      displayInputSuccess(e.target);
    } else {
      throw new Error(response);
    }
  } catch (err) {
    toast.error(err.message);
  }
};
