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
