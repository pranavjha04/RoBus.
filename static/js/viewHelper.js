import {
  convertTo24Hour,
  formateTime,
  getFormatedDuration,
  getFormattedTime,
} from "./util.js";

export class ViewHelper {
  static getFareFactorBody(factor) {
    const { fareFactor, charge, operatorTicketFareId } = factor;

    const { fareFactorId, name, fixedCharge } = fareFactor;

    return `<tr class="text-center border-bottom" data-operator-ticket-fare-id=${operatorTicketFareId}>
          <td class="p-3">${name}</td>
          <td class="p-3" >${fixedCharge ? "Fixed Charge" : "Person / km"}</td>
          
          <td class="p-3 charge">&#x20B9;${charge}</td>
          <td class="p-3">
            <button
              class="btn manage-icon border-primary-subtle py-2 px-2"
            >
              <img
                src="static/media/images/edit_sm_blue.svg"
                width="18"
                height="18"
              />
              <span class="text-primary">Manage</span>
            </button>
          </td>
        </tr>`;
  }

  static getFareFactorHeading() {
    return `<thead>
              <tr class="border border-bottom text-center">
                <th class="p-3">Fare Factor</th>
                <th class="p-3">Type</th>
                <th class="p-3">Charges</th>
                <th class="p-3">Options</th>
              </tr>
           </thead>
          <tbody id="fare_table_body"></tbody>
          `;
  }

  static getBusTableHeading() {
    return `<thead>
              <tr class="border border-bottom text-center">
                <th class="p-3">Bus Number</th>
                <th class="p-3">Manufacturer</th>
                <th class="p-3">Status</th>
                <th class="p-3">Options</th>
              </tr>
            </thead>
            <tbody id="bus_table_body"></tbody>
            `;
  }

  static getTableLoader() {
    return `
            <tbody class="bg-transparent mt-5">
              <tr class="bg-transparent mt-5">
                <td class="text-center mt-5 bg-transparent align-self-center d-flex justify-content-center align-items-center">
                  <div class="mt-5 justify-content-center align-self-center">
                    <div class="mt-5 loader"></div>
                  </div>
                </td>
              </tr>
            </tbody>`;
  }

  static getTableEmptyMessage(message) {
    return `<td class="text-center bg-transparent mt-5 py-5 border border-bottom" colspan="100%"><h3>${message}</h3></td>`;
  }

  static getSelectFareTable({ fareFactor }) {
    const { fareFactorId, fixedCharge, name } = fareFactor;
    return `<li data-id=${fareFactorId} class='border-bottom pnt' data-type=${
      fixedCharge ? 1 : 0
    }>
              <a class="dropdown-item d-flex flex-column">
                <span class="fw-semibold">${name}</span>
                <small class="text-secondary">(${
                  fixedCharge ? "Fixed Charge" : "Person / km"
                })</small>
              </a>
            </li>`;
  }

  static getFareCheckBox(factor) {
    const { operatorTicketFareId, fareFactor } = factor;
    const { name } = fareFactor;

    return `<li class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="fare_factor"
                  id="factor_${operatorTicketFareId}"
                  value="${operatorTicketFareId}"
                />
                <label class="form-check-label" for="factor_${operatorTicketFareId}"
                  >${name}</label>
            </li>`;
  }

  static getBusTableRow(bus) {
    const { busId, manufacturer, busNumber, status } = bus;
    const { name: statusName } = status;
    const { name: manufacturerName } = manufacturer;
    return `<tr
                class="text-center border-bottom"
                data-id="${busId}"
              >
                <td class="p-3">${busNumber}</td>
                <td class="p-3">${manufacturerName}</td>

                <td class="p-3 charge">
                  <span
                    class="badge border
                    
                    ${
                      statusName === "Active" &&
                      "text-success bg-success-subtle border-success"
                    }
                    ${
                      statusName === "Inactive" &&
                      "text-danger bg-danger-subtle border-danger"
                    }
                    ${
                      statusName === "Incomplete" &&
                      "text-warning bg-warning-subtle border-warning"
                    }
                    "
                    >${statusName.toUpperCase()}</span
                  >
                </td>
                <td class="p-3">
                  <div class="dropdown">
                    <button
                      class="btn bg-transparent option-btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="static/media/images/options_sm.svg"
                        alt="option"
                      />
                    </button>
                    <ul class="dropdown-menu">
                      <li class="border-bottom">
                        <a class="dropdown-item option-link" href='#'>Edit</a>
                      </li>
                      <li class="border-bottom">
                        <a class="dropdown-item option-link" href="bus_seating_configuration.do?bus_id=${busId}">Seating</a>
                      </li>
                      ${
                        statusName !== "Incomplete"
                          ? `<li>
                        <a class="dropdown-item option-link" href="bus_schedule.do?bus_id=${busId}">Schedule</a>
                      </li>`
                          : ""
                      }
                    </ul>
                  </div>
                </td>
              </tr>`;
  }

