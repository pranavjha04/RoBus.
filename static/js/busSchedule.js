import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addBusScheduleRequest,
  collectAllBusFareFactorRequest,
  collectInactiveDriversRequest,
  collectWeekdayRoutes,
  getCancelledBusScheduleRequest,
  getCompletedBusScheduleRequest,
  getOngoingBusScheduleRequest,
  getUpcomingBusScheduleRequest,
  validateScheduleTimeClash,
} from "./service.js";
import { disableElements, enableElements } from "./util.js";
import { ViewHelper } from "./viewHelper.js";
import { ModalHandler } from "./modalHandler.js";

// *****************FORM ******************************
const busScheduleModal = document.querySelector("#centeredModal");
const scheduleBusForm = document.querySelector("#schedule_bus_form");
const busId = document.querySelector("#bus_id");

const journeyDate = document.querySelector("#journey_date");
const showAvailableRouteBtn = document.querySelector("#show_available_routes");

const busRoutWeekdayId = document.querySelector("#bus_route_weekday_id");
const routeSelect = document.querySelector("#route_select");
const routeSelectContainer = document.querySelector("#route_available_list");
const operatorRouteId = document.querySelector("#operator_route_id");

const driverId = document.querySelector("#driver_id");
const driverSelect = document.querySelector("#driver_select");
const driverSelectContainer = document.querySelector("#driver_available_list");

const departureTime = document.querySelector("#departure_time");
const arrivalTime = document.querySelector("#arrival_time");

const additionalCharges = document.querySelector("#additional_charges");
const seaterFare = document.querySelector("#seater_fare");
const sleeperFare = document.querySelector("#sleeper_fare");
const totalCharge = document.querySelector("#total_charges");

const MAX_EXTRA_CHARGE = 500;

const dateRangePrev = document.querySelector("#date_range_back");
const dateRangeText = document.querySelector("#date_range_display");
const dateRangeNext = document.querySelector("#date_range_next");
const dateRangeContainer = document.querySelector("#date_range");
const filterNavContainer = document.querySelector("#filter_nav");

const scheduleTable = document.querySelector("#schedule_table");
let range = 0;

const prevValue = {
  additionalCharges: 0,
  seaterFare: 0,
  sleeperFare: 0,
  totalCharges: 0,
  journeyDate: null,
};

const modal = {
  activeBus: null,
  busFareFactorList: [],
};

const cache = {
  upcoming: {},
  ongoing: {},
  completed: {},
  cancelled: {},
  availableRouteCache: {},
  driverCache: null,
};

/******************UTILS ************************************ */
const clearForm = () => {
  busRoutWeekdayId.value = "";
  routeSelect.textContent = "Select Route";
  routeSelectContainer.innerHTML = "";
  operatorRouteId.value = "";

  journeyDate.value = "";

  driverId.value = "";
  driverSelect.textContent = "Select Driver";
  driverSelectContainer.innerHTML = "";

  additionalCharges.value =
    seaterFare.value =
    sleeperFare.value =
    totalCharge.value =
      0;

  departureTime.value = "";
  arrivalTime.value = "";
};

const enableForm = () => {
  [
    additionalCharges,
    seaterFare,
    sleeperFare,
    arrivalTime,
    departureTime,
    driverSelect,
    routeSelect,
  ].forEach((next) => {
    next.disabled = false;
  });
};
const disableForm = () => {
  [
    additionalCharges,
    seaterFare,
    sleeperFare,
    arrivalTime,
    departureTime,
    driverSelect,
    routeSelect,
  ].forEach((next) => {
    next.disabled = true;
  });
};

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

const extraChargeHandler = (target, type) => {
  if (!busRoutWeekdayId.value) {
    target.disabled = true;
    return;
  }

  const value = Math.floor(+target.value);
  totalCharge.value = +totalCharge.value - prevValue[type];
  if (isNaN(value) || value < 0 || value > MAX_EXTRA_CHARGE) {
    toast.error(
      `Charge should be positive and not exceed ₹${MAX_EXTRA_CHARGE}`,
      5000
    );
    target.value = prevValue[type];
    totalCharge.value = prevValue.totalCharges;
    return;
  } else {
    target.value = value;
    prevValue[type] = value;
    totalCharge.value = +totalCharge.value + value;
    prevValue.totalCharges = +totalCharge.value;
  }
};
const formatDate = (d) => {
  return d.toISOString().split("T")[0];
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
    routeSelect.disabled = true;
    routeSelectContainer.innerHTML = "";
    routeSelect.textContent = "No Routes are available";
    return;
  }

  routeSelect.disabled = false;
  routeSelect.textContent = "Select Route";

  enableElements(routeSelect);
  routeSelect.focus();

  routeSelectContainer.innerHTML = routeList
    .map(ViewHelper.getBusRouteWeekdaySelect)
    .join("");
};

