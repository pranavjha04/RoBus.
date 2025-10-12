import { ModalHandler } from "./modalHandler.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import {
  addBusFareFactorRequest,
  collectAllRecordsWithOperatorTicketFareRequest,
  collectAvailableTicketFareBusRecordsRequest,
  deleteBusFareFactor,
  deleteFareFactorRequest,
  updateFareFactorChargeRequest,
} from "./service.js";
import { toast } from "./toast.js";
import { createURLParams, validateCharge } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const chargeInput = document.querySelector("#charges");
const chargeEditBtn = document.querySelector("#edit_btn");
const chargeDeleteBtn = document.querySelector("#delete_btn");
const factorName = document.querySelector("#factor_name");
const chargeType = document.querySelector("#charge_type");
const formModal = document.querySelector("#centeredModal");

const busSelect = document.querySelector("#bus_select");
const selectedBusContainer = document.querySelector("#selected_bus");
const addBusFareFactorForm = document.querySelector(
  "#add_bus_fare_factor_form"
);

const busTable = document.querySelector("#operator_ticket_fare_bus_table");

let watchSessionInternal = null;

const modal = {
  activeFare: null,
  operatorTicketFareBusList: [],
  availableAddToBus: [],
  limit: 5,
  offset: 0,
};

const updateInputValue = (value = "") => {
  if (value) {
    chargeInput.value = value;
    return;
  }
  const { charge } = modal.activeFare;
  chargeInput.value = charge;
};

const updateChargeInputEdit = () => {
  const newValue = chargeInput.value;
  modal.activeFare.charge = newValue;
  sessionStorage.setItem("activeFare", JSON.stringify(modal.activeFare));
};

const chargeEvent = async (e) => {
  const value = +e.target.value;
  if (isNaN(value) || value < 0 || value > 120) {
    toast.error("Invalid Value");
    updateInputValue();
    setTimeout(() => {
      toast.normal(
        "Input value should be greater than 0 and less then equal to 120",
        5000
      );
    }, 500);
    disableChargeInput();
    return;
  }

  const { charge, operatorTicketFareId } = modal.activeFare;

  if (+charge === value) {
    disableChargeInput();
    return;
  }

  try {
    const response = await updateFareFactorChargeRequest(
      value,
      operatorTicketFareId
    );

    switch (response) {
      case "internal": {
        throw new Error("Internal Server Error");
      }
      case "invalid": {
        updateInputValue();
        throw new Error("Invalid Request");
      }
      case "success": {
        updateChargeInputEdit();
        disableChargeInput();
        toast.success("Charges were updated successfully");
        break;
      }
      default: {
        break;
      }
    }
  } catch (err) {
    toast.error(err.message);
    disableChargeInput();
  }
};

const enableChargeInput = () => {
  chargeInput.readOnly = false;
  chargeInput.focus();
  chargeInput.select();
  chargeInput.removeEventListener("blur", chargeEvent);
  chargeInput.addEventListener("blur", chargeEvent);
};

const disableChargeInput = () => {
  chargeInput.readOnly = true;
  chargeInput.removeEventListener("blur", chargeEvent);
};

