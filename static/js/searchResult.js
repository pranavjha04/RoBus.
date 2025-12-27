import { APP_URL } from "./helper.js";
import { PageLoading } from "./pageLoading.js";
import { searchCityRequest, getScheduleRequest } from "./service.js";
import { toast } from "./toast.js";
import { createURLParams, toMinutes } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const searchResultContainer = document.querySelector(
  "#search_result_container"
);

//
const totalResultContainer = document.querySelector("#total_result");

// search
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const fromSuggestion = document.querySelector("#from_suggestion");
const toSuggestion = document.querySelector("#to_suggestion");
const journeyDate = document.querySelector("#journey_date");
const searchBusForm = document.querySelector("#search_bus_form");
const source = document.querySelector("#source");
const destination = document.querySelector("#destination");
const submitBtn = document.querySelector("#submit");

// filters
const sortPrice = document.querySelector("#sort_price");
const sortSeats = document.querySelector("#sort_seat");
const ac = document.querySelectorAll(".ac");
const seater = document.querySelectorAll(".seat");
const sortDeparture = document.querySelectorAll(".sort-departure");
const clearFilterBtn = document.querySelector("#clear_filter");

const cache = {};
let filterApplicable = false;

const modal = {
  searchResults: [],
  currState: [],
  selectedSeat: {},
};

const disableFilter = () => {
  document.querySelectorAll(".filter").forEach((node) => {
    node.disabled = true;
  });
};
const enableFilter = () => {
  document.querySelectorAll(".filter").forEach((node) => {
    node.disabled = false;
  });
};

const clearFilter = () => {
  document.querySelectorAll("input[type='radio']").forEach((node) => {
    node.checked = false;
  });
  document.querySelectorAll("select").forEach((node) => {
    node.value = "";
  });

  modal.currState = [...modal.searchResults];
  displaySearchResult(modal.currState);
};

const displaySearchResult = (list = []) => {
  if (!(list instanceof Array)) throw new Error("Invalid List");

  if (filterApplicable) {
    enableFilter();
  } else {
    disableFilter();
  }
  totalResultContainer.textContent = `${list.length} Results Found`;

  if (list.length === 0) {
    searchResultContainer.innerHTML = `<div class="d-flex align-items-center justify-content-center">
        <div class="no-bus-card">
          <h2>No buses found 😕</h2>
          <p>Please try another date or route.</p>
        </div>
      </div>`;
  } else {
    searchResultContainer.innerHTML = list
      .map(ViewHelper.getSearchResultRow)
      .join("");
  }
};
const getActiveFilters = () => {
  return {
    acType:
      document.querySelector('input[name="bus_type_ac"]:checked')?.value ||
      null,

    seatType:
      document.querySelector('input[name="bus_type_seat"]:checked')?.value ||
      null,
  };
};

const amenityFilterRecord = (targetAmenity, exclude = false) => {
  return modal.searchResults.filter(({ bus }) => {
    const hasAmenity = bus.busFareFactorList.some(
      ({ operatorTicketFare }) =>
        operatorTicketFare.fareFactor.name === targetAmenity
    );

    return exclude ? !hasAmenity : hasAmenity;
  });
};

const seaterFilterRecord = (list, isSleeper) => {
  return list.filter(({ bus }) => {
    const isValid = bus.seatingList.some((seating) => {
      return seating.sleeper === isSleeper;
    });

    return isValid;
  });
};

const applyFilter = (type = null, seating = null) => {
  let filterResult = [...modal.searchResults];
  switch (type) {
    case "ac": {
      filterResult = amenityFilterRecord("Air Conditioning");
      break;
    }
    case "non_ac": {
      filterResult = amenityFilterRecord("Air Conditioning", true);
      break;
    }
    default: {
      break;
    }
  }

  switch (seating) {
    case "seater": {
      filterResult = seaterFilterRecord(filterResult, false);
      break;
    }
    case "sleeper": {
      filterResult = seaterFilterRecord(filterResult, true);
      break;
    }
    default: {
      break;
    }
  }

  displaySearchResult(filterResult);
};

