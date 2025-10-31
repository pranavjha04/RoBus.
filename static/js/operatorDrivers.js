import { debounce } from "./debounce.js";
import { PageLoading } from "./pageLoading.js";
import {
  addDriverRequest,
  checkLicenceNumberExist,
  getUserViaMailRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
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
const addDriverForm = document.querySelector("#add_driver_form");
console.log(addDriverForm);

const formModal = document.querySelector("#centeredModal");
const formContainerEssential = document.querySelector(
  "#form_container_essential"
);

const cache = {
  email: {},
  licence: {},
};

const modal = {
  activeUser: null,
};

const hideFormFields = () => {
  formContainerEssential.classList.add("d-none");
};
const showFormFields = () => {
  formContainerEssential.classList.remove("d-none");
};

const handleForm = () => {
  if (modal.activeUser === null) {
    hideFormFields();
    return;
  }

  const { userType } = modal.activeUser;
  if (userType.name !== "Passenger") {
    toast.error("Invalid User");
    hideFormFields();
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

    console.log(profilePic, profilePicPreview);
  }
  showFormFields();
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

email.addEventListener("blur", (e) => {
  const value = e.target.value.toLowerCase();
  const isValid = validateEmail(value);
  if (!isValid) {
    modal.activeUser = null;
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
  if (cache.licence[value]) {
    console.log(cache.licence[value]);
    return;
  }
  const response = await checkLicenceNumberExist(value);
  cache.licence[value] = response;
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
  console.log("HELL");

  if (
    !email.value ||
    !licencePic.value ||
    !profilePic?.value ||
    !licenceNumber.value
  ) {
    toast.error("Please fill all the details");
    return;
  }

  try {
    const formData = new FormData(addDriverForm);
    formData.append("user_id", modal.activeUser.userId);
    const response = await addDriverRequest(formData);
    console.log(response);
  } catch (err) {
    toast.error(err.message);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  PageLoading.stopLoading();
});
