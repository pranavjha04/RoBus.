import { filterNav } from "./filter_nav.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addOperatorRouteRequest,
  collectOperatorRouteRequest,
  collectRouteRequest,
  searchCityRequest,
} from "./service.js";
import { toast } from "./toast.js";
import { disableElements, enableElements } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

// add_route for
const searchSource = document.querySelector("#route_source");
const searchDestination = document.querySelector("#route_destination");
const searchSourceResultList = document.querySelector("#source_list");
const searchDestinationResultList = document.querySelector("#destination_list");

const searchRoutes = document.querySelector("#search_route");
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

const modal = {
  operatorRouteList: [],
  routeList: [],
  routeMidCityList: [],
  selectedMidCityList: [],
};

// filter
const allFilter = document.querySelectorAll(".filter");
const filterNavContainer = document.querySelector("#filter_nav");
const searchFilterSource = document.querySelector("#filter_source_search");
const searchFilterDestination = document.querySelector(
  "#filter_destination_search"
);
const searchRoutesBtn = document.querySelector("#search_routes_btn");

// info display
const routeTable = document.querySelector("#route_table");
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
  modal.routeList = [];
  modal.routeMidCityList = [];
  modal.selectedMidCityList = [];

  disableElements(routeSelect, routeMidCitySelect);
  resetInputValues(routeHidden, activeMidCity);
};

