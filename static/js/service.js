import {
  createURLParams,
  validateContact,
  validateEmail,
  displayInputSuccess,
  displayInputError,
  validateBusNumber,
  removeInputSuccess,
} from "./util.js";
import { toast } from "./toast.js";

const checkEmailExistRequest = async (email) => {
  const res = await fetch(`check_email_exist.do?email=${email}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

export const checkContactExistRequest = async (contact) => {
  const res = await fetch(`check_contact_exist.do?contact=${contact}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

export const checkUniqueBusNumberRequest = async (value) => {
  const res = await fetch(`check_unique_bus_number.do?bus_number=${value}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
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

export const signupEmailHandler = async (e) => {
  const email = e.target.value;
  const element = e.target;
  const isRegexValid = validateEmail(email);

  if (!isRegexValid) {
    toast.error("Please enter valid mail");
    displayInputError(element);
    return;
  }


  try {
    const response = await checkEmailExistRequest(email);

    switch (response) {
      case "true": {
        throw new Error("Email already in use");
      }
      case "false": {
        displayInputSuccess(element);
        break;
      }
      case "Invalid": {
        throw new Error("Invalid email");
      }
      default: {
        throw new Error("Internal server error");
      }
    }
  } catch (err) {
    toast.error(err.message);
    displayInputError(element);
  }
};

export const loginEmailHandler = async (e) => {
  const email = e.target.value;
  const element = e.target;
  const isRegexValid = validateEmail(email);

  if (!isRegexValid) {
    toast.error("Please enter valid mail");
    displayInputError(element);
    return;
  }

  try {
    const response = await checkEmailExistRequest(email);

    switch (response) {
      case "true": {
        displayInputSuccess(element);
        break;
      }
      case "false": {
        throw new Error("No account found with this email address");
      }
      case "Invalid": {
        throw new Error("Invalid email");
      }
      default: {
        throw new Error("Internal server error");
      }
    }
  } catch (err) {
    toast.error(err.message);
    displayInputError(element);
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
