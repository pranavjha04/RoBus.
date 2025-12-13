import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { ViewHelper } from "./viewHelper.js";
import {
  getCancelledAllScheduleRequest,
  getCompletedAllScheduleRequest,
  getOngoingAllScheduleRequest,
  getUpcomingAllScheduleRequest,
} from "./service.js";

const dateRangePrev = document.querySelector("#date_range_back");
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

const formatDate = (d) => {
  return d.toISOString().split("T")[0];
};

const resetFilter = () => {
  [...filterNavContainer.children].forEach((node) => {
    node.classList.remove("btn-primary");
  });

  filterNavContainer.firstElementChild.classList.add("btn-primary");
};

const updateScheduleRecords = (list = []) => {
  scheduleTable.innerHTML = "";
  if (list.length === 0) {
    // do something
    scheduleTable.innerHTML = `<div class="d-flex mt-5 flex-column text-center align-items-center justify-content-center">
                <h3>No Schedules</h3>
              </div>`;
  } else {
    // do something
    scheduleTable.innerHTML = ViewHelper.getScheduleTableHeading();
    scheduleTable.innerHTML += `<tbody>${list
      .map(ViewHelper.getScheduleTableRow)
      .join("")}</tbody>`;
  }
};

const handleScheduleDateRequest = async (callback, filter, date) => {
  if (!callback || !filter | !date) return;
  try {
    if (!cache[filter][date]) {
      scheduleTable.innerHTML = ViewHelper.getTableLoader();
      const response = await callback(date);
      if (response === "invalid") throw new Error("Invalid Request");
      cache[filter][date] = JSON.parse(response);
    }
    updateScheduleRecords(cache[filter][date]);
  } catch (err) {
    toast.error(err.message);
    console.error(err.message);
    scheduleTable.innerHTML = ViewHelper.getTableEmptyMessage(
      "There was an error while loading schedule"
    );
  }
};

const showActiveDateRecord = () => {
  const activeDate = dateRangeContainer.querySelector(".active");
  const { day, month, year } = activeDate.dataset;
  const formattedDate = [year, month, day].join("-");

  const activeFilter =
    filterNavContainer.querySelector(".btn-primary").dataset.type;
  switch (activeFilter) {
    case "upcoming": {
      handleScheduleDateRequest(
        getUpcomingAllScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    case "ongoing": {
      handleScheduleDateRequest(
        getOngoingAllScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    case "completed": {
      handleScheduleDateRequest(
        getCompletedAllScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    case "cancelled": {
      handleScheduleDateRequest(
        getCancelledAllScheduleRequest,
        activeFilter,
        formattedDate
      );
      break;
    }
    default: {
      break;
    }
  }
};

const updateDateRange = () => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + range);

  const startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay());
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  document.querySelector("#date_range_display").textContent =
    new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    }).formatRange(startDate, endDate);

  dateRangeContainer.innerHTML = "";

  Array.from({ length: 7 }).forEach((_, i) => {
    const currDate = new Date(startDate);
    currDate.setDate(startDate.getDate() + i);
    const isInRange = formatDate(currDate) === formatDate(todayDate);

    dateRangeContainer.innerHTML += ViewHelper.getDateRangeButton(
      currDate,
      isInRange
    );
  });

  if (!dateRangeContainer.querySelector(".active")) {
    dateRangeContainer.firstElementChild.classList.add("active");
  }

  resetFilter();
  showActiveDateRecord();
};

filterNavContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || target.classList.contains("btn-primary")) return;

  [...filterNavContainer.children].forEach((node) => {
    node.classList.remove("btn-primary");
  });

  target.classList.add("btn-primary");
  showActiveDateRecord();
});

dateRangeContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || target.classList.contains("active")) return;

  dateRangeContainer.childNodes.forEach((child) => {
    child.classList.remove("active");
  });

  target.classList.add("active");
  resetFilter();
  showActiveDateRecord();
});

dateRangeNext.addEventListener("click", () => {
  range += 7;
  updateDateRange();
});

dateRangePrev.addEventListener("click", () => {
  range -= 7;
  updateDateRange();
});

scheduleTable.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || !target.dataset.type || !target.closest("tr")) return;

  const row = target.closest("tr");
  const { year, month, day, scheduleId } = row.dataset;
  const date = [year, month, day].join("-");
  const activeFilter =
    filterNavContainer.querySelector(".btn-primary").dataset.type;
  console.log(activeFilter, date);
  const activeDate = cache[activeFilter][date]?.find(
    (schedule) => schedule.scheduleId === +scheduleId
  );

  if (!activeDate) return;

  sessionStorage.setItem("activeSchedule", JSON.stringify(activeDate));

  const APP_URL = window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/")
  );
  window.location.href = `${APP_URL}/manage_bus_schedule.do`;
});

const init = () => {
  try {
    PageLoading.stopLoading();
    updateDateRange();
  } catch (err) {
    PageLoading.stopLoading();
    console.error(err.message);
    PageError.showOperatorError();
  }
};

init();
