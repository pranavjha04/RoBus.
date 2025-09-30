export class ViewHelper {
  static getFareFactorBody(factor) {
    const { fareFactor, charge, operatorTicketFareId } = factor;

    const { fareFactorId, name, fixedCharge } = fareFactor;

    return `<tr class="text-center border-bottom" data-id=${operatorTicketFareId}>
          <td class="p-3">${name}</td>
          <td class="p-3" >${fixedCharge ? "Fixed Charge" : "Person / km"}</td>
          
          <td class="p-3 charge">&#x20B9;${charge}</td>
          <td class="p-3">
            <button class="feature-btn" data-type='edit'>
              <img src="static/media/images/edit_sm_blue.svg" class="feature-icon"/>
            </button>
            <button class="feature-btn ms-2" data-type='delete'>
              <img src="static/media/images/delete_sm_red.svg" class="feature-icon"/>
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
    return `<td class="text-center bg-transparent mt-5 py-5" colspan="100%"><h3>${message}</h3></td>`;
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
    return `<tr
                class="text-center border-bottom"
                data-id="${busId}"
              >
                <td class="p-3">${busNumber}</td>
                <td class="p-3">${
                  manufacturer.charAt(0).toUpperCase() + manufacturer.slice(1)
                }</td>

                <td class="p-3 charge">
                  <span
                    class="badge border
                    
                    ${
                      statusName === "Active" &&
                      "text-success bg-success-subtle border-success"
                    }
                    ${
                      statusName === "Inactive" &&
                      "text-warning bg-warning-subtle border-warning"
                    }
                    ${
                      statusName === "Incomplete" &&
                      "text-danger bg-danger-subtle border-danger"
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
                        <a class="dropdown-item option-link" href="#">Edit</a>
                      </li>
                      <li class="border-bottom">
                        <a class="dropdown-item option-link" href="bus_seating_configuration.do?bus_id=${busId}&back_url=operator_buses.do">Seating</a>
                      </li>
                      <li>
                        <a class="dropdown-item option-link" href="#">Schedule</a>
                      </li>
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

    return ` <li role="button" class="border-bottom cursor-pointer" data-routeId=${routeId}>
                      <a class="dropdown-item d-flex flex-column py-2">
                        <div class="fw-semibold route">
                          &#128205; ${sourceCityName} &rarr; ${destinationCityName}
                        </div>
                        <small class="text-muted"
                          >${sourceStateName} &rarr; ${destinationStateName}</small
                        >
                        <div class="d-flex gap-3 small text-muted mt-1">
                          <div class="d-flex gap-1">
                            &#128338; <span class='duration'>${Math.trunc(
                              duration / 60
                            )}h ${duration % 60}m</span>
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
                            )}h ${durationFromSource % 60}m</span> 
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
                            <td class="p-2">${Math.trunc(
                              durationFromSource / 60
                            )}h ${durationFromSource % 60}m</td>
                            <td class="px-0 py-2 halting">
                              <span
                                >${
                                  haltingTime < 60 ? `${haltingTime} mins` : ""
                                }
                                ${
                                  haltingTime > 60
                                    ? `${Math.trunc(haltingTime / 60)}h ${
                                        haltingTime % 60
                                      }m`
                                    : ""
                                }
                              </span>
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
              <th class="p-3">Source</th>
              <th class="p-3">Destination</th>
              <th class="p-3">Distance</th>
              <th class="p-3">Duration</th>
              <th class="p-3">Status</th>
              <th class="p-3">Options</th>
            </thead>`;
  }

  static getRouteInfoTableBody(operatorRoute) {
    const { operatorRouteId, route, status } = operatorRoute;
    const { destination, source, routeId, distance, duration } = route;
    const { name: destinationCityName } = destination;
    const { name: sourceCityName } = source;
    const { name: statusName } = status;

    return `    <tr class="text-center border-bottom" data-oprid=${operatorRouteId}>
                <td class="p-3">${sourceCityName}</td>
                <td class="p-3">${destinationCityName}</td>
                <td class="p-3">${distance}<small class="small">km</small></td>
                <td class="p-3">
                  ${Math.trunc(duration / 60)
                    .toString()
                    .padStart(2, "0")}<small class="small">h</small> ${(
      duration % 60
    )
      .toString()
      .padStart(2, "0")}<small class="small"
                    >mins</small
                  >
                </td>
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
                        <a class="dropdown-item option-link" href="#">Edit</a>
                      </li>
                      <li class="border-bottom">
                        <a
                          class="dropdown-item option-link"
                          href="bus_seating_configuration.do?bus_id=$34&back_url=operator_buses.do"
                          >Seating</a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item option-link" href="#"
                          >Schedule</a
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>`;
  }
}
