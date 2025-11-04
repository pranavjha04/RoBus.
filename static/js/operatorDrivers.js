import { debounce } from "./debounce.js";
import { ModalHandler } from "./modalHandler.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addDriverRequest,
  checkLicenceNumberExist,
  collectAllDriverRequest,
  getUserViaMailRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  disableElements,
  enableElements,
  validateEmail,
  validateFileSize,
  validateFileType,
  validateLicenceNumber,
} from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const email = document.querySelector("#email");
const licenceNumber = document.querySelector("#licence_no");
const licencePic = document.querySelector("#licence_pic");
const licencePicPreview = document.querySelector("#licence_pic_preview");
const profilePicContainer = document.querySelector("#profile_pic_container");

let profilePic = document.querySelector("#profile_pic");
let profilePicPreview = document.querySelector("#profile_pic_preview");
const startDate = document.querySelector("#start_date");
const addDriverForm = document.querySelector("#add_driver_form");

const formModal = document.querySelector("#centeredModal");
const formContainerEssential = document.querySelector(
  "#form_container_essential"
);

const driverInfoTable = document.querySelector("#driver_table");

const cache = {
  email: {},
  licence: {},
};

const modal = {
  activeUser: null,
  driverList: [],
};

const disableFormFields = (emailTo = false) => {
  disableElements(licencePic, licenceNumber, startDate);
  if (emailTo) email.disabled = true;
};

const enableFormFields = () => {
  enableElements(licencePic, licenceNumber, startDate, email);
};

const handleForm = () => {
  if (modal.activeUser === null) {
    licencePic.value = "";
    licencePicPreview.innerHTML = "";
    licenceNumber.value = "";
    if (profilePic) {
      profilePic.value = "";
      profilePicContainer.classList.add("d-none");
    }
    if (profilePicPreview) {
      profilePicPreview.innerHTML = "";
    }
    disableFormFields();
    return;
  }

  const { userType } = modal.activeUser;
  if (userType.name !== "Passenger") {
    toast.error("Invalid User");
    disableFormFields();
    return;
  }

  if (!modal.activeUser.profilePic) {
    profilePicContainer.innerHTML = `<div class="mt-2">
        <label
        
                          for="licence_pic"
                          class="form-label small fw-semibold"
                          >Profile Pic</label
                        >
                        <input
                          class="form-control"
                          type="file"
                          id="profile_pic"
                          name="profile_pic"
                          accept="image/*"
                        />
                      </div>

                      <div
                        class="gap-2 prevcontainer mt-2"
                        id="profile_pic_preview"
                      ></div>`;

    profilePic = document.querySelector("#profile_pic");
    profilePicPreview = document.querySelector("#profile_pic_preview");
    profilePicContainer.classList.remove("d-none");

    profilePic?.addEventListener("input", (e) => {
      if (e.target.files.length > 1) {
        e.target.value = "";
        toast.error("Only 1 image is allowed");
        profilePicPreview.innerHTML = "";
        return;
      }

      const [file] = e.target.files;
      const isFileValid =
        validateFileSize(file.size) && validateFileType(file.type, "image");

      if (!isFileValid) {
        toast.error(
          "Upload file should be an Image and not be greater than 5MB"
        );
        e.target.value = "";
        profilePicPreview.innerHTML = "";
        return;
      }
      const img = ViewHelper.getImagePreview(file, "medium");
      profilePicPreview.innerHTML = img;
    });
  }
  enableFormFields();
};

const handleCollectUser = async () => {
  try {
    const response = await getUserViaMailRequest(email.value);

    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    modal.activeUser = JSON.parse(response);
    cache.email[email.value] = modal.activeUser;
    handleForm();
  } catch (err) {
    modal.activeUser = null;
    toast.error(err.message);
  }
};
const displayDriverInfo = () => {
  if (modal.driverList.length === 0) {
    driverInfoTable.innerHTML = ViewHelper.getTableEmptyMessage(
      "Add drivers to display"
    );
  } else {
    driverInfoTable.innerHTML = ViewHelper.getDriverInfoTableHeading();
    driverInfoTable.innerHTML += `<tbody>${modal.driverList
      .map(ViewHelper.getDriverInfoTableRow)
      .join("")}</tbody>`;
  }
};

