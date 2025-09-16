import { filterNav } from "./filter_nav.js";
import {
  busNumberHandler,
  checkBusNumberExistRequest,
  collectBusRecordRequest,
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
const doubleDecker = document.querySelector("#double_decker");
const fareList = document.querySelector("#feature_list");
const busImages = document.querySelector("#bus_images");

const addBusModal = document.querySelector("#centeredModal");

const allFields = Array.from(document.querySelectorAll(".bfld"));
const prevImagesContainer = document.querySelector("#preview_img_container");
const busTable = document.querySelector("#bus_table");

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

const handleBusListDisplay = (busList) => {
  if (busList.length === 0) {
    busTable.innerHTML =
      "<h3 class='text-center fs-3 align-self-center mt-5'>Add records to display :)</h3>";
    filterNav.disable();
    filterNav.init();
    busTable.classList.remove("border");
  } else {
    busTable.classList.add("border");
    filterNav.enable();
    busTable.innerHTML = ViewHelper.getBusTableHeading();
    const busTableBody = document.getElementById("bus_table_body");
    busTableBody.innerHTML = busList
      .map((bus) => ViewHelper.getBusTableRow(bus))
      .join("");
  }
};

const handleBusRecords = async () => {
  busTable.innerHTML = ViewHelper.getTableLoader();
  setTimeout(async () => {
    try {
      const response = await collectBusRecordRequest();
      if (response === "internal") {
        throw new Error("Internal server error");
      }
      if (response === "invalid") {
        throw new Error("Invalid Request");
      }
      if (response.startsWith("[")) {
        const busList = JSON.parse(response);
        sessionStorage.setItem("busList", JSON.stringify(busList));
        handleBusListDisplay(busList);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
    }
  }, 500);
};

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

  const formData = new FormData(basicBusForm);
  formData.append("double_decker", doubleDecker.value === "on");

  try {
    const response = await fetch("add_bus.do", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Internal server error");

    let data = await response.text();
    data = data.trim();

    if (data === "Invalid") {
      throw new Error("Invalid request");
    } else if (data.startsWith("{")) {
      toast.success("Bus added successfully");
      await handleBusRecords();
      const modal = bootstrap.Modal.getInstance(addBusModal);
      modal.hide();
    } else {
      if (data.split("").length > 0) {
        data.split("").forEach((i) => {
          if (isNaN(+i)) throw new Error("Internal server error");
          displayInputError(allFields[+i - 1]);
        });
      }

      throw new Error("Invalid request");
    }
  } catch (err) {
    toast.error(err.message);
  }
});

busTable.addEventListener("click", (e) => {
  const target = e.target.closest(".option-link");
  if (!target || !target.closest("tr")) return;

  const busId = +target.closest("tr").dataset.id;
  if (isNaN(busId) || !busId) return;
  const activeBus = JSON.parse(sessionStorage.getItem("busList")).find(
    (bus) => bus.busId == busId
  );

  if (!activeBus || !Object.entries(activeBus).length) return;

  sessionStorage.setItem("activeBus", JSON.stringify(activeBus));
});

const init = async () => {
  await handleBusRecords();
};

window.addEventListener("DOMContentLoaded", () => {
  sessionStorage.removeItem("activeBus");
});

window.addEventListener("beforeunload", () => {
  sessionStorage.removeItem("busList");
});

await init();
