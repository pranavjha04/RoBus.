import { ModalHandler } from "./modalHandler.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  collectInactiveDriversRequest,
  updateScheduleChargeRequest,
  updateScheduleDriver,
  updateScheduleStatusRequest,
} from "./service.js";
import { toast } from "./toast.js";
import {
  disableElements,
  enableElements,
  getFormatedDuration,
  readOnlyElements,
  removeReadOnlyElements,
} from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const navContainer = document.querySelector("#nav");

const journeyDate = document.querySelector("#journey_date");
const arrivalTime = document.querySelector("#arrival_time");
const departureTime = document.querySelector("#departure_time");
const seaterSeatsBooked = document.querySelector("#seater_seats_booked");
const sleeperSeatsBooked = document.querySelector("#sleeper_seats_booked");

const busNumber = document.querySelector("#bus_number");
const manufacturer = document.querySelector("#manufacturer");
const busType = document.querySelector("#bus_type");

const routeOverView = document.querySelector("#route_overview");
const distance = document.querySelector("#distance");
const duration = document.querySelector("#duration");
const weekday = document.querySelector("#weekday");

const changeDriverBtn = document.querySelector("#change_driver_btn");
const saveDriverChageBtn = document.querySelector("#save_driver_change_btn");
const undoDriverChangeBtn = document.querySelector("#undo_driver_change_btn");
const driverSelect = document.querySelector("#driver_select");
const driverSelectContainer = document.querySelector("#driver_select_cont");
const availableDriverListContainer = document.querySelector(
  "#driver_available_list"
);

const driver = document.querySelector("#driver");
const contact = document.querySelector("#contact");
const email = document.querySelector("#email");
const licenceNumber = document.querySelector("#licence_no");

const additionalCharge = document.querySelector("#additional_charge");
const seaterFare = document.querySelector("#seater_fare");
const sleeperFare = document.querySelector("#sleeper_fare");
const totalCharges = document.querySelector("#total_charge");
const updateChargesBtn = document.querySelector("#update_charge_btn");
const saveChargeChageBtn = document.querySelector("#save_charge_change_btn");
const undoChargeChangeBtn = document.querySelector("#undo_charge_change_btn");

const statusContainer = document.querySelector("#status_container");
const cancelScheduleTriggerBtn = document.querySelector(
  "#cancel_schedule_trigger_btn"
);
const cancelScheduleBtn = document.querySelector("#cancel_schedule_btn");
const confirmModal = document.querySelector("#centeredModal");
const MAX_EXTRA_CHARGE = 500;

const model = {
  activeSchedule: null,
  activeDriver: null,
  driverId: null,
};

const prevValue = {
  additionalCharges: 0,
  seaterFare: 0,
  sleeperFare: 0,
  totalCharges: 0,
};

const cache = {
  driverCache: null,
};

const openChargeContainer = () => {
  removeReadOnlyElements(additionalCharge, seaterFare, sleeperFare);
  updateChargesBtn.classList.add("d-none");
  saveChargeChageBtn.classList.remove("d-none");
  undoChargeChangeBtn.classList.remove("d-none");
};

const closeChargeContainer = () => {
  readOnlyElements(additionalCharge, seaterFare, sleeperFare);
  updateChargesBtn.classList.remove("d-none");
  saveChargeChageBtn.classList.add("d-none");
  undoChargeChangeBtn.classList.add("d-none");
};

const closeDriverSelectContainer = () => {
  model.activeDriver = model.activeSchedule.driver;
  updateDriver();
  driverSelect.textContent = "Select Driver";
  changeDriverBtn.classList.remove("d-none");
  saveDriverChageBtn.classList.add("d-none");
  undoDriverChangeBtn.classList.add("d-none");
  driver.classList.remove("d-none");
  driverSelectContainer.classList.add("d-none");
  model.driverId = null;
};
const openDriverSelectContainer = () => {
  changeDriverBtn.classList.add("d-none");
  saveDriverChageBtn.classList.remove("d-none");
  undoDriverChangeBtn.classList.remove("d-none");
  driver.classList.add("d-none");
  driverSelectContainer.classList.remove("d-none");

  driverSelect.focus();

  contact.value = "";
  email.value = "";
  licenceNumber.value = "";
};

const disableDriverContainer = () => {
  disableElements(
    changeDriverBtn,
    saveDriverChageBtn,
    undoDriverChangeBtn,
    driver,
    driverSelect
  );
};

