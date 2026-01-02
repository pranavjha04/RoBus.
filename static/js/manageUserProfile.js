import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { getActiveUserRequest } from "./service.js";
import { toast } from "./toast.js";
import { validateDOB, validateName } from "./util.js";

const nameContainer = document.querySelector("#name_container");
const dobContainer = document.querySelector("#dob_container");
const genderContainer = document.querySelector("#gender_container");
const securityInfoContainer = document.querySelector(
  "#security_info_container"
);
const editProfileBtn = document.querySelector("#edit_profile_btn");
const undoChangesBtn = document.querySelector("#undo_changes_btn");
const saveChangesBtn = document.querySelector("#save_changes_btn");

const fullName = document.querySelector("#full_name");
const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");

const model = {
  user: null,
};

const genderType = {
  1: "Male",
  2: "Female",
  2: "Others",
};

const activeAccountFetching = async () => {
  try {
    const response = await getActiveUserRequest();
    if (response === "invalid") throw new Error(err.message);
    model.user = JSON.parse(response);
  } catch (err) {
    toast.error(err.message);
  }
};

const editModeOn = () => {
  [nameContainer, dobContainer, genderContainer].forEach((node) => {
    node.querySelector(".view")?.classList.add("d-none");
    node.querySelector(".edit")?.classList.remove("d-none");
  });
  editProfileBtn.classList.add("d-none");
  saveChangesBtn.classList.remove("d-none");
  undoChangesBtn.classList.remove("d-none");
};

const editModeOff = () => {
  [nameContainer, dobContainer, genderContainer].forEach((node) => {
    node.querySelector(".view")?.classList.remove("d-none");
    node.querySelector(".edit")?.classList.add("d-none");
  });
  editProfileBtn.classList.remove("d-none");
  saveChangesBtn.classList.add("d-none");
  undoChangesBtn.classList.add("d-none");
};

const displayBasicInfoContainer = () => {
  const { fullName, dob: birthDate, gender } = model.user;
  const dobDate = new Date(birthDate);

  nameContainer.querySelector("#full_name").value = fullName;
  nameContainer.querySelector(".data-value").textContent = fullName;

  dobContainer.querySelector("#dob").value = dobDate
    .toISOString()
    .split("T")[0];

  dobContainer.querySelector(".data-value").textContent =
    new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    }).format(dobDate);

  genderContainer.querySelector("#gender").value = gender;
  genderContainer.querySelector(".data-value").textContent = genderType[gender];
};

editProfileBtn.addEventListener("click", editModeOn);
undoChangesBtn.addEventListener("click", editModeOff);

fullName.addEventListener("blur", (e) => {
  const value = e.target.value;
  const response = validateName(value);
  try {
    if (!response) {
      throw new Error("Invalid Name");
    }
  } catch (err) {
    toast.error(err.message);
    fullName.value = model.user.fullName;
  }
});

dob.addEventListener("blur", (e) => {
  const value = e.target.value;
  try {
    const response = validateDOB(value, 16);
    if (!response) {
      throw new Error("Age must be minimum 16 and maximum 120");
    }
  } catch (err) {
    toast.error(err.message);
    dob.value = new Date(model.user.dob).toISOString().split("T")[0];
  }
});


saveChangesBtn.addEventListener('click', () => {
  
})
const init = async () => {
  try {
    await activeAccountFetching();
    editModeOff();
    displayBasicInfoContainer();
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

init();
