import { PageLoading } from "./pageLoading.js";
import { searchCityRequest, getScheduleRequest } from "./service.js";
import { toast } from "./toast.js";
import { createURLParams } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const searchResultContainer = document.querySelector(
  "#search_result_container"
);
const totalResultContainer = document.querySelector("#total_result");
const sortPrice = document.querySelector("#sort_price");
const sortSeats = document.querySelector("#sort_seat");

const from = document.querySelector("#from");
const to = document.querySelector("#to");
const fromSuggestion = document.querySelector("#from_suggestion");
const toSuggestion = document.querySelector("#to_suggestion");
const journeyDate = document.querySelector("#journey_date");
const searchBusForm = document.querySelector("#search_bus_form");
const source = document.querySelector("#source");
const destination = document.querySelector("#destination");
const submitBtn = document.querySelector("#submit");

const cache = {};

const modal = {
  searchResults: [],
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const resetFilter = () => {
  sortPrice.value = sortSeats.value = "";
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
  } else {
    searchResultContainer.innerHTML = modal.searchResults
      .map(ViewHelper.getSearchResultRow)
      .join("");
  }
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
    const response = await getScheduleRequest({
      source: source.value,
      destination: destination.value,
      journey_date: journeyDate.value,
    });
    if (response === "invalid") throw new Error("Invalid Request");
    const searchResult = JSON.parse(response);
    sessionStorage.setItem("searchResult", JSON.stringify(searchResult));
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
    console.log(url.toString());

    // ✅ NO RELOAD
    window.history.replaceState(
      {},
      "",
      window.location.pathname + "?" + url.toString()
    );
  } catch (err) {
    PageLoading.stopLoading();
    toast.error(err.message);
  }
});

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
