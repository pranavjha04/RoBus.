import {
  busNumberHandler,
  checkBusNumberExistRequest,
  collectFareFactorRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  displayInputError,
  displayInputSuccess,
  manufacturerHandler,
  validateFileSize,
  validateFileType,
} from "./util.js";
import { ViewHelper } from "./viewHelper.js";

// BASIC BUS FORM
const basicBusForm = document.querySelector("#basic_form");
const busNumber = document.querySelector("#bus_number");
const manufacturer = document.querySelector("#manufacturer");
const fareList = document.querySelector("#feature_list");
const busImages = document.querySelector("#bus_images");

const addBusModal = document.querySelector("#centeredModal");

const allFields = Array.from(document.querySelectorAll(".bfld"));
const prevImagesContainer = document.querySelector("#preview_img_container");

const setFareLoader = () => {
  fareList.innerHTML = '<div class="loader sm-loader"></div>';
};

const removeFareLoader = () => {
  fareList.innerHTML = "";
};

const reset = () => {
  busNumber.classList.remove("border-danger", "border-success");
  manufacturer.classList.remove("border-danger", "border-success");
  busImages.classList.remove("border-danger", "border-success");
  prevImagesContainer.innerHTML = "";
  sessionStorage.removeItem("activeBus");
};

addBusModal.addEventListener("show.bs.modal", async () => {
  setFareLoader();
  setTimeout(async () => {
    try {
      let fareFactorList = await collectFareFactorRequest(false);
      if (fareFactorList === "invalid") {
        throw new Error("Invalid request");
      }
      if (
        typeof fareFactorList === "string" &&
        fareFactorList.startsWith("[")
      ) {
        fareFactorList = JSON.parse(fareFactorList);
        if (fareFactorList.length == 0) {
          fareList.innerHTML =
            '<span class="align-self-center" >No amenities available yet. <a href="operator_fare_factor.do">Click here to add amenities</a>.</span>';
        } else {
          fareList.innerHTML = fareFactorList
            .map((factor) => ViewHelper.getFareCheckBox(factor))
            .join("");
        }
      }
    } catch (err) {
      toast.error(err.message);
      removeFareLoader();
    }
  }, 500);
});

addBusModal.addEventListener("hidden.bs.modal", function () {
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

  if (!fareList.querySelector('input[type="checkbox"]:checked')) {
    document.querySelector('input[type="checkbox"]')?.focus();
    toast.error("Amenities can't be left empty");
    return;
  }

  const files = busImages.files;
  if (files.length == 0) {
    displayInputError(busImages);
    toast.error("Invalid request");
    return;
  }

  console.log(Object.fromEntries(new FormData(basicBusForm)));
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
      const modal = bootstrap.Modal.getInstance(addBusModal);
      modal.hide();
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

const init = async () => {
  try {
    
  }
  catch (err) {
    err
  }
};

await init();
