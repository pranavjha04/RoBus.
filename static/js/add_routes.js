import { filterNav } from "./filter_nav.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addOperatorRouteRequest,
  collectOperatorRouteRequest,
  collectRouteRequest,
} from "./service.js";
import { toast } from "./toast.js";
import { disableElements, displayInputError, enableElements } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

// add_route for
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

const addRouteForm = document.querySelector("#add_route_form");
const addRouteSubmitBtn = document.querySelector("#submit_add_route_btn");

const formModal = document.getElementById("centeredModal");

// filter
const allFilter = document.querySelectorAll(".filter");
const filterNavContainer = document.querySelector("#filter_nav");
const sortDuration = document.querySelector("#sort_duration");
const sortDistance = document.querySelector("#sort_distance");
const searchFilterSource = document.querySelector("#filter_source_search");
const searchFilterDestination = document.querySelector(
  "#filter_destination_search"
);
const searchRoutesBtn = document.querySelector("#search_routes_btn");
let filerApplied = false;

// info display
const infoList = document.querySelectorAll(".info");
const routeTable = document.querySelector("#route_table");

const pageWrapper = document.querySelector("#pageWrapper");
const removeFilter = document.querySelector("#remove_filter_btn");

const resetSelectRoutes = () => {
  selectedMidCityList.innerHTML = "";
  midCityTable.innerHTML = "";
  midCityTable.classList.add("d-none");
};

const resetInputValues = (...elements) => {
  elements.forEach((element) => (element.value = ""));
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

const resetAddRouteForm = () => {
  addRouteForm.reset();
  resetRouteList();
  resetMidCityList();
  resetSelectRoutes();
  midCityTable.innerHTML = "";

  disableElements(routeSelect, routeMidCitySelect);
  resetInputValues(
    searchSourceHidden,
    searchDestinationHidden,
    routeHidden,
    activeMidCity
  );
};

const displayMidCityTable = () => {
  if (selectedMidCityList.children.length === 0) {
    midCityTable.classList.add("d-none");
    return;
  }

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
  setTimeout(() => {
    routeSelect.focus();
  }, 100);

  routeSelect.textContent = "Select Route";

  const routeList = JSON.parse(sessionStorage.getItem("routeList"));
  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );

  const filterResult = routeList.filter((route) => {
    const condition = operatorRouteList.some((operatorRoute) => {
      const { route: currRoute } = operatorRoute;
      console.log(currRoute, route);
      return currRoute.routeId === route.routeId;
    });

    return (
      !condition &&
      route.source.cityId === +searchSourceHidden.value &&
      route.destination.cityId === +searchDestinationHidden.value
    );
  });

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

  setTimeout(() => {
    routeMidCitySelect.focus();
  }, 50);

  enableElements(routeMidCitySelect);

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
    setTimeout(async () => {
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
        const uniqueSet = {};
        const uniqueRouteList = routeList.filter((route) => {
          const key = `${route.source.cityId}-${route.destination.cityId}`;
          if (uniqueSet[key]) {
            return false;
          }
          uniqueSet[key] = route;
          return true;
        });
        sessionStorage.setItem(
          "uniqueRouteList",
          JSON.stringify(uniqueRouteList)
        );
      } else {
        throw new Error("Internal Server Error");
      }
    }, 500);
  } catch (err) {
    toast.error(err.message);
  }
};

