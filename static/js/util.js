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

export const displayInputError = (element) => {
  if (element.classList.contains("border-danger")) return;

  element.classList.add("border-danger");
};

export const removeInputError = (element) => {
  if (!element.classList.contains("border-danger")) return;

  element.classList.remove("border-danger");
};

export const displayInputSuccess = (element) => {
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