const updateDriverListDisplay = (driverList = []) => {
  console.log(driverList);
  if (!driverList.length) {
    disableElements(driverSelect);
    console.log(driverList);
    driverSelect.disabled = true;
    driverSelectContainer.innerHTML = "";
    driverSelect.textContent = "No Drivers are available";
    return;
  }
  driverSelect.disabled = false;
  driverSelect.textContent = "Select Driver";

  enableElements(driverSelect);
  driverSelect.focus();

  driverSelectContainer.innerHTML = driverList
    .map(ViewHelper.getScheduleAvailableDriver)
    .join("");
};

const resetFilter = () => {
  [...filterNavContainer.children].forEach((node) => {
    node.classList.remove("btn-primary");
  });

  filterNavContainer.firstElementChild.classList.add("btn-primary");
};

const updateScheduleRecords = (list = []) => {
  scheduleTable.innerHTML = "";
  if (list.length === 0) {
    // do something
    scheduleTable.innerHTML = `<div class="d-flex mt-5 flex-column text-center align-items-center justify-content-center">
            <h3>No Schedules</h3>
            <p>There are no schedules for this date.</p>
            <button
              class="btn btn-primary mt-2"
              data-type="empty"
               data-bs-toggle="modal"
              data-bs-target="#centeredModal"
            >
               Add Schedule
            </button>
          </div>`;
  } else {
    // do something
    scheduleTable.innerHTML = ViewHelper.getScheduleTableHeading();
    scheduleTable.innerHTML += `<tbody>${list
      .map(ViewHelper.getScheduleTableRow)
      .join("")}</tbody>`;
  }
};

const handleScheduleDateRequest = async (callback, filter, date) => {
  if (!callback || !filter | !date) return;

  try {
    if (!cache[filter][date]) {
      scheduleTable.innerHTML = ViewHelper.getTableLoader();
      const response = await callback(date, modal.activeBus.busId);
      if (response === "invalid") throw new Error("Invalid Request");
      cache[filter][date] = JSON.parse(response);
    }
    updateScheduleRecords(cache[filter][date]);
  } catch (err) {
    toast.error(err.message);
    console.error(err.message);
    scheduleTable.innerHTML = ViewHelper.getTableEmptyMessage(
      "There was an error while loading schedule"
    );
  }
};

