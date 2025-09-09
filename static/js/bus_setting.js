import { busNumberHandler, checkBusNumberExistRequest } from "./service.js";
import { toast } from "./toast.js";
import {
  displayInputError,
  displayInputSuccess,
  manufacturerHandler,
  validateFileSize,
  validateFileType,
} from "./util.js";

// BASIC BUS FORM
const basicBusForm = document.querySelector("#basic_form");
const basicNavBtn = document.querySelector("#basic_nav");
const basiContainer = document.querySelector("#basic");
const busNumber = document.querySelector("#bus_number");
const manufacturer = document.querySelector("#manufacturer");
const busImages = document.querySelector("#bus_images");

const allFields = Array.from(document.querySelectorAll(".bfld"));
const prevImagesContainer = document.querySelector("#preview_img_container");

// FEATURES
const featureContainer = document.querySelector("#features");
const featureTable = document.querySelector("#feature_table");
const featureNavBtn = document.querySelector("#feature_nav");
const featureTableBody = document.querySelector("#feature_table_body");
const featurForm = document.querySelector("#features_form");

const fareFactor = document.querySelector("#fare_factor");

const reset = () => {
  busNumber.classList.remove("border-danger", "border-success");
  manufacturer.classList.remove("border-danger", "border-success");
  busImages.classList.remove("border-danger", "border-success");
  prevImagesContainer.innerHTML = "";
  sessionStorage.removeItem("activeBus");
  featureContainer.classList.remove("active", "show");
  basicNavBtn.classList.add("active");
  featureNavBtn.classList.remove("active");
  basiContainer.classList.add("active", "show");
  featureNavBtn.disabled = true;
};

document
  .getElementById("centeredModal")
  .addEventListener("hidden.bs.modal", function () {
    reset();
    basicBusForm.reset();
  });

busImages.addEventListener("input", (e) => {
  prevImagesContainer.innerHTML = "";
  const files = [...e.target.files];
  if (files.length > 5) {
    toast.error("Maximum 5 files are accepted");
    e.target.value = "";
    return;
  }
  const areAllFilesValid = files.every((file) => {
    return validateFileSize(file.size) && validateFileType(file.type, "image");
  });
  if (!areAllFilesValid) {
    toast.error("Upload file should be an Image and not be greater than 5MB");
    e.target.value = "";
    return;
  }
  displayInputSuccess(busImages);
  prevImagesContainer.innerHTML = `${Array.from(
    {
      length: files.length,
    },
    (_, i) => i + 1
  )
    .map((id) => {
      return `<img src = ""id = "preview_${id}"class = "object-fit-cover rounded-2 preview"style = "width: 100px; height: 100px;" / >`;
    })
    .join("")}`;
  for (let i = 0; i < files.length; i++) {
    document.querySelector(`#preview_${i + 1}`).src = URL.createObjectURL(
      files[i]
    );
  }
});

manufacturer.addEventListener("change", manufacturerHandler);
busNumber.addEventListener("blur", busNumberHandler);

basicBusForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await checkBusNumberExistRequest(busNumber.value);
    if (response !== "false") {
      throw new Error("Invalid request");
    }
  } catch (err) {
    toast.error(err.message);
    displayInputError(busNumber);
    return;
  }

  if (manufacturer.value == "") {
    toast.error("Invalid request");
    displayInputError(manufacturer);
    return;
  }

  const files = busImages.files;
  if (files.length == 0) {
    displayInputError(busImages);
    toast.error("Invalid request");
    return;
  }

  try {
    const response = await fetch("add_bus.do", {
      method: "POST",
      body: new FormData(basicBusForm),
    });
    if (!response.ok) throw new Error("Internal server error");

    let data = await response.text();
    data = data.trim();
    if (data === "Invalid") {
      throw new Error("Invalid request");
    } else if (data.startsWith("{")) {
      sessionStorage.setItem("activeBus", JSON.stringify(JSON.parse(data)));
      toast.success("Bus added successfully");
      basiContainer.classList.remove("active", "show");
      document.querySelector("#basic_nav").classList.remove("active");
      featureContainer.classList.add("active", "show");
      featureNavBtn.classList.add("active");
      featureNavBtn.disabled = false;
    } else {
      if (data === "") {
        throw new Error("Invalid request");
      }
      data.split("").forEach((i) => {
        displayInputError(allFields[+i - 1]);
      });

      throw new Error("Invalid request");
    }
  } catch (err) {
    toast.error(err.message);
  }
});
