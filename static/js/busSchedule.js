import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  collectAllBusFareFactorRequest,
  collectInactiveDriversRequest,
  collectWeekdayRoutes,
  validateScheduleTimeClash,
} from "./service.js";
import { disableElements, enableElements } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const busScheduleModal = document.querySelector("#centeredModal");
const journeyDate = document.querySelector("#journey_date");
const showAvailableRouteBtn = document.querySelector("#show_available_routes");

const busRoutWeekdayId = document.querySelector("#bus_route_weekday_id");
const routeSelect = document.querySelector("#route_select");
const routeSelectContainer = document.querySelector("#route_available_list");

const driverId = document.querySelector("#driver_id");
const driverSelect = document.querySelector("#driver_select");
const driverSelectContainer = document.querySelector("#driver_available_list");

const departureTime = document.querySelector("#departure_time");
const arrivalTime = document.querySelector("#arrival_time");

const additionalCharges = document.querySelector("#additional_charges");
const seaterFare = document.querySelector("#seater_fare");
const sleeperFare = document.querySelector("#sleeper_fare");
const totalCharge = document.querySelector("#total_charges");

const prevValue = {
  additionalCharges: 0,
  seaterFare: 0,
  sleeperFare: 0,
};

const modal = {
  activeBus: null,
  busFareFactorList: [],
};

const cache = {
  availableRouteCache: {},
  driverCache: [],
};

/******************UTILS ************************************ */
const clearForm = () => {
  busRoutWeekdayId.value = "";
  routeSelect.textContent = "Route Select";
};

const enableForm = () => {};
const disableForm = () => {};

const handleCollectBusFareFactors = async () => {
  try {
    const response = await collectAllBusFareFactorRequest(
      modal.activeBus.busId
    );
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }

    modal.busFareFactorList = JSON.parse(response);
  } catch (err) {
    throw new Error(err.message);
  }
};

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
    routeSelectContainer.innerHTML = "";
  }

  enableElements(routeSelect);
  routeSelect.focus();

  routeSelectContainer.innerHTML = routeList
    .map(ViewHelper.getBusRouteWeekdaySelect)
    .join("");
};

const updateDriverListDisplay = () => {
  const { driverCache: driverList } = cache;
  if (driverList.length === 0) {
    driverSelectContainer.innerHTML =
      "<span class='px-2'>No drivers are available</span>";
  } else {
    driverSelectContainer.innerHTML = driverList
      .map(ViewHelper.getScheduleAvailableDriver)
      .join("");
  }
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
      cache.availableRouteCache[weekday].forEach(({ operatorRoute }) => {
        operatorRoute.route = { ...operatorRoute.route };
        const totalDuration = operatorRoute.operatorRouteMidCities.reduce(
          (acc, curr) => {
            return acc + curr.haltingTime;
          },
          operatorRoute.route.duration
        );

        operatorRoute.route.duration = totalDuration;
      });
    }
    updateRouteSelect(cache.availableRouteCache[weekday]);
  } catch (err) {
    showAvailableRouteBtn.focus();
    toast.error(err.message);
    clearForm();
    disableForm();
  }
});

routeSelectContainer.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");

  if (!target) {
    busRoutWeekdayId.value = "";
    return;
  }

  const targetBusRouteWeekdayId = target.dataset.busRouteWeekdayId;
  busRoutWeekdayId.value = targetBusRouteWeekdayId;

  routeSelect.textContent = [".route", ".distance", ".duration"]
    .map((next) => {
      return target.querySelector(next).textContent;
    })
    .join(", ");
  const totalDistance = parseInt(target.querySelector(".distance").textContent);
  const { fixed, perPersonPerKm } = modal.busFareFactorList.reduce(
    (acc, curr) => {
      const charge = curr.operatorTicketFare.charge;
      console.log(charge);
      if (curr.operatorTicketFare.fareFactor.fixedCharge) {
        return {
          ...acc,
          perPersonPerKm: acc.perPersonPerKm + charge,
        };
      } else {
        return {
          ...acc,
          fixed: acc.fixed + totalDistance * charge,
        };
      }
    },
    {
      fixed: 0,
      perPersonPerKm: 0,
    }
  );

  totalCharge.value = fixed + perPersonPerKm;
});

