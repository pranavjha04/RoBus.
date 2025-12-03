import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addBusScheduleRequest,
  collectAllBusFareFactorRequest,
  collectInactiveDriversRequest,
  collectWeekdayRoutes,
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

const scheduleTable = document.querySelector("#schedule_table");
let range = 0;

const prevValue = {
  additionalCharges: 0,
  seaterFare: 0,
  sleeperFare: 0,
  totalCharges: 0,
  journeyDate: null,
};

const journeyDateScheduleCache = {};

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
  }

  routeSelect.disabled = false;
  routeSelect.textContent = "Select Route";

  enableElements(routeSelect);
  routeSelect.focus();

  routeSelectContainer.innerHTML = routeList
    .map(ViewHelper.getBusRouteWeekdaySelect)
    .join("");
};

const updateDriverListDisplay = () => {
  const { driverCache: driverList } = cache;
  if (driverList.length === 0) {
    driverSelect.disabled = true;
    driverSelect.textContent = `No drivers are available`;
    driverSelectContainer.innerHTML = "";
  } else {
    driverSelect.disabled = false;
    driverSelect.textContent = "Select Driver";
    driverSelectContainer.innerHTML = driverList
      .map(ViewHelper.getScheduleAvailableDriver)
      .join("");
  }
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

const handleJourneyDateScheduleRecordRequest = async (journeyDate) => {
  try {
    if (!(journeyDate instanceof Date)) throw new Error("Invalid Request");
    scheduleTable.innerHTML = ViewHelper.getTableLoader();
    if (journeyDateScheduleCache[journeyDate.toDateString()]) {
      console.log("CACHED");
      updateScheduleRecords(
        journeyDateScheduleCache[journeyDate.toDateString()]
      );
    } else {
      const year = journeyDate.getFullYear();
      const month = journeyDate.getMonth();
      const day = journeyDate.getDate();
      const formattedDate = [year, month + 1, day]
        .map((next) => next.toString().padStart(2, "0"))
        .join("-");
      const response = await getBusJourneyDateScheduleRequest(
        formattedDate,
        modal.activeBus.busId
      );
      if (response === "invalid" || response.startsWith("invalid"))
        throw new Error("Invalid Request");
      if (response.startsWith("[")) {
        journeyDateScheduleCache[journeyDate.toDateString()] =
          JSON.parse(response);
        updateScheduleRecords(
          journeyDateScheduleCache[journeyDate.toDateString()]
        );
      }
    }
  } catch (err) {
    toast.error(err.message);
    scheduleTable.innerHTML = "";
  }
};

const showActiveDateRecord = () => {
  const activeDate = dateRangeContainer.querySelector(".active");

  if (!activeDate) {
    return;
  }

  const { year, month, day } = activeDate.dataset;
  const formattedDate = [year, month, day]
    .map((next) => next.padStart(2, "0"))
    .join("-");

  handleJourneyDateScheduleRecordRequest(new Date(formattedDate));
};

const clearActiveDateRecord = () => {
  const activeDate = dateRangeContainer.querySelector(".active");

  if (!activeDate) {
    return;
  }

  const { year, month, day } = activeDate.dataset;
  const formattedDate = [year, +month, day].join("-");

  journeyDateScheduleCache[new Date(formattedDate).toDateString()] = null;
};

const updateDateRange = () => {
  const currDate = new Date();
  let startDate = new Date(currDate);

  startDate.setDate(currDate.getDate() - currDate.getDay());
  startDate.setDate(startDate.getDate() + range);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  dateRangeText.textContent = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).formatRange(startDate, endDate);

  dateRangeContainer.innerHTML = "";
  let isInRange = false;
  Array.from({ length: 7 }, (_, day) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    let currInRange = false;

    if (
      date.getDate() === currDate.getDate() &&
      date.getDay() === currDate.getDay() &&
      date.getFullYear() === currDate.getFullYear()
    ) {
      isInRange = true;
      currInRange = true;
    }

    dateRangeContainer.innerHTML += `<button
                  class="col norm rounded-2  d-flex flex-column ${
                    currInRange ? "active" : ""
                  } text-center justify-content-center"
                  data-year=${date.getFullYear()}
                  data-month=${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                  data-day=${date.getDate().toString().padStart(2, "0")}
                >
                  <h4>${new Intl.DateTimeFormat(navigator.language, {
                    weekday: "short",
                  }).format(date)}</h4>
                  <span class="fs-4">${new Intl.DateTimeFormat(
                    navigator.language,
                    {
                      day: "2-digit",
                    }
                  ).format(date)}</span>
                </button>`;
  });

  if (!isInRange) {
    dateRangeContainer.firstElementChild.classList.add("active");
  }

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
    journeyDate.focus();
    clearForm();
    disableForm();
  }
});

routeSelectContainer.addEventListener("mousedown", (e) => {
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

driverSelect.addEventListener("click", async (e) => {
  if (!busRoutWeekdayId.value) {
    disableForm();
    return;
  }

  try {
    if (!cache.driverCache) {
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
      clearForm();
      disableForm();
      journeyDateScheduleCache[new Date(journeyDate.value).toDateString()] =
        null;
      cache.driverCache = null;
      clearActiveDateRecord();
      showActiveDateRecord();
      ModalHandler.hide(busScheduleModal);
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
    enableForm();
  } finally {
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
    const key = [day, month, date, year]
      .map((next) => next.padStart(2, "0"))
      .join(" ");

    if (!journeyDateScheduleCache[key]) {
      await handleJourneyDateScheduleRecordRequest(new Date(key));
    } else {
      const activeSchedule = journeyDateScheduleCache[key]?.find((schedule) => {
        return schedule.scheduleId === +scheduleId;
      });
      console.log(activeSchedule);

      if (!activeSchedule) return;
      sessionStorage.setItem("activeSchedule", JSON.stringify(activeSchedule));

      const APP_URL = window.location.href.substring(
        0,
        window.location.href.lastIndexOf("/")
      );
      window.location.href = `${APP_URL}/manage_bus_schedule.do`;
    }
  }
});

dateRangeContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");

  dateRangeContainer.childNodes.forEach((children) => {
    if (children !== target) {
      children.classList.remove("active");
    }
  });

  target.classList.add("active");
  showActiveDateRecord();
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    if (sessionStorage.getItem("activeBus") == null) {
      history.back();
    }
    modal.activeBus = JSON.parse(sessionStorage.getItem("activeBus"));
    busId.value = modal.activeBus.busId;
    await handleCollectBusFareFactors();
    updateBusInfoDisplay();
    PageLoading.stopLoading();
    disableForm();
    updateDateRange();
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
});
