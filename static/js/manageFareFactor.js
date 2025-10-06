import { PageLoading } from "./pageLoading.js";
import { collectAllRecordsWithOperatorTicketFareRequest } from "./service.js";
import { toast } from "./toast.js";
import { ViewHelper } from "./viewHelper.js";

const chargeInput = document.querySelector("#charges");
const chargeEditBtn = document.querySelector("#edit_btn");
const chargeDeleteBtn = document.querySelector("#delete_btn");

const factorName = document.querySelector("#factor_name");
const chargeType = document.querySelector("#charge_type");

const busTable = document.querySelector("#operator_ticket_fare_bus_table");

let watchSessionInternal = null;

const updateInfo = () => {
  const { fareFactor } = JSON.parse(sessionStorage.getItem("activeFare"));
  const { name, fixedCharge } = fareFactor;

  factorName.textContent = name;
  chargeType.textContent = fixedCharge ? "Fixed Charge" : "Person / km";
};

const updateInputValue = (value = "") => {
  if (value) {
    chargeInput.value = value;
    return;
  }

  const { charge } = JSON.parse(sessionStorage.getItem("activeFare"));
  chargeInput.value = charge;
};

const displayBusTableInfo = (busList = []) => {
  if (typeof busList !== "object") throw new Error("Invalid Operation");
  if (busList.length === 0) {
    busTable.innerHTML = ViewHelper.getTableEmptyMessage(
      "Bus Records will be displayed here"
    );
  } else {
    busTable.innerHTML = ViewHelper.getOperatorTicketFareManageHeading();
  }
};

const handleBusRecords = async (firstTime = false) => {
  if (!firstTime) busTable.innerHTML = ViewHelper.getTableLoader();
  try {
    const { operatorTicketFareId } = JSON.parse(
      sessionStorage.getItem("activeFare")
    );
    const response = await collectAllRecordsWithOperatorTicketFareRequest({
      operator_ticket_fare_id: operatorTicketFareId,
    });

    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response === "internal") {
      throw new Error("Internal Server Error");
    }
    const busList = JSON.parse(response);

    update;
  } catch (err) {
    toast.error(err.message);
  }
};

const init = async () => {
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

window.addEventListener("pageshow", (e) => {
  try {
    startWatchingSession();
    PageLoading.stopLoading();
    init();
  } catch (err) {
    toast.error(err.message);
  }
});

window.addEventListener("pagehide", () => {
  ["activeFare"].forEach((key) => sessionStorage.removeItem(key));
  clearInterval(watchSessionInternal);
  watchSessionInternal = null;
});
