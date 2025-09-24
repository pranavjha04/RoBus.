import { collectOperatorRouteRequest, collectRouteRequest } from "./service.js";
import { toast } from "./toast.js";

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

const hideList = (...elements) => {
  elements.forEach((element) => {
    element.classList.remove("d-block");
    element.classList.add("d-none");
  });
};

const showList = (...elements) => {
  elements.forEach((element) => {
    element.classList.add("d-block");
    element.classList.remove("d-none");
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
  const routeList = JSON.parse(sessionStorage.getItem("routeList"));

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

  hideList(searchDestinationResultList);
});

searchSource.addEventListener("blur", () => {
  setTimeout(() => {
    const firstChild = searchSourceResultList.firstChild;
    if (firstChild && !searchSourceHidden.value) {
      searchSource.value = firstChild.querySelector("span").textContent;
      searchSourceHidden.value = +firstChild.dataset.cityid;
    }
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
    hideList(searchDestinationResultList);
  }, 50);
});

window.addEventListener("DOMContentLoaded", async () => {
  setTimeout(async () => {
    try {
      await Promise.all([handleAllRoutes(), handleAllOperatorRoutes()]);
    } catch {
      window.location.reload();
    }
  }, 1000);
});

window.addEventListener("pagehide", () => {
  sessionStorage.removeItem("routeList");
  sessionStorage.removeItem("routeMidCityList");
  sessionStorage.removeItem("operatorRouteList");
  sessionStorage.removeItem("operatorRouteMidCityList");
});
