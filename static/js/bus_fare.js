import { filterNav } from "./filter_nav.js";
import {
  collectFareFactorRequest,
  deleteFareFactorRequest,
  handleAddFareFactor,
  updateFareFactorChargeRequest,
} from "./service.js";
import { ViewHelper } from "./viewHelper.js";
import { toast } from "./toast.js";
import { displayInputError, validateCharge } from "./util.js";

const fareFactorSelectBtn = document.querySelector("#fare_factor_select");
const fareFactorSelectList = document.querySelector(
  "#form_factor_available_list"
);
const charge = document.querySelector("#charge");
const fareFactor = document.querySelector("#fare_factor");
const fareFactorForm = document.querySelector("#fare_factor_form");
const sortCharges = document.querySelector("#sort_charges");
const formModal = document.getElementById("centeredModal");
const fareTable = document.querySelector("#fare_factor_table");

const filterNavContainer = document.querySelector("#filter_nav");

const totalFare = document.querySelector("#total_fare");
const totalCharges = document.querySelector("#total_charges");

const collectFareCharge = (acc, curr) => {
  return acc + curr?.charge;
};

const update = (list = []) => {
  totalCharges.textContent = list.reduce(collectFareCharge, 0);
  totalFare.textContent = list.length;
};

const setTableLoader = () => {
  fareTable.innerHTML = ViewHelper.getTableLoader();
};

const removeTableLoader = () => {
  fareTable.innerHTML = "";
};

const handleNav = (type, fareFactorList = []) => {
  switch (type) {
    case "All": {
      handleFareFactorsListDisplay(fareFactorList);
      break;
    }
    case "Person / km": {
      const filterResult = fareFactorList.filter(
        (factor) => factor.fareFactor.fixedCharge === false
      );
      if (filterResult.length === 0) {
        document.querySelector("tbody").innerHTML =
          ViewHelper.getTableEmptyMessage("No such records.");
        filterNav.init();
        break;
      }
      handleFareFactorsListDisplay(filterResult);
      break;
    }
    case "Fixed charge": {
      const filterResult = fareFactorList.filter(
        (factor) => factor.fareFactor.fixedCharge === true
      );
      if (filterResult.length === 0) {
        document.querySelector("tbody").innerHTML =
          ViewHelper.getTableEmptyMessage("No such records");
        filterNav.init();
        break;
      }
      handleFareFactorsListDisplay(filterResult);
      break;
    }
    default: {
      break;
    }
  }
};

const handleFareFactorsListDisplay = (fareFactorList = []) => {
  removeTableLoader();
  if (fareFactorList.length === 0) {
    fareTable.innerHTML =
      "<h3 class='text-center fs-3 align-self-center mt-5'>Add records to display :)</h3>";
    sortCharges.disabled = true;
    filterNav.disable();
    update();
    filterNav.init();
    fareTable.classList.remove("border");
  } else {
    fareTable.classList.add("border");
    filterNav.enable();
    fareTable.innerHTML = ViewHelper.getFareFactorHeading();
    sortCharges.disabled = false;
    const fareTableBody = document.getElementById("fare_table_body");
    fareTableBody.innerHTML = fareFactorList
      .map((factor) => ViewHelper.getFareFactorBody(factor))
      .join("");
  }
};

const enableChargeInput = (parentTableData, oldChargeValue) => {
  parentTableData.innerHTML = `<span><input class="input text-center p-0 rounded-2 focus-ring" value=${oldChargeValue} /></span>`;
};

const disableChargeInput = (parentTableData, oldChargeValue) => {
  parentTableData.innerHTML = `<span>&#x20B9;${oldChargeValue}</span>`;
};

const updateFactorAfterEdit = (operatorTicketFareId, newValue) => {
  const factorList = JSON.parse(sessionStorage.getItem("fareList"));
  const target = factorList.find(
    (factor) => factor.operatorTicketFareId === operatorTicketFareId
  );

  target.charge = newValue;
  update(factorList);
  sessionStorage.setItem("fareList", JSON.stringify(factorList));
};

