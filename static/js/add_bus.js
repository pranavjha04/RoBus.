import { busNumberHandler, checkBusNumberExistRequest } from "./service.js";
import { toast } from "./toast.js";
import {
  displayInputError,
  displayInputSuccess,
  manufacturerHandler,
  validateFileSize,
  validateFileType,
} from "./util.js";

const addBusForm = document.querySelector("#add_bus_form");

const busNumber = document.querySelector("#bus_number");
const manufacturer = document.querySelector("#manufacturer");
const busImages = document.querySelector("#bus_images");

const allFields = Array.from(document.querySelectorAll(".bfld"));

const prevImagesContainer = document.querySelector("#preview_img_container");

const reset = () => {
  busNumber.classList.remove("border-danger", "border-success");
  manufacturer.classList.remove("border-danger", "border-success");
  busImages.classList.remove("border-danger", "border-success");
  prevImagesContainer.innerHTML = "";
};

document
  .getElementById("centeredModal")
  .addEventListener("hidden.bs.modal", function () {
    reset();
    addBusForm.reset();
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

addBusForm.addEventListener("submit", async (e) => {
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
      body: new FormData(addBusForm),
    });
    if (!response.ok) throw new Error("Internal server error");

    let data = await response.text();
    data = data.trim();
    if (data === "Invalid") {
      throw new Error("Invalid request");
    } else if (data === "success") {
      toast.success("Bus added successfully");
      const modalEl = document.getElementById("centeredModal");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
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
