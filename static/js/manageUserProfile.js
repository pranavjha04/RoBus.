import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  getActiveUserRequest,
  updateUserBasicInfoRequest,
  uploadUserProfilePicRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  createURLParams,
  disableElements,
  enableElements,
  validateDOB,
  validateFileSize,
  validateFileType,
  validateName,
} from "./util.js";

const nameContainer = document.querySelector("#name_container");
const dobContainer = document.querySelector("#dob_container");
const genderContainer = document.querySelector("#gender_container");
const securityInfoContainer = document.querySelector(
  "#security_info_container"
);
const editProfileBtn = document.querySelector("#edit_profile_btn");
const undoChangesBtn = document.querySelector("#undo_changes_btn");
const saveChangesBtn = document.querySelector("#save_changes_btn");
const saveProfileChangeBtn = document.querySelector(
  "#save_profile_pic_change_btn"
);
const undoProfileChangeBtn = document.querySelector(
  "#undo_profile_pic_change_btn"
);
const profileImgReciever = document.querySelector("#imgUpload");
const profileImg = document.querySelector("#profile_img");

const fullName = document.querySelector("#full_name");
const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");

const genInfo = document.querySelector(".gen-info");

const model = {
  user: null,
  activeUploadFile: null,
};

const genderType = {
  1: "Male",
  2: "Female",
  3: "Others",
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

const profilePicEditModeOn = () => {
  [saveProfileChangeBtn, undoProfileChangeBtn].forEach((btn) => {
    btn.classList.remove("d-none");
  });
};

const profilePicEditModeOff = () => {
  [saveProfileChangeBtn, undoProfileChangeBtn].forEach((btn) => {
    btn.classList.add("d-none");
  });

  model.activeUploadFile = null;
};

const displayBasicInfoContainer = () => {
  const { fullName, dob: birthDate, gender, createdAt } = model.user;
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

  genInfo.querySelector("#name").textContent = model.user.fullName;
  genInfo.querySelector("#joined_date").textContent = new Intl.DateTimeFormat(
    navigator.language,
    {
      dateStyle: "long",
    }
  ).format(new Date(createdAt));
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

saveChangesBtn.addEventListener("click", async () => {
  if (!validateName(fullName.value) || !validateDOB(dob.value, 16)) {
    toast.error("Invalid Request");
    return;
  }
  let newChange = false;
  newChange =
    fullName.value !== model.user.fullName ||
    dob.value !== new Date(model.user.dob).toISOString().split("T")[0] ||
    model.user.gender !== +gender.value;

  if (!newChange) {
    editModeOff();
    toast.normal("No changes needed");
    return;
  }

  try {
    disableElements(undoChangesBtn, saveChangesBtn, fullName, dob, gender);
    const response = await updateUserBasicInfoRequest(
      createURLParams({
        full_name: fullName.value,
        dob: dob.value,
        gender: +gender.value,
      })
    );
    if (response === "ok") {
      toast.success("Profile Updated successfully");
      await activeAccountFetching();
      displayBasicInfoContainer();
      editModeOff();
    } else if (response === "dob") {
      dob.focus();
      throw new Error("Invalid DOB");
    } else if (response === "full_name") {
      fullName.focus();
      throw new Error("Invalid Full Name");
    } else if (response === "gender") {
      gender.focus();
      throw new Error("Invalid Gender");
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(undoChangesBtn, saveChangesBtn, fullName, dob, gender);
  }
});

profileImgReciever.addEventListener("input", (e) => {
  model.activeUploadFile = null;
  const [file] = [...e.target.files];
  const { user } = model;
  try {
    const isFileValid =
      validateFileSize(file.size) && validateFileType(file.type, "image");
    if (!isFileValid)
      throw new Error(
        "Uploaded file should be an Image and not be greater than 5MB"
      );
    model.activeUploadFile = file;
    profileImg.src = URL.createObjectURL(file);
    profilePicEditModeOn();
  } catch (err) {
    toast.error(err.message);
    profileImg.src = `show_image.do?target=user&id=${user.userId}&name=${user.profilePic}`;
  }
});

undoProfileChangeBtn.addEventListener("click", () => {
  const { user } = model;
  profilePicEditModeOff();
  profileImg.src = `show_image.do?target=user&id=${user.userId}&name=${user.profilePic}`;
  model.activeUploadFile = null;
});

saveProfileChangeBtn.addEventListener("click", async () => {
  if (!model.activeUploadFile) return;
  disableElements(
    saveProfileChangeBtn,
    undoProfileChangeBtn,
    profileImgReciever,
    document.querySelector('label[for="imgUpload"]')
  );

  try {
    const formData = new FormData();
    formData.append("pic", model.activeUploadFile);
    await uploadUserProfilePicRequest(formData);
    const response = await uploadUserProfilePicRequest(formData);
    if (response === "ok") {
      toast.success("Profile pic updated successfully");
      await activeAccountFetching();
      profilePicEditModeOff();
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(
      saveProfileChangeBtn,
      undoProfileChangeBtn,
      profileImgReciever,
      document.querySelector('label[for="imgUpload"]')
    );
  }
});

const init = async () => {
  try {
    await activeAccountFetching();
    editModeOff();
    displayBasicInfoContainer();
    console.log(model.user);
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

init();
