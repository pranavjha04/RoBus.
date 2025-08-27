import { validateContact, validateEmail } from "./util.js";

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
