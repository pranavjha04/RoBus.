import { collectSeatingRecordRequest } from "./service.js";
import { toast } from "./toast.js";
import { displayInputError, displayInputSuccess } from "./util.js";

// SEATING FORM
const busConfigForm = document.querySelector("#bus_config_form");
const seater = document.querySelector("#bus_seater");
const sleeper = document.querySelector("#bus_sleeper");

const lsCount = document.querySelector("#ls_count");
const rsCount = document.querySelector("#rs_count");

const rowCount = document.querySelector("#rows_count");
const totalSeats = document.querySelector("#total_seats");

// UI/UX
const deckContainer = document.querySelector("#deck_cont");
const lowerBtn = document.querySelector("#lower");
const upperBtn = document.querySelector("#upper");

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

busConfigForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    isSeatCountValid(lsCount) &&
    isSeatCountValid(rsCount) &&
    isRowsCountValid(rowCount)
  ) {
    totalSeats.value = (+lsCount.value + +rsCount.value) * +rowCount.value;
    const formData = new FormData(busConfigForm);
    formData.append("sleeper", sleeper.checked);
  } else {
    toast.error("Please input valid values");
  }
});

let count = 1;

const buses = document.querySelectorAll(".bus");
buses.forEach(
  (bus) =>
    (bus.innerHTML = `${Array.from({ length: 10 })
      .map((_) => {
        return `<div class="d-flex align-items-center gap-5 justify-content-between">
                <div class="d-flex gap-1">
                    <button class="seater_seat seat btn ">${count++}</button>
                    <button class="seater_seat seat btn ">${count++}</button>
                    <button class="seater_seat seat btn ">${count++}</button>
                </div>
                <div class="d-flex gap-1">
                    <button class="seater_seat seat btn ">${count++}</button>
                    <button class="seater_seat seat btn ">${count++}</button>
                    <button class="seater_seat seat btn ">${count++}</button>
                </div>
            </div>`;
      })
      .join("")}`)
);

// Back Seats
buses.forEach(
  (bus) =>
    (bus.innerHTML += `<div class="d-flex align-items-center gap-4 ">
                    <div class="d-flex w-100 gap-1 justify-content-between">
                        <div class="seat w-100">${count++}</div>
                        <div class="seat w-100">${count++}</div>
                        <div class="seat w-100">${count++}</div>
                        <div class="seat w-100">${count++}</div>
                        <div class="seat w-100">${count++}</div>
                    </div>
                </div>`)
);

const handleLoadingSeatingData = async () => {
  const busId = +new URLSearchParams(window.location.search).get("bus_id");

  if (!busId) history.back();

  try {
    const response = await collectSeatingRecordRequest(busId);
    if (response === "invalid" || response === "internal") {
      throw new Error();
    }
    if (response.startsWith("[")) {
      sessionStorage.setItem(
        "seatingList",
        JSON.stringify(JSON.parse(response))
      );
    }
  } catch (err) {
    history.back();
  }
};

const fillAlreadyExistFormDetails = (obj) => {
  lsCount.value = obj.lsCount;
  rsCount.value = obj.rsCount;
  sleeper.checked = obj.sleeper;
  rowCount.value = obj.rowCount;
  totalSeats.value = (lsCount.value + rsCount.value) * rowCount.value;
};

deckContainer.addEventListener("click", (e) => {
  const target = e.target.closest("input[name='deck']");
  if (!target) return;
  const deck = target.getAttribute("id");
  const seatingList = JSON.parse(sessionStorage.getItem("seatingList"));
  const [lowerSeat, upperSeat] = seatingList;
  switch (deck) {
    case "lower": {
      if (!lowerSeat) return;
      fillAlreadyExistFormDetails(lowerSeat);
      break;
    }
    case "upper": {
      if (!upperSeat) return;
      fillAlreadyExistFormDetails(upperSeat);
      break;
    }
    default: {
      history.back();
    }
  }
});

let watchSessionStorageInterval = setInterval(() => {
  if (
    !sessionStorage.getItem("activeBus") ||
    !sessionStorage.getItem("seatingList")
  ) {
    history.back();
  }

  const activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
  if (!activeBus.doubleDecker) {
    upperBtn.disabled = true;
  }
}, 500);

window.addEventListener("DOMContentLoaded", () => {
  handleLoadingSeatingData();
  const activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
  if (!activeBus.doubleDecker) {
    upperBtn.disabled = true;
    upperBtn.checked = false;
  }
});

window.addEventListener("beforeunload", () => {
  clearInterval(watchSessionStorageInterval);
  sessionStorage.removeItem("activeBus");
  sessionStorage.removeItem("seatingList");
});