chargeDeleteBtn.addEventListener("click", async () => {
  const { activeFare, operatorTicketFareBusList } = modal;
  if (operatorTicketFareBusList.length > 0) {
    toast.error(
      "Unable to delete. Please detach this fare factor from all buses before proceeding."
    );
    return;
  }

  try {
    const response = await deleteFareFactorRequest(
      activeFare.operatorTicketFareId
    );

    switch (response) {
      case "internal": {
        throw new Error("Internal Server Error");
      }
      case "invalid": {
        throw new Error("Invalid Request");
      }
      case "success": {
        toast.success("Fare factor deleting successfully");
        setTimeout(() => {
          history.back();
        }, 500);
        break;
      }
      default: {
        break;
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
});

chargeEditBtn.addEventListener("click", async () => {
  const { operatorTicketFareBusList } = modal;

  const isAnyBusActive = operatorTicketFareBusList.some(
    ({ bus }) => bus.status.name === "Active"
  );
  if (isAnyBusActive) {
    toast.error("Cannot edit because some buses are active");
    disableChargeInput();
    return;
  }
  enableChargeInput();
});

const handleDeleteBusFareFactorRequest = async (busId, busFareFactorId) => {
  const { operatorTicketFareId } = modal.activeFare;
  const { operatorTicketFareBusList } = modal;
  const prepareObj = {
    bus_id: busId,
    bus_fare_factor_id: +busFareFactorId,
    operator_ticket_fare_id: +operatorTicketFareId,
  };

  try {
    const response = await deleteBusFareFactor(prepareObj);
    switch (response) {
      case "internal": {
        throw new Error("Internal Server Error");
      }
      case "invalid": {
        throw new Error("Invalid Request");
      }
      case "success": {
        const newList = operatorTicketFareBusList.filter(
          (fare) => fare.busFareFactorId !== busFareFactorId
        );
        modal.operatorTicketFareBusList = newList;
        sessionStorage.setItem(
          "operatorTicketFareBusList",
          JSON.stringify(newList)
        );
        displayBusTableInfo(newList);
        toast.success("Bus fare factor deleted successfully");
        break;
      }
      default: {
        break;
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const handleShowAvailableBusRequest = async () => {
  const busIdList = modal.operatorTicketFareBusList.map(
    ({ bus }) => bus?.busId
  );
  const queryParams = new URLSearchParams();
  busIdList.unshift(0);
  busIdList.forEach((val) => {
    queryParams.append("bus_id", val);
  });
  queryParams.append(
    "operator_ticket_fare_id",
    modal.activeFare.operatorTicketFareId
  );
  addBusFareFactorForm.querySelector(
    'input[name="operator_ticket_fare_id"]'
  ).value = modal.activeFare.operatorTicketFareId;
  try {
    busSelect.innerHTML = `<div class="loader sm-loader"></div>`;
    const response = await collectAvailableTicketFareBusRecordsRequest(
      queryParams
    );
    if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response === "internal") {
      throw new Error("Internal Server Error");
    } else if (response.startsWith("[")) {
      const busList = JSON.parse(response);
      if (busList.length === 0) {
        busSelect.innerHTML = `<p class="mt-2 px-4 fw-semibold text-muted">No buses available</p>`;
      } else {
        busSelect.innerHTML = busList
          .map(ViewHelper.getAvailableFareFactorBus)
          .join("");
      }
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    busSelect.innerHTML = `<p>${err.message}</p>`;
    toast.error(err.message);
  }
};

busTable.addEventListener("click", (e) => {
  const element = e.target.closest("button");
  if (!element) return;

  const tableRow = element.closest("tr");
  const { busId, busFareFactorId } = tableRow.dataset;

  handleDeleteBusFareFactorRequest(+busId, +busFareFactorId);
});

const updateInfo = () => {
  const { fareFactor } = modal.activeFare;
  const { name, fixedCharge } = fareFactor;

  factorName.textContent = name;
  chargeType.textContent = fixedCharge ? "Fixed Charge" : "Person / km";
};

const displayBusTableInfo = (busList = []) => {
  if (typeof busList !== "object") throw new Error("Invalid Operation");
  if (busList.length === 0) {
    busTable.innerHTML = ViewHelper.getTableEmptyMessage(
      "Bus Records will be displayed here"
    );
  } else {
    busTable.innerHTML = ViewHelper.getOperatorTicketFareManageHeading();
    busTable.innerHTML += `<tbody>
        ${busList.map(ViewHelper.getOperatorTicketFareManageBody).join("")}
      </tbody>`;
  }
};

const handleBusRecords = async (firstTime = false) => {
  if (!firstTime) busTable.innerHTML = ViewHelper.getTableLoader();
  try {
    const { operatorTicketFareId } = modal.activeFare;

    const response = await collectAllRecordsWithOperatorTicketFareRequest({
      operator_ticket_fare_id: operatorTicketFareId,
    });

    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response === "internal") {
      throw new Error("Internal Server Error");
    }
    const operatorTicketFareBusList = JSON.parse(response);
    sessionStorage.setItem(
      "operatorTicketFareBusList",
      JSON.stringify(operatorTicketFareBusList)
    );
    modal.operatorTicketFareBusList = operatorTicketFareBusList;
    displayBusTableInfo(operatorTicketFareBusList);
  } catch (err) {
    toast.error(err.message);
  }
};

const init = async () => {
  modal.activeFare = JSON.parse(sessionStorage.getItem("activeFare"));
  updateInputValue();
  updateInfo();
  handleBusRecords(true);
};

function startWatchingSession() {
  if (watchSessionInternal) clearInterval(watchSessionInternal);
  watchSessionInternal = setInterval(() => {
    const activeFare = sessionStorage.getItem("activeFare");
    if (!activeFare) {
      clearInterval(watchSessionInternal);
      history.back();
    }
  }, 100);
}

busSelect.addEventListener("click", (e) => {
  e.stopPropagation();
  const target = e.target.closest("li");
  if (!target) return;
  const busId = +target.dataset.busId;
  const busNumber = target.querySelector("input").value;
  const checkBox = target.querySelector('input[type="checkbox"]');

  checkBox.checked = !checkBox.checked;

  if (checkBox.checked) {
    if (selectedBusContainer.querySelector("[data-empty]")) {
      selectedBusContainer.innerHTML = "";
    }

    selectedBusContainer.innerHTML += ViewHelper.getSelectedBusFareHTML(
      busId,
      busNumber
    );
  } else {
    const target = selectedBusContainer.querySelector(
      `input[value="${+busId}"]`
    );
    target.closest("span")?.remove();
    if (selectedBusContainer.children.length === 0)
      selectedBusContainer.innerHTML =
        "<span class='small' data-empty='true'>No Bus Selected</span>";
  }
});

selectedBusContainer.addEventListener("click", (e) => {
  const target = e.target.closest("span");
  if (!target) return;
  let isCloseBtn = false;

  if (e.target.classList.contains("btn-close")) {
    isCloseBtn = true;
  }

  if (!isCloseBtn) return;

  const busId = target.querySelector('input[type="hidden"]').value;
  busSelect
    .querySelector(`[data-bus-id="${busId}"]`)
    .querySelector('input[type="checkbox"]').checked = false;

  target.remove();
  if (selectedBusContainer.children.length === 0)
    selectedBusContainer.innerHTML =
      "<span class='small' data-empty='true'>No Bus Selected</span>";
});

addBusFareFactorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const busIdList = Array.from(
    addBusFareFactorForm.querySelectorAll('input[name="bus_id"]')
  )?.map((input) => +input.value);

  if (!busIdList) {
    toast.error("Empty Request");
    return;
  }

  const operatorTicketFareId = +addBusFareFactorForm.querySelector(
    'input[name="operator_ticket_fare_id"]'
  )?.value;
  if (!operatorTicketFareId || isNaN(operatorTicketFareId)) {
    toast.error("Invalid Request");
  }

  const queryParams = new URLSearchParams();
  busIdList.forEach((id) => {
    queryParams.append("bus_id", id);
  });
  queryParams.append("operator_ticket_fare_id", operatorTicketFareId);

  try {
    const response = await addBusFareFactorRequest(queryParams);

    switch (response) {
      case "internal": {
        throw new Error("Internal Server Error");
      }
      case "invalid": {
        throw new Error("Invalid Request");
      }
      case "success": {
        toast.success("Fare factors added successfully");
        ModalHandler.hide(formModal);
        await handleBusRecords();
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
});

formModal.addEventListener("show.bs.modal", async () => {
  try {
    await handleShowAvailableBusRequest();
  } catch (err) {
    toast.error(err.message);
  }
});

formModal.addEventListener("hide.bs.modal", () => {
  busSelect.innerHTML = "";
  selectedBusContainer.innerHTML = ` <span class="text-muted p-0 small" data-empty="true"
                    >No Bus Selected</span
                  >`;
});

window.addEventListener("pageshow", (e) => {
  try {
    startWatchingSession();
    init();
    PageLoading.stopLoading();
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  }
});

window.addEventListener("pagehide", () => {
  ["activeFare"].forEach((key) => sessionStorage.removeItem(key));
  clearInterval(watchSessionInternal);
  watchSessionInternal = null;
});