  static getRoutesSelectList(route) {
    const { routeId, source, destination, distance, duration } = route;
    const { name: sourceCityName, state: sourceState } = source;
    const { name: destinationCityName, state: destinationState } = destination;
    const { name: sourceStateName } = sourceState;
    const { name: destinationStateName } = destinationState;

    return ` <li role="button"  class="border-bottom cursor-pointer" data-routeId=${routeId}>
                      <a class="dropdown-item d-flex flex-column py-2">
                        <div class="fw-semibold route">
                          &#128205; ${sourceCityName} &rarr; ${destinationCityName}
                        </div>
                        <small class="text-muted"
                          >${sourceStateName} &rarr; ${destinationStateName}</small
                        >
                        <div class="d-flex gap-3 small text-muted mt-1">
                          <div class="d-flex gap-1">
                            &#128338; <span class='duration'>${getFormatedDuration(
                              duration
                            )}</span>
                          </div>
                          <div class="d-flex gap-1">
                            &#128205; <span class='distance'>${distance} km</span>
                          </div>
                        </div>
                      </a>
                    </li>`;
  }

  static getRouteMidCitySelectList(route) {
    const {
      routeMidCityId,
      distanceFromSource,
      durationFromSource,
      midCity,
      route: currRoute,
    } = route;

    const { name: midCityName, state: midCityState } = midCity;
    const { name: midCityStateName } = midCityState;

    return `  <li role='button'
                        class="dropdown-item py-2 d-flex justify-content-between align-items-center"
                        data-routeMidCityId=${routeMidCityId}
                        data-routeid=${currRoute.routeId}
                      >
                        <div class="d-flex flex-column">
                          <span class='city'>&#128205; ${midCityName}</span>
                          <small class="text-muted state">${midCityStateName}</small>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="small text-muted distance">${distanceFromSource} km</span>
                            <span class='small text-muted'>|</span>
                            <span class='small text-muted duration'>${Math.trunc(
                              durationFromSource / 60
                            )
                              .toString()
                              .padStart(2, "0")}h ${(durationFromSource % 60)
      .toString()
      .padStart(2, "0")}m</span> 
                        </div>
                      </li>`;
  }

  static getSelectMidCityAddRouteFormHead() {
    return `<thead class="table-light">
                          <tr>
                            <th class="p-2">Mid City</th>
                            <th class="p-2">Distance</th>
                            <th class="p-2">Duration</th>
                            <th class="p-2">Halting Time</th>
                            <th class="p-2">Options</th>
                          </tr>
                        </thead>`;
  }

  static getSelectMidCityAddRouteFormBodyRow(routeMidCity) {
    const {
      midCity,
      routeMidCityId,
      distanceFromSource,
      durationFromSource,
      haltingTime,
      route: currRoute,
    } = routeMidCity;

    const { name: midCityName } = midCity;
    return `  <tr data-routeMidCityId=${routeMidCityId}
                        data-routeid=${currRoute.routeId}>
                            <td class="p-2">${midCityName}</td>
                            <td class="p-2">${distanceFromSource} km</td>
                            <td class="p-2">${getFormatedDuration(
                              durationFromSource
                            )}</td>
                            <td class="px-0 py-2 halting position-relative d-flex align-items-center justify-content-center">
                                ${getFormatedDuration(haltingTime)}
                            </td>
                            <td class="p-2">
                              <button
                                type="button"
                                class="feature-btn"
                                data-type="edit"
                              >
                                <img
                                  src="static/media/images/edit_sm_blue.svg"
                                  class="feature-icon"
                                />
                              </button>
                              <button
                                type="button"
                                class="feature-btn ms-2"
                                data-type="delete"
                              >
                                <img
                                  src="static/media/images/delete_sm_red.svg"
                                  class="feature-icon"
                                />
                              </button>
                            </td>
                          </tr>`;
  }

  static getRouteInfoTableHeading() {
    return `<thead class="border border-bottom text-center">
              <th class="p-3">ID</th>
              <th class="p-3">Source</th>
              <th class="p-3">Destination</th>
              <th class="p-3">Status</th>
              <th class="p-3">Options</th>
            </thead>`;
  }