const enableDriverContainer = () => {
  enableElements(
    changeDriverBtn,
    saveDriverChageBtn,
    undoDriverChangeBtn,
    driver,
    driverSelect
  );
};

const disableChargeContainer = () => {
  disableElements(
    additionalCharge,
    totalCharges,
    sleeperFare,
    seaterFare,
    saveChargeChageBtn,
    undoChargeChangeBtn
  );
};

const enableChargeContainer = () => {
  enableElements(
    additionalCharge,
    totalCharges,
    sleeperFare,
    seaterFare,
    saveChargeChageBtn,
    undoChargeChangeBtn
  );
};
const validateCurrCharge = (value) => {
  if (isNaN(+value) || +value < 0 || +value > MAX_EXTRA_CHARGE) return false;
  return true;
};

const extraChargeHandler = (target, type) => {
  if (target.readOnly) {
    return;
  }

  const value = Math.floor(+target.value);
  totalCharges.value = +totalCharges.value - prevValue[type];
  if (isNaN(value) || value < 0 || value > MAX_EXTRA_CHARGE) {
    toast.error(
      `Charge should be positive and not exceed ₹${MAX_EXTRA_CHARGE}`,
      5000
    );
    target.value = prevValue[type];
    totalCharges.value = prevValue.totalCharges;
    return;
  } else {
    target.value = value;
    prevValue[type] = value;
    totalCharges.value = +totalCharges.value + value;
    prevValue.totalCharges = +totalCharges.value;
  }
};

const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes, seconds] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
};

const formateTime = (date) => {
  const time = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return time;
};

const updateOverViewContainer = () => {
  const d = new Date(model.activeSchedule.journeyDate);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  journeyDate.value = `${year}-${month}-${day}`;

  const departure24h = convertTo24Hour(model.activeSchedule.departureTime);
  const arrival24h = convertTo24Hour(model.activeSchedule.arrivalTime);

  departureTime.value = departure24h;
  arrivalTime.value = arrival24h;

  seaterSeatsBooked.value = model.activeSchedule.seaterSeatsBooked;
  sleeperSeatsBooked.value = model.activeSchedule.sleeperSeatsBooked;
};

const updateBusOverViewContainer = () => {
  const { bus } = model.activeSchedule;
  busNumber.value = bus.busNumber;
  manufacturer.value = bus.manufacturer.name;
  busType.value = bus.doubleDecker ? "Double Decker" : "Single Decker";
};

const updateRouteTimeLine = () => {
  const routeTimeLineContainer = document.querySelector("#route_timeline_cont");
  const { route, operatorRouteMidCities } =
    model.activeSchedule.busRouteWeekday.operatorRoute;
  const { source, destination, distance: routeDistance } = route;
  routeTimeLineContainer.innerHTML = "";

  const { journeyDate, departureTime, arrivalTime } = model.activeSchedule;
  const startDate = new Date(journeyDate);

  const departure24h = convertTo24Hour(departureTime);
  const [startHours, startMins, startSecs] = departure24h.split(":");
  startDate.setHours(+startHours, +startMins, +startSecs, 0);

  routeTimeLineContainer.innerHTML = ViewHelper.getRouteTimeLine(
    source,
    true,
    routeDistance,
    formateTime(startDate)
  );

  let sumHaltingTime = 0;
  routeTimeLineContainer.innerHTML += [...operatorRouteMidCities]
    .sort(
      (a, b) =>
        a.routeMidCity.distanceFromSource - b.routeMidCity.distanceFromSource
    )
    .map((midCity) => {
      const { routeMidCity, haltingTime } = midCity;
      sumHaltingTime += haltingTime;

      const currDate = new Date(startDate.getTime());
      currDate.setTime(
        startDate.getTime() +
          (routeMidCity.durationFromSource + sumHaltingTime) * 60000
      );

      return ViewHelper.getMidCityRouteTimeLine(
        routeMidCity,
        haltingTime,
        formateTime(currDate)
      );
    })
    .join("");

  const totalDuration = operatorRouteMidCities.reduce((acc, curr) => {
    return acc + curr.haltingTime;
  }, route.duration);

  const endDate = new Date(startDate);
  endDate.setTime(startDate.getTime() + totalDuration * 60000);

  routeTimeLineContainer.innerHTML += ViewHelper.getRouteTimeLine(
    destination,
    false,
    routeDistance,
    formateTime(endDate)
  );
  duration.value = getFormatedDuration(totalDuration);
};

