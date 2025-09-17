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

const modifiedObject = (obj) => {
  obj = Object.fromEntries(obj);
  return {
    ls_count: +obj.ls_count,
    rs_count: +obj.rs_count,
    row_count: +obj.row_count,
    sleeper: obj.sleeper === "true",
    seats: +obj.seats,
  };
};
const updateBusView = (obj) => {
  const busSetting = modifiedObject(obj);
  const { ls_count, rs_count, row_count, sleeper, seats } = busSetting;
  let count = 1;
  const bus = document.querySelector(".bus");
  console.log(busSetting);

  bus.innerHTML = `${Array.from({ length: row_count })
    .map((_) => {
      return `<div class="d-flex align-items-center gap-5 justify-content-between">
                <div class="d-flex gap-1">
                   ${Array.from({ length: ls_count })
                     .map(
                       (_) =>
                         `<button class="${
                           sleeper ? "sleeper_seat" : "seater_seat"
                         } seat btn">${count++}</button>`
                     )
                     .join("")}
                </div>
                <div class="d-flex gap-1">
                     ${Array.from({ length: rs_count })
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

busConfigForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    isSeatCountValid(lsCount) &&
    isSeatCountValid(rsCount) &&
    isRowsCountValid(rowCount)
  ) {
    totalSeats.value = (+lsCount.value + +rsCount.value) * +rowCount.value;
    const formData = new FormData(busConfigForm);
    formData.append("sleeper", sleeper.checked);
    updateBusView(formData);
  } else {
    toast.error("Please input valid values");
    return;
  }
});

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