  static getRouteInfoTableBody(operatorRoute) {
    const { operatorRouteId, route, status } = operatorRoute;
    const { destination, source } = route;
    const { name: destinationCityName } = destination;
    const { name: sourceCityName } = source;
    const { name: statusName } = status;

    return `    <tr class="text-center border-bottom" data-operator-route-id=${operatorRouteId} data-source=${sourceCityName} data-destination=${destinationCityName} data-status=${statusName}>
                <td clas="p-3">${operatorRouteId}</p>
                <td class="p-3">${sourceCityName}</td>
                <td class="p-3">${destinationCityName}</td>
                <td class="p-3">
                  <span
                    class="badge border 
                    ${
                      statusName === "Active" &&
                      "text-success bg-success-subtle border-success"
                    }
                    ${
                      statusName === "Inactive" &&
                      "text-danger bg-danger-subtle border-danger"
                    }
                    "
                    >${statusName.toUpperCase()}</span
                  >
                </td>
                <td class="p-3">
                  <button
                    class="btn manage-icon border-primary-subtle py-2 px-2"
                  >
                    <img
                      src="static/media/images/edit_sm_blue.svg"
                      width="18"
                      height="18"
                    />
                    <span class="text-primary">Manage</span>
                  </button>
                </td>
              </tr>`;
  }

  static getOperatorTicketFareManageHeading() {
    return `<thead
              class="border border-bottom text-center"
              style="background-color: rgb(248, 249, 250)"
            >
              <tr class="border border-bottom text-center">
                <th class="p-3">Bus Number</th>
                <th class="p-3">Manufacturer</th>
                <th class="p-3">Action</th>
              </tr>
            </thead>`;
  }

  static getOperatorTicketFareManageBody(busFareFactor) {
    const { busFareFactorId, bus } = busFareFactor;
    const { busNumber, busId, manufacturer } = bus;
    const { name: manufacturerName } = manufacturer;
    return ` <tr class="text-center border-bottom" data-bus-id=${busId} data-bus-fare-factor-id=${busFareFactorId}>
                <td class="p-3">${busNumber}</td>
                <td class="p-3">${manufacturerName}</td>
                <td class="p-3">
                  <button
                    class="btn  delete-icon border-danger-subtle py-2 px-2"
                  >
                    <img
                      src="static/media/images/delete_sm_red.svg"
                      width="18"
                      height="18"
                    />
                    <span class="text-danger">Remove</span>
                  </button>
                </td>
              </tr>`;
  }

  static getAvailableFareFactorBus(bus) {
    const { busNumber, busId, manufacturer, status } = bus;
    const { name: manufacturerName } = manufacturer;
    const { name: statusName } = status;

    return `<li
              class="border-bottom py-2 px-3 hover-bg-light"
              role="button"
              data-bus-id="${busId}"
              style="transition: background-color 0.2s ease;"
            >
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <input
                    class="form-check-input me-3 bus-checkbox"
                    type="checkbox"
                    value="${busNumber}"
                  />
                  <div>
                    <div class="fw-semibold">${busNumber}</div>
                    <div class="small text-secondary">${manufacturerName}</div>
                  </div>
                </div>

                <span
                  class="badge border
                  ${
                    statusName === "Active"
                      ? "text-success bg-success-subtle border-success"
                      : statusName === "Inactive"
                      ? "text-danger bg-danger-subtle border-danger"
                      : "text-warning bg-warning-subtle border-warning"
                  }"
                >
                  ${statusName.toUpperCase()}
                </span>
              </div>
            </li>
            `;
  }

  static getSelectedBusFareHTML(busId, busNumber) {
    return `<span
                    class="badge rounded-pill bg-primary-subtle text-primary d-flex align-items-center gap-2 px-3 py-2"
                  >
                    ${busNumber}
                    <button
                      type="button"
                      class="btn-close btn-close-sm"
                      aria-label="Remove"
                    ></button>
                    <input type="hidden" name="bus_id" value=${busId} />
                  </span>`;
  }

  static getRouteTimeLine(city, isSource = false, distance, time) {
    return `<div
                class="d-flex flex-column align-items-center justify-content-center gap-1 position-relative px-4 ${
                  isSource && "border-start"
                } pb-2 border-black"
              >
                <div
                  style="
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    left: -5px;
                  "
                  class="position-absolute top-0 ${
                    isSource ? "bg-danger" : "bg-success"
                  }"
                ></div>

                <h4 class="fs-5 align-self-start">
                <div class="d-flex flex-column gap-0">
                  <span class="fs-5">${city.name}</span>
                  <span class="text-muted" style="font-size : 1rem">${
                    city.state.name
                  }</span>
                </div>
                </h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                ${
                  time
                    ? `<p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium violet"
                  >
                    <span>${time}</span>
                  </p>`
                    : ""
                } 
                ${
                  isSource
                    ? `<p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary border-primary"
                  >
                    Journey Begins here
                  </p>
                  <p
                    class="small rounded-pill bg-danger-subtle px-2 py-1 fw-medium border border-danger text-danger"
                  >
                    <span>Source</span>
                  </p>`
                    : `<p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary border-primary"
                  >
                    <span>${distance}</span>km from source
                  </p>
                  <p
                    class="small rounded-pill bg-success-subtle px-2 py-1 fw-medium border border-success text-success"
                  >
                    <span>Destination</span>
                  </p>`
                }  

    
                </div>
              </div>`;
  }