const handleAllOperatorRoutes = async (firstTime = false) => {
  if (!firstTime) routeTable.innerHTML = ViewHelper.getTableLoader();

  try {
    setTimeout(async () => {
      const response = await collectOperatorRouteRequest();
      if (response === "invalid") {
        throw new Error("Invalid Request");
      }
      if (response.startsWith("{")) {
        const routeMap = JSON.parse(response);
        const { operatorRouteList, operatorRouteMidCityList } = routeMap;

        operatorRouteList.forEach((operatorRoute) => {
          const { route } = operatorRoute;
          const midCityList = operatorRouteMidCityList.filter(
            (mid) =>
              mid.operatorRoute.route.routeId === operatorRoute.route.routeId
          );
          route.duration = midCityList.reduce((curr, { haltingTime }) => {
            return curr + haltingTime;
          }, route.duration);
        });

        sessionStorage.setItem(
          "operatorRouteList",
          JSON.stringify(operatorRouteList)
        );
        sessionStorage.setItem(
          "operatorRouteMidCityList",
          JSON.stringify(operatorRouteMidCityList)
        );
        PageLoading.stopLoading();
        initDisplay();
      } else {
        throw new Error("Internal Server Error");
      }
    }, 500);
  } catch (err) {
    PageLoading.stopLoading();
    toast.error(err.message);
    routeTable.innerHTML = ViewHelper.getTableEmptyMessage(err.message);
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

searchRoutesBtn.addEventListener("click", () => {
  const sourceValue = searchFilterSource.value.trim().toLowerCase();
  const destinationValue = searchFilterDestination.value.trim().toLowerCase();

  if (!sourceValue && !destinationValue) return;

  const operatorRouteList =
    JSON.parse(sessionStorage.getItem("operatorRouteList")) || [];

  const filterResult = operatorRouteList.filter(({ route }) => {
    const sourceName = route.source.name.toLowerCase();
    const destinationName = route.destination.name.toLowerCase();

    const sourceMatch = sourceValue ? sourceName.includes(sourceValue) : true;
    const destinationMatch = destinationValue
      ? destinationName.includes(destinationValue)
      : true;

    return sourceMatch && destinationMatch;
  });

  displayRouteInfo(filterResult);
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

  disableElements(addHaltingTimeBtn);
  const hiddenValue = `<input type="hidden" value="${routeHidden.value}-${activeMidCity.value}-${haltingTime.value}" name='route_midcity_halting' id="${routeHidden.value}-${activeMidCity.value}" />`;

  selectedMidCityList.innerHTML += hiddenValue;

  // hide values
  haltingTime.value = "";

  displayRouteMidCitySelect();
  disableElements(haltingTime);
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

const handleHaltingTimeEdit = (parent) => {
  const { routemidcityid, routeid } = parent.dataset;
  if (!routemidcityid || !routeid) return;

  const targetElement = document.getElementById(`${routeid}-${routemidcityid}`);
  if (!targetElement) return;

  const haltingDiv = parent.querySelector(".halting");
  if (!haltingDiv) return;

  const oldHaltingValue = targetElement.value.substring(
    targetElement.value.lastIndexOf("-") + 1
  );
  haltingDiv.innerHTML = `<span
                                ><input
                                  class="input text-center p-0 rounded-2 focus-ring"
                                  value="${oldHaltingValue}"
                                  id=${Math.random()}
                                  type='number'
                              /></span>`;
  const changeHaltingEditInput = parent.querySelector("input");

  changeHaltingEditInput.focus();
  changeHaltingEditInput.select();

  changeHaltingEditInput.addEventListener("blur", (e) => {
    const value = +e.target.value;

    if (!value || isNaN(value) || value < 0 || value > 120) {
      e.target.value = oldHaltingValue;
      toast.error("Invalid Operation");
    } else {
      targetElement.value = `${routeid}-${routemidcityid}-${e.target.value}`;
      if (+oldHaltingValue !== +e.target.value)
        toast.success("Halting Time Updated Successfully");
    }
    haltingDiv.innerHTML = `<span
                                >${
                                  +e.target.value < 60
                                    ? `${+e.target.value} mins`
                                    : ""
                                }
                                ${
                                  +e.target.value > 60
                                    ? `${Math.trunc(+e.target.value / 60)}h ${
                                        +e.target.value % 60
                                      }m`
                                    : ""
                                }
                              </span>`;
  });
};

const handleHaltingTimeDelete = (parent) => {
  const { routemidcityid, routeid } = parent.dataset;
  if (!routemidcityid || !routeid) return;

  const targetElement = document.getElementById(`${routeid}-${routemidcityid}`);
  if (!targetElement) return;

  targetElement.remove();
  parent.remove();

  displayRouteMidCitySelect();

  displayMidCityTable();
  toast.success("Mid City Delete Successfully");
};

midCityTable.addEventListener("click", (e) => {
  const target = e.target.closest(".feature-btn");
  if (!target) return;
  const { type } = target.dataset;
  const parent = target.closest("tr");
  if (!parent) return;

  switch (type) {
    case "edit": {
      handleHaltingTimeEdit(parent);
      break;
    }
    case "delete": {
      handleHaltingTimeDelete(parent);
      break;
    }
    default: {
      break;
    }
  }
});
const disableFilter = (all = false) => {
  disableElements(sortDistance, sortDuration);
  if (all) {
    filterNav.disable();
  }
};

const enableFilter = (all = false) => {
  filterNav.enable();
  if (all) {
    enableElements(sortDistance, sortDuration);
  }
};

const resetFilter = () => {
  filterNav.start();
  searchFilterSource.value = searchFilterDestination.value = "";
  sortDistance.value = sortDuration.value = "";

  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );

  displayRouteInfo(operatorRouteList);
};

const filterEvent = () => {
  const tableBody = [...routeTable.querySelector("tbody").children];

  tableBody.forEach((row) => {
    const { source, destination, distance, duration, status } = row.dataset;
  });
};

removeFilter.addEventListener("click", () => {
  if (removeFilter.disabled) {
    disableElements(removeFilter);
    return;
  }
  resetFilter();
});

formModal.addEventListener("hidden.bs.modal", () => {
  resetAddRouteForm();
});

formModal.addEventListener("show.bs.modal", () => {
  resetAddRouteForm();
});

const displayRouteInfo = (operatorRouteList = []) => {
  if (operatorRouteList.length === 0) {
    routeTable.innerHTML = ViewHelper.getTableEmptyMessage("No Records Found");
    disableFilter(false);
  } else {
    enableFilter(true);
    routeTable.innerHTML = ViewHelper.getRouteInfoTableHeading();
    routeTable.innerHTML += `<tbody>${operatorRouteList
      .map(ViewHelper.getRouteInfoTableBody)
      .join("")}</tbody>`;
  }
};

const filterSortResult = (type, value) => {
  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );
  filerApplied = true;
  filterEvent();
  switch (value) {
    case "low": {
      const filterResult = operatorRouteList.sort(
        (a, b) => a.route[type] - b.route[type]
      );
      displayRouteInfo(filterResult);
      break;
    }
    case "high": {
      const filterResult = operatorRouteList.sort(
        (a, b) => b.route[type] - a.route[type]
      );
      displayRouteInfo(filterResult);
      break;
    }
    default: {
      displayRouteInfo(operatorRouteList);
      break;
    }
  }
};

const handleFilterEvent = (e) => {
  const value = e.target.value;
  const { type } = e.target.dataset;

  e.target.value = value;
  filterSortResult(type, value);
};

sortDistance.addEventListener("change", handleFilterEvent);
sortDuration.addEventListener("change", handleFilterEvent);

filterNavContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".btn");
  if (!target) return;

  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );

  switch (target.textContent) {
    case "Active": {
      const filterResult = operatorRouteList.filter(
        ({ status }) => status.name === "Active"
      );
      displayRouteInfo(filterResult);
      break;
    }
    case "Inactive": {
      const filterResult = operatorRouteList.filter(
        ({ status }) => status.name === "Inactive"
      );
      displayRouteInfo(filterResult);
      break;
    }
    default: {
      displayRouteInfo(operatorRouteList);
      break;
    }
  }
});

