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

// ----------- ACCOUNT ESSENTIALS ---------------
const fullName = document.querySelector("#full_name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const contact = document.querySelector("#contact");

// ----------- OTP -----------------
const otp = document.querySelectorAll("input[name='otp']");
const otpContainer = document.querySelector("#otp_container");
const sendOTPBtn = document.querySelector("#send_otp_btn");
const editContactBtn = document.querySelector("#edit_contact_btn");
const loadingBtn = document.querySelector("#load_otp_btn");
const verifyOTPBtn = document.querySelector("#verify_otp_btn");
const accountType = +window.location.search.slice(-1);

const validateUser = () => {
  // USER ESSENTIALS FIELDS;
  const dob = document.querySelector("#dob");
  const gender = document.querySelector("#gender");
  const profilePic = document.querySelector("#profile_pic");

  
};

const validateOperator = () => {};

// **********************  ACCOUNT ESSENTIALS VERIFICATION  *********************************
const sendOTPRequest = async () => {
  const queryParams = createURLParams({
    contact: contact.value,
  });
  const response = await fetch("send_otp.do?" + queryParams.toString());
  if (!response.ok) throw new Error("Servler Problem");
  const data = await response.text();
  return data === "true";
};

const verifyOTPRequest = async () => {
  const queryParams = createURLParams({
    otp: Array.from(otp)
      .map((next) => next.value)
      .join(""),
  });
  console.log(queryParams.get("otp"));
  const response = await fetch("verify_otp.do?" + queryParams.toString());
  if (!response.ok) throw new Error("Servler Problem");
  const data = await response.text();
  return +data;
};

const otpEvent = (otp) => {
  if (otp.value === "") return;

  const currId = +otp.getAttribute("id").slice(-1);
  const nextTarget = Math.min(currId + 1, 6);
  const nextElement = document.querySelector(`#otp-${nextTarget}`);

  if (nextElement) {
    nextElement.focus();
    setTimeout(() => {
      nextElement.select();
    }, 0);
  }
};

otp.forEach((next) => {
  next.addEventListener("input", () => {
    const allFilled = Array.from(otp).every((el) => el.value.trim() !== "");

    if (allFilled) {
      showElement(verifyOTPBtn);
    } else {
      hideElement(verifyOTPBtn);
    }
    otpEvent(next);
  });
});

const otpTryAgain = () => {
  otp.forEach((next) => {
    next.classList.remove("border-danger");
    next.value = "";
    next.disabled = false;
  });
  editContactBtn.disabled = false;
  verifyOTPBtn.disabled = false;
  hideElement(verifyOTPBtn);
};

verifyOTPBtn.addEventListener("click", () => {
  otp.forEach((next) => {
    next.classList.remove("border-success", "border-danger");
    next.disabled = true;
  });
  verifyOTPBtn.disabled = true;
  editContactBtn.disabled = true;

  setTimeout(() => {
    verifyOTPRequest()
      .then((data) => {
        if (data == 1) {
          // SERVER GYA
          throw new Error();
        }
        if (data == 2) {
          // OTP MISMATCHED
          toast.error("OTP Mismatched. Please try Again");
          otpTryAgain();
        }
        if (data == 3) {
          // OTP MATCHED
          otp.forEach((next) => {
            next.classList.add("border-success");
            next.classList.disabled = true;
          });
          hideElement(verifyOTPBtn);
          hideElement(otpContainer);
          hideElement(editContactBtn);
          displayInputValid(contact);
          toast.success(`${contact.value} Verified`);
        }
        verifyOTPBtn.disabled = false;
      })
      .catch((err) => {
        // SESSION EXPIRED
        toast.error("Session Expired Please try again!!!");
        console.log("Hel");
        otpTryAgain();
        hideElement(otpContainer);
        hideElement(editContactBtn);
        showElement(sendOTPBtn);
      });
  }, 1000);
});

editContactBtn.addEventListener("click", () => {
  contact.disabled = false;
  hideElement(editContactBtn);
  hideElement(otpContainer);
  hideElement(verifyOTPBtn);
  showElement(sendOTPBtn);
  contact.focus();
});

sendOTPBtn.addEventListener("click", () => {
  if (editContactBtn.classList.contains("d-block")) contact.disabled = true;
  contact.disabled = true;
  if (!validateContact(contact.value)) {
    hideElement(sendOTPBtn);
    return;
  }

  hideElement(sendOTPBtn);
  showElement(loadingBtn);
  otp.forEach((next) => {
    next.classList.remove("border-success");
    next.classList.disabled = false;
    next.value = "";
  });

  setTimeout(() => {
    sendOTPRequest()
      .then((data) => {
        if (data === true) {
          toast.success(`OTP Sent Successfully to ${contact.value}`);
          document.querySelector("#otp-1").focus();
          showElement(editContactBtn);
          showElement(otpContainer);
          hideElement(loadingBtn);
        } else {
          showElement(sendOTPBtn);
          hideElement(loadingBtn);
          toast.error("Invalid Contact");
        }
      })
      .catch((err) => {
        showElement(sendOTPBtn);
        hideElement(loadingBtn);
        toast.error("Server Problem");
      });
  }, 1000);
});

contact.addEventListener("input", () => {
  const isValid = validateContact(contact.value);
  if (isValid) sendOTPBtn.disabled = false;
});

contact.addEventListener("blur", () => {
  const isValid = validateContact(contact.value);
  if (isValid) {
    contact.disabled = true;
    sendOTPBtn.disabled = false;
    showElement(sendOTPBtn);
  } else {
    sendOTPBtn.disabled = true;
    removeInputSuccess(contact);
    toast.error("Invalid contact");
  }
});

password.addEventListener("blur", () => {
  const isValid = validatePassword(password.value);

  if (isValid) {
    displayInputSuccess(password);
  } else {
    removeInputSuccess(password);
    toast.error("Invalid Password");
  }
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

if (accountType === 1) {
  validateUser();
}
if (accountType === 2) {
  validateOperator();
}
