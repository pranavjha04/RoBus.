import { collectOperatorRouteRequest, collectRouteRequest } from "./service.js";
import { toast } from "./toast.js";
import { disableElements, enableElements } from "./util.js";

const searchSource = document.querySelector("#route_source");
const searchDestination = document.querySelector("#route_destination");
const searchSourceResultList = document.querySelector("#source_list");
const searchDestinationResultList = document.querySelector("#destination_list");
const searchSourceHidden = document.querySelector("#source_search_id");
const searchDestinationHidden = document.querySelector(
  "#destination_search_id"
);

// cache
const searchSourceCache = {};
const searchDestinationCache = {};

const routeSelect = document.querySelector("#route_select");
const routeAvailableList = document.querySelector("#route_available_list");
const routeHidden = document.querySelector("#route_id");

const routeMidCitySelect = document.querySelector("#route_midcity_select");
const routeMidCityAvailableList = document.querySelector(
  "#route_midcity_available_list"
);
const midCityHidden = document.querySelector("#route_midcity_id");

const watchSearchSourceDestination = () => {
  if (!searchSourceHidden.value || !searchDestinationHidden.value) {
    disableElements(routeSelect);
    routeAvailableList.innerHTML = "";
    routeSelect.textContent = "Select Route";
    routeHidden.value = "";
    return;
  }
  enableElements(routeSelect);
  const routeList = JSON.parse(sessionStorage.getItem("routeList"));
  const filterResult = routeList.filter(
    (route) =>
      route.source.cityId === +searchSourceHidden.value &&
      route.destination.cityId === +searchDestinationHidden.value
  );

  routeAvailableList.innerHTML = filterResult
    .map((route) => {
      const { routeId, source, destination, distance, duration } = route;
      const { name: sourceCityName, state: sourceState } = source;
      const { name: destinationCityName, state: destinationState } =
        destination;
      const { name: sourceStateName } = sourceState;
      const { name: destinationStateName } = destinationState;
      console.log(route);
      return ` <li role="button" class="border-bottom cursor-pointer" data-routeId=${routeId}>
                      <a class="dropdown-item d-flex flex-column py-2">
                        <div class="fw-semibold route">
                          &#128205; ${sourceCityName} &rarr; ${destinationCityName}
                        </div>
                        <small class="text-muted"
                          >${sourceStateName} &rarr; ${destinationStateName}</small
                        >
                        <div class="d-flex gap-3 small text-muted mt-1">
                          <div class="d-flex gap-1">
                            &#128338; <span class='duration'>${
                              duration / 60
                            }h ${duration % 60}m</span>
                          </div>
                          <div class="d-flex gap-1">
                            &#128205; <span class='distance'>${distance} km</span>
                          </div>
                        </div>
                      </a>
                    </li>`;
    })
    .join("");
  enableElements(routeList);
};

const watchEvent = () => {
  watchSearchSourceDestination();
};

const hideList = (...elements) => {
  elements.forEach((element) => {
    element.classList.remove("d-block");
    element.classList.add("d-none");
    element.innerHTML = "";
  });
};

const showList = (...elements) => {
  elements.forEach((element) => {
    element.classList.add("d-block");
    element.classList.remove("d-none");
    element.innerHTML = "";
  });
};

const displaySearchResult = (
  searchListElement,
  searchResult,
  source = true
) => {
  if (!searchListElement || !searchResult || !searchResult.length) return;
  showList(searchListElement);
  searchListElement.innerHTML = searchResult
    .map((route) => {
      const city = source ? route.source : route.destination;
      const { cityId, name: cityName, state } = city;
      const { stateId, name: stateName } = state;
      return `<li role='button' class="dropdown-item py-2 border-bottom" data-cityId=${cityId} data-statId=${stateId}>
                  &#128205; <span>${cityName}</span>
                  <small class="text-muted">${stateName}</small>
              </li>`;
    })
    .join("");
};

const getFilterSearchResult = (target, source = true) => {
  target = target.toLowerCase();
  const routeList = JSON.parse(sessionStorage.getItem("uniqueRouteList"));

  return routeList.filter((route) => {
    const city = source ? route.source : route.destination;
    const { cityId, name: cityName, state } = city;
    const { name: stateName } = state;
    if (!source) {
      const condition = cityId !== +searchSourceHidden.value;
      return (
        (condition && cityName.toLowerCase().includes(target)) ||
        (condition && stateName.toLowerCase().includes(target))
      );
    } else {
      const condition = cityId !== +searchDestinationHidden.value;
      return (
        (condition && cityName.toLowerCase().includes(target)) ||
        (condition && stateName.toLowerCase().includes(target))
      );
    }
  });
};

