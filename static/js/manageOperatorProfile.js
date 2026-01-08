import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  getActiveOperatorRequest,
  updateOperatorBasicInfoRequest,
  uploadOperatorBannerRequest,
  uploadOperatorCertificateRequest,
  uploadOperatorLogoRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  createURLParams,
  disableElements,
  enableElements,
  validateAddress,
  validateFileSize,
  validateFileType,
  validateName,
  validateWebsite,
} from "./util.js";

const nameContainer = document.querySelector("#name_container");
const websiteContainer = document.querySelector("#website_container");
const addressContainer = document.querySelector("#address_container");

const imageReciever = {
  logo: document.querySelector("#logo_img_rcv"),
  banner: document.querySelector("#banner_img_rcv"),
  certificate: document.querySelector("#cert_img_rcv"),
};

const imageDisplay = {
  logo: document.querySelector("#logo_img"),
  banner: document.querySelector("#banner_img"),
  certificate: document.querySelector("#cert_img"),
};

const name = document.querySelector("#full_name");
const website = document.querySelector("#website");
const address = document.querySelector("#address");

const profileEditBtn = document.querySelector("#profile_edit");
const undoProfileEditBtn = document.querySelector("#undo_profile_edit");
const saveProfileBtn = document.querySelector("#save_profile_edit");

const saveLogoBtn = document.querySelector("#save_logo_btn");
const undoLogoBtn = document.querySelector("#undo_logo_btn");

const saveBannerBtn = document.querySelector("#save_banner_btn");
const undoBannerBtn = document.querySelector("#undo_banner_btn");

const saveCertificateBtn = document.querySelector("#save_cert_btn");
const undoCertificateBtn = document.querySelector("#undo_cert_btn");

const model = {
  operator: null,
  activeLogoFile: null,
  activeBannerFile: null,
  activeCertificateFile: null,
};

const activeAccountFetching = async () => {
  try {
    const response = await getActiveOperatorRequest();
    if (response === "invalid") throw new Error(err.message);
    model.operator = JSON.parse(response);
  } catch (err) {
    toast.error(err.message);
  }
};

const editModeOn = () => {
  [nameContainer, websiteContainer, addressContainer].forEach((node) => {
    node.querySelector(".view")?.classList.add("d-none");
    node.querySelector(".edit")?.classList.remove("d-none");
  });
  profileEditBtn.classList.add("d-none");
  saveProfileBtn.classList.remove("d-none");
  undoProfileEditBtn.classList.remove("d-none");

  name.focus();
};

const editModeOff = () => {
  [nameContainer, websiteContainer, addressContainer].forEach((node) => {
    node.querySelector(".view")?.classList.remove("d-none");
    node.querySelector(".edit")?.classList.add("d-none");
  });

  profileEditBtn.classList.remove("d-none");
  saveProfileBtn.classList.add("d-none");
  undoProfileEditBtn.classList.add("d-none");
};
const logoEditModeOn = () => {
  [saveLogoBtn, undoLogoBtn].forEach((btn) => {
    btn.classList.remove("d-none");
  });
};

const logoEditModeOff = () => {
  const { operator } = model;
  imageDisplay.logo.src = `show_image.do?target=operator&id=${operator.operatorId}&name=${operator.logo}`;
  [saveLogoBtn, undoLogoBtn].forEach((btn) => {
    btn.classList.add("d-none");
  });
  model.activeLogoFile = null;
};

const bannerEditModeOn = () => {
  [saveBannerBtn, undoBannerBtn].forEach((btn) => {
    btn.classList.remove("d-none");
  });
};
const bannerEditModeOff = () => {
  const { operator } = model;
  imageDisplay.banner.src = `show_image.do?target=operator&id=${operator.operatorId}&name=${operator.banner}`;
  [saveBannerBtn, undoBannerBtn].forEach((btn) => {
    btn.classList.add("d-none");
  });
  model.activeBannerFile = null;
};
const certificateEditModeOn = () => {
  [saveCertificateBtn, undoCertificateBtn].forEach((btn) => {
    btn.classList.remove("d-none");
  });
};
const certificateEditModeOff = () => {
  const { operator } = model;
  imageDisplay.certificate.src = `show_image.do?target=operator&id=${operator.operatorId}&name=${operator.certificate}`;
  [saveCertificateBtn, undoCertificateBtn].forEach((btn) => {
    btn.classList.add("d-none");
  });
  model.activeCertificateFile = null;
};

