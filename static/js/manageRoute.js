import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";
import { ViewHelper } from "./viewHelper.js";

const routeTimeLineContainer = document.querySelector("#route_timeline_cont");
const routeMidCityInfoContainer = document.querySelector(
  "#route_mid_city_cont"
);
const routeMidCityInfoTable = document.querySelector("#route_mid_city_table");

const modal = {
  activeRoute: null,
  activeRouteMidCities: [],
  routeBusList: [],
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

const handleEditHaltingTime = (row) => {
  if (!row) return;
  console.log("hello");
  const operatorRouteMidCityId = row.dataset.operatorRouteMidCityId;
  if (!operatorRouteMidCityId) throw new Error("Invalid Operation");

  const displayContainer = row.querySelector(".halting");
  if (!displayContainer) throw new Error("Invalid Operation");

  const element = document.createElement("input");
  element.type = "number";
  element.value = row.dataset.haltingTime;
  element.classList.add("form-control", "w-25");
  displayContainer.innerHTML = "";
  displayContainer.append(element);
  element.focus();
  console.log("hell");
};

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
window.addEventListener("DOMContentLoaded", () => {
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
  } catch (err) {
    console.error(err.messsage);
    toast.error(err.messsage);
    PageError.showOperatorError();
  }
  PageLoading.stopLoading();
});
