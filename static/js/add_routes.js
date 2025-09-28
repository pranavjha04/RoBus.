import { filterNav } from "./filter_nav.js";
import {
  addOperatorRouteRequest,
  collectOperatorRouteRequest,
  collectRouteRequest,
  deleteFareFactorRequest,
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

// info display
const infoList = document.querySelectorAll(".info");
const allFilter = document.querySelectorAll(".filter");

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

formModal.addEventListener("hidden.bs.modal", () => {
  resetAddRouteForm();
});

formModal.addEventListener("show.bs.modal", () => {
  resetAddRouteForm();
});

const updateInfoDisplay = async () => {
  const operatorRouteList = JSON.parse(
    sessionStorage.getItem("operatorRouteList")
  );

  const total = operatorRouteList.length;
  let active = 0;
  let inactive = 0;
  operatorRouteList.forEach(({ status: { name } }) => {
    switch (name) {
      case "Active": {
        active++;
        break;
      }
      case "Inactive": {
        inactive++;
        break;
      }
      default: {
        break;
      }
    }
  });

  infoList.forEach((info) => {
    const { name } = info.dataset;
    switch (name) {
      case "total": {
        info.textContent = total;
        break;
      }
      case "active": {
        info.textContent = active;
        break;
      }
      case "inactive": {
        info.textContent = inactive;
        break;
      }
      default: {
        break;
      }
    }
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
    initDisplay();
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
