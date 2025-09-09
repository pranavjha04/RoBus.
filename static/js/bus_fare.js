import { FilterNav } from "./filter_nav.js";
import { collectFareFactorRequest, getActiveAccountID } from "./service.js";
import { toast } from "./toast.js";

const fareFactorSelectBtn = document.querySelector("#fare_factor_select");
const fareFactorSelectList = document.querySelector(
  "#form_factor_available_list"
);

const fareFactorForm = document.querySelector("#fare_factor_form");
const chargesSort = document.querySelector("#charges_sort");

const handleFareFactorList = async () => {
  try {
    const activeId = await getActiveAccountID("operator");
    if (activeId == "invalid" || isNaN(+activeId)) {
      throw new Error("Invalid request");
    }
    let fareFactorList = await collectFareFactorRequest(+activeId);
    if (fareFactorList === "invalid") {
      throw new Error("Invalid request");
    }
    if (fareFactorList.startsWith("[")) {
      fareFactorList = JSON.parse(fareFactorList);
      
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const init = async () => {
  FilterNav.start();
  try {
    await handleFareFactorList();
  } catch (err) {
    toast.error(err.message);
  }
};
await init();

const reset = () => {};
