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

window.addEventListener('c')