departureTime.addEventListener("blur", async (e) => {
  if (!journeyDate.value) {
    arrivalTime.value = "";
    departureTime.value = "";
    return;
  }

  const [hours, mins] = e.target.value.split(":");
  const date = new Date(journeyDate.value);
  date.setHours(hours, mins, 0, 0);
  departureTime.value = `${(hours + "").padStart(2, "0")}:${(
    mins + ""
  ).padStart(2, "0")}:00`;

  // get active route
  const activeBusRouteWeekday = cache.availableRouteCache[date.getDay()]?.find(
    (next) => next.busRouteWeekdayId === +busRoutWeekdayId.value
  );
  if (!activeBusRouteWeekday) return;

  const duration = activeBusRouteWeekday.operatorRoute.route.duration;

  const arrivalDate = new Date(date.getTime());
  arrivalDate.setMinutes(arrivalDate.getMinutes() + duration);

  const hh = arrivalDate.getHours().toString().padStart(2, "0");
  const mm = arrivalDate.getMinutes().toString().padStart(2, "0");

  arrivalTime.value = `${hh}:${mm}:00`;

  try {
    disableElements(departureTime, busRoutWeekdayId, journeyDate);
    const response = await validateScheduleTimeClash(
      departureTime.value,
      arrivalTime.value,
      modal.activeBus.busId,
      journeyDate.value
    );

    if (response === "invalid") {
      throw new Error("Invalid request");
    }
    if (response === "clash") {
      throw new Error(
        "The selected time conflicts with an existing schedule for this bus."
      );
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableElements(departureTime, busRoutWeekdayId, journeyDate);
  }
});

driverSelect.addEventListener("click", async (e) => {
  if (!busRoutWeekdayId.value) {
    return;
  }

  try {
    if (!cache.driverCache.length) {
      const response = await collectInactiveDriversRequest();

      if (response === "invalid") {
        throw new Error("Invalid request");
      }

      cache.driverCache = JSON.parse(response);
      updateDriverListDisplay();
    } else {
      updateDriverListDisplay();
    }
  } catch (err) {
    toast.error(err.message);
  }
});

driverSelectContainer.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  if (!target) {
    driverSelect.textContent = "Select Driver";
    driverId.value = "";
    return;
  }

  if (!target.dataset.driverId) return;
  driverId.value = target.dataset.driverId;
  driverSelect.textContent = target.querySelector("a").textContent;
});

additionalCharges.addEventListener("blur", (e) => {
  const value = Math.floor(+e.target.value);
  totalCharge.value = +totalCharge.value - prevValue.additionalCharges;
  if (value < 0 || value > 200) {
    toast.error("Please enter valid charges");
    prevValue.additionalCharges = 0;
    e.target.value = 0;
    return;
  } else {
    additionalCharges.value = value;
    prevValue.additionalCharges = value;
    totalCharge.value = +totalCharge.value + value;
  }
});
seaterFare.addEventListener("blur", (e) => {
  const value = Math.floor(+e.target.value);
  totalCharge.value = +totalCharge.value - prevValue.seaterFare;
  if (value < 0 || value > 200) {
    toast.error("Please enter valid charges");
    prevValue.seaterFare = 0;
    e.target.value = 0;
    return;
  } else {
    seaterFare.value = value;
    prevValue.seaterFare = value;
    totalCharge.value = +totalCharge.value + value;
  }
});

sleeperFare.addEventListener("blur", (e) => {
  const value = Math.floor(+e.target.value);
  totalCharge.value = +totalCharge.value - prevValue.sleeperFare;
  if (value < 0 || value > 200) {
    toast.error("Please enter valid charges");
    prevValue.sleeperFare = 0;
    e.target.value = 0;
    return;
  } else {
    sleeperFare.value = value;
    prevValue.sleeperFare = value;
    totalCharge.value = +totalCharge.value + value;
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    await handleCollectBusFareFactors();
    updateBusInfoDisplay();
    PageLoading.stopLoading();
  } catch (err) {
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
});