const setJoinedDate = () => {
  document.querySelector(
    "#joined_date"
  ).textContent = `Joined,  ${new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "long",
  }).format(new Date(model.operator.createdAt))}`;
};
const updateBasicInfoChanges = () => {
  const {
    fullName,
    address: operatorAddress,
    website: operatorWebsite,
  } = model.operator;

  nameContainer.querySelector("#full_name").value = fullName;
  nameContainer.querySelector(".data-value").textContent = fullName;

  addressContainer.querySelector("#address").value = operatorAddress;
  addressContainer.querySelector(".data-value").textContent = operatorAddress;

  websiteContainer.querySelector("#website").value = operatorWebsite;
  websiteContainer.querySelector(".data-value").textContent = operatorWebsite;

  document.querySelector("#name-display").textContent = fullName;
};

name.addEventListener("blur", (e) => {
  const value = e.target.value;
  const response = validateName(value);
  try {
    if (!response) {
      throw new Error("Invalid Name");
    }
  } catch (err) {
    toast.error(err.message);
    name.value = model.operator.fullName;
  }
});

website.addEventListener("blur", (e) => {
  const value = e.target.value;
  const response = validateWebsite(value);
  try {
    if (!response) {
      throw new Error("Invalid URL");
    }
  } catch (err) {
    toast.error(err.message);
    website.value = model.operator.website ? model.operator.website : "";
  }
});

address.addEventListener("blur", (e) => {
  const value = e.target.value;
  const response = validateAddress(value);
  try {
    if (!response) {
      throw new Error("Invalid Address");
    }
  } catch (err) {
    toast.error(err.message);
    address.value = model.operator.address ? model.operator.address : "";
  }
});

profileEditBtn.addEventListener("click", () => {
  editModeOn();
});

undoProfileEditBtn.addEventListener("click", () => {
  editModeOff();
});

