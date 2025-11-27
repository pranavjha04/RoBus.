import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  collectInactiveDriversRequest,
  updateScheduleDriver,
} from "./service.js";
import { toast } from "./toast.js";
import { getFormatedDuration, getSplittedTime } from "./util.js";
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
const saveChangeBtn = document.querySelector("#save_change_btn");
const undoChangesBtn = document.querySelector("#undo_changes_btn");
const driverSelect = document.querySelector("#driver_select");
const driverSelectContainer = document.querySelector("#driver_select_cont");
const availableDriverListContainer = document.querySelector(
  "#driver_available_list"
);

const driver = document.querySelector("#driver");
const contact = document.querySelector("#contact");
const email = document.querySelector("#email");
const licenceNumber = document.querySelector("#licence_no");

const model = {
  activeSchedule: null,
  activeDriver: null,
  driverId: null,
};

const cache = {
  driverCache: null,
};

const closeDriverSelectContainer = () => {
  model.activeDriver = model.activeSchedule.driver;
  updateDriver();
  driverSelect.textContent = "Select Driver";
  changeDriverBtn.classList.remove("d-none");
  saveChangeBtn.classList.add("d-none");
  undoChangesBtn.classList.add("d-none");
  driver.classList.remove("d-none");
  driverSelectContainer.classList.add("d-none");
  model.driverId = null;
};
const openDriverSelectContainer = () => {
  changeDriverBtn.classList.add("d-none");
  saveChangeBtn.classList.remove("d-none");
  undoChangesBtn.classList.remove("d-none");
  driver.classList.add("d-none");
  driverSelectContainer.classList.remove("d-none");

  driverSelect.focus();

  contact.value = "";
  email.value = "";
  licenceNumber.value = "";
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
  journeyDate.value = d.toISOString().split("T")[0];

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
      console.log(response);
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

undoChangesBtn.addEventListener("click", () => {
  closeDriverSelectContainer();
});

saveChangeBtn.addEventListener("click", async () => {
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

    const response = await updateScheduleDriver(
      model.driverId,
      model.activeSchedule.driver.driverId,
      model.activeSchedule.scheduleId,
      model.activeSchedule.bus.busId
    );

    if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response.startsWith("{")) {
      // model.activeSchedule =
      cache.driverCache = cache.driverCache.filter((driver) => {
        return driver.driverId !== +model.driverId;
      });
      model.activeSchedule = JSON.parse(response);
      closeDriverSelectContainer();
      toast.success("Driver Updated Successfully");
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    model.activeSchedule = JSON.parse(sessionStorage.getItem("activeSchedule"));
    model.activeDriver = model.activeSchedule.driver;
    updateOverViewContainer();
    updateBusOverViewContainer();
    updateRouteOverViewContainer();
    updateDriver();
  } catch (err) {
    PageError.showOperatorError();
    toast.error(err.message);
  } finally {
    PageLoading.stopLoading();
  }
});
