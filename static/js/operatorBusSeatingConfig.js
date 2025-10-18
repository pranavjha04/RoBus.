import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addSeatingRequest,
  collectSeatingRecordRequest,
  deleteFareFactorRequest,
  updateSeatingRequest,
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

const currDeck = document.querySelector("#curr_deck");

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

const switchDeck = (currActive, nextActive) => {
  const target = deckContainer.querySelector(`[data-type="${currActive}"]`);
  if (!target) throw new Error("Invalid Deck");
  target.classList.remove("active");
  target.classList.add("inactive");

  nextActive.classList.add("active");
  nextActive.classList.remove("inactive");

  if (currActive === "upper") {
    currDeck.textContent = "Lower Deck";
  }
  if (currActive === "lower") {
    currDeck.textContent = "Upper Deck";
  }
  const activeSeating = modal.seatingList[modal.activeDeck];
  updateBusForm(activeSeating);
  updateBusView(activeSeating);
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

const updateBusForm = (busSeating = { ...initialSeatingFormState }) => {
  if (!busSeating) {
    busSeating = initialSeatingFormState;
  }
  lsCount.value = busSeating?.lsCount;
  rsCount.value = busSeating?.rsCount;
  rowCount.value = busSeating?.rowCount;
  seats.value = busSeating?.seats;
  sleeper.checked = !!busSeating?.sleeper;
  seater.checked = !busSeating?.sleeper;
  deck.value = !!busSeating?.deck;
};

const handleCollectSeatingRequest = async () => {
  try {
    const response = await collectSeatingRecordRequest(modal.activeBus.busId);
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
    updateBusView(activeSeat ? activeSeat : null);
    updateBusForm(activeSeat ? activeSeat : null);
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
    toast.error(err.message);
    console.error(err.message);
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
        const isValid = !isCurrDeckSleeper
          ? value === oppositeRowCount
          : value === Math.ceil(oppositeRowCount / 2);
        if (!isValid) {
          throw new Error(
            `Invalid row count: expected ${
              !isCurrDeckSleeper
                ? oppositeRowCount
                : Math.ceil(oppositeRowCount / 2)
            }`
          );
        }
      }
    }

    rowCount.value = Math.ceil(value);
  } catch (err) {
    toast.error(err.message);
    console.error(err.message);
    rowCount.value = 0;
    seats.value = 0;
    rowCount.focus();
  }
};

const getTotalSeats = () => {
  const leftCount = +lsCount.value;
  const rightCount = +rsCount.value;
  let rows = +rowCount.value;
  const isSleeper = !!sleeper.checked;
  if (!isSleeper) {
    rows -= 1;
  }
  let total = (leftCount + rightCount) * rows;

  if (!isSleeper) {
    total += 5;
  }
  return total;
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

deckContainer.addEventListener("click", (e) => {
  try {
    const button = e.target.closest("button");
    if (!button || button.classList.contains("active")) return;
    const type = button.dataset.type;
    if (type === "lower") {
      modal.activeDeck = 0;
      switchDeck("upper", button);
    }
    if (type === "upper") {
      modal.activeDeck = 1;
      switchDeck("lower", button);
    }
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
  }
});

seatingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
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

    seats.value = getTotalSeats();

    const readyToGoData = {
      lsCount: +lsCount.value,
      rsCount: +rsCount.value,
      rowCount: +rowCount.value,
      seats: +seats.value,
      sleeper: !!sleeper.checked,
      bus_id: modal.activeBus.busId,
      deck: !!modal.activeDeck,
    };

    if (type === "update") {
      const activeSeating = modal.seatingList[modal.activeDeck];
      let isNewChange = false;
      for (const prop in readyToGoData) {
        if (prop === "bus_id") continue;
        if (readyToGoData[prop] !== activeSeating[prop]) {
          isNewChange = true;
          break;
        }
      }

      if (!isNewChange) {
        toast.normal("No changes needed");
        return;
      }
    }

    switch (type) {
      case "add": {
        const response = await addSeatingRequest(readyToGoData);
        if (response === "invalid") {
          throw new Error("Invalid Request");
        }
        if (response === "internal") {
          throw new Error("Internal Server Error");
        }

        const seatingData = JSON.parse(response);
        toast.success(`Seating for ${currDeck.textContent} added successfully`);
        modal.seatingList[modal.activeDeck] = seatingData;
        updateBusView(readyToGoData);
        break;
      }
      case "update": {
        const activeSeat = modal.seatingList[modal.activeDeck];
        if (!activeSeat) {
          throw new Error("Invalid Request");
        }

        const response = await updateSeatingRequest({
          ...readyToGoData,
          seating_id: activeSeat.seatingId,
        });
        if (response === "invalid") {
          throw new Error("Invalid Request");
        }
        if (response === "internal") {
          throw new Error("Internal Server Error");
        }

        const seatingData = JSON.parse(response);
        toast.success(
          `Seating for ${currDeck.textContent} updated successfully`
        );
        modal.seatingList[modal.activeDeck] = seatingData;
        updateBusView(readyToGoData);
        break;
      }
      default: {
        throw new Error("Invalid Request");
      }
    }
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
  }
});

seatingForm.addEventListener("reset", (e) => {
  e.preventDefault();

  const activeSeat = modal.seatingList[modal.activeDeck];
  updateBusForm(activeSeat);
  updateBusView(activeSeat);
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    if (!modal.activeBus.doubleDecker) {
      deckContainer.querySelector("[data-type]").remove();
    }
    handleCollectSeatingRequest();
    PageLoading.stopLoading();
  } catch (err) {
    console.error(err);
    disableApp();
  }
});