sortPrice.addEventListener("change", (e) => {
  const value = e.target.value;

  switch (value) {
    case "low": {
      const filterResult = [...modal.searchResults].sort(
        (a, b) => a.totalCharges - b.totalCharges
      );
      displaySearchResult(filterResult);
      break;
    }
    case "high": {
      const filterResult = [...modal.searchResults].sort(
        (a, b) => b.totalCharges - a.totalCharges
      );
      displaySearchResult(filterResult);
      break;
    }
    default: {
      displaySearchResult(modal.searchResults);
      break;
    }
  }
});

sortSeats.addEventListener("change", (e) => {
  const value = e.target.value;

  switch (value) {
    case "low": {
      const filterResult = [...modal.searchResults].sort((a, b) => {
        const totalA = a.bus.seatingList.reduce(
          (acc, curr) => acc + curr.seats,
          0
        );
        const totalB = b.bus.seatingList.reduce(
          (acc, curr) => acc + curr.seats,
          0
        );

        const bookedA = a.sleeperSeatsBooked + a.seaterSeatsBooked;
        const bookedB = b.sleeperSeatsBooked + b.seaterSeatsBooked;

        const availableA = totalA - bookedA;
        const availableB = totalB - bookedB;

        return availableA - availableB;
      });

      displaySearchResult(filterResult);
      break;
    }
    case "high": {
      const filterResult = [...modal.searchResults].sort((a, b) => {
        const totalA = a.bus.seatingList.reduce(
          (acc, curr) => acc + curr.seats,
          0
        );
        const totalB = b.bus.seatingList.reduce(
          (acc, curr) => acc + curr.seats,
          0
        );

        const bookedA = a.sleeperSeatsBooked + a.seaterSeatsBooked;
        const bookedB = b.sleeperSeatsBooked + b.seaterSeatsBooked;

        const availableA = totalA - bookedA;
        const availableB = totalB - bookedB;

        return availableB - availableA;
      });

      displaySearchResult(filterResult);
      break;
    }
    default: {
      displaySearchResult(modal.searchResults);
      break;
    }
  }
});

sortDeparture.forEach((dep) => {
  dep.addEventListener("change", (e) => {
    const value = e.target.value;

    switch (value) {
      case "low": {
        const filterResult = [...modal.searchResults].sort(
          (a, b) => toMinutes(a.departureTime) - toMinutes(b.departureTime)
        );
        displaySearchResult(filterResult);
        break;
      }
      case "high": {
        const filterResult = [...modal.searchResults].sort(
          (a, b) => toMinutes(b.departureTime) - toMinutes(a.departureTime)
        );
        displaySearchResult(filterResult);
        break;
      }
      default: {
        break;
      }
    }
  });
});

const updateBusInfoShow = (container, target) => {
  container.querySelector(".a");

  [".amenities-list", ".time-line", ".bus-container", ".images-list"].forEach(
    (className) => {
      const curr = document.querySelector(className);
      if (target.classList !== curr.classList) {
        curr.classList.add("d-none");
      }
    }
  );
  target.classList.toggle("d-none");

  container.querySelector(`[data-type="amenities"]`).textContent = "Amenities";
  container.querySelector(`[data-type="midcity"]`).textContent = "Mid Cities";
  container.querySelector(`[data-type="images"]`).textContent = "Bus Images";
  container.querySelector(`[data-type="book"]`).textContent = "Select Seats";
};

const sideFilterEvent = () => {
  const { acType, seatType } = getActiveFilters();
  applyFilter(acType, seatType);
};

