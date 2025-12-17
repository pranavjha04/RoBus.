import { PageLoading } from "./pageLoading.js";
import { searchCityRequest, getScheduleRequest } from "./service.js";
import { toast } from "./toast.js";
import { createURLParams } from "./util.js";
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

const acRadio = document.querySelector('input[name="bus_type_ac"]');
const cache = {};
let isFilterApplied = false;

const modal = {
  searchResults: [],
};

const resetFilter = () => {
  sortPrice.value = sortSeats.value = "";
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

const displaySearchResult = (list = []) => {
  if (!(list instanceof Array)) throw new Error("Invalid List");

  totalResultContainer.textContent = `${list.length} Results Found`;
  if (list.length === 0) {
    searchResultContainer.innerHTML = `<div class="d-flex align-items-center justify-content-center">
        <div class="no-bus-card">
          <h2>No buses found 😕</h2>
          <p>Please try another date or route.</p>
        </div>
      </div>`;
    if (!isFilterApplied) {
      disableFilter();
    }
  } else {
    enableFilter();
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
        break;
      }
      case "high": {
        break;
      }
      default: {
        break;
      }
    }
  });
});

const sideFilterEvent = () => {
  const { acType, seatType } = getActiveFilters();
  applyFilter(acType, seatType);
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
    toast.error(err.message);
  } finally {
    enableFilter();
  }
});
/**************************SEARCH END **************************** */

const init = () => {
  try {
    PageLoading.stopLoading();
    modal.searchResults = JSON.parse(sessionStorage.getItem("searchResult"));
    console.log(modal);
    displaySearchResult(modal.searchResults);
  } catch (err) {
    toast.error(err.message);
  }
  if (!sessionStorage.getItem("searchResult")) {
    history.back();
  }
};

window.addEventListener("beforeunload", (e) => {
  console.log("hell");
});

init();
