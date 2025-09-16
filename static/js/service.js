import {
  validateContact,
  validateEmail,
  displayInputSuccess,
  displayInputError,
  validateBusNumber,
  createURLParams,
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

export const checkBusNumberExistRequest = async (busNumber) => {
  const res = await fetch(`check_bus_number_exist.do?bus_number=${busNumber}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

export const collectFareFactorRequest = async (onlyFactors = true) => {
  const res = await fetch(`get_fare_factor.do?onlyFactors=${onlyFactors}`);
  if (!res.ok) throw new Error("Internal server error");
  const data = await res.text();
  return data.trim();
};

export const collectBusRecordRequest = async (allRecord = false) => {
  const queryParams = createURLParams({
    allRecord,
  });
  console.log(queryParams.toString());
  const res = await fetch(`get_bus.do?${queryParams.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    console.log("hello");
    throw new Error("Internal server error");
  }

  const data = await res.text();
  return data.trim();
};

export const getActiveAccountID = async (accountType) => {
  const res = await fetch(`get_active_account.do?accountType=${accountType}`);
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

export const updateFareFactorChargeRequest = async (
  charge,
  operatorTicketFareId
) => {
  const res = await fetch(
    `update_fare_factor_charge.do?charge=${charge}&operator_ticket_fare_id=${operatorTicketFareId}`
  );
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

export const deleteFareFactorRequest = async (operatorTicketFareId) => {
  const res = await fetch(
    `delete_fare_factor.do?operator_ticket_fare_id=${operatorTicketFareId}`
  );
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};

export const collectSeatingRecordRequest = async (busId) => {
  const queryParams = createURLParams({
    bus_id: busId,
  });
  console.log(queryParams.toString());
  const res = await fetch(`get_seating.do?${queryParams.toString()}`, {
    method: "GET",
  });

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

export const busNumberHandler = async (e) => {
  const busNumber = e.target.value.toString().toUpperCase();
  e.target.value = busNumber;
  const element = e.target;

  const isRegexValid = validateBusNumber(busNumber);
  if (!isRegexValid) {
    toast.error("Invalid bus number");
    displayInputError(element);
    return;
  }

  try {
    const response = await checkBusNumberExistRequest(busNumber);

    switch (response) {
      case "Invalid": {
        throw new Error("Invalid bus number");
      }
      case "true": {
        throw new Error("Bus number already registered");
      }
      case "false": {
        displayInputSuccess(element);
      }
    }
  } catch (err) {
    toast.error(err.message);
    displayInputError(element);
  }
};

export const handleAddFareFactor = async (charge, fareFactorId) => {
  console.log(charge, fareFactorId);
  const res = await fetch(
    `add_operator_ticket_fare.do?charge=${charge}&fare_factor_id=${fareFactorId}`
  );
  if (!res.ok) throw new Error("Internal server error");

  const data = await res.text();
  return data.trim();
};