const updateInfoDisplay = async () => {
  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );

  const infoData = operatorRouteList.reduce(
    (acc, { status }) => {
      return status.name === "Active"
        ? { ...acc, total: acc.total + 1, active: acc.active + 1 }
        : { ...acc, total: acc.total + 1, inActive: acc.inActive + 1 };
    },
    {
      total: 0,
      active: 0,
      inActive: 0,
    }
  );
  Object.keys(infoData).forEach((key) => {
    document.querySelector(`[data-info-name="${key}"]`).textContent =
      infoData[key];
  });
};

const updateFilterDisplay = () => {
  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );
  if (operatorRouteList.length === 0) {
    filterNav.disable();
    allFilter.forEach((filter) => (filter.disabled = true));
  } else {
    filterNav.enable();
    allFilter.forEach((filter) => (filter.disabled = false));
  }
};

const updateOperatorRouteInfoTable = () => {
  updateFilterDisplay();
  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );

  displayRouteInfo(operatorRouteList);
};

const initDisplay = () => {
  updateInfoDisplay();
  updateOperatorRouteInfoTable();
};

addRouteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!routeHidden.value) {
    toast.error("Add Valid Details");
    return;
  }

  disableElements(addRouteSubmitBtn);
  addRouteSubmitBtn.value = "Submitting...";

  const formData = new FormData(addRouteForm);
  setTimeout(async () => {
    const response = await addOperatorRouteRequest(formData);

    enableElements(addRouteSubmitBtn);
    addRouteSubmitBtn.value = "Add Route";
    try {
      switch (response) {
        case "internal": {
          throw new Error("Internal Server error");
        }
        case "invalid": {
          throw new Error("Invalid Request");
        }
        case "success": {
          toast.success("Route Added Successfully");
          resetAddRouteForm();
          resetFilter();
          const modal = bootstrap.Modal.getInstance(formModal);
          modal.hide();
          await Promise.all([handleAllOperatorRoutes()]);
          break;
        }
        default: {
          throw new Error("Invalid Request");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, 500);
});

const filteAppliedInterval = setInterval(() => {
  if (
    searchFilterSource.value ||
    searchFilterDestination.value ||
    sortDistance.value ||
    sortDuration.value ||
    !filterNavContainer.firstElementChild.classList.contains("btn-primary")
  ) {
    enableElements(removeFilter);
  } else {
    disableElements(removeFilter);
  }
}, 100);

window.addEventListener("DOMContentLoaded", async () => {
  try {
    PageLoading.startLoading();
    await Promise.all([handleAllRoutes(), handleAllOperatorRoutes(true)]);
  } catch (err) {
    toast.error(err.message);
    pageWrapper.innerHTML = PageError.showOperatorError();
    clearInterval(filteAppliedInterval);
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
  clearInterval(filteAppliedInterval);
});