saveProfileBtn.addEventListener("click", async () => {
  if (
    !validateName(name.value) ||
    !validateAddress(address.value) ||
    (website.value.length > 1 && !validateWebsite(website.value))
  ) {
    toast.error("Invalid Request");
    return;
  }
  let newChange = false;
  newChange =
    name.value !== model.operator.fullName ||
    address.value !== model.operator.address ||
    website.value !== model.operator.website;

  if (!newChange) {
    editModeOff();
    toast.normal("No changes needed");
    return;
  }

  try {
    disableElements(undoProfileEditBtn, saveProfileBtn, name, website, address);
    const response = await updateOperatorBasicInfoRequest(
      createURLParams({
        full_name: name.value,
        address: address.value,
        website: website.value,
      })
    );
    if (response === "ok") {
      toast.success("Profile Updated successfully");
      await activeAccountFetching();
      updateBasicInfoChanges();
      editModeOff();
    } else if (response === "website") {
      website.focus();
      throw new Error("Invalid Website");
    } else if (response === "full_name") {
      fullName.focus();
      throw new Error("Invalid Full Name");
    } else if (response === "address") {
      address.focus();
      throw new Error("Invalid Address");
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(undoProfileEditBtn, saveProfileBtn, name, website, address);
  }
});

// logo
imageReciever.logo.addEventListener("input", (e) => {
  model.activeLogoFile = null;
  const [file] = [...e.target.files];
  const { operator } = model;
  try {
    const isFileValid =
      validateFileSize(file.size) && validateFileType(file.type, "image");
    if (!isFileValid)
      throw new Error(
        "Uploaded file should be an Image and not be greater than 5MB"
      );
    model.activeLogoFile = file;
    imageDisplay.logo.src = URL.createObjectURL(file);
    logoEditModeOn();
  } catch (err) {
    toast.error(err.message);
    imageDisplay.logo.src = `show_image.do?target=operator&id=${operator.operatorId}&name=${operator.logo}`;
  }
});
undoLogoBtn.addEventListener("click", logoEditModeOff);
saveLogoBtn.addEventListener("click", async () => {
  if (!model.activeLogoFile) return;

  try {
    disableElements(
      saveLogoBtn,
      undoLogoBtn,
      imageReciever.logo,
      document.querySelector('label[for="logo_img_rcv"]')
    );
    const formData = new FormData();
    formData.append("logo", model.activeLogoFile);
    const response = await uploadOperatorLogoRequest(formData);
    if (response === "ok") {
      toast.success("Logo updated successfully");
      await activeAccountFetching();
      logoEditModeOff();
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(
      saveLogoBtn,
      undoLogoBtn,
      imageReciever.logo,
      document.querySelector('label[for="logo_img_rcv"]')
    );
  }
});

// banner
imageReciever.banner.addEventListener("input", (e) => {
  model.activeBannerFile = null;
  const [file] = [...e.target.files];
  const { operator } = model;
  try {
    const isFileValid =
      validateFileSize(file.size) && validateFileType(file.type, "image");
    if (!isFileValid)
      throw new Error(
        "Uploaded file should be an Image and not be greater than 5MB"
      );
    model.activeBannerFile = file;
    imageDisplay.banner.src = URL.createObjectURL(file);
    bannerEditModeOn();
  } catch (err) {
    toast.error(err.message);
    imageDisplay.banner.src = `show_image.do?target=operator&id=${operator.operatorId}&name=${operator.banner}`;
  }
});
undoBannerBtn.addEventListener("click", bannerEditModeOff);
saveBannerBtn.addEventListener("click", async () => {
  if (!model.activeBannerFile) return;

  try {
    disableElements(
      saveBannerBtn,
      undoBannerBtn,
      imageReciever.banner,
      document.querySelector('label[for="banner_img_rcv"]')
    );
    const formData = new FormData();
    formData.append("banner", model.activeBannerFile);
    const response = await uploadOperatorBannerRequest(formData);
    if (response === "ok") {
      toast.success("Banner updated successfully");
      await activeAccountFetching();
      bannerEditModeOff();
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(
      saveBannerBtn,
      undoBannerBtn,
      imageReciever.banner,
      document.querySelector('label[for="banner_img_rcv"]')
    );
  }
});

//certificate
imageReciever.certificate.addEventListener("input", (e) => {
  model.activeCertificateFile = null;
  const [file] = [...e.target.files];
  const { operator } = model;
  try {
    const isFileValid =
      validateFileSize(file.size) && validateFileType(file.type, "image");
    if (!isFileValid)
      throw new Error(
        "Uploaded file should be an Image and not be greater than 5MB"
      );
    model.activeCertificateFile = file;
    imageDisplay.certificate.src = URL.createObjectURL(file);
    certificateEditModeOn();
  } catch (err) {
    toast.error(err.message);
    imageDisplay.certificate.src = `show_image.do?target=operator&id=${operator.operatorId}&name=${operator.certificate}`;
  }
});
undoCertificateBtn.addEventListener("click", certificateEditModeOff);
saveCertificateBtn.addEventListener("click", async () => {
  if (!model.activeCertificateFile) return;

  try {
    disableElements(
      saveCertificateBtn,
      undoCertificateBtn,
      imageReciever.certificate,
      document.querySelector('label[for="cert_img_rcv"]')
    );
    const formData = new FormData();
    formData.append("certificate", model.activeCertificateFile);
    const response = await uploadOperatorCertificateRequest(formData);
    if (response === "ok") {
      toast.success("Certificate updated successfully");
      await activeAccountFetching();
      certificateEditModeOff();
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(
      saveCertificateBtn,
      undoCertificateBtn,
      imageReciever.certificate,
      document.querySelector('label[for="cert_img_rcv"]')
    );
  }
});

const init = async () => {
  try {
    await activeAccountFetching();
    setJoinedDate();
    editModeOff();
    console.log(model);
  } catch (error) {
    toast.error(error.message);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

init();