const showActiveDateRecord = () => {
  const activeDate = dateRangeContainer.querySelector(".active");
  const { day, month, year } = activeDate.dataset;
  const formattedDate = [year, month, day].join("-");
  const activeFilter =
    filterNavContainer.querySelector(".btn-primary").dataset.type;
  switch (activeFilter) {
    case "upcoming": {
      handleScheduleDateRequest(
        getUpcomingBusScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    case "ongoing": {
      handleScheduleDateRequest(
        getOngoingBusScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    case "completed": {
      handleScheduleDateRequest(
        getCompletedBusScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    case "cancelled": {
      handleScheduleDateRequest(
        getCancelledBusScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    default: {
      break;
    }
  }
};

const updateDateRange = () => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + range);

  const startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay());
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  document.querySelector("#date_range_display").textContent =
    new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    }).formatRange(startDate, endDate);

  dateRangeContainer.innerHTML = "";

  Array.from({ length: 6 }).forEach((_, i) => {
    const currDate = new Date(startDate);
    currDate.setDate(startDate.getDate() + i);
    const isInRange = formatDate(currDate) === formatDate(todayDate);

    dateRangeContainer.innerHTML += ViewHelper.getDateRangeButton(
      currDate,
      isInRange
    );
  });

  if (!dateRangeContainer.querySelector(".active")) {
    dateRangeContainer.firstElementChild.classList.add("active");
  }
  resetFilter();
  showActiveDateRecord();
};

/*************************EVENT LISTENERS *********************************** */
journeyDate.addEventListener("blur", (e) => {
  const value = e.target.value;
  if (prevValue.journeyDate != null && value != prevValue.journeyDate) {
    clearForm();
    disableForm();
    disableElements(showAvailableRouteBtn);
  }
  try {
    e.target.value = value;

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // normalize

    const inputDate = new Date(value);
    const targetDate = new Date(todayDate);
    targetDate.setDate(todayDate.getDate() + 60); // 60 days ahead

    // Check if inputDate is BEFORE today OR AFTER targetDate
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
    prevValue.journeyDate = value;
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
  console.log(weekday);
  try {
    if (!cache.availableRouteCache[weekday]) {
      disableForm();
      const response = await collectWeekdayRoutes(weekday);
      if (response === "invalid") {
        throw new Error("Invalid Request");
      }
      if (response === "internal" || !response)
        throw new Error("Internal Server Error");
      console.log(response);
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
    journeyDate.focus();
    clearForm();
    disableForm();
  }
});

routeSelectContainer.addEventListener("mousedown", async (e) => {
  const target = e.target.closest("li");

  if (!target) {
    busRoutWeekdayId.value = "";
    operatorRouteId.value = "";
    disableForm();
    return;
  }
  enableForm();
  const targetBusRouteWeekdayId = target.dataset.busRouteWeekdayId;
  busRoutWeekdayId.value = targetBusRouteWeekdayId;
  operatorRouteId.value = target.dataset.operatorRouteId;

  routeSelect.textContent = [".route", ".distance", ".duration"]
    .map((next) => {
      return target.querySelector(next).textContent;
    })
    .join(", ");
  const totalDistance = parseInt(target.querySelector(".distance").textContent);
  const { fixed, perPersonPerKm } = modal.busFareFactorList.reduce(
    (acc, curr) => {
      const charge = curr.operatorTicketFare.charge;
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

  totalCharge.value = 180 + fixed + perPersonPerKm;
  console.log(!cache.driverCache);

  try {
    if (!cache.driverCache) {
      const response = await collectInactiveDriversRequest();

      if (response === "invalid") {
        throw new Error("Invalid request");
      }

      cache.driverCache = JSON.parse(response);
    }

    updateDriverListDisplay(cache.driverCache);
  } catch (err) {
    toast.error(err.message);
  }
});

departureTime.addEventListener("blur", async (e) => {
  if (!journeyDate.value) {
    arrivalTime.value = "";
    departureTime.value = "";
    disableForm();
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
  extraChargeHandler(e.target, "additionalCharges");
});

seaterFare.addEventListener("blur", (e) => {
  extraChargeHandler(e.target, "seaterFare");
});

sleeperFare.addEventListener("blur", (e) => {
  extraChargeHandler(e.target, "sleeperFare");
});

busScheduleModal.addEventListener("show.bs.modal", () => {
  disableForm();
  clearForm();
  disableElements(showAvailableRouteBtn);
});

scheduleBusForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!busId.value || +busId.value !== modal.activeBus.busId) {
    toast.error("Invalid Bus Request");
    disableForm();
    return;
  }
  if (!journeyDate.value) {
    toast.error("Please Select a Journey Date");
    disableForm();
    return;
  }

  if (!busRoutWeekdayId.value) {
    toast.error("Please select a route");
    return;
  }

  if (!operatorRouteId.value) {
    toast.error("Invalid Request");
    return;
  }

  if (!departureTime.value || !arrivalTime.value) {
    toast.error("Please select journey timings");
    return;
  }

  if (!driverId.value) {
    toast.error("Please select a driver");
    return;
  }

  try {
    const formData = new FormData(scheduleBusForm);
    disableForm();
    const response = await addBusScheduleRequest(formData);
    if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response === "ok") {
      toast.success("Bus is scheduled successfully");
      cache["upcoming"][formatDate(new Date(journeyDate.value))] = null;
      cache.driverCache = cache.driverCache.filter(
        (driver) => driver.driverId !== +driverId.value
      );
      clearForm();
      disableForm();
      resetFilter();
      showActiveDateRecord();
      ModalHandler.hide(busScheduleModal);
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableForm();
  }
});

scheduleTable.addEventListener("click", async (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const { type } = target.dataset;

  if (type === "empty") {
    const activeDate = dateRangeContainer.querySelector(".active");
    const { year, month, day } = activeDate.dataset;

    const formattedDate = `${year}-${month}-${day}`;
    journeyDate.value = formattedDate;
    setTimeout(() => {
      journeyDate.focus();
    }, 200);
  } else if (type === "manage") {
    const { scheduleId, day, month, date, year } = target.closest("tr").dataset;
    const activeDateString = [year, month, day].join("-");
    const activeFilter =
      filterNavContainer.querySelector(".btn-primary").dataset.type;
    console.log(activeFilter, date);
    const activeDate = cache[activeFilter][activeDateString]?.find(
      (schedule) => schedule.scheduleId === +scheduleId
    );

    if (!activeDate) return;

    sessionStorage.setItem("activeSchedule", JSON.stringify(activeDate));

    const APP_URL = window.location.href.substring(
      0,
      window.location.href.lastIndexOf("/")
    );
    window.location.href = `${APP_URL}/manage_bus_schedule.do`;
  }
});

filterNavContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || target.classList.contains("btn-primary")) return;

  [...filterNavContainer.children].forEach((node) => {
    node.classList.remove("btn-primary");
  });

  target.classList.add("btn-primary");
  showActiveDateRecord();
});

dateRangeContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || target.classList.contains("active")) return;

  dateRangeContainer.childNodes.forEach((child) => {
    child.classList.remove("active");
  });

  target.classList.add("active");
  resetFilter();
  showActiveDateRecord();
});

dateRangeNext.addEventListener("click", () => {
  range += 7;
  updateDateRange();
});

dateRangePrev.addEventListener("click", () => {
  range -= 7;
  updateDateRange();
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    if (sessionStorage.getItem("activeBus") == null) {
      history.back();
    }
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    busId.value = modal.activeBus.busId;
    updateDateRange();
    await handleCollectBusFareFactors();
    updateBusInfoDisplay();
    PageLoading.stopLoading();
    disableForm();
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
});
