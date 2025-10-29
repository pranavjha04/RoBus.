import { ModalHandler } from "./modalHandler.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addOperatorRouteMidCities,
  collectAvailableRouteMidCitiesRequest,
  collectOperatorRouteMidCitiesRequest,
  updateHaltingTimeRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  disableElements,
  enableElements,
  getFormatedDuration,
} from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const routeTimeLineContainer = document.querySelector("#route_timeline_cont");
const routeMidCityInfoContainer = document.querySelector(
  "#route_mid_city_cont"
);
const routeMidCityInfoTable = document.querySelector("#route_mid_city_table");

// form
const routeId = document.querySelector("#route_id");
const operatorRouteId = document.querySelector("#operator_route_id");
const activeFormRoute = document.querySelector("#active_route");
const formModal = document.getElementById("centeredModal");
const availableMidCityListContainer = document.querySelector(
  "#available_mid_city_list"
);
const routeMidCitySelect = document.querySelector("#route_midcity_select");
const formHaltingTime = document.querySelector("#form_halting_time");
const addMidCityBtn = document.querySelector("#add_midcity_btn");
const selectedMidCityTable = document.querySelector("#form_mid_city_table");
const addMidCityForm = document.querySelector("#add_mid_city_form");

const modal = {
  activeRoute: null,
  activeRouteMidCities: [],
  routeBusList: [],
  availableMidCityList: [],
  activeMidCity: null,
  selectedMidCityList: [],
};

const updateRouteInfo = () => {
  const { source, destination, distance, duration } = modal.activeRoute.route;
  // route info
  document.querySelector("#source_info_city").textContent = source.name;
  document.querySelector("#source_info_state").textContent = source.state.name;
  document.querySelector("#destination_info_city").textContent =
    destination.name;
  document.querySelector("#destination_info_state").textContent =
    destination.state.name;

  // total duration
  const totalDuration = modal.activeRouteMidCities.reduce(
    (acc, curr) => curr.haltingTime + acc,
    duration
  );

  // total distance
  document.querySelector("#duration_info").textContent = `${
    Math.floor(totalDuration / 60) === 0
      ? ""
      : Math.floor(totalDuration / 60) + " hrs"
  } ${(totalDuration % 60).toString().padStart(2, "0") + " mins"}`;

  document.querySelector("#distance_info").textContent = distance + " ";
  // status
  document.querySelector("#status").textContent = modal.activeRoute.status.name;
};

const updateRouteTimeLine = () => {
  const { source, destination, distance } = modal.activeRoute.route;
  routeTimeLineContainer.innerHTML = "";

  // add source
  routeTimeLineContainer.innerHTML = ViewHelper.getRouteTimeLine(source, true);

  // add midcities
  routeTimeLineContainer.innerHTML += [...modal.activeRouteMidCities]
    .sort(
      (a, b) =>
        a.routeMidCity.distanceFromSource - b.routeMidCity.distanceFromSource
    )
    .map((midCity) => {
      const { routeMidCity, haltingTime } = midCity;
      return ViewHelper.getMidCityRouteTimeLine(routeMidCity, haltingTime);
    })
    .join("");

  routeTimeLineContainer.innerHTML += ViewHelper.getRouteTimeLine(
    destination,
    false,
    distance
  );
};

const updateRouteMidCityInfoTable = () => {
  const { activeRouteMidCities } = modal;
  if (activeRouteMidCities.length === 0) {
    routeMidCityInfoTable.innerHTML = ViewHelper.getTableEmptyMessage(
      "Add mid cities to display"
    );
    return;
  }

  const list = Array.from(activeRouteMidCities);
  for (let i = 1; i < list.length; i++) {
    list[i].routeMidCity.durationFromSource +=
      list[i].haltingTime + list[i - 1].haltingTime;
  }
  routeMidCityInfoTable.innerHTML =
    ViewHelper.getManageRouteMidCityTableHeading();

  routeMidCityInfoTable.innerHTML += `<tbody>
  ${list.map(ViewHelper.getManageRouteMidCityTableRow).join("")}</tbody>`;
};

