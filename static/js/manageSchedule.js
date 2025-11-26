import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
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

const model = {
  activeSchedule: null,
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

navContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const target = button.dataset.target;
  if (!target) return;

  document.getElementById(target).scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    model.activeSchedule = JSON.parse(sessionStorage.getItem("activeSchedule"));
    updateOverViewContainer();
    updateBusOverViewContainer();
    updateRouteOverViewContainer();
  } catch (err) {
    PageError.showOperatorError();
    toast.error(err.message);
  } finally {
    PageLoading.stopLoading();
  }
});