const updateFactorAfterDelete = (operatorTicketFareId) => {
  const factorList = JSON.parse(sessionStorage.getItem("fareList"));
  const filterList = factorList.filter(
    (factor) => factor.operatorTicketFareId !== operatorTicketFareId
  );

  if (filterList.length === 0) {
    filterNav.init();
  }

  sessionStorage.setItem("fareList", JSON.stringify(filterList));
  update(filterList);
  if (filterList.length === 0) {
    handleFareFactorsListDisplay();
  }
};

const handleEdit = async (e) => {
  const parentTableRow = e.target.closest("tr");
  const parentTableData = parentTableRow.querySelector(".charge");

  const oldChargeValue = +parentTableData.textContent.substring(
    parentTableData.textContent.indexOf("₹") + 1
  );

  enableChargeInput(parentTableData, oldChargeValue);

  const chargeInput = parentTableRow.querySelector("input");

  if (!chargeInput) {
    parentTableData.innerHTML = `&#x20B9;${oldChargeValue}`;
    return;
  }

  chargeInput.focus();

  chargeInput.addEventListener("blur", async () => {
    const isValid = validateCharge(chargeInput);
    const newValue = +chargeInput.value;

    if (!isValid) {
      disableChargeInput(parentTableData, oldChargeValue);
      toast.error(
        "Invalid value: must be greater than 0 and less than or equal to 100"
      );
      return;
    }

    if (newValue === oldChargeValue) {
      disableChargeInput(parentTableData, oldChargeValue);
      return;
    }

    try {
      const response = await updateFareFactorChargeRequest(
        newValue,
        +parentTableRow.dataset.id
      );
      switch (response) {
        case "internal": {
          throw new Error("Internal server error");
        }
        case "invalid": {
          throw new Error("Invalid value");
        }
        case "success": {
          disableChargeInput(parentTableData, newValue);
          updateFactorAfterEdit(+parentTableRow.dataset.id, newValue);
          toast.success("Charges were updated successfully");
          break;
        }
        default: {
          disableChargeInput(parentTableData, oldChargeValue);
          break;
        }
      }
    } catch (err) {
      disableChargeInput(parentTableData, oldChargeValue);
      toast.error(err.message);
    }
  });
};