const updateRouteOverViewContainer = () => {
  const { busRouteWeekday } = model.activeSchedule;
  const { operatorRoute, weekday: routeWeekday } = busRouteWeekday;
  const { route } = operatorRoute;
  const { source, destination } = route;

  weekday.value = routeWeekday.name;
  routeOverView.querySelector("#source_info_city").textContent = source.name;
  routeOverView.querySelector("#source_info_state").textContent =
    source.state.name;
  routeOverView.querySelector("#destination_info_city").textContent =
    destination.name;
  routeOverView.querySelector("#destination_info_state").textContent =
    destination.state.name;
  distance.value = route.distance;

  updateRouteTimeLine();
};

const updateStatusContainer = () => {
  statusContainer.insertAdjacentHTML(
    "afterbegin",
    ViewHelper.getStatusPill(model.activeSchedule.status)
  );
  if (model.activeSchedule.status.name !== "Upcoming") {
    removeButtons();
  }
};

const updateChargeContainer = () => {
  additionalCharge.value = model.activeSchedule.additionalCharges;
  totalCharges.value = model.activeSchedule.totalCharges;
  seaterFare.value = model.activeSchedule.seaterFare;
  sleeperFare.value = model.activeSchedule.sleeperFare;
};

const removeButtons = () => {
  [cancelScheduleTriggerBtn, changeDriverBtn, updateChargesBtn].forEach((btn) =>
    btn.classList.add("d-none")
  );
};

const updateDriver = () => {
  const { user, licenceNumber: activeLicenceNumber } = model.activeDriver;
  driver.value = user.fullName;
  contact.value = user.contact;
  email.value = user.email;
  licenceNumber.value = activeLicenceNumber;
};

const updateAvailableDriverList = () => {
  availableDriverListContainer.innerHTML = cache.driverCache
    ?.map(ViewHelper.getScheduleAvailableDriver)
    .join("");
};

const handleCollectInActiveDriverRequest = async () => {
  try {
    if (!cache.driverCache) {
      const response = await collectInactiveDriversRequest();
      if (response === "invalid") {
        throw new Error("Invalid Request");
      } else if (response.startsWith("[")) {
        cache.driverCache = JSON.parse(response);
        updateAvailableDriverList();
      } else {
        throw new Error("Invalid Request");
      }
    } else {
      updateAvailableDriverList();
    }
  } catch (err) {
    toast.error(err.message);
  }
};

navContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const target = button.dataset.target;
  if (!target) return;

  document.getElementById(target).scrollIntoView({ behavior: "smooth" });
});

changeDriverBtn.addEventListener("click", () => {
  handleCollectInActiveDriverRequest();
  openDriverSelectContainer();
});

availableDriverListContainer.addEventListener("mousedown", (e) => {
  const target = e.target.closest("li");
  if (!target) {
    driverSelect.textContent = "Select Driver";
    model.driverId = null;
    return;
  }

  if (!target.dataset.driverId) return;
  model.driverId = +target.dataset.driverId;
  const newActivrDriver = cache.driverCache.find(
    (driver) => driver.driverId === model.driverId
  );
  if (!newActivrDriver) return;

  model.activeDriver = newActivrDriver;
  updateDriver();
  driverSelect.textContent = target.querySelector("a").textContent;
});

undoDriverChangeBtn.addEventListener("click", () => {
  model.driverId = null;
  closeDriverSelectContainer();
});

saveDriverChageBtn.addEventListener("click", async () => {
  try {
    if (model.activeSchedule.status.statusId !== 11) return;

    if (!model.driverId) throw new Error("Invalid Request");
    if (!cache.driverCache) throw new Error("Invalid Request");

    const isValidDrierId = cache.driverCache.some(
      (driver) => driver.driverId === +model.driverId
    );
    if (!isValidDrierId) throw new Error("Invalid Request");
    if (model.driverId === model.activeSchedule.driver.driverId) {
      throw new Error("Invalid Request");
    }

    disableDriverContainer();
    const response = await updateScheduleDriver(
      model.activeSchedule.driver.driverId,
      model.activeDriver.driverId,
      model.activeSchedule.scheduleId,
      journeyDate.value,
      model.activeSchedule.bus.busId
    );

    if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response.startsWith("{")) {
      // model.activeSchedule =
      cache.driverCache = null;
      model.driverId = null;
      model.activeSchedule = JSON.parse(response);
      sessionStorage.setItem(
        "activeSchedule",
        JSON.stringify(model.activeSchedule)
      );

      await handleCollectInActiveDriverRequest();

      closeDriverSelectContainer();
      toast.success("Driver Updated Successfully");
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    enableDriverContainer();
  }
});

