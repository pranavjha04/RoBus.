import {
  collectOperatorRouteRequest,
  collectRouteRequest,
  deleteFareFactorRequest,
} from "./service.js";
import { toast } from "./toast.js";
import { disableElements, enableElements } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

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
const activeMidCity = document.querySelector("#route_midcity_id");

const haltingTime = document.querySelector("#halting_time");
const addHaltingTimeBtn = document.querySelector("#add_midcity_btn");
const selectedMidCityList = document.querySelector("#selected_midcity_list");

const midCityTable = document.querySelector("#mid_city_selected_table");

const resetSelectRoutes = () => {
  selectedMidCityList.innerHTML = "";
  midCityTable.innerHTML = "";
  midCityTable.classList.add("d-none");
};

const resetHaltingTime = () => {
  haltingTime.value = "";
  disableElements(haltingTime, addHaltingTimeBtn);

  resetSelectRoutes();
};

const resetRouteList = () => {
  routeAvailableList.innerHTML = "";
  routeHidden.value = "";
  routeSelect.textContent = "Select Route";
};
const resetMidCityList = () => {
  routeMidCityAvailableList.innerHTML = "";
  activeMidCity.value = "";
  routeMidCitySelect.textContent = "Select Mid City";

  resetHaltingTime();
};

const displayMidCityTable = () => {
  midCityTable.classList.remove("d-none");

  midCityTable.innerHTML = ViewHelper.getSelectMidCityAddRouteFormHead();

  const routeMidCityList = JSON.parse(
    sessionStorage.getItem("routeMidCityList")
  );

  const filterResult = routeMidCityList.filter((midCity) => {
    const condition = Array.from(selectedMidCityList.childNodes).some(
      (node) => {
        const splitValues = node.value.split("-");
        const midCityId = +splitValues[1];
        const haltingTime = +splitValues[2];
        if (midCity.routeMidCityId === midCityId) {
          midCity.haltingTime = haltingTime;
        }

        return midCity.routeMidCityId === midCityId;
      }
    );

    return midCity.route.routeId === +routeHidden.value && condition;
  });

  if (filterResult.length === 0) {
    return;
  }

  midCityTable.innerHTML += `<tbody>${Array.from(filterResult)
    .map(ViewHelper.getSelectMidCityAddRouteFormBodyRow)
    .join("")}</tbody>`;
};
const displayRouteSelect = () => {
  routeSelect.focus();

  routeSelect.textContent = "Select Route";

  const routeList = JSON.parse(sessionStorage.getItem("routeList"));
  const filterResult = routeList.filter(
    (route) =>
      route.source.cityId === +searchSourceHidden.value &&
      route.destination.cityId === +searchDestinationHidden.value
  );

  if (filterResult.length === 0) {
    routeSelect.textContent = "No Routes Available";
    disableElements(routeSelect);
    return;
  }

  routeAvailableList.innerHTML = filterResult
    .map(ViewHelper.getRoutesSelectList)
    .join("");
};

const displayRouteMidCitySelect = () => {
  if (!routeHidden.value || isNaN(+routeHidden.value)) {
    return;
  }

  enableElements(routeMidCitySelect);

  routeMidCitySelect.focus();

  routeMidCitySelect.textContent = "Select Mid City";

  const routeMidCityList = JSON.parse(
    sessionStorage.getItem("routeMidCityList")
  );

  const filterResult = routeMidCityList.filter((midCity) => {
    const condition = Array.from(selectedMidCityList.childNodes).every(
      (node) => {
        const currMidCityId = +node.value.split("-")[1];
        return midCity.routeMidCityId !== currMidCityId;
      }
    );
    return midCity.route.routeId === +routeHidden.value && condition;
  });

  if (filterResult.length === 0) {
    routeMidCitySelect.textContent = "No Mid Cities Available";
    disableElements(routeMidCitySelect, haltingTime);
    return;
  }

  routeMidCityAvailableList.innerHTML = filterResult
    .map(ViewHelper.getRouteMidCitySelectList)
    .join("");
};

const watchSearchSourceDestination = () => {
  if (!searchSourceHidden.value || !searchDestinationHidden.value) {
    disableElements(
      routeSelect,
      routeMidCitySelect,
      haltingTime,
      addHaltingTimeBtn
    );

    // routes
    resetRouteList();

    // midcity
    resetMidCityList();

    // haltingTime
    resetHaltingTime();
    return;
  }
  enableElements(routeSelect);

  displayRouteSelect();
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

  const otherDetails =
    target.querySelector(".route").textContent +
    ", " +
    target.querySelector(".distance").textContent +
    ", " +
    target.querySelector(".duration").textContent;

  routeHidden.value = target.dataset.routeid;
  routeSelect.textContent = otherDetails;

  resetMidCityList();

  displayRouteMidCitySelect();
});

routeMidCityAvailableList.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  if (!target) return;

  const details =
    target.querySelector(".city").textContent +
    ", " +
    target.querySelector(".distance").textContent +
    ", " +
    target.querySelector(".duration").textContent;
  routeMidCitySelect.textContent = details;
  activeMidCity.value = target.dataset.routemidcityid;

  enableElements(haltingTime);
});

haltingTime.addEventListener("input", (e) => {
  const value = +e.target.value;

  if (!value || isNaN(value) || value < 0 || value > 120) {
    e.target.value = "";
    disableElements(addHaltingTimeBtn);
  } else {
    enableElements(addHaltingTimeBtn);
  }
});

addHaltingTimeBtn.addEventListener("click", (e) => {
  if (!activeMidCity.value) {
    disableElements(addHaltingTimeBtn);
    return;
  }

  const hiddenValue = `<input type="hidden" value="${routeHidden.value}-${activeMidCity.value}-${haltingTime.value}" name='route_midcity_halting' />`;
  selectedMidCityList.innerHTML += hiddenValue;

  toast.success("Mid City Added Successfully");

  // hide values
  haltingTime.value = "";

  displayRouteMidCitySelect();

  displayMidCityTable();
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