const handleAllRoutes = async () => {
  try {
    const response = await collectRouteRequest();
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response.startsWith("{")) {
      const routeMap = JSON.parse(response);
      const { routeList, routeMidCityList } = routeMap;

      sessionStorage.setItem("routeList", JSON.stringify(routeList));
      sessionStorage.setItem(
        "routeMidCityList",
        JSON.stringify(routeMidCityList)
      );
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const handleAllOperatorRoutes = async () => {
  try {
    const response = await collectOperatorRouteRequest();
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response.startsWith("{")) {
      const routeMap = JSON.parse(response);
      const { operatorRouteList, operatorRouteMidCityList } = routeMap;

      sessionStorage.setItem(
        "operatorRouteList",
        JSON.stringify(operatorRouteList)
      );
      sessionStorage.setItem(
        "operatorRouteMidCityList",
        JSON.stringify(operatorRouteMidCityList)
      );
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    toast.error(err.message);
  }
};

searchSource.addEventListener("input", (e) => {
  const element = e.target;
  const value = element.value;
  if (!value || value.length <= 2) {
    searchSourceHidden.value = "";
    hideList(searchSourceResultList);
    watchEvent();
    return;
  }

  if (!searchSourceCache[value]) {
    searchSourceCache[value] = getFilterSearchResult(value);
  }
  displaySearchResult(searchSourceResultList, searchSourceCache[value]);
});

searchDestination.addEventListener("input", (e) => {
  const element = e.target;
  const value = element.value;

  if (!value || value.length <= 2) {
    searchDestinationHidden.value = "";
    hideList(searchDestinationResultList);
    watchEvent();
    return;
  }

  if (!searchDestinationCache[value]) {
    searchDestinationCache[value] = getFilterSearchResult(value, false);
  }

  displaySearchResult(
    searchDestinationResultList,
    searchDestinationCache[value],
    false
  );
});

searchSourceResultList.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  if (!target) return;
  const { cityid: cityId } = target.dataset;
  const cityName = target.querySelector("span").textContent;
  searchSourceHidden.value = cityId;
  searchSource.value = cityName;
  watchEvent();
  hideList(searchSourceResultList);
});

searchDestinationResultList.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  if (!target) return;

  console.log(target);
  const { cityid: cityId } = target.dataset;
  const cityName = target.querySelector("span").textContent;
  searchDestinationHidden.value = cityId;
  searchDestination.value = cityName;

  watchEvent();
  hideList(searchDestinationResultList);
});

routeAvailableList.addEventListener("mousedown", (e) => {
  enableElements(routeSelect);
  const target = e.target.closest("li");
  if (!target) return;

  const deails =
    target.querySelector(".route").textContent +
    ", " +
    target.querySelector(".distance").textContent +
    ", " +
    target.querySelector(".duration").textContent;

  routeHidden.value = target.dataset.routeid;
  routeSelect.textContent = deails;
});

searchSource.addEventListener("blur", () => {
  setTimeout(() => {
    const firstChild = searchSourceResultList.firstChild;
    if (firstChild && !searchSourceHidden.value) {
      searchSource.value = firstChild.querySelector("span").textContent;
      searchSourceHidden.value = +firstChild.dataset.cityid;
    }
    watchEvent();

    hideList(searchSourceResultList);
  }, 50);
});

searchDestination.addEventListener("blur", () => {
  setTimeout(() => {
    const firstChild = searchDestinationResultList.firstChild;
    if (firstChild && !searchDestinationHidden.value) {
      searchDestination.value = firstChild.querySelector("span").textContent;
      searchDestinationHidden.value = +firstChild.dataset.cityid;
    }
    watchEvent();
    hideList(searchDestinationResultList);
  }, 50);
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await Promise.all([handleAllRoutes(), handleAllOperatorRoutes()]);
    const routeList = JSON.parse(sessionStorage.getItem("routeList"));
    const uniqueSet = new Set();
    const uniqueRouteList = routeList.filter((route) => {
      const key = `${route.source.cityId}-${route.destination.cityId}`;
      if (uniqueSet.has(key)) {
        return false;
      }
      uniqueSet.add(key);
      return true;
    });
    sessionStorage.setItem("uniqueRouteList", JSON.stringify(uniqueRouteList));
  } catch {
    window.location.reload();
  }
});

window.addEventListener("pagehide", () => {
  [
    "routeList",
    "routeMidCityList",
    "operatorRouteList",
    "operatorRouteMidCityList",
    "uniqueRouteList",
  ].forEach((item) => {
    sessionStorage.removeItem(item);
  });
});
