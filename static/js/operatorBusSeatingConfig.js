import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addSeatingRequest,
  collectSeatingRecordRequest,
  deleteFareFactorRequest,
} from "./service.js";
import { toast } from "./toast.js";
import { disableElements } from "./util.js";

const allFormFields = document.querySelectorAll("input, button");
const busDiagram = document.querySelector("#bus");
const deckContainer = document.querySelector("#deck_cont");

const seatingForm = document.querySelector("#bus_config_form");

const lsCount = document.querySelector("#lsCount");
const rsCount = document.querySelector("#rsCount");
const rowCount = document.querySelector("#rowCount");
const seats = document.querySelector("#total_seats");
const seater = document.querySelector("#bus_seater");
const sleeper = document.querySelector("#bus_sleeper");
const deck = document.querySelector("#deck");

const modal = {
  seatingList: [],
  activeDeck: 0,
  activeBus: null,
  busId: +document.querySelector("#busId").value,
};

const initialSeatingFormState = {
  lsCount: 0,
  rsCount: 0,
  rowCount: 0,
  deck: false,
  sleeper: false,
  seats: 0,
};

// ******************** UTILS START ***************************
const disableApp = () => {
  disableElements(allFormFields);
  PageError.showOperatorError();
  PageLoading.stopLoading();
};

const updateBusView = (busSeating) => {
  if (!busSeating) {
    busDiagram.innerHTML =
      "<p class='text-black text-center'>Seats will be displayed here</p>";
    return;
  }

  const { lsCount, rsCount, rowCount, sleeper, seats } = busSeating;
  let count = 1;
  busDiagram.innerHTML = `${Array.from({
    length: sleeper ? rowCount : rowCount - 1,
  })
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

  busDiagram.innerHTML += `<div class="d-flex align-items-center gap-4 ">
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

const updateBusForm = (busSeating = initialSeatingFormState) => {
  lsCount.value = busSeating.lsCount;
  rsCount.value = busSeating.rsCount;
  rowCount.value = busSeating.rowCount;
  seats.value = busSeating.seats;
  sleeper.checked = !!busSeating.sleeper;
  seater.checked = !busSeating.sleeper;
  deck.value = !!busSeating.deck;
};

const handleCollectSeatingRequest = async () => {
  try {
    const response = await collectSeatingRecordRequest(modal.busId);
    if (response === "invalid") {
      console.error(response);
      throw new Error("Invalid Request");
    }
    if (response === "internal") {
      console.error(response);
      throw new Error("Internal Server Error");
    }
    modal.seatingList = JSON.parse(response);
    const activeSeat = modal.seatingList[modal.activeDeck];
    updateBusView(activeSeat);
    updateBusForm(activeSeat);
  } catch (err) {
    toast.error(err.message);
    disableApp();
  } finally {
    PageLoading.stopLoading();
  }
};

const sideCountEvent = (target) => {
  if (!target) return;
  const value = +target.value;
  try {
    if (!value || isNaN(value)) {
      throw new Error("Invalid Left Side Seats Count");
    }

    console.log(sleeper.checked);
    const isSleeper = sleeper.checked;
    const minimum = 1;
    const maximum = isSleeper ? 2 : 3;

    if (value < minimum || value > maximum) {
      throw new Error(`Value should be between ${minimum} and ${maximum}`);
    }

    target.value = Math.ceil(value);
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
    target.value = 0;
    seats.value = 0;
    target.focus();
  }
};

const rowCountEvent = () => {
  const value = +rowCount.value;

  try {
    if (!value || isNaN(value)) {
      throw new Error("Invalid: Enter Numbers");
    }

    const isCurrDeckSleeper = sleeper.checked;

    const minimum = isCurrDeckSleeper ? 4 : 8;
    const maximum = isCurrDeckSleeper ? 8 : 16;

    if (value < minimum || value > maximum) {
      throw new Error(`Value should be between ${minimum} and ${maximum}`);
    }

    const oppositeDeck = modal.seatingList[1 - modal.activeDeck];
    if (oppositeDeck) {
      const { rowCount: oppositeRowCount, sleeper: isOppositeSleeper } =
        oppositeDeck;

      if (isOppositeSleeper) {
        const isValid = isCurrDeckSleeper
          ? value === oppositeRowCount
          : value === oppositeRowCount * 2;
        if (!isValid) {
          throw new Error(
            `Invalid row count: expected ${
              isCurrDeckSleeper ? oppositeRowCount : oppositeRowCount * 2
            }`
          );
        }
      } else {
        const isValid = isCurrDeckSleeper
          ? value * 2 === oppositeRowCount
          : value === oppositeRowCount;
        if (!isValid) {
          throw new Error(
            `Invalid row count: expected ${
              isCurrDeckSleeper ? oppositeRowCount / 2 : oppositeRowCount
            }`
          );
        }
      }
    }

    rowCount.value = Math.ceil(value);
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
    rowCount.value = 0;
    seats.value = 0;
    rowCount.focus();
  }
};

lsCount.addEventListener("blur", () => sideCountEvent(lsCount));
rsCount.addEventListener("blur", () => sideCountEvent(rsCount));
rowCount.addEventListener("blur", rowCountEvent);
sleeper.addEventListener("change", () => {
  const isChecked = sleeper.checked;

  if (isChecked) {
    if (+lsCount.value > 2) {
      lsCount.value = 0;
    }
    if (+rsCount.value > 2) {
      rsCount.value = 0;
    }
    if (+rowCount.value > 8) {
      rowCount.value = 0;
    }
  } else {
    if (+rowCount.value < 8) {
      rowCount.value = 0;
    }
  }
});

seatingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstCheck = [lsCount, rsCount, rowCount, seats].every(
    (input) => input.value !== ""
  );

  if (!firstCheck) {
    console.error("Please fill the form to add/update seatings");
    throw new Error("Please fill the form to add/update seatings");
  }

  const secondCheck = sleeper.checked || seater.checked;
  if (!secondCheck) {
    console.error("Please fill the form to add/update seatings");
    throw new Error("Please fill the form to add/update seatings");
  }
  let type = "add";
  if (modal.seatingList[modal.activeDeck]) {
    type = "update";
  }

  const readyToGoData = {
    lsCount: +lsCount.value,
    rsCount: +rsCount.value,
    rowCount: +rowCount.value,
    seats: +seats.value,
    sleeper: sleeper.checked,
  };

  if (type === "update") {
    const activeSeating = modal.seatingList[modal.activeDeck];
    const isReadyToUpdate = Object.keys(readyToGoData).some(
      (key) => activeSeating[key] !== readyToGoData[key]
    );

    if (!isReadyToUpdate) {
      toast.normal("No changes needed");
      return;
    }
  }

  
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    handleCollectSeatingRequest();
    PageLoading.stopLoading();
  } catch (err) {
    console.log(err);
    disableApp();
  }
});
