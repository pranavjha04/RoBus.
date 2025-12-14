import { PageLoading } from "./pageLoading.js";
import { getScheduleRequest, searchCityRequest } from "./service.js";
import { toast } from "./toast.js";
import { createURLParams } from "./util.js";

const from = document.querySelector("#from");
const to = document.querySelector("#to");
const fromSuggestion = document.querySelector("#from_suggestion");
const toSuggestion = document.querySelector("#to_suggestion");
const swapper = document.querySelector("#swapper");
const journeyDate = document.querySelector("#journey_date");
const searchBusForm = document.querySelector("#search_bus_form");
const source = document.querySelector("#source");
const destination = document.querySelector("#destination");
const submitBtn = document.querySelector("#submit");
const todayBtn = document.querySelector("#today_date");
const tomorrowBtn = document.querySelector("#tomorrow_date");

const APP_URL = "http://localhost:8080/bts";

const cache = {};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

swapper.addEventListener("click", () => {
  if (!from.value && !to.value) return;
  swapper.style.transform = `scale(0.65) rotate(180deg)`;

  setTimeout(() => {
    swapper.style.transform = `scale(1.0) `;
    [from.value, to.value] = [to.value, from.value];
    [fromSuggestion.innerHTML, toSuggestion.innerHTML] = [
      toSuggestion.innerHTML,
      fromSuggestion.innerHTML,
    ];
    [source.value, destination.value] = [destination.value, source.value];
  }, 350);
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

const displaySearchResult = (container, list) => {
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
      displaySearchResult(targetContainer, cache[value]);
    });
    submitBtn.disabled = false;
  } else {
    displaySearchResult(targetContainer, cache[value]);
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

todayBtn.addEventListener("click", () => {
  const today = new Date();
  journeyDate.value = formatDate(today);
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
    console.log("he");
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
    const urlParams = createURLParams({
      from: from.value,
      to: to.value,
      journey_date: journeyDate.value,
      source: source.value,
      destination: destination.value,
    });
    PageLoading.stopLoading();
    window.location.href = `${APP_URL}/search_results.do?${urlParams.toString()}`;
  } catch (err) {
    PageLoading.stopLoading();
    toast.error(err.message);
  }
});

tomorrowBtn.addEventListener("click", () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  journeyDate.value = formatDate(d);
});

window.addEventListener("DOMContentLoaded", () => {
  PageLoading.stopLoading();
});