const handleAllRoutes = async () => {
  const source = searchSource.value;
  const destination = searchDestination.value;

  try {
    if (!source || !destination) throw new Error("Invalid Input");

    const response = await collectRouteRequest(source, destination);
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response.startsWith("{")) {
      const routeMap = JSON.parse(response);
      for (const prop in routeMap) {
        modal[prop] = routeMap[prop];
      }

      modal.routeList = modal.routeList.filter((currRoute) => {
        return !modal.operatorRouteList.some(
          ({ route }) => route.routeId === currRoute.routeId
        );
      });

      modal.routeMidCityList = modal.routeMidCityList.filter(({ route }) => {
        return modal.routeList.some(
          (currRoute) => currRoute.routeId === route.routeId
        );
      });
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const displayMidCityTable = () => {
  if (selectedMidCityList.children.length === 0) {
    midCityTable.classList.add("d-none");
    return;
  }

  midCityTable.classList.remove("d-none");

  midCityTable.innerHTML = ViewHelper.getSelectMidCityAddRouteFormHead();

  const routeMidCityList = modal.routeMidCityList;

  midCityTable.innerHTML += `<tbody>${Array.from(modal.selectedMidCityList)
    .map(ViewHelper.getSelectMidCityAddRouteFormBodyRow)
    .join("")}</tbody>`;
};
const displayRouteSelect = async () => {
  routeSelect.textContent = "Select Route";
  await handleAllRoutes();
  if (modal.routeList.length === 0) {
    disableElements(routeSelect);
    routeSelect.textContent = "No Routes are available";
    routeAvailableList.innerHTML = "";
    return;
  }
  enableElements(routeSelect);
  routeAvailableList.innerHTML = modal.routeList
    .map(ViewHelper.getRoutesSelectList)
    .join("");

  displayRouteMidCitySelect();
};

const displayRouteMidCitySelect = () => {
  if (!routeHidden.value || isNaN(+routeHidden.value)) {
    return;
  }

  enableElements(routeMidCitySelect);

  routeMidCitySelect.textContent = "Select Mid City";

  const routeMidCityList = modal.routeMidCityList;

  if (routeMidCityList.length === 0) {
    routeMidCitySelect.textContent = "No Mid Cities Available";
    disableElements(routeMidCitySelect, haltingTime);
    return;
  }

  routeMidCityAvailableList.innerHTML = routeMidCityList
    .map(ViewHelper.getRouteMidCitySelectList)
    .join("");
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

const displaySearchResult = (searchResult, searchListElement) => {
  if (!searchResult?.length) return;
  showList(searchListElement);
  searchListElement.innerHTML = searchResult

    .map((city) => {
      const { cityId, name: cityName, state } = city;
      const { stateId, name: stateName } = state;
      return `<li role='button' class="dropdown-item py-2 border-bottom" data-cityId=${cityId} data-statId=${stateId}>
                  &#128205; <span>${cityName}</span>
                  <small class="text-muted">${stateName}</small>
              </li>`;
    })
    .join("");
};

const handleAllOperatorRoutes = async (firstTime = false) => {
  if (!firstTime) routeTable.innerHTML = ViewHelper.getTableLoader();

  try {
    setTimeout(async () => {
      const response = await collectOperatorRouteRequest();
      if (response === "invalid") {
        throw new Error("Invalid Request");
      }
      if (response.startsWith("[")) {
        const operatorRouteList = JSON.parse(response);
        modal.operatorRouteList = operatorRouteList;
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
  if (!value || value.length <= 1) {
    hideList(searchSourceResultList);
    return;
  }
  searchCityRequest(value, (data) => {
    displaySearchResult(JSON.parse(data), searchSourceResultList);
  });
});

searchDestination.addEventListener("input", (e) => {
  const element = e.target;
  const value = element.value;

  if (!value || value.length <= 1) {
    hideList(searchDestinationResultList);
    return;
  }
  searchCityRequest(value, (data) => {
    displaySearchResult(JSON.parse(data), searchDestinationResultList);
  });
});

searchRoutesBtn.addEventListener("click", () => {
  const sourceValue = searchFilterSource.value.trim().toLowerCase();
  const destinationValue = searchFilterDestination.value.trim().toLowerCase();

  if (!sourceValue && !destinationValue) return;

  const operatorRouteList = modal.operatorRouteList;

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

searchSourceResultList.addEventListener("click", (e) => {
  const target = e.target.closest("li");
  if (!target) return;

  const cityName = target.querySelector("span").textContent;
  searchSource.value = cityName;
  hideList(searchSourceResultList);
  hideList(searchDestinationResultList);
});

searchDestinationResultList.addEventListener("click", (e) => {
  const target = e.target.closest("li");
  if (!target) return;

  const cityName = target.querySelector("span").textContent;
  searchDestination.value = cityName;

  hideList(searchDestinationResultList);
  hideList(searchSourceResultList);
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

searchRoutes.addEventListener("click", () => {
  const sourceValue = searchSource.value;
  const destinationValue = searchDestination.value;
  resetAddRouteForm();
  searchSource.value = sourceValue;
  searchDestination.value = destinationValue;
  routeSelect.innerHTML = "";
  disableElements(searchSource, searchDestination);
  displayRouteSelect();
  enableElements(searchSource, searchDestination);
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
  disableElements(addHaltingTimeBtn);
  if (!activeMidCity.value) {
    return;
  }

  const hiddenValue = `<input type="hidden" value="${routeHidden.value}-${activeMidCity.value}-${haltingTime.value}" name='route_midcity_halting' id="${routeHidden.value}-${activeMidCity.value}" />`;

  selectedMidCityList.innerHTML += hiddenValue;

  modal.selectedMidCityList.push({
    ...modal.routeMidCityList.find(
      (midCity) => midCity.routeMidCityId === +activeMidCity.value
    ),
    haltingTime: +haltingTime.value,
  });
  modal.routeMidCityList = modal.routeMidCityList.filter((midCity) => {
    return Array.from(selectedMidCityList.children).every((selectedMidCity) => {
      const midCityId = +selectedMidCity.value.split("-")[1];

      return midCityId !== midCity.routeMidCityId;
    });
  });

  // hide values
  haltingTime.value = "";

  displayRouteMidCitySelect();
  disableElements(haltingTime);
  displayMidCityTable();
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
      if (+oldHaltingValue !== +e.target.value) {
        const targetSelectedMidCity = modal.selectedMidCityList.find(
          (midCity) => midCity.routeMidCityId === +routemidcityid
        );
        targetSelectedMidCity.haltingTime = +e.target.value;
        toast.success("Halting Time Updated Successfully");
      }
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

  modal.routeMidCityList.push(
    modal.selectedMidCityList.find(
      (midCity) => midCity.routeMidCityId === +routemidcityid
    )
  );
  modal.selectedMidCityList = modal.selectedMidCityList.filter(
    (midCity) => midCity.routeMidCityId !== +routemidcityid
  );

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
  disableElements(searchFilterSource, searchFilterDestination);
  if (all) {
    filterNav.disable();
  }
};

const enableFilter = (all = false) => {
  filterNav.enable();
  if (all) {
    enableElements(searchFilterSource, searchFilterDestination);
  }
};

const resetFilter = () => {
  filterNav.init();
  searchFilterSource.value = searchFilterDestination.value = "";
  const operatorRouteList = modal.operatorRouteList;

  displayRouteInfo(operatorRouteList);
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

routeTable.addEventListener("click", async (e) => {
  const element = e.target.closest("button");
  if (!element) return;

  const parent = element.closest("tr");
  const { operatorRouteId } = parent.dataset;
  if (!operatorRouteId) {
    toast.error("Invalid Request");
    return;
  }

  const activeRoute = modal.operatorRouteList.find(
    (data) => data.operatorRouteId === +operatorRouteId
  );

  if (!activeRoute) {
    toast.error("Invalid Request");
    return;
  }

  sessionStorage.setItem("activeRoute", JSON.stringify(activeRoute));

  const APP_URL = window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/")
  );
  window.location.href = `${APP_URL}/manage_route.do`;
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

filterNavContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".btn");
  if (!target) return;

  const operatorRouteList = modal.operatorRouteList;

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
  const operatorRouteList = modal.operatorRouteList;
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
  const operatorRouteList = modal.operatorRouteList;

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
  displayRouteInfo(modal.operatorRouteList);
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
    handleAllOperatorRoutes(true);
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
    clearInterval(filteAppliedInterval);
  }
});

window.addEventListener("pagehide", () => {
  // [
  //   "routeList",
  //   "routeMidCityList",
  //   "operatorRouteList",
  //   "operatorRouteMidCityList",
  //   "uniqueRouteList",
  // ].forEach((item) => {
  //   sessionStorage.removeItem(item);
  // });
  clearInterval(filteAppliedInterval);
});
