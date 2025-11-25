import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";
import { getSplittedTime } from "./util.js";
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

const getFormattedTime = (target) => {
  return `${target[0]}:${target[1]}:${target[2]}`;
};

const updateOverViewContainer = () => {
  const d = new Date(model.activeSchedule.journeyDate);

  departureTime.value = getFormattedTime(
    getSplittedTime(model.activeSchedule.departureTime)
  );
  arrivalTime.value = getFormattedTime(
    getSplittedTime(model.activeSchedule.arrivalTime)
  );
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

  // add source
  routeTimeLineContainer.innerHTML = ViewHelper.getRouteTimeLine(source, true);

  // add midcities
  routeTimeLineContainer.innerHTML += [...operatorRouteMidCities]
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
    routeDistance
  );
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
