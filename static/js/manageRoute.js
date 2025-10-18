import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";

const routeTimeLineContainer = document.querySelector("#route_timeline_cont");

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
};

const updateRouteTimeLine = () => {
  const { source, destination, distance } = modal.activeRoute.route;
  routeTimeLineContainer.innerHTML = "";

  // add source
  routeTimeLineContainer.innerHTML = `<div
                class="d-flex flex-column align-items-center justify-content-center gap-1 position-relative px-4 border-start pb-2 border-black"
              >
                <div
                  style="
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    left: -5px;
                  "
                  class="position-absolute top-0 bg-danger"
                ></div>

                <h4 class="fs-5 align-self-start">
                <div class="d-flex flex-column gap-0">
                  <span class="fs-5">${source.name}</span>
                  <span class="text-muted" style="font-size : 1rem">${source.state.name}</span>
                </div>
                </h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary border-primary"
                  >
                    Journey Begins here
                  </p>
                  <p
                    class="small rounded-pill bg-danger-subtle px-2 py-1 fw-medium border border-danger text-danger"
                  >
                    <span>Source</span>
                  </p>
                </div>
              </div>`;

  // add midcities
  routeTimeLineContainer.innerHTML += modal.activeRouteMidCities
    .map((midCity) => {
      const { routeMidCity, haltingTime } = midCity;
      return `  <div
                class="d-flex flex-column align-items-center justify-content-center gap-1 position-relative px-4 border-start pb-2 border-black"
              >
                <div
                  style="
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    left: -5px;
                  "
                  class="position-absolute top-0 bg-primary"
                ></div>

                <h4 class="fs-5 align-self-start">
                  <div class="d-flex flex-column gap-0">
                    <span class="fs-5">${routeMidCity.midCity.name}</span>
                    <span class="text-muted" style="font-size : 1rem">${routeMidCity.midCity.state.name}</span>
                  </div>
                </h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary border-primary"
                  >
                    <span>${routeMidCity.distanceFromSource}</span>km from source
                  </p>
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium warning"
                  >
                    <span>${haltingTime}</span>mins Halting time
                  </p>
                </div>
              </div>`;
    })
    .join("");

  routeTimeLineContainer.innerHTML += `<div
                class="d-flex flex-column align-items-center justify-content-center gap-1 position-relative px-4"
              >
                <div
                  style="
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    left: -5px;
                  "
                  class="position-absolute top-0 bg-success"
                ></div>

                <h4 class="fs-5 align-self-start">
                <div class="d-flex flex-column gap-0">
                  <span class="fs-5">${destination.name}</span>
                  <span class="text-muted" style="font-size : 1rem">${destination.state.name}</span>
                </div>
                </h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary border-primary"
                  >
                    <span>${distance}</span>km from source
                  </p>
                  <p
                    class="small rounded-pill bg-success-subtle px-2 py-1 fw-medium border border-success text-success"
                  >
                    <span>Destination</span>
                  </p>
                </div>
              </div>`;
};

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
  } catch (err) {
    console.error(err.messsage);
    toast.error(err.messsage);
    PageError.showOperatorError();
  }
  PageLoading.stopLoading();
});