const updateSelectedSeatContainer = (targetParent, list, targetSchedule) => {
  const totolChargeContainer = targetParent.querySelector(".total-charges");
  const confirmBookingBtn = targetParent.querySelector(".confirm-booking-btn");
  const selectedSeatContainer = targetParent.querySelector(
    ".selected-seat-container"
  );
  const selectedSeatInfo = targetParent.querySelector(".selected-seat-info");
  const totalCharge = list.reduce(
    (acc, curr) => acc + curr.totalCharge,
    targetSchedule.additionalCharges
  );
  totolChargeContainer.querySelector("span").textContent =
    "₹" + new Intl.NumberFormat("en-IN").format(totalCharge);
  selectedSeatInfo.innerHTML =
    list.length === 0
      ? `<div class="text-secondary fw-semibold mb-1">
          No seats selected
        </div>
        <div class="text-muted small">
          Please select seats to continue booking
        </div>`
      : `<span class='fw-semibold me-auto text-muted'>${list.length} Selected Seats</span>`;

  if (list.length === 0) {
    selectedSeatInfo.classList.add("bg-light", "border", "p-4", "text-center");
    selectedSeatInfo.classList.remove("mb-2", "text-start");
    confirmBookingBtn.disabled = true;
    selectedSeatContainer.innerHTML = "";
    totolChargeContainer.classList.add("d-none");
  } else {
    selectedSeatInfo.classList.remove(
      "bg-light",
      "border",
      "p-4",
      "text-center"
    );
    selectedSeatInfo.classList.add("mb-2", "text-start");
    totolChargeContainer.classList.remove("d-none");
    confirmBookingBtn.disabled = false;
    selectedSeatContainer.innerHTML = `${list
      .map((seat) => {
        return `<div class="d-flex justify-content-between align-items-center border rounded-3 p-2" data-seat-number=${
          seat.seatNumber
        }>

          <div>
            <div class="fw-semibold text-dark">
              Seat ${seat.seatNumber}
              <span class="ms-2 fw-medium badge ${
                seat.isSleeper
                  ? "bg-danger-subtle text-danger"
                  : "bg-primary-subtle text-primary"
              } ">
                ${seat.isSleeper ? "Sleeper" : "Seater"}
              </span>
            </div>
            <div class="text-secondary small">
              ${seat.deck ? "Upper" : "Lower"} Deck
            </div>
          </div>

          <div class="d-flex align-items-center gap-3">
            <div class="fw-semibold text-dark">₹${seat.totalCharge}</div>

            <button
              class="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
              style="width: 32px; height: 32px;"
              data-type='remove'
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
        `;
      })
      .join("")}`;
  }
};

ac.forEach((node) => {
  node.addEventListener("input", sideFilterEvent);
});
seater.forEach((node) => {
  node.addEventListener("input", sideFilterEvent);
});

//*********************SEARCH************************* */
const selectCityEvent = (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const type = li.closest("ul")?.getAttribute("id");
  const id = li.dataset.id;
  const name = li.dataset.name;
  const state = li.dataset.state;

  if (!type || !id || !name || !state) return;

  li.closest("ul")?.classList.add("d-none");

  switch (type) {
    case "from_suggestion":
      from.value = `${name}, ${state}`;
      source.value = id;
      break;

    case "to_suggestion":
      to.value = `${name}, ${state}`;
      destination.value = id;
      break;
  }
};