updateChargesBtn.addEventListener("click", () => {
  additionalCharge.focus();
  openChargeContainer();
});

undoChargeChangeBtn.addEventListener("click", () => {
  updateChargeContainer();
  closeChargeContainer();
});

saveChargeChageBtn.addEventListener("click", async () => {
  if (additionalCharge.readOnly || sleeperFare.readOnly || seaterFare.readOnly)
    return;
  const newAdditionalCharge = additionalCharge.value;
  const newSeaterFare = seaterFare.value;
  const newSleeperFare = sleeperFare.value;
  const newTotalCharges = totalCharges.value;

  if (
    validateCurrCharge(newAdditionalCharge) &&
    validateCurrCharge(newSeaterFare) &&
    validateCurrCharge(newSleeperFare)
  ) {
    if (
      +newAdditionalCharge === model.activeSchedule.additionalCharges &&
      +newSeaterFare === model.activeSchedule.sleeperFare &&
      +newSleeperFare === model.activeSchedule.sleeperFare &&
      +newTotalCharges === model.activeSchedule.totalCharges
    ) {
      toast.normal("No Changes needed");
      closeChargeContainer();
    } else {
      try {
        disableChargeContainer();
        const response = await updateScheduleChargeRequest({
          additional_charges: newAdditionalCharge,
          seater_fare: newSeaterFare,
          sleeper_fare: newSleeperFare,
          total_charges: newTotalCharges,
          schedule_id: model.activeSchedule.scheduleId,
          bus_id: model.activeSchedule.bus.busId,
          journey_date: journeyDate.value,
          operator_route_id:
            model.activeSchedule.busRouteWeekday.operatorRoute.operatorRouteId,
        });

        if (response === "ok") {
          model.activeSchedule.additionalCharges = newAdditionalCharge;
          model.activeSchedule.sleeperFare = newSleeperFare;
          model.activeSchedule.seaterFare = newSeaterFare;
          model.activeSchedule.totalCharges = newTotalCharges;
          updateChargeContainer();
          closeChargeContainer();
          toast.success("Charges were updated successfully");
        } else {
          throw new Error("Invalid Request");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        enableChargeContainer();
      }
    }
  }
});

cancelScheduleBtn.addEventListener("click", async () => {
  if (model.activeSchedule.status.name !== "Upcoming") {
    ModalHandler.hide(confirmModal);
    return;
  }
  try {
    const response = await updateScheduleStatusRequest({
      journey_date: journeyDate.value,
      schedule_id: model.activeSchedule.scheduleId,
      status_id: 6,
      bus_id: model.activeSchedule.bus.busId,
    });
    if (!response.startsWith("{")) {
      throw new Error("Invalid Request");
    } else {
      model.activeSchedule = JSON.parse(response);
      ModalHandler.hide(confirmModal);
      statusContainer.removeChild(statusContainer.firstChild);
      updateStatusContainer();
      toast.success("Schedule was cancelled successfully");
    }
  } catch (err) {
    toast.error(err.message);
  }
});

additionalCharge.addEventListener("blur", (e) => {
  extraChargeHandler(e.target, "additionalCharges");
});
seaterFare.addEventListener("blur", (e) => {
  extraChargeHandler(e.target, "seaterFare");
});
sleeperFare.addEventListener("blur", (e) => {
  extraChargeHandler(e.target, "sleeperFare");
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    model.activeSchedule = JSON.parse(sessionStorage.getItem("activeSchedule"));
    model.activeDriver = model.activeSchedule.driver;
    for (const key in prevValue) {
      prevValue[key] = model.activeSchedule[key];
    }

    updateStatusContainer();
    updateOverViewContainer();
    updateBusOverViewContainer();
    updateRouteOverViewContainer();
    updateChargeContainer();
    updateDriver();
  } catch (err) {
    PageError.showOperatorError();
    toast.error(err.message);
  } finally {
    PageLoading.stopLoading();
  }
});
