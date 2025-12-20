import { toast } from "./toast.js";

export const validateName = (value) => {
  const regex = /^[A-Za-z .-]{6,75}$/;
  return regex.test(value.trim());
};

export const validateEmail = (value) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(value.trim());
};

export const validatePassword = (value) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(value.trim());
};

export const validateContact = (value) => {
  const regex = /^[6-9][0-9]{9}$/;
  return regex.test(value.trim());
};

export const validateBusNumber = (value) => {
  const regex = /^[A-Z]{2}\d{1,2}\s?[A-Z]{1,2}\s?\d{1,4}$/;
  return regex.test(value);
};

export const validateUserAge = (value) => {
  const birthDate = new Date(value);
  if (!birthDate) return false;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 16;
};

export const validateFileType = (type, targetType) => {
  if (!type) return false;
  const fileType = type.substring(0, type.indexOf("/"));
  return fileType === targetType;
};

export const validateFileSize = (size) => {
  if (isNaN(size)) return false;

  return size <= 5 * 1024 * 1024; // 5MB
};

export const validateAddress = (value) => {
  const regex = /^[a-zA-Z0-9\s,.'\-/#]{5,100}$/;

  return regex.test(value.trim());
};

export const validateWebsite = (value) => {
  const regex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;

  return regex.test(value.trim());
};

export const validateBaseCharge = (value) => {
  return value >= 0 && value <= 200;
};

export const displayInputError = (element) => {
  removeInputSuccess(element);
  if (element.classList.contains("border-danger")) return;

  element.classList.add("border-danger");
};

export const removeInputError = (element) => {
  if (!element.classList.contains("border-danger")) return;

  element.classList.remove("border-danger");
};

export const displayInputSuccess = (element) => {
  removeInputError(element);
  if (element.classList.contains("border-success")) return;

  element.classList.add("border-success");
};

export const removeInputSuccess = (element) => {
  if (!element.classList.contains("border-success")) return;

  element.classList.remove("border-success");
};

export const displayInputValid = (element) => {
  removeInputError(element);
  displayInputSuccess(element);
};

export const removeInputValid = (element) => {
  displayInputError(element);
  removeInputSuccess(element);
};

export const hideElement = (element) => {
  if (element.classList.contains("d-none")) return;

  if (element.classList.contains("d-block")) {
    element.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("d-none");
  }
};

export const showElement = (element) => {
  if (!element.classList.contains("d-none")) return;
  element.classList.replace("d-none", "d-block");
};

export const createURLParams = (params) => {
  return new URLSearchParams(params);
};

export const disableElements = (...elements) => {
  elements.forEach((next) => (next.disabled = true));
};

export const enableElements = (...elements) => {
  elements.forEach((next) => (next.disabled = false));
};

export const readOnlyElements = (...elements) => {
  elements.forEach((next) => (next.readOnly = true));
};

export const removeReadOnlyElements = (...elements) => {
  elements.forEach((next) => (next.readOnly = false));
};

export const fileUpload = (element, previewElement) => {
  const [file] = element.target.files;
  const isFileSizeValid = validateFileSize(file.size);
  const isFileTypeValid = validateFileType(file.type, "image");

  if (!file || !isFileSizeValid || !isFileTypeValid) {
    toast.error("Upload file should be an Image and not be greater than 5MB");
    element.target.value = "";
    previewElement.removeAttribute("src");
    displayInputError(element.target);
    return;
  }
  displayInputSuccess(element.target);
  previewElement.src = URL.createObjectURL(file);
};

export const manufacturerHandler = (e) => {
  const manufacturer = e.target.value;
  const element = e.target;

  if (!manufacturer || manufacturer <= 0) {
    displayInputError(element);
  } else {
    displayInputSuccess(element);
  }
};

export const genderHandler = (e) => {
  const value = e.target.value;
  const isValid = !isNaN(value) && value > 0 && value < 3;
  if (isValid) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Gender not valid");
    displayInputError(e.target);
  }
};

export const addressHandler = (e) => {
  const isValid = validateAddress(e.target.value);
  if (isValid) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Invalid address");
    displayInputError(e.target);
  }
};

export const websiteHandler = (e) => {
  if (e.target.value === "") {
    removeInputError(e.target);
    return;
  }
  const isValid = validateWebsite(e.target.value);
  if (e.target.value === "" || isValid) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Invalid website");
    displayInputError(e.target);
  }
};

export const baseChargeHandler = (e) => {
  const isValid = validateBaseCharge(e.target.value);
  if (isValid) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Invalid Base charge");
    displayInputError(e.target);
  }
};
export const dobHandler = (e) => {
  const isValid = validateUserAge(e.target.value);
  if (isValid) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Age should be greater than 16");
    displayInputError(e.target);
  }
};

export const passwordHandler = (e) => {
  const isValid = validatePassword(e.target.value);
  if (isValid) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Invalid Password");
    displayInputError(e.target);
  }
};

export const nameHandler = (e) => {
  const response = validateName(e.target.value);
  if (response) {
    displayInputSuccess(e.target);
  } else {
    toast.error("Invalid Name");
    displayInputError(e.target);
  }
};

export const validateCharge = (element) => {
  const value = +element.value;
  const isValid = value > 0 && value <= 100;
  if (isValid) {
    displayInputSuccess(element);
  } else {
    displayInputError(element);
  }
  return isValid;
};

export const getFormatedDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  return hours === 0 ? `${mins} mins` : `${hours}h ${mins}mins`;
};

export const validateLicenceNumber = (value) => {
  const regex = /^[A-Z]{2}\d{2}[-\s]?\d{4}\d{7}$/;
  return regex.test(value);
};

export const getFormattedTime = (time) => {
  const a = time.slice(0, 5);
  const b = time.slice(-2);
  return a + " " + b;
};

export const getSplittedTime = (timeString) => {
  if (timeString.includes("AM") || timeString.includes("PM")) {
    const [time, modifier] = timeString.split(" ");
    const [hours, minutes, seconds] = time.split(":");

    let hour = parseInt(hours, 10);

    if (modifier === "PM" && hour < 12) {
      hour += 12;
    } else if (modifier === "AM" && hour === 12) {
      hour = 0;
    }

    return [hour, parseInt(minutes, 10), parseInt(seconds, 10), modifier];
  } else {
    const split = timeString.split(":");
    return [+split[0], +split[1], +split[2], ""];
  }
};

export const toMinutes = (time12) => {
  const [time, meridian] = time12.split(" ");
  let [h, m, s] = time.split(":").map(Number);

  if (meridian === "PM" && h !== 12) h += 12;
  if (meridian === "AM" && h === 12) h = 0;

  return h * 60 + m;
};

export const formateTime = (date) => {
  const time = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return time;
};

export const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes, seconds] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
};
