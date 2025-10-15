import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { collectSeatingRecordRequest } from "./service.js";
import { toast } from "./toast.js";
import { disableElements } from "./util.js";

const allFormFields = document.querySelectorAll("input, button");
const busDiagram = document.querySelector("#bus");
const deckContainer = document.querySelector("#deck_cont");

const seatingForm = document.querySelector("#bus_config_form");

const lsCount = document.querySelector("#lsCount");
const rsCount = document.querySelector("#rsCount");
const rowCount = document.querySelector("#rowCount");
const seats = document.querySelector("#seats");
const seater = document.querySelector("#bus_seater");
const sleeper = document.querySelector("#bus_sleeper");

const modal = {
  seatingList: [],
  activeDeck: 0,
  activeBus: null,
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

const updateForm = () => {
  const { seatingList, activeDeck } = modal;
  const currSeating = seatingList[activeDeck];
  if (!currSeating) {
    seatingForm.reset();
    return;
  }
  Object.keys(currSeating).forEach((key) => {
    const target = document.querySelector(`input[name="${key}"]`);
    if (target.type === "radio") return;
    target.value = currSeating[key];
  });
  seater.checked = !currSeating.sleeper;
  sleeper.checked = currSeating.sleeper;
};

const changeActiveDeck = (a, b) => {
  a.classList.remove("inactive");
  a.classList.add("active");
  b.classList.remove("active");
  b.classList.add("inactive");
};

const validateRowCount = () => {
  const currValue = +rowCount.value;
  const [lowerSeat, upperSeat] = modal.seatingList;
  const activeSeat = modal.seatingList[modal.activeDeck];
  const isCurrSleeper = sleeper.checked;

  let minimum = 8;
  let maxiumum = 16;

  if (isCurrSleeper) {
    minimum = 4;
    maxiumum = 8;
  }

  try {
    if (isNaN(currValue) || !currValue) {
      throw new Error("Invalid Rows Count");
    }

    if (!(currValue >= minimum && currValue <= maxiumum)) {
      throw new Error("Invalid Rows Count");
    }

    const leftValue = currValue - (currValue % 2);

    switch (modal.activeDeck) {
      case 0: {
        if (upperSeat) {
          const isTargetSleeper = upperSeat.sleeper;
          const rightValue = upperSeat.rowCount - (upperSeat.rowCount % 2);
          let isValid = true;

          if (
            (isCurrSleeper && isTargetSleeper) ||
            (!isCurrSleeper && !isTargetSleeper)
          ) {
            isValid = leftValue === rightValue;
          } else if (isCurrSleeper && !isTargetSleeper) {
            isValid = leftValue === rightValue / 2;
          } else if (!isCurrSleeper && isTargetSleeper) {
            isValid = leftValue / 2 === rightValue;
          }

          if (!isValid) throw new Error("Invalid Row Count");
          else rowCount.classList.add("valid");
        }
        break;
      }

      case 1: {
        if (lowerSeat) {
          const isTargetSleeper = lowerSeat.sleeper;
          const rightValue = lowerSeat.rowCount - (lowerSeat.rowCount % 2);
          let isValid = true;

          if (
            (isCurrSleeper && isTargetSleeper) ||
            (!isCurrSleeper && !isTargetSleeper)
          ) {
            isValid = leftValue === rightValue;
          } else if (isCurrSleeper && !isTargetSleeper) {
            isValid = leftValue === rightValue / 2;
          } else if (!isCurrSleeper && isTargetSleeper) {
            isValid = leftValue / 2 === rightValue;
          }

          if (!isValid) throw new Error("Invalid Row Count");
        }
        break;
      }

      default:
        throw new Error("Invalid Request");
    }

    rowCount.classList.add("valid");
  } catch (err) {
    toast.error(err.message);
    if (activeSeat) {
      rowCount.value = activeSeat.rowCount;
    } else {
      rowCount.value = "";
    }
    rowCount.classList.remove("valid");
    rowCount.focus();
  }
};

// ******************** UTILS END ***************************

// async request handlers
const handleCollectSeatingRecords = async () => {
  const busId = new URLSearchParams(window.location.search).get("bus_id");
  if (!busId) {
    throw new Error();
  }

  const response = await collectSeatingRecordRequest(busId);
  if (response === "invalid") {
    throw new Error("Invalid Request");
  }
  if (response === "internal") {
    throw new Error("Internal Server Error");
  }
  PageLoading.stopLoading();

  modal.seatingList = JSON.parse(response);
  updateBusView(modal.seatingList[modal.activeDeck]);
};

// event listeners
deckContainer.addEventListener("click", (e) => {
  const targetButton = e.target.closest("[data-type]");
  if (!targetButton) return;

  const type = targetButton.dataset.type;
  if (targetButton.classList.contains("active")) return;

  const lowerBtn = document.querySelector('[data-type="lower"]');
  const upperBtn = document.querySelector('[data-type="upper"]');
  const { seatingList } = modal;
  switch (type) {
    case "lower": {
      changeActiveDeck(lowerBtn, upperBtn);
      modal.activeDeck = 0;
      updateBusView(seatingList[modal.activeDeck]);
      updateForm();
      break;
    }
    case "upper": {
      changeActiveDeck(upperBtn, lowerBtn);
      modal.activeDeck = 1;
      updateBusView(seatingList[modal.activeDeck]);
      updateForm();
      break;
    }
    default: {
      break;
    }
  }
});

const seatingCountEventHandler = (e) => {
  const target = e.target;
  const value = +target.value;
  try {
    if (!value || isNaN(value) || value > 3) {
      throw new Error("Invalid Count");
    }
    const isSleeper = sleeper.checked;
    let minimum = 1;
    let maxiumum = 3;
    if (isSleeper) {
      maxiumum = 2;
    }
    if (!(value >= minimum && value <= maxiumum)) {
      throw new Error("Invalid Count");
    }
    e.target.classList.add("valid");
  } catch (err) {
    toast.error(err.message);
    target.focus();
    const currSeating = modal.seatingList[modal.activeDeck];
    if (currSeating) {
      target.value = currSeating[target.type];
    } else {
      target.value = "";
    }
    target.classList.remove("valid");
  }
};

lsCount.addEventListener("change", seatingCountEventHandler);
rsCount.addEventListener("change", seatingCountEventHandler);

sleeper.addEventListener("change", () => {
  const isChecked = sleeper.checked;
  if (!isChecked) return;

  console.log("hell");
  let wasFault = false;
  if (!isNaN(lsCount.value) && +lsCount.value > 2) {
    lsCount.value = 2;
    wasFault = true;
  }
  if (!isNaN(rsCount.value) && +rsCount.value > 2) {
    rsCount.value = 2;
    wasFault = true;
  }

  if (wasFault) toast.warning("Count values were adjusted");

  validateRowCount();
});

rowCount.addEventListener("change", () => {
  validateRowCount();
});

seatingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const areAllValid = [lsCount, rsCount, rowCount].every((field) =>
    field.classList.contains("valid")
  );

  console.log(areAllValid);

  if (areAllValid) {
    areAllValid = sleeper.checked || seater.checked;
  }

  if (!areAllValid) {
    toast.error("Invalid Request");
    return;
  }


});

// on page load
window.addEventListener("DOMContentLoaded", async () => {
  try {
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    await handleCollectSeatingRecords();
    if (!modal.activeBus.doubleDecker) {
      document.querySelector('[data-type="upper"]').disabled = true;
    }
  } catch (err) {
    toast.error(err.message);
    disableApp();
  }
});

window.removeEventListener("pagehide", () => {
  clearInterval(watchTotalRowsSession);
});
