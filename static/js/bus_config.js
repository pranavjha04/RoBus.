import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addSeatingRequest,
  collectSeatingRecordRequest,
  updateSeatingRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  displayInputError,
  displayInputSuccess,
  removeInputError,
  removeInputSuccess,
} from "./util.js";

// SEATING FORM
const busConfigForm = document.querySelector("#bus_config_form");
const seater = document.querySelector("#bus_seater");
const sleeper = document.querySelector("#bus_sleeper");

const lsCount = document.querySelector("#lsCount");
const rsCount = document.querySelector("#rsCount");

const rowCount = document.querySelector("#rowCount");
const totalSeats = document.querySelector("#total_seats");

// UI/UX
const deckContainer = document.querySelector("#deck_cont");
const lowerBtn = document.querySelector("#lower");
const upperBtn = document.querySelector("#upper");
const currDeck = document.querySelector("#curr_deck");
const allFields = document.querySelectorAll(".fld");

const resetForm = () => {
  const activeIndex = upperBtn.checked ? 1 : 0;
  const seatingList = JSON.parse(sessionStorage.getItem("seatingList") || "[]");
  const currentSeating = seatingList[activeIndex];

  if (currentSeating) {
    const {
      sleeper: isSleeper,
      lsCount: leftSideCount,
      rsCount: rightSideCount,
      rowCount: rowCountValue,
      seats,
    } = currentSeating;

    seater.checked = !isSleeper;
    sleeper.checked = isSleeper;

    lsCount.value = leftSideCount;
    rsCount.value = rightSideCount;
    rowCount.value = rowCountValue;
    totalSeats.value = seats;

    allFields.forEach((field) => displayInputSuccess(field));
  } else {
    allFields.forEach((field) => {
      removeInputError(field);
      removeInputSuccess(field);
      field.value = "";
    });
    totalSeats.value = "";

    seater.checked = true;
    sleeper.checked = false;
  }
};

const modifiedObject = (obj) => {
  obj = Object.fromEntries(obj);
  return {
    lsCount: +obj.lsCount,
    rsCount: +obj.rsCount,
    rowCount: +obj.rowCount,
    sleeper: obj.sleeper === "true",
    seats: +obj.seats,
  };
};
const updateBusView = (busSetting) => {
  const { lsCount, rsCount, rowCount, sleeper, seats } = busSetting;
  let count = 1;
  const bus = document.querySelector(".bus");

  bus.innerHTML = `${Array.from({ length: sleeper ? rowCount : rowCount - 1 })
    .map((_) => {
      return `<div class="d-flex align-items-center gap-5 justify-content-between">
                <div class="d-flex gap-1">
                   ${Array.from({ length: lsCount })
                     .map(
                       (_) =>
                         `<button class="${
                           sleeper ? "sleeper_seat" : "seater_seat"
                         } seat btn">${count++}</button>`
                     )
                     .join("")}
                </div>
                <div class="d-flex gap-1">
                     ${Array.from({ length: rsCount })
                       .map(
                         (_) =>
                           `<button class="${
                             sleeper ? "sleeper_seat" : "seater_seat"
                           } seat btn">${count++}</button>`
                       )
                       .join("")}
                </div>
            </div>`;
    })
    .join("")}`;

  // Back Seats

  if (sleeper) return;

  bus.innerHTML += `<div class="d-flex align-items-center gap-4 ">
                    <div class="d-flex w-100 gap-1 justify-content-between">
                        ${Array.from({ length: 5 })
                          .map(
                            (_) =>
                              `<button class="seater_seat btn seat w-100">
                              ${count++}
                            </button>`
                          )
                          .join("")}
                    </div>
                </div>`;
};

const fillAlreadyExistFormDetails = (obj) => {
  lsCount.value = obj.lsCount;
  rsCount.value = obj.rsCount;

  seater.checked = !obj.sleeper;
  sleeper.checked = obj.sleeper;

  rowCount.value = obj.rowCount;

  displayInputSuccess(lsCount);
  displayInputSuccess(rsCount);
  displayInputSuccess(rowCount);

  totalSeats.value = obj.seats;

  updateBusView(obj);
};

const isRowsCountValid = (inputEl) => {
  const val = +inputEl.value;
  if (!isNaN(val) && val >= 5 && val <= 14) {
    displayInputSuccess(inputEl);
    return true;
  } else {
    inputEl.value = "";
    displayInputError(inputEl);
    toast.error("Value should be greater than 4 and less than 15");
    return false;
  }
};

const isSeatCountValid = (inputEl) => {
  const val = +inputEl.value;
  if (!isNaN(val) && val >= 1 && val <= 3) {
    if (sleeper.checked && val > 2) {
      inputEl.value = "";
      displayInputError(inputEl);
      toast.error("Value should be less than 3");
      return false;
    }
    displayInputSuccess(inputEl);
    return true;
  } else {
    displayInputError(inputEl);
    inputEl.value = "";
    toast.error(
      `Value should be greater than 0 and less than ${sleeper.checked ? 3 : 4}`
    );
    return false;
  }
};

rowCount.addEventListener("change", (e) => {
  const isValid = isRowsCountValid(e.target);
  if (!isValid) totalSeats.value = "";
});

const handleRowCountRange = (e) => {
  const isValid = isSeatCountValid(e.target);
  if (!isValid) totalSeats.value = "";
};

seater.addEventListener("change", () => {});

lsCount.addEventListener("change", handleRowCountRange);
rsCount.addEventListener("change", handleRowCountRange);