const handleDelete = async (e) => {
  const parentTableRow = e.target.closest("tr");
  const operatorTicketFareId = +parentTableRow.dataset.id;

  try {
    const response = await deleteFareFactorRequest(operatorTicketFareId);

    switch (response) {
      case "invalid": {
        throw new Error("Invalid request");
      }
      case "internal": {
        throw new Error("Internal server error");
      }
      case "success": {
        parentTableRow.remove();
        toast.success("Fare factor deleted successfully");
        updateFactorAfterDelete(operatorTicketFareId);
        break;
      }
      default: {
        throw new Error("Internal server error");
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
};

fareTable.addEventListener("click", async (e) => {
  const optionBtn = e.target.closest(".feature-btn");
  if (!optionBtn) return;

  switch (optionBtn.dataset.type) {
    case "edit": {
      await handleEdit(e);
      break;
    }
    case "delete": {
      await handleDelete(e);
      break;
    }
    default: {
      break;
    }
  }
});

sortCharges.addEventListener("change", (e) => {
  if (!sessionStorage.getItem("fareList")) {
    handleFareFactorList();
    return;
  }
  const fareFactorList = JSON.parse(sessionStorage.getItem("fareList"));
  switch (sortCharges.value) {
    case "low": {
      handleFareFactorsListDisplay(
        [...fareFactorList].sort((a, b) => a.charge - b.charge)
      );
      break;
    }
    case "high": {
      handleFareFactorsListDisplay(
        [...fareFactorList].sort((a, b) => b.charge - a.charge)
      );
      break;
    }
    default: {
      handleFareFactorsListDisplay(fareFactorList);
      break;
    }
  }

  filterNav.init();
});

filterNavContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;
  if (!sessionStorage.getItem("fareList")) {
    handleFareFactorsListDisplay();
    return;
  }
  const element = e.target;
  const fareFactorList = JSON.parse(sessionStorage.getItem("fareList"));
  handleNav(element.textContent, fareFactorList);
});

const handleFareFactorList = async () => {
  try {
    let fareFactorList = await collectFareFactorRequest(false);
    if (fareFactorList === "invalid") {
      throw new Error("Invalid request");
    }
    if (typeof fareFactorList === "string" && fareFactorList.startsWith("[")) {
      fareFactorList = JSON.parse(fareFactorList);
      update(fareFactorList);
      sessionStorage.setItem("fareList", JSON.stringify(fareFactorList));
      handleFareFactorsListDisplay(fareFactorList);
    }
  } catch (err) {
    toast.error(err.message);
    removeTableLoader();
  }
};

const init = async () => {
  filterNav.start();
  try {
    setTableLoader();
    await handleFareFactorList();
  } catch (err) {
    toast.error(err.message);
  }
};

await init();

const reset = () => {};

fareFactorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!fareFactor.value) {
    toast.error("Select a fare factor");
    return;
  }

  if (!charge.value || !validateCharge(charge)) {
    toast.error("Invalid charge value");
    displayInputError(charge);
    return;
  }

  try {
    const response = await handleAddFareFactor(
      +charge.value,
      +fareFactor.value
    );
    switch (response) {
      case "internal": {
        throw new Error("Internal server error");
      }
      case "success": {
        toast.success("Fare added successfully");
        setTableLoader();
        filterNav.init();
        sortCharges.value = "";
        const modal = bootstrap.Modal.getInstance(formModal);
        modal.hide();
        await handleFareFactorList();
        break;
      }
      case "1": {
        throw new Error("Invalid Charge");
      }
      default: {
        break;
      }
    }
  } catch (err) {
    toast.error(err.message);
    fareFactorForm.reset();
    charge.classList.remove("border-success", "border-danger");
    charge.setAttribute("placeholder", "Charges");
  }
});

fareFactorSelectList.addEventListener("click", (e) => {
  const target = e.target.closest("li");
  if (!target) return;
  fareFactorSelectBtn.textContent = target.querySelector("span").textContent;
  const id = target.dataset.id;
  let attribute = "Charges ";
  if (id != 0) {
    const type = +target.dataset.type;
    if (type === 0) {
      // fixed
      attribute += "(Person / km)";
    } else {
      // person / km
      attribute += "(Fixed Charge)";
    }

    fareFactor.value = id;
  }

  charge.setAttribute("placeholder", attribute);
});

charge.addEventListener("blur", (e) => {
  validateCharge(e.target);
});

formModal.addEventListener("show.bs.modal", async function () {
  try {
    const response = await collectFareFactorRequest();
    fareFactorSelectList.classList.remove("overflow-y-scroll");
    fareFactorSelectList.innerHTML = `<div class="loader"></div>`;
    if (response === "invalid") {
      throw new Error("Invalid request");
    }
    if (typeof response === "string" && response.startsWith("[")) {
      fareFactorSelectList.innerHTML = "";
      fareFactorSelectList.innerHTML += "<li>Select Fare Factor</li>";
      const fareList = JSON.parse(response);
      fareFactorSelectList.innerHTML = fareList
        .map((factor) => ViewHelper.getSelectFareTable(factor))
        .join("");
      fareFactorSelectList.insertAdjacentHTML(
        "afterbegin",
        `<li data-id=0 class="py-2 border-bottom pnt">
              <a class="dropdown-item d-flex flex-column">
                <span class="fw-semibold">Select Fare Factor</span>
              </a>
            </li>`
      );
      fareFactorSelectList.classList.add("overflow-y-scroll");
    }
  } catch (err) {
    toast.error(err.message);
    fareFactorSelectList.innerHTML = "";
  }
});

formModal.addEventListener("hidden.bs.modal", () => {
  fareFactorSelectBtn.textContent = "Select Fare Factor";
  fareFactorForm.reset();
  charge.setAttribute("placeholder", "Charges");
  charge.classList.remove("border-danger", "border-success");
});