const updateSelectedMidCityTable = () => {
  const { selectedMidCityList, availableMidCityList } = modal;
  if (selectedMidCityList.length === 0) {
    selectedMidCityTable.classList.add("d-none");
    return;
  }

  selectedMidCityTable.classList.remove("d-none");
  selectedMidCityTable.innerHTML =
    ViewHelper.getSelectMidCityAddRouteFormHead();

  const filterResult = selectedMidCityList.map((next) => {
    const spliteForm = next.split("-");
    const routeMidCityId = +spliteForm[0];
    const haltingTime = +spliteForm[1];

    const routeMidCity = availableMidCityList.find(
      (midCity) => midCity.routeMidCityId === routeMidCityId
    );
    return { ...routeMidCity, haltingTime };
  });
  if (filterResult.length === 0) {
    return;
  }

  selectedMidCityTable.innerHTML += `<tbody>${Array.from(filterResult)
    .map(ViewHelper.getSelectMidCityAddRouteFormBodyRow)
    .join("")}</tbody>`;
};

const updateForm = () => {
  const { route, operatorRouteId: activeOperatorRouteId } = modal.activeRoute;
  const { routeId: activeRouteId, duration } = route;
  activeFormRoute.innerHTML = ViewHelper.getManageRouteCityActiveRow(
    route,
    getFormatedDuration(
      modal.activeRouteMidCities.reduce(
        (acc, curr) => acc + curr.haltingTime,
        duration
      )
    )
  );
  routeId.value = activeRouteId;
  operatorRouteId.value = activeOperatorRouteId;

  const { availableMidCityList, activeRouteMidCities, selectedMidCityList } =
    modal;
  availableMidCityListContainer.innerHTML = "";

  const firstCheckNewList = availableMidCityList.filter((routeMidCity) => {
    const condition = activeRouteMidCities.some((midCity) => {
      return (
        midCity?.routeMidCity?.routeMidCityId === routeMidCity.routeMidCityId
      );
    });

    return !condition;
  });

  if (firstCheckNewList.length === 0) {
    // disablel
    routeMidCitySelect.disabled = true;
    routeMidCitySelect.classList.add("bg-secondary-subtle");
    routeMidCitySelect.textContent = "No mid cities are available";
    return;
  }

  const finalList = availableMidCityList.filter((routeMidCity) => {
    const condition = selectedMidCityList.some((midCity) => {
      return +midCity?.split("-")?.[0] === routeMidCity?.routeMidCityId;
    });
    return !condition;
  });

  if (finalList.length === 0) {
    // disable
    routeMidCitySelect.disabled = true;
    routeMidCitySelect.classList.add("bg-secondary-subtle");
    routeMidCitySelect.textContent = "No mid cities are available";

    return;
  }
  //enable
  routeMidCitySelect.disabled = false;
  routeMidCitySelect.classList.remove("bg-secondary-subtle");
  routeMidCitySelect.textContent = "Select Mid City";

  availableMidCityListContainer.innerHTML = `${finalList
    .map(ViewHelper.getRouteMidCitySelectList)
    .join("")}`;
};

const handleCollectAvailableRouteRequest = async () => {
  const routeId = +url.get("route_id");

  try {
    const response = await collectAvailableRouteMidCitiesRequest(routeId);
    if (response === "invalid") throw new Error("Invalid Request");
    modal.availableMidCityList = JSON.parse(response);
    PageLoading.stopLoading();
  } catch (err) {
    console.error(err.messsage);
    toast.error(err.messsage);
  }
};