const displayDriverStatus = () => {
  const driverList = modal.driverList;
  const infoData = driverList.reduce(
    (acc, { user }) => {
      return user.status.name === "Active"
        ? { ...acc, total: acc.total + 1, active: acc.active + 1 }
        : { ...acc, total: acc.total + 1, inActive: acc.inActive + 1 };
    },
    {
      total: 0,
      active: 0,
      inActive: 0,
    }
  );
  Object.keys(infoData).forEach((key) => {
    document.querySelector(`[data-info-name="${key}"]`).textContent =
      infoData[key];
  });
};

const handleCollectAllDrivers = async (firstTime = true) => {
  if (!firstTime) driverInfoTable.innerHTML = ViewHelper.getTableLoader();
  try {
    const response = await collectAllDriverRequest();
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    modal.driverList = JSON.parse(response);
    PageLoading.stopLoading();
    displayDriverInfo();
    displayDriverStatus();
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  }
};

email.addEventListener("blur", (e) => {
  const value = e.target.value.toLowerCase();
  const isValid = validateEmail(value);
  if (!isValid) {
    modal.activeUser = null;
    profilePicContainer.classList.add("d-none");
    handleForm();
    toast.error("Enter valid email address");
    return;
  }
  if (value === modal.activeUser?.email) {
    return;
  }
  if (cache.email[value]) {
    modal.activeUser = cache.email[value];
    handleForm();
    return;
  } else {
    handleCollectUser();
  }
});

licenceNumber.addEventListener("blur", async (e) => {
  const value = e.target.value;
  const isValid = validateLicenceNumber(value);
  if (!isValid) {
    toast.error("Enter Valid Licence Number");
    return;
  }
  if (!cache.licence[value]) {
    const response = await checkLicenceNumberExist(value);
    cache.licence[value] = response;
  }
  if (cache.licence[value] === "true") {
    toast.error("Licence number already exists");
    e.target.value = "";
  } else if (cache.licence[value] == "invalid") {
    toast.error("Invalid Request");
  }
});

licencePic.addEventListener("input", (e) => {
  if (e.target.files.length > 1) {
    e.target.value = "";
    toast.error("Only 1 image is allowed");
    licencePicPreview.innerHTML = "";
    return;
  }

  const [file] = e.target.files;
  const isFileValid =
    validateFileSize(file.size) && validateFileType(file.type, "image");

  if (!isFileValid) {
    toast.error("Upload file should be an Image and not be greater than 5MB");
    e.target.value = "";
    licencePicPreview.innerHTML = "";
    return;
  }

  const img = ViewHelper.getImagePreview(file, "medium");

  licencePicPreview.innerHTML = img;
});

addDriverForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !email.value ||
    !licencePic.value ||
    !licenceNumber.value ||
    (profilePicContainer.innerHTML !== "" &&
      !document.querySelector("#profile_pic").value)
  ) {
    toast.error("Please fill all the details");
    return;
  }

  try {
    const formData = new FormData(addDriverForm);
    formData.append("user_id", modal.activeUser.userId);
    disableFormFields(true);
    const response = await addDriverRequest(formData);
    if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response === "success") {
      toast.success("Driver addedd successfully");
      ModalHandler.hide(formModal);
      // clear caches
      delete cache.licence[licenceNumber.value];
      delete cache.email[email.value];
      handleCollectAllDrivers();
    }
  } catch (err) {
    toast.error(err.message);
    enableFormFields();
  }
});

formModal.addEventListener("show.bs.modal", () => {
  addDriverForm.reset();
  modal.activeUser = null;
  email.disabled = false;
  handleForm();
});

window.addEventListener("DOMContentLoaded", () => {
  handleCollectAllDrivers(true);
});