const displaySearchRouteResult = (container, list) => {
  container.classList.remove("d-none");
  if (list.length === 0) {
    container.innerHTML = `<div class="d-flex align-items-center p-2"><i class="bi bi-geo-alt-fill me-2 text-primary fs-5"></i> <span class='text-muted'>No cities are available</span></div>`;
  } else {
    container.innerHTML = `${list
      .map((city) => {
        return `<li
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-end p-2"
            data-id=${city.cityId}
            data-name="${city.name}"
            data-state="${city.state.name}"
          >
            <i class="bi bi-geo-alt-fill me-2 text-primary fs-5"></i>
            <div class="d-flex align-items-center gap-1">
              <span class="fw-semibold">${city.name}</span>
              ,
              <small class="text-muted">${city.state.name}</small>
            </div>
          </li>`;
      })
      .join("")}`;
  }
};
const searchBusEvent = async (e) => {
  const target = e.target;
  const value = target.value;
  if (value.length <= 1) return;
  const type = target.getAttribute("id");
  if (!type) return;
  const targetContainer = type === "from" ? fromSuggestion : toSuggestion;
  if (!cache[value]) {
    submitBtn.disabled = true;
    searchCityRequest(value, (response) => {
      cache[value] = response === "invalid" ? [] : JSON.parse(response);
      displaySearchRouteResult(targetContainer, cache[value]);
    });
    submitBtn.disabled = false;
  } else {
    displaySearchRouteResult(targetContainer, cache[value]);
  }
};

from.addEventListener("focus", () => {
  fromSuggestion.classList.remove("d-none");
  toSuggestion.classList.add("d-none");
});
to.addEventListener("focus", () => {
  fromSuggestion.classList.add("d-none");
  toSuggestion.classList.remove("d-none");
});

from.addEventListener("blur", () => {
  fromSuggestion.classList.add("d-none");
});
to.addEventListener("blur", () => {
  toSuggestion.classList.add("d-none");
});

from.addEventListener("input", searchBusEvent);
to.addEventListener("input", searchBusEvent);
fromSuggestion.addEventListener("mousedown", selectCityEvent);
toSuggestion.addEventListener("mousedown", selectCityEvent);

clearFilterBtn.addEventListener("click", (e) => {
  if (!filterApplicable) {
    e.target.disabled = true;
    return;
  }

  e.target.disabled = false;
  clearFilter();
});

searchBusForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    !from.value ||
    !to.value ||
    !journeyDate.value ||
    !source.value ||
    !destination.value
  ) {
    return;
  }

  try {
    PageLoading.startLoading();
    disableFilter();
    const response = await getScheduleRequest({
      source: source.value,
      destination: destination.value,
      journey_date: journeyDate.value,
    });
    if (response === "invalid") throw new Error("Invalid Request");
    const searchResult = (modal.searchResults = JSON.parse(response));
    filterApplicable = modal.searchResults.length > 0;
    sessionStorage.setItem("searchResult", JSON.stringify(searchResult));
    displaySearchResult(searchResult);

    const urlParams = {
      from: from.value,
      to: to.value,
      journey_date: journeyDate.value,
      source: source.value,
      destination: destination.value,
    };

    PageLoading.stopLoading();

    const url = new URLSearchParams(window.location.search);

    for (const prop in urlParams) {
      url.set(prop, urlParams[prop]);
    }
    window.history.replaceState(
      {},
      "",
      window.location.pathname + "?" + url.toString()
    );
  } catch (err) {
    PageLoading.stopLoading();
    disableFilter();
    toast.error(err.message);
  }
});
/**************************SEARCH END **************************** */

searchResultContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const targetParent = target.closest("li");
  if (!targetParent) return;

  const { type } = target.dataset;
  const targetScheduleId =
    target.closest("[data-schedule-id]")?.dataset.scheduleId;

  const targetSchedule = modal.searchResults.find(
    (schedule) => schedule.scheduleId === +targetScheduleId
  );

  if (!targetScheduleId || isNaN(targetScheduleId)) return;
  if (!targetSchedule) return;

  switch (type) {
    case "amenities": {
      const aminityContainer = targetParent.querySelector(".amenities-list");
      target.classList.toggle("activa");
      updateBusInfoShow(targetParent, aminityContainer);

      if (aminityContainer.classList.contains("d-none")) {
        target.textContent = "Amenities";
      } else {
        target.textContent = "Hide Amenities";
      }
      break;
    }
    case "midcity": {
      const timeLineContainer = targetParent.querySelector(".time-line");
      target.classList.toggle("activa");
      updateBusInfoShow(targetParent, timeLineContainer);

      if (timeLineContainer.classList.contains("d-none")) {
        target.textContent = "Mid Cities";
      } else {
        target.textContent = "Hide Mid Cities";
      }
      break;
    }
    case "book": {
      const busContainer = targetParent.querySelector(".bus-container");
      updateBusInfoShow(targetParent, busContainer);

      if (busContainer.classList.contains("d-none")) {
        target.textContent = "Select Seats";
      } else {
        target.textContent = "Hide Seats";
      }
      break;
    }
    case "images": {
      const imageContainer = targetParent.querySelector(".images-list");
      updateBusInfoShow(targetParent, imageContainer);

      if (imageContainer.classList.contains("d-none")) {
        target.textContent = "Bus Images";
      } else {
        target.textContent = "Hide Images";
      }
      break;
    }
    case "seat": {
      if (target.classList.contains("booked")) break;

      target.classList.toggle("selected");
      const targetBus = target.closest("[data-seating-id]");
      const targetSeatingId = targetBus.dataset?.seatingId;

      const isSleeper = target.classList.contains("sleeper_seat");
      const isSelected = target.classList.contains("selected");

      const seatNumber = target.dataset?.seatNumber;
      if (
        !targetSeatingId ||
        isNaN(+targetSeatingId) ||
        !seatNumber ||
        isNaN(+seatNumber)
      )
        break;

      const targetSeating = targetSchedule.bus.seatingList.find(
        (seating) => seating.seatingId === +targetSeatingId
      );
      if (!targetSeating) break;
      if (!modal.selectedSeat[targetScheduleId]) {
        modal.selectedSeat[targetScheduleId] = [];
      }

      if (isSelected) {
        const newSeat = {
          seatNumber: +seatNumber,
          isSleeper,
          deck: targetSeating.deck,

          totalCharge:
            targetSchedule.totalCharges -
            targetSchedule.sleeperFare -
            targetSchedule.seaterFare -
            targetSchedule.additionalCharges +
            (isSleeper
              ? targetSchedule.sleeperFare
              : targetSchedule.seaterFare),
        };

        modal.selectedSeat[targetScheduleId].push(newSeat);
      } else {
        modal.selectedSeat[targetScheduleId] = modal.selectedSeat[
          +targetScheduleId
        ].filter((seat) => seat.seatNumber !== +seatNumber);
      }

      updateSelectedSeatContainer(
        targetParent,
        modal.selectedSeat[targetScheduleId],
        targetSchedule
      );
      break;
    }
    case "remove": {
      const seatNumber =
        target.closest("[data-seat-number]")?.dataset.seatNumber;

      targetParent
        .querySelector(`[data-seat-number="${seatNumber}"]`)
        ?.classList.remove("selected");
      modal.selectedSeat[targetScheduleId] = modal.selectedSeat[
        +targetScheduleId
      ].filter((seat) => seat.seatNumber !== +seatNumber);

      updateSelectedSeatContainer(
        targetParent,
        modal.selectedSeat[targetScheduleId]
      );
      break;
    }
    case "confirm": {
      if (
        !modal.selectedSeat[targetScheduleId] ||
        modal.selectedSeat[targetScheduleId].length === 0
      ) {
        break;
      }
      sessionStorage.setItem(
        "selectedSeatList",
        JSON.stringify(modal.selectedSeat[targetScheduleId])
      );
      sessionStorage.setItem("activeSchedule", JSON.stringify(targetSchedule));

      window.location.href = `${APP_URL}/confirm_booking.do`;
      break;
    }
    default: {
      break;
    }
  }
});

const init = () => {
  try {
    PageLoading.stopLoading();
    if (sessionStorage.getItem("searchResult")) {
      modal.searchResults = JSON.parse(sessionStorage.getItem("searchResult"));
    }
    filterApplicable = modal.searchResults.length > 0;
    displaySearchResult(modal.searchResults);
  } catch (err) {
    toast.error(err.message);
  }
};

init();