const handleCollectOperatorRouteMidCities = async () => {
  try {
    const response = await collectOperatorRouteMidCitiesRequest(
      modal.activeRoute.operatorRouteId
    );
    if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response.startsWith("[")) {
      modal.activeRouteMidCities = JSON.parse(response);
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.messsage);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

const handleEditHaltingTime = (row) => {
  const operatorRouteMidCityId = row.dataset?.operatorRouteMidCityId;
  const targetOperatorRouteMidCity = modal.activeRouteMidCities.find(
    (midCity) => midCity.operatorRouteMidCityId === +operatorRouteMidCityId
  );
  const haltingTimeContainer = row.querySelector(".halting");
  if (!targetOperatorRouteMidCity || !haltingTimeContainer) return;

  haltingTimeContainer.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );
  haltingTimeContainer.innerHTML = `<input type='number' value="${targetOperatorRouteMidCity.haltingTime}" class='position-absolute form-control top-50 text-center' />`;

  const input = haltingTimeContainer.querySelector("input");
  input?.focus();

  input.addEventListener("blur", async (e) => {
    const value = e.target.value;

    if (!value || isNaN(value) || value < 0 || value > 120) {
      toast.error("Value must be a positive number");
    } else if (+value === targetOperatorRouteMidCity.haltingTime) {
      toast.normal("No changes");
    } else {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append(
          "operator_route_id",
          modal.activeRoute.operatorRouteId
        );
        queryParams.append(
          "operator_route_mid_city_id",
          operatorRouteMidCityId
        );
        queryParams.append("halting_time", Math.floor(+value));

        const response = await updateHaltingTimeRequest(queryParams);
        if (response === "invalid") {
          throw new Error("Invalid Request");
        }
        if (response === "failed") {
          throw new Error("Internal Server Error");
        }
        if (response === "success") {
          toast.success("Halting Time Updated Successfully");
          targetOperatorRouteMidCity.haltingTime = Math.floor(+value);
          updateRouteTimeLine();
        }
      } catch (err) {
        toast.error(err.messsage);
      }
    }
    haltingTimeContainer.classList.remove(
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    input.remove();

    haltingTimeContainer.innerHTML = `${getFormatedDuration(
      targetOperatorRouteMidCity.haltingTime
    )}`;
  });
};

const handleDeleteRouteMidCity = (row) => {
  const operatorRouteMidCityId = row.dataset?.operatorRouteMidCityId;
  const targetOperatorRouteMidCity = modal.activeRouteMidCities.find(
    (midCity) => midCity.operatorRouteMidCityId === +operatorRouteMidCityId
  );

  const res = 
};

routeMidCityInfoTable.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const type = button.dataset.type;
  if (!type) return;

  const row = button.closest("[data-operator-route-mid-city-id]");
  if (!row) return;

  switch (type) {
    case "edit": {
      handleEditHaltingTime(row);
      break;
    }
    case "delete": {
      handleDeleteHaltingTime(row);
      break;
    }
    default: {
      break;
    }
  }
});

const handleFormHaltingTimeEdit = (parent) => {
  const { selectedMidCityList } = modal;
  const { routemidcityid, routeid } = parent.dataset;
  if (!routemidcityid || !routeid) return;
  const target = selectedMidCityList.findIndex(
    (midCity) => +midCity.split("-")[0] === +routemidcityid
  );
  if (target === -1) return;
  const haltingDiv = parent.querySelector(".halting");
  if (!haltingDiv) return;
  const oldHaltingValue = +selectedMidCityList[target].substring(
    selectedMidCityList[target].lastIndexOf("-") + 1
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
      selectedMidCityList[target] = `${routemidcityid}-${e.target.value}`;
      if (oldHaltingValue !== +e.target.value)
        toast.success("Halting Time Updated Successfully");
    }
    haltingDiv.innerHTML = `<span
                                ${getFormatedDuration(e.target.value)}
                              </span>`;
  });
};

const handleFormHaltingTimeDelete = (parent) => {
  const { routemidcityid, routeid } = parent.dataset;
  if (!routemidcityid || !routeid) return;

  const { selectedMidCityList } = modal;

  const target = selectedMidCityList.findIndex(
    (midCity) => +midCity.split("-")[0] === +routemidcityid
  );
  if (target === -1) return;
  selectedMidCityList.splice(target, 1);
  toast.success("Mid City Delete Successfully");
  updateForm();
  updateSelectedMidCityTable();
};

selectedMidCityTable.addEventListener("click", (e) => {
  const target = e.target.closest(".feature-btn");
  if (!target) return;
  const { type } = target.dataset;
  const parent = target.closest("tr");
  if (!parent) return;

  switch (type) {
    case "edit": {
      handleFormHaltingTimeEdit(parent);
      break;
    }
    case "delete": {
      handleFormHaltingTimeDelete(parent);
      break;
    }
    default: {
      break;
    }
  }
});

