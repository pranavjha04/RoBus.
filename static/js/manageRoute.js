import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { collectAvailableRouteMidCitiesRequest } from "./service.js";
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
const modal = {
  activeRoute: null,
  activeRouteMidCities: [],
  routeBusList: [],
  availableMidCityList: [],
  activeMidCity: null,
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
  routeTimeLineContainer.innerHTML += modal.activeRouteMidCities
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

  const { availableMidCityList, activeRouteMidCities } = modal;
  availableMidCityListContainer.innerHTML = "";

  const newList = availableMidCityList.filter(({ routeMidCity }) => {
    const city = activeRouteMidCities.find(
      (midCity) => midCity?.routeMidCityId === routeMidCity?.routeMidCityId
    );
    return !city;
  });

  if (newList.length === 0) {
    // disable
    routeMidCitySelect.disabled = true;
    routeMidCitySelect.classList.add("bg-secondary-subtle");
    routeMidCitySelect.textContent = "No mid cities are available";
    console.log("hell");
    return;
  }

  //enable
  routeMidCitySelect.disabled = false;
  routeMidCitySelect.classList.remove("bg-secondary-subtle");
  routeMidCitySelect.textContent = "Select Mid City";

  availableMidCityListContainer.innerHTML = `${newList
    .map(ViewHelper.getRouteMidCitySelectList)
    .join("")}`;
};

const handleCollectAvailableRouteRequest = async () => {
  const { routeId } = modal.activeRoute.route;
  const queryParams = new URLSearchParams();
  queryParams.append("route_id", routeId);

  try {
    const response = await collectAvailableRouteMidCitiesRequest(queryParams);
    if (response === "invalid") throw new Error("Invalid Request");
    modal.availableMidCityList = JSON.parse(response);
    PageLoading.stopLoading();
  } catch (err) {
    console.error(err.messsage);
    toast.error(err.messsage);
  }
};

const handleEditHaltingTime = (row) => {};

routeMidCityInfoTable.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const type = button.dataset.type;
  if (!type) return;

  const row = +button.closest("[data-operator-route-mid-city-id]");

  switch (type) {
    case "edit": {
      handleEditHaltingTime(row);
      break;
    }
    case "delete": {
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
        navLink.classList.add("btn-primary");
        navLink.classList.remove("text-primary", "border", "border-primary");
      } else {
        navLink.classList.remove("btn-primary");
        navLink.classList.add("text-primary", "border", "border-primary");
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
});

formModal.addEventListener("hide.bs.modal", () => {
  modal.activeMidCity = null;
});

availableMidCityListContainer.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  console.log(target);
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

  if (
    !value ||
    isNaN(value) ||
    value < 0 ||
    value > 120 ||
    !modal.activeMidCity
  ) {
    e.target.value = "";
    disableElements(formHaltingTime);
  } else {
    enableElements(formHaltingTime);
  }
});

addMidCityBtn.addEventListener("click", (e) => {
  disableElements(addMidCityBtn);
  if (!modal.activeMidCity) {
    return;
  }
  const { activeRoute, activeMidCity } = modal;
  const hiddenValue = `<input type="hidden" value="${activeMidCity}-${formHaltingTime.value}" name='route_midcity_halting' id="${activeRoute.route.routeId.value}-${activeMidCity}" />`;

  // selectedMidCityList.innerHTML += hiddenValue;

  // // hide values
  // haltingTime.value = "";

  // displayRouteMidCitySelect();
  // disableElements(haltingTime);
  // displayMidCityTable();
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    modal.activeRoute = JSON.parse(sessionStorage.getItem("activeRoute"));
    modal.activeRouteMidCities = JSON.parse(
      sessionStorage.getItem("activeRouteMidCities")
    );
    modal.activeRouteMidCities = modal.activeRouteMidCities.sort(
      (a, b) =>
        a.routeMidCity.distanceFromSource - b.routeMidCity.distanceFromSource
    );
    updateRouteInfo();
    updateRouteTimeLine();
    updateRouteMidCityInfoTable();
    await handleCollectAvailableRouteRequest();
    updateForm();
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