const handleLoadingSeatingData = async () => {
  const busId = +new URLSearchParams(window.location.search).get("bus_id");

  if (!busId) {
    history.back();
  }

  try {
    const response = await collectSeatingRecordRequest(busId);
    if (response === "invalid" || response === "internal") {
      throw new Error();
    }
    if (response.startsWith("[")) {
      const seatingList = JSON.parse(response);
      const [firstIndex] = seatingList;
      PageLoading.stopLoading();
      if (firstIndex) {
        fillAlreadyExistFormDetails(firstIndex);
      }
      sessionStorage.setItem("seatingList", JSON.stringify(seatingList));
    }
  } catch (err) {
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
};

deckContainer.addEventListener("click", (e) => {
  const target = e.target.closest("input[name='deck']");
  if (!target) return;
  const deck = target.getAttribute("id");
  const seatingList = JSON.parse(sessionStorage.getItem("seatingList"));
  const [lowerSeat, upperSeat] = seatingList;
  switch (deck) {
    case "lower": {
      currDeck.textContent = "Lower Deck";
      if (!lowerSeat) {
        resetForm();
      }
      fillAlreadyExistFormDetails(lowerSeat);
      break;
    }
    case "upper": {
      currDeck.textContent = "Upper Deck";
      if (!upperSeat) {
        resetForm();
        return;
      }
      fillAlreadyExistFormDetails(upperSeat);
      break;
    }
    default: {
      history.back();
    }
  }
});

let watchSessionStorageInterval = setInterval(() => {
  const busId = +new URLSearchParams(window.location.search).get("bus_id");

  if (
    !sessionStorage.getItem("activeBus") ||
    !sessionStorage.getItem("seatingList") ||
    !busId ||
    !totalSeats.readOnly
  ) {
    history.back();
  }

  const activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
  if (!activeBus.doubleDecker) {
    upperBtn.disabled = true;
  }
}, 1000);

const handleAddSeating = async (formData) => {
  if (!formData || Object.fromEntries(formData).length === 0) return;

  const activeIndex = upperBtn.checked ? 1 : 0;
  const seatingList = JSON.parse(sessionStorage.getItem("seatingList"));
  if (seatingList[activeIndex]) {
    return;
  }

  try {
    formData?.append(
      "bus_id",
      JSON.parse(sessionStorage.getItem("activeBus")).busId
    );
    const response = await addSeatingRequest(Object.fromEntries(formData));

    if (response === "internal" || response.length === 0) {
      throw new Error("Internal Server error");
    }
    if (response === "invalid") {
      throw new Error("Invalid request");
    }
    if (response.startsWith("{")) {
      toast.success("Seating added successfully");
      const seating = JSON.parse(response);
      seatingList[activeIndex] = seating;
      sessionStorage.setItem("seatingList", JSON.stringify(seatingList));
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const handleUpdateSeating = async (formData) => {
  if (!formData || Object.fromEntries(formData).length === 0) return;

  const activeIndex = upperBtn.checked ? 1 : 0;
  const seatingList = JSON.parse(sessionStorage.getItem("seatingList"));
  const activeSeating = seatingList[activeIndex];

  if (!activeSeating) {
    return;
  }

  try {
    formData?.append("seating_id", activeSeating.seatingId);
    formData?.append(
      "bus_id",
      JSON.parse(sessionStorage.getItem("activeBus")).busId
    );

    const response = await updateSeatingRequest(Object.fromEntries(formData));

    if (response === "internal" || response.length === 0) {
      throw new Error("Internal Server error");
    }
    if (response === "invalid") {
      throw new Error("Invalid request");
    }
    if (response.startsWith("{")) {
      toast.success("Seating updated successfully");
      const seating = JSON.parse(response);
      seatingList[activeIndex] = seating;
      sessionStorage.setItem("seatingList", JSON.stringify(seatingList));
    }
  } catch (err) {
    toast.error(err.message);
  }
};

busConfigForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    isSeatCountValid(lsCount) &&
    isSeatCountValid(rsCount) &&
    isRowsCountValid(rowCount)
  ) {
    if (sleeper.checked) {
      totalSeats.value = (+lsCount.value + +rsCount.value) * +rowCount.value;
    } else {
      totalSeats.value =
        (+lsCount.value + +rsCount.value) * (+rowCount.value - 1) + 5;
    }
    const formData = new FormData(busConfigForm);
    formData.append("sleeper", sleeper.checked);
    updateBusView(modifiedObject(formData));
  } else {
    toast.error("Please input valid values");
    return;
  }

  const formData = new FormData(busConfigForm);
  formData.append("deck", upperBtn.checked);
  formData.set("sleeper", sleeper.checked);

  const activeIndex = upperBtn.checked ? 1 : 0;
  const seatingList = JSON.parse(sessionStorage.getItem("seatingList"));
  if (seatingList[activeIndex]) {
    handleUpdateSeating(formData);
  } else {
    handleAddSeating(formData);
  }
});

busConfigForm.addEventListener("reset", (e) => {
  e.preventDefault();
  resetForm();
});

window.addEventListener("DOMContentLoaded", () => {
  PageLoading.startLoading();
  setTimeout(() => {
    handleLoadingSeatingData();
    const activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    if (!activeBus.doubleDecker) {
      upperBtn.disabled = true;
      upperBtn.checked = false;
    }
    currDeck.textContent = "Lower Deck";
  }, 100);
});

window.addEventListener("beforeunload", () => {
  sessionStorage.removeItem("activeBus");
  sessionStorage.removeItem("seatingList");
  clearInterval(watchSessionStorageInterval);
});