document.querySelector("#nav").addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const target = button.dataset.target;
  if (!target) return;

  document.getElementById(target).scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;
      const navLink = document.querySelector(`[data-target="${target.id}"]`);

      if (isIntersecting) {
        navLink?.classList.add("btn-primary");
        navLink?.classList.remove("text-primary", "border", "border-primary");
      } else {
        navLink?.classList.remove("btn-primary");
        navLink?.classList.add("text-primary", "border", "border-primary");
      }
    });
  },
  {
    threshold: [0.1],
  }
);

observer.observe(routeMidCityInfoContainer);
observer.observe(document.querySelector("#route_time_line"));

formModal.addEventListener("show.bs.modal", () => {
  modal.activeMidCity = null;
  modal.selectedMidCityList = [];
  disableElements(formHaltingTime);
  updateForm();
  updateSelectedMidCityTable();
});

formModal.addEventListener("hide.bs.modal", () => {});

availableMidCityListContainer.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  if (!target) return;
  const details =
    target.querySelector(".city").textContent +
    ", " +
    target.querySelector(".distance").textContent +
    ", " +
    target.querySelector(".duration").textContent;
  routeMidCitySelect.textContent = details;
  modal.activeMidCity = target.dataset.routemidcityid;

  enableElements(formHaltingTime);
});

formHaltingTime.addEventListener("input", (e) => {
  const value = +e.target.value;

  if (!modal.activeMidCity) {
    disableElements(formHaltingTime);
    return;
  }

  if (!value || isNaN(value) || value < 0 || value > 120) {
    e.target.value = "";
  } else {
    enableElements(addMidCityBtn);
  }
});

addMidCityBtn.addEventListener("click", (e) => {
  disableElements(addMidCityBtn);
  if (!modal.activeMidCity) {
    return;
  }
  const { activeRoute, activeMidCity, selectedMidCityList } = modal;
  selectedMidCityList.push(`${activeMidCity}-${formHaltingTime.value}`);

  // // hide values
  formHaltingTime.value = "";

  disableElements(formHaltingTime);
  updateForm();
  updateSelectedMidCityTable();
});

addMidCityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const {
    selectedMidCityList,
    availableMidCityList,
    activeRouteMidCities,
    activeRoute,
  } = modal;

  if (availableMidCityList.length === 0) {
    toast.normal("No mid cities are available for this route");
    return;
  }

  if (availableMidCityList.length === activeRouteMidCities.length) {
    toast.normal("No more mid cities are available");
    return;
  }

  if (selectedMidCityList.length === 0) {
    toast.normal("Select mid cities to add");
  }

  const { route, operatorRouteId } = activeRoute;

  const queryParams = new URLSearchParams();
  queryParams.append("route_id", route.routeId);
  queryParams.append("operator_route_id", operatorRouteId);

  selectedMidCityList.forEach((midCity) => {
    queryParams.append("mid_city", midCity);
  });

  try {
    const response = await addOperatorRouteMidCities(queryParams);

    switch (response) {
      case "internal": {
        throw new Error("Internal Server Error");
        break;
      }
      case "invalid": {
        throw new Error("Invalid Request");
        break;
      }

      case "success": {
        toast.success("Mid City Added successfully");
        window.location.reload();
        ModalHandler.hide(formModal);
      }
    }
  } catch (err) {
    console.error(err.messsage);
    toast.error(err.messsage);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    modal.activeRoute = JSON.parse(sessionStorage.getItem("activeRoute"));
    await handleCollectOperatorRouteMidCities();
    updateRouteInfo();
    updateRouteTimeLine();
    updateRouteMidCityInfoTable();

    // updateForm();
  } catch (err) {
    console.error(err.messsage);
    toast.error(err.messsage);
    PageError.showOperatorError();
  }
});

window.addEventListener("pagehide", () => {
  observer.disconnect(routeMidCityInfoContainer);
  observer.disconnect(document.querySelector("#route_time_line"));
});
