import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { collectWeekdayRoutes } from "./service.js";
import { disableElements, enableElements } from "./util.js";

const busScheduleModal = document.querySelector("#centeredModal");
const journeyDate = document.querySelector("#journey_date");
const showAvailableRouteBtn = document.querySelector("#show_available_routes");

const routeSelect = document.querySelector("#route_select");
const routeSelectContainer = document.querySelector("#route_available_list");

const driverSelect = document.querySelector("#driver_select");
const driverSelectContainer = document.querySelector("#driver_available_list");

const departureTime = document.querySelector("#departure_time");
const arrivalTime = document.querySelector("#arrival_time");

const modal = {
  activeBus: null,
};

const cache = {
  availableRouteCache: {},
};

/******************UTILS ************************************ */
const clearForm = () => {};
const enableForm = () => {};
const disableForm = () => {};

/**********************UI UPDATES *********************************** */
const updateBusInfoDisplay = () => {
  document.querySelector("#bus_number").textContent = modal.activeBus.busNumber;
  document.querySelector("#bus_decker").textContent = modal.activeBus
    .doubleDecker
    ? "Double Decker"
    : "Single Decker";
  document.querySelector("#manufacturer").textContent =
    modal.activeBus.manufacturer.name;
};

const updateRouteSelect = (routeList = []) => {
  if (!routeList.length) {
    disableElements(routeSelect);
  }
  enableElements(routeSelect);

  console.log(routeList);
};
/*************************EVENT LISTENERS *********************************** */
journeyDate.addEventListener("blur", (e) => {
  const value = e.target.value;
  try {
    const todayDate = new Date();
    const inputDate = new Date(value);
    const targetDate = new Date(todayDate);
    targetDate.setDate(todayDate.getDate() + 60);

    if (inputDate < todayDate || inputDate > targetDate) {
      throw new Error(
        `Date should be between ${new Intl.DateTimeFormat(navigator.language, {
          month: "short",
          day: "2-digit",
          year: "2-digit",
        }).format(todayDate)} to ${new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "2-digit",
        }).format(targetDate)}`
      );
    }

    enableElements(showAvailableRouteBtn);
  } catch (err) {
    e.target.value = "";
    toast.error(err.message, 5000);
    disableElements(showAvailableRouteBtn);
    disableForm();
    clearForm();
  }
});

showAvailableRouteBtn.addEventListener("click", async () => {
  const weekday = new Date(journeyDate.value).getDay();
  try {
    if (!cache.availableRouteCache[weekday]) {
      disableForm();
      const response = await collectWeekdayRoutes(weekday);
      if (response === "invalid") {
        throw new Error("Invalid Request");
      }
      if (response === "internal" || !response)
        throw new Error("Internal Server Error");

      cache.availableRouteCache[weekday] = JSON.parse(response);
    }
    updateRouteSelect(cache.availableRouteCache[weekday]);
  } catch (err) {
    showAvailableRouteBtn.focus();
    toast.error(err.message);
    clearForm();
    disableForm();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    updateBusInfoDisplay();

    PageLoading.stopLoading();
  } catch (err) {
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
});
