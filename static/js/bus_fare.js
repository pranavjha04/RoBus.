import { filterNav } from "./filter_nav.js";
import {
  collectFareFactorRequest,
  deleteFareFactorRequest,
  getActiveAccountID,
  updateFareFactorChargeRequest,
} from "./service.js";
import { ViewHelper } from "./viewHelper.js";
import { toast } from "./toast.js";
import { validateCharge } from "./util.js";

const fareFactorSelectBtn = document.querySelector("#fare_factor_select");
const fareFactorSelectList = document.querySelector(
  "#form_factor_available_list"
);

const fareFactorForm = document.querySelector("#fare_factor_form");
const sortCharges = document.querySelector("#sort_charges");

const fareTable = document.querySelector("#fare_factor_table");

const filterNavContainer = document.querySelector("#filter_nav");

const handleFareFactorsListDisplay = (fareFactorList = []) => {
  if (fareFactorList.length == 0) {
    fareTable.innerHTML =
      "<h3 class='text-center fs-3 align-self-center '>Add records to display :)</h3>";
    sortCharges.disabled = true;
    filterNav.disable();
  } else {
    filterNav.enable();
    fareTable.innerHTML = ViewHelper.getFareFactorHeading();

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
  parentTableData.innerHTML = `<td class="p-3 charge"><span>&#x20B9;${oldChargeValue}</span></td>`;
};

const updateFactorAfterEdit = (operatorTicketFareId, newValue) => {
  const factorList = JSON.parse(sessionStorage.getItem("fareList"));
  const target = factorList.find(
    (factor) => factor.operatorTicketFareId === operatorTicketFareId
  );

  target.charge = newValue;
  sessionStorage.setItem("fareList", JSON.stringify(factorList));
};

const updateFactorAfterDelete = (operatorTicketFareId) => {
  const factorList = JSON.parse(sessionStorage.getItem("fareList"));
  sessionStorage.setItem(
    "fareList",
    JSON.stringify(
      factorList.filter((factor) => {
        factor.operatorTicketFareId !== operatorTicketFareId;
      })
    )
  );

  console.log(JSON.parse(sessionStorage.getItem("fareList")));
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
    parentTableData = `&#x20B9;${oldChargeValue}`;
  }

  chargeInput.focus();

  chargeInput.addEventListener("blur", async () => {
    const isValid = validateCharge(chargeInput);
    const newValue = +chargeInput.value;

    if (!isValid) {
      disableChargeInput(parentTableData, oldChargeValue);
      toast.error(
        "Invalid value must be greater than 0 and less then equal to 100"
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
        +parentTableRow.dataset.id/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
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

  console.log(parentTableRow, operatorTicketFareId);

  parentTableRow.remove();
  try {
    const response = await deleteFareFactorRequest(operatorTicketFareId);
    console.log(response);

    switch (response) {
      case "invalid": {
        throw new Error("Invalid request");
      }
      case "internal": {
        throw new Error("Internal server error");
      }
      case "success": {
        toast.success("Fare factor deleted successfully");
        updateFactorAfterDelete();
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
        fareFactorList.sort((a, b) => a.charge - b.charge)
      );
      break;
    }
    case "high": {
      handleFareFactorsListDisplay(
        fareFactorList.sort((a, b) => b.charge - a.charge)
      );
      break;
    }
    default: {
      handleFareFactorsListDisplay(fareFactorList);
      break;
    }
  }
});

filterNavContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;
  if (!sessionStorage.getItem("fareList")) {
    handleFareFactorsListDisplay();
    return;
  }
  const element = e.target;
  const fareFactorList = JSON.parse(sessionStorage.getItem("fareList"));
  console.log(element.textContent);
  switch (element.textContent) {
    case "All": {
      handleFareFactorsListDisplay(fareFactorList);
      break;
    }
    case "Person / km": {
      handleFareFactorsListDisplay(
        fareFactorList.filter(
          (factor) => factor.fareFactor.fixedCharge == false
        )
      );
      break;
    }
    case "Fixed charge": {
      handleFareFactorsListDisplay(
        fareFactorList.filter((factor) => factor.fareFactor.fixedCharge == true)
      );
      break;
    }
    default: {
      break;
    }
  }
});

const handleFareFactorList = async () => {
  try {
    const activeId = await getActiveAccountID("operator");

    if (activeId == "invalid" || isNaN(+activeId)) {
      sessionStorage.removeItem("active");
      throw new Error("Invalid request");
    }
    sessionStorage.setItem("active", activeId);
    let fareFactorList = await collectFareFactorRequest(+activeId, false);
    if (fareFactorList === "invalid") {
      throw new Error("Invalid request");
    }
    if (fareFactorList.startsWith("[")) {
      fareFactorList = JSON.parse(fareFactorList);
      sessionStorage.setItem("fareList", JSON.stringify(fareFactorList));
      handleFareFactorsListDisplay(fareFactorList);
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const init = async () => {
  filterNav.start();
  try {
    await handleFareFactorList();
  } catch (err) {
    toast.error(err.message);
  }
};
await init();

const reset = () => {};
