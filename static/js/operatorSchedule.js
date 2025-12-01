import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { ViewHelper } from "./viewHelper.js";
import { getOngoingAllScheduleRequest } from "./service.js";

const dateRangePrev = document.querySelector("#date_range_back");
const dateRangeText = document.querySelector("#date_range_display");
const dateRangeNext = document.querySelector("#date_range_next");
const dateRangeContainer = document.querySelector("#date_range");
const filterNavContainer = document.querySelector("#filter_nav");
const scheduleTable = document.querySelector("#schedule_table");
let range = 0;

const cache = {
  upcoming: {},
  ongoing: {},
  completed: {},
  cancelled: {},
};

/******************UTILS ************************************ */

/**********************UI UPDATES *********************************** */

const updateScheduleRecords = (list = []) => {
  scheduleTable.innerHTML = "";
  if (list.length === 0) {
    // do something
    scheduleTable.innerHTML = `<div class="d-flex mt-5 flex-column text-center align-items-center justify-content-center">
                <h3>No Schedules</h3>
                <p>There are no schedules.</p>
              </div>`;
  } else {
    // do something
    scheduleTable.innerHTML = ViewHelper.getScheduleTableHeading();
    scheduleTable.innerHTML += `<tbody>${list
      .map(ViewHelper.getScheduleTableRow)
      .join("")}</tbody>`;
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    PageLoading.stopLoading();
  } catch (err) {
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
});