  static getMidCityRouteTimeLine(city, haltingTime, time) {
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
                    <span class="fs-5">${city.midCity.name}</span>
                    <span class="text-muted" style="font-size : 1rem">${
                      city.midCity.state.name
                    }</span>
                  </div>
                </h4>
                <div class="d-flex align-items-center mb-0 gap-2">
                ${
                  time
                    ? `<p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium violet"
                  >
                    <span>${time}</span>
                  </p>`
                    : ""
                } 
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium border text-primary border-primary"
                  >
                    <span>${city.distanceFromSource}</span>km from source
                  </p>
                  <p
                    class="small rounded-pill bg-light px-2 py-1 fw-medium warning"
                  >
                    <span>${haltingTime}</span>mins Halting time
                  </p>
                </div>
              </div>`;
  }

  static getManageRouteMidCityTableHeading() {
    return `<thead
                   class="border border-bottom text-center"
                  style="background-color: rgb(248, 249, 250)"
                >
                  <tr>
                    <th class="p-3">Mid City</th>
                    <th class="p-3">Distance</th>
                    <th class="p-3">Duration</th>
                    <th class="p-3">Halting Time</th>
                    <th class="p-3">Options</th>
                  </tr>
                </thead>
                `;
  }

  static getManageRouteMidCityTableRow(city) {
    const { haltingTime, routeMidCity, operatorRouteMidCityId, operatorRoute } =
      city;
    const { distanceFromSource, durationFromSource, midCity } = routeMidCity;
    const isActive = operatorRoute.status.name === "Active";
    return `<tr class="text-center border-bottom"
            data-operator-route-mid-city-id="${operatorRouteMidCityId}"
            data-halting-time="${haltingTime}">
            
          <td class="p-3 d-flex flex-column align-items-center justify-content-center">
            ${midCity.name}
            <span class="text-muted">${midCity.state.name}</span>
          </td>

          <td class="p-3">${distanceFromSource} km</td>

          <td class="p-3">${getFormatedDuration(durationFromSource)}</td>

          <td class="p-3 position-relative halting">
            ${getFormatedDuration(haltingTime)}
          </td>

          <td class="p-3">
            <button
              class="btn manage-icon border-primary-subtle py-2 px-2 me-1"
              ${isActive ? "disabled" : ""}
              data-type="edit"
            >
              <img src="static/media/images/edit_sm_blue.svg" width="18" height="18" />
              <span class="text-primary">Edit</span>
            </button>

            <button
              class="btn delete-icon border-danger-subtle py-2 px-2"
              ${isActive ? "disabled" : ""}
              data-type="delete"
            >
              <img src="static/media/images/delete_sm_red.svg" width="18" height="18" />
              <span class="text-danger">Remove</span>
            </button>
          </td>

        </tr>
        `;
  }

  static getManageRouteCityActiveRow(route, totalDuration) {
    const { source, destination, distance } = route;
    return `<a class="route-item">
                    <div class="route-header">
                      <span class="route-title"
                        >&#128205; ${source.name} &rarr; ${destination.name}</span
                      >
                      <small class="route-subtitle"
                        >${source.state.name} &rarr; ${destination.state.name}</small
                      >
                    </div>

                    <div class="route-info">
                      <div class="info-item">
                        &#128338;
                        <span class="duration">${totalDuration}</span>
                      </div>
                      <div class="info-item">
                        &#128205;
                        <span class="distance">${distance} km</span>
                      </div>
                    </div>
                  </a>`;
  }

  static getImagePreview(file, type = "medium") {
    if (!file || !(file instanceof File)) throw new Error("No File");
    const imageType = {
      medium: "100px; height: 100px;",
    };
    return `<img 
          src="${URL.createObjectURL(file)}" 
          class="object-fit-cover rounded-2 preview"
          style="${imageType[type]}"
        >`;
  }

  static getDriverInfoTableHeading = () => {
    return `<thead>
              <tr class="border border-bottom text-center">
                <th class="p-3">Name</th>
                <th class="p-3">Started</th>
                <th class="p-3">License No.</th>
                <th class="p-3">Status</th>
                <th class="p-3">Contact</th>
                <th class="p-3">Options</th>
              </tr>
            </thead>`;
  };

  static getDriverInfoTableRow = (driver) => {
    const { driverId, licenceNumber, startDate, user } = driver;
    const { fullName, contact, status } = user;
    const { name: statusName } = status;
    return ` <tr class="text-center border-bottom" data-driver-id=${driverId}>
                <td class="p-3">${fullName}</td>
                <td class="p-3">${startDate}</td>
                <td class="p-3">${licenceNumber}</td>
                <td class="p-3">
                  <span
                    class="badge border
                    
                    ${
                      statusName === "Unverified" &&
                      "text-success bg-success-subtle border-success"
                    }
                    ${
                      statusName === "Inactive" &&
                      "text-danger bg-danger-subtle border-danger"
                    }
                    
                    "
                    >${statusName.toUpperCase()}</span
                  >
                </td>
                <td class="p-3">${contact}</td>
                <td class="p-3">
                  <button
                    class="btn manage-icon border-primary-subtle py-2 px-2"
                  >
                    <img
                      src="static/media/images/edit_sm_blue.svg"
                      width="18"
                      height="18"
                    />
                    <span class="text-primary">Manage</span>
                  </button>
                </td>
              </tr>`;
  };

  static getBusRoutWeedayFormWeekday(weekday) {
    const { name, weekdayId } = weekday;
    return `<div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="weekday"
                      value=${weekdayId}
                      id="${name}"
                    />
                    <label class="form-check-label" for="${name}">${name}</label>
                  </div>`;
  }

  static getBusRouteWeekdayTableHead() {
    return `<thead
                  class="border border-bottom text-center table table-responsive"
                  style="background-color: rgb(248, 249, 250)"
                >
                  <tr>
                    <th class="p-3">Weekday</th>
                    <th class="p-3">Options</th>
                  </tr>
                </thead>`;
  }
  static getBusRouteWeekdayTableRow(busRouteWeekday) {
    const { busRouteWeekdayId, weekday } = busRouteWeekday;
    return `  <tr
                    class="text-center border-bottom"
                    data-bus-route-weekday-id="${busRouteWeekdayId}"
                  >
                    <td
                      class="p-3 text-center d-flex flex-column align-items-center justify-content-center"
                    >
                      ${weekday.name}
                    </td>
                    <td class="p-3 text-center">
                      <button
                        class="btn delete-icon border-danger-subtle py-2 px-2"
                        data-type="delete"
                      >
                        <img
                          src="static/media/images/delete_sm_red.svg"
                          width="18"
                          height="18"
                        />
                        <span class="text-danger">Remove</span>
                      </button>
                    </td>
                  </tr>`;
  }

  static getBusRouteWeekdaySelect(busRouteWeekday) {
    const { busRouteWeekdayId, operatorRoute } = busRouteWeekday;
    const { operatorRouteId, route } = operatorRoute;
    const { routeId, source, destination, distance, duration } = route;
    const { name: sourceCityName, state: sourceState } = source;
    const { name: destinationCityName, state: destinationState } = destination;
    const { name: sourceStateName } = sourceState;
    const { name: destinationStateName } = destinationState;

    return ` <li role="button"  class="border-bottom cursor-pointer" data-bus-route-weekday-id="${busRouteWeekdayId}" data-operator-route-id="${operatorRouteId}">
                      <a class="dropdown-item d-flex flex-column py-2">
                        <div class="fw-semibold route">
                          &#128205; ${sourceCityName} &rarr; ${destinationCityName}
                        </div>
                        <small class="text-muted"
                          >${sourceStateName} &rarr; ${destinationStateName}</small
                        >
                        <div class="d-flex gap-3 small text-muted mt-1">
                          <div class="d-flex gap-1">
                            &#128338; <span class='duration'>${getFormatedDuration(
                              duration
                            )}</span>
                          </div>
                          <div class="d-flex gap-1">
                            &#128205; <span class='distance'>${distance} km</span>
                          </div>
                        </div>
                      </a>
                    </li>`;
  }

  static getScheduleAvailableDriver(driver) {
    const { driverId, user } = driver;

    return `<li role="button" class="border-bottom" data-driver-id="${driverId}" >
                      <a class="dropdown-item py-2">${user.fullName}</a>
              </li>
                    `;
  }

  static getScheduleTableHeading() {
    return `<thead class="border border-bottom text-center table table-responsive" style="background-color: rgb(248, 249, 250)">
                <tr>
                  <th class="p-3">Timings</th>
                  <th class="p-3">Route</th>
                  <th class="p-3">Bus</th>
                  <th class="p-3">Driver</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Options</th>
                </tr>
              </thead>`;
  }

  static getScheduleTableRow(schedule) {
    const {
      scheduleId,
      arrivalTime,
      departureTime,
      driver,
      bus,
      busRouteWeekday,
      journeyDate,
      status,
    } = schedule;

    const { operatorRoute } = busRouteWeekday;
    const currDate = new Date(journeyDate);

    return ` <tr class="border border-bottom text-center" data-schedule-id=${scheduleId} data-day=${currDate
      .getDate()
      .toString()
      .padStart(2, "0")} data-month=${(currDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")} 
      data-date=${currDate
        .getDate()
        .toString()
        .padStart(2, "0")} data-year=${currDate.getFullYear()}>
                  <td class="p-3">${getFormattedTime(
                    departureTime
                  )} → ${getFormattedTime(arrivalTime)}</td>
                  <td class="d-flex align-items-center text-center justify-content-center">
                    <div
                      class="p-3 text-center d-flex flex-column align-items-center justify-content-center"
                    >
                      ${operatorRoute.route.source.name}
                      <span class="text-muted small">${
                        operatorRoute.route.source.state.name
                      }</span>
                    </div>
                    &rightarrow;
                    <div
                      class="p-3 text-center d-flex flex-column align-items-center justify-content-center"
                    >
                      ${operatorRoute.route.destination.name}
                      <span class="text-muted small">${
                        operatorRoute.route.destination.state.name
                      }</span>
                    </div>
                  </td>
                  <td class="p-3">${bus.busNumber}</td>
                  <td class="p-3">${driver.user.fullName}</td>
                  <td class="p-3 charge">
                  <span
                    class="badge border  status-${status.name.toLowerCase()}
                    "
                    >${status.name.toUpperCase()}</span
                  >
                </td>
                  <td class="p-3">
                    <button
                      class="btn manage-icon border-primary-subtle py-2 px-2"
                      data-type="manage"
                    >
                      <img
                        src="static/media/images/edit_sm_blue.svg"
                        width="18"
                        height="18"
                      />
                      <span class="text-primary">Manage</span>
                    </button>
                  </td>
                </tr>`;
  }

  static getStatusPill(status) {
    const color = {
      Upcoming: "#d1f2e0",
      Ongoing: "#8cb8ff",
      Completed: "#e6c76b",
      Cancelled: "#e29aa3",
    };
    const borderColor = {
      Upcoming: "#45a87a",
      Ongoing: "#4f7fd6",
      Completed: "#c4a23f",
      Cancelled: "#c65463",
    };
    const textColor = {
      Upcoming: "#0b3d28",
      Ongoing: "#062e6f",
      Completed: "#4a3800",
      Cancelled: "#6e1723",
    };
    const statusBg = {
      Upcoming: "text-success",
      Ongoing: "text-primary",
      Completed: "text-dark",
      Cancelled: "text-danger",
    };

    return `<div
                      class="d-flex align-items-center gap-2 px-2 py-1 rounded-pill"
                      style="background-color: ${
                        color[status.name]
                      }; border : 1px solid ${borderColor[status.name]}"

                    >
                      <div
                        class="spinner-grow ${statusBg[status.name]}"
                        
                        style="width: 8.5px; height: 8.5px;"
                        role="status"
                      ></div>
                      <span style="color: ${textColor[status.name]}">${
      status.name
    }</span>
                    </div>`;
  }

  static getDateRangeButton(currDate, isInRange) {
    return `<button
                  class="col norm rounded-2  d-flex flex-column text-center ${
                    isInRange ? "active" : ""
                  } justify-content-center"
                  data-year=${currDate.getFullYear()}
                  data-month=${(currDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                  data-day=${currDate.getDate().toString().padStart(2, "0")}
                >
                  <h4>${new Intl.DateTimeFormat(navigator.language, {
                    weekday: "short",
                  }).format(currDate)}</h4>
                  <span class="fs-4">${new Intl.DateTimeFormat(
                    navigator.language,
                    {
                      day: "2-digit",
                    }
                  ).format(currDate)}</span>
                </button>`;
  }

  static getBusSeatingDiagram(seating, counter, bookedSeatList) {
    const { lsCount, rsCount, rowCount, sleeper, seats, seatingId } = seating;
    let busDiagram = `${Array.from({
      length: sleeper ? rowCount : rowCount - 1,
    })
      .map((_) => {
        return `<div class="d-flex align-items-center gap-5 justify-content-between" data-seating-id="${seatingId}">
                <div class="d-flex gap-1">
                   ${Array.from({ length: lsCount })
                     .map(
                       (_) =>
                         `<button
                          data-type="seat"
                          data-seat-number="${counter.count}"
                          ${
                            bookedSeatList.some(
                              (bookedSeat) =>
                                bookedSeat.seatNumber === counter.count
                            )
                              ? "disabled"
                              : ""
                          }
                          class="${
                            sleeper ? "sleeper_seat" : "seater_seat"
                          } seat btn ${
                           bookedSeatList.some(
                             (bookedSeat) =>
                               bookedSeat.seatNumber === counter.count
                           )
                             ? "booked"
                             : ""
                         }"
                         
                         >${counter.count++}</button>`
                     )
                     .join("")}
                </div>
                <div class="d-flex gap-1">
                     ${Array.from({ length: rsCount })
                       .map(
                         (_) =>
                           `<button
                            data-type="seat"
                            data-seat-number="${counter.count}"
                            class="${
                              sleeper ? "sleeper_seat" : "seater_seat"
                            } seat btn ${
                             bookedSeatList.some(
                               (bookedSeat) =>
                                 bookedSeat.seatNumber === counter.count
                             )
                               ? "booked"
                               : ""
                           }">${counter.count++}</button>`
                       )
                       .join("")}
                </div>
            </div>`;
      })
      .join("")}`;

    // Back Seats

    if (sleeper) return busDiagram;

    busDiagram += `<div class="d-flex align-items-center gap-4 ">
                              <div class="d-flex w-100 gap-1 justify-content-between">
                                  ${Array.from({ length: 5 })
                                    .map(
                                      (_) =>
                                        `<button data-type="seat" data-seat-number="${
                                          counter.count
                                        }" class="seater_seat btn seat w-100" ${
                                          bookedSeatList.some(
                                            (bookedSeat) =>
                                              bookedSeat.seatNumber ===
                                              counter.count
                                          )
                                            ? "disabled"
                                            : ""
                                        }>
                                        ${counter.count++}
                                      </button>`
                                    )
                                    .join("")}
                              </div>
                          </div>`;

    return busDiagram;
  }

  static getRouteTimeLineContainer(schedule) {
    const { busRouteWeekday, journeyDate, departureTime, arrivalTime } =
      schedule;
    const { route, operatorRouteMidCities } = busRouteWeekday.operatorRoute;
    const { source, destination, distance: routeDistance } = route;

    const startDate = new Date(journeyDate);

    const departure24h = convertTo24Hour(departureTime);
    const [startHours, startMins, startSecs] = departure24h.split(":");
    startDate.setHours(+startHours, +startMins, +startSecs, 0);

    let result = ViewHelper.getRouteTimeLine(
      source,
      true,
      routeDistance,
      formateTime(startDate)
    );

    let sumHaltingTime = 0;
    result += [...operatorRouteMidCities]
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

    result += ViewHelper.getRouteTimeLine(
      destination,
      false,
      routeDistance,
      formateTime(endDate)
    );

    return result;
  }

  static getSearchResultRow(result) {
    const {
      scheduleId,
      totalCharges,
      bus,
      arrivalTime,
      departureTime,
      busRouteWeekday,
      seaterSeatsBooked,
      sleeperSeatsBooked,
      bookedSeatList,
    } = result;
    const { operator, seatingList, busFareFactorList, busNumber } = bus;
    const { operatorRoute } = busRouteWeekday;
    const totalDuration = operatorRoute.operatorRouteMidCities.reduce(
      (acc, curr) => {
        return acc + curr.haltingTime;
      },
      operatorRoute.route.duration
    );
    const totalSeats = seatingList.reduce((acc, curr) => {
      return acc + curr.seats;
    }, 0);
    let counter = { count: 1 };
    const bookedSeats = sleeperSeatsBooked + seaterSeatsBooked;
    return `  <li class="bus-card mb-2 pb-3 bg-white" data-schedule-id="${scheduleId}">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 p-3"
              >
                <!-- LEFT SIDE (Title + Badges + Amenity Button) -->
                <div class="flex-grow-1">
                  <div class="d-flex flex-column gap-1">
                      <h4 class="fw-bold">${operator.fullName}</h4>
                      <span class='small text-muted fw-semibold'>${busNumber}</span>
                    </div>

                                  </div>

                <!-- MIDDLE SECTION (Timing) -->
                <div class="d-flex align-items-center gap-3">
                  <div class="text-center">
                    <p class="mb-1 fw-bold fs-5">${getFormattedTime(
                      departureTime
                    )}</p>
                    <div class="d-flex flex-column gap-0">
                    <span class="text-secondary fs-5 mb-0">${
                      operatorRoute.route.source.name
                    }</span>
                      <small class="text-secondary small">
                      ${operatorRoute.route.source.state.name}
                    </small>
                    </div>
                  </div>

                  <div class="text-center">
                    <div class="duration-line my-2"></div>
                    <small class="text-muted fw-medium">${getFormatedDuration(
                      totalDuration
                    )}</small>
                  </div>

                  <div class="text-center">
                    <p class="mb-1 fw-bold fs-5">${getFormattedTime(
                      arrivalTime
                    )}</p>
                    <div class="d-flex flex-column gap-0">
                    <span class="text-secondary fs-5 mb-0">${
                      operatorRoute.route.destination.name
                    }</span>
                      <small class="text-secondary small">
                      ${operatorRoute.route.destination.state.name}
                    </small>
                    </div>
                  </div>
                </div>

                <!-- RIGHT SECTION (Price + Button) -->
                <div class="text-md-end d-flex flex-column align-items-md-en">
                  <div class="price fs-4 fw-bold mb-1">&#x20B9;${totalCharges}</div>
                  <span class="seats-available mb-2">${
                    totalSeats - bookedSeats
                  } Seats Available</span>
                  <button
                    class="btn btn-primary rounded-pill px-4 py-2 fw-medium"
                    data-type='book'
                    >Select Seats</button
                  >
                </div>
                </div>
                <!-- Always visible seat layout -->
                <div class='px-3 '>
                <button class="decker-btn">${
                  bus.doubleDecker ? "Double" : "Single"
                } Decker</button>

                <!-- Amenities Button -->
                <button
                data-type='amenities'
                  class="amenities-btn"
                >
                  View Amenities
                </button>
                <button
                  class="midcities-btn"
                  data-type='midcity'
                >
                  View Mid Cities
                </button>

                <!-- Amenities List (Hidden by default) -->
                <div class="amenities-list d-none">
                  ${busFareFactorList
                    .map(({ operatorTicketFare }) => {
                      const { fareFactor } = operatorTicketFare;
                      return `<span class="amenity-item">${fareFactor.name}</span>`;
                    })
                    .join("")}
                  
                </div>

                <div
                    class="d-flex flex-column align-items-start pt-4 time-line d-none"
                  >
                  ${ViewHelper.getRouteTimeLineContainer(result)}
                  </div>
                </div>

                <div class='bus-container d-flex align-items-center justify-content-center w-100 mt-2 d-none'>
                <div class="d-flex gap-2 align-items-center">
                    ${seatingList?.map((seating) => {
                      return `<div class="border rounded-5 border-primary">
                                <div
                                  class="d-flex align-items-center justify-content-between py-2 px-2 border-bottom border-primary"
                                >
                                  <div class="d-flex flex-column align-items-center">
                                    
                                    <span class='fw-semibold'>${
                                      seating.deck ? "Upper" : "Lower"
                                    } Deck</span>
                                  </div>
                                  <div class="d-flex flex-column align-items-center ${
                                    seating.deck ? `opacity-0` : ""
                                  }">
                                    <img
                                      src="static/media/images/steering_wheel.svg"
                                      style="width: 30px; height: 30px"
                                    />
                                    <span>Driver</span>
                                  </div>
                                </div>
                                <div class="bus">
                                    ${ViewHelper.getBusSeatingDiagram(
                                      seating,
                                      counter,
                                      bookedSeatList
                                    )}
                                  </div>
                              </div>`;
                    })}

                  <!-- Seat Info + Action Panel -->
                  <div class="border rounded-4 p-3 mt-3 bg-white shadow-sm action-panel" >

                  <!-- Seat Legend -->
                  <div class="d-flex flex-wrap gap-3 mb-3">
                    <div class="d-flex align-items-center gap-2">
                      <div class="seat seater_seat"></div>
                      <span class="small fw-medium">Seater</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <div class="seat sleeper_seat"></div>
                      <span class="small fw-medium">Sleeper</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <div class="seat seater_seat booked"></div>
                      <span class="small fw-medium">Booked</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <div class="seat seater_seat selected"></div>
                      <span class="small fw-medium">Selected</span>
                    </div>
                  </div>

                  <!-- Selected Seats -->
                  <div class="d-flex justify-content-between align-items-center select-seat-container">
                    <div>
                      <div class="fw-semibold">Selected Seats</div>
                      <div id="selectedSeats" class="text-primary fw-bold">
                        None
                      </div>
                    </div>
                    
                    <button
                      id="confirmBookingBtn"
                      class="btn btn-primary rounded-pill px-4"
                      disabled
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
                
                </div>                
                </div>              
            </li>`;
  }
}
