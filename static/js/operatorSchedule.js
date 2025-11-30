import { toast } from "./toast.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { getJourneyDateScheduleRequest } from "./service.js";
import { ViewHelper } from "./viewHelper.js";

const dateRangePrev = document.querySelector("#date_range_back");
const dateRangeText = document.querySelector("#date_range_display");
const dateRangeNext = document.querySelector("#date_range_next");
const dateRangeContainer = document.querySelector("#date_range");

const scheduleTable = document.querySelector("#schedule_table");
let range = 0;

const journeyDateScheduleCache = {};

/******************UTILS ************************************ */

/**********************UI UPDATES *********************************** */

const updateScheduleRecords = (list = []) => {
  scheduleTable.innerHTML = "";
  if (list.length === 0) {
    // do something
    scheduleTable.innerHTML = `<div class="d-flex mt-5 flex-column text-center align-items-center justify-content-center">
                <h3>No Schedules</h3>
                <p>There are no schedules for this date.</p>

              </div>`;
  } else {
    // do something
    scheduleTable.innerHTML = ViewHelper.getScheduleTableHeading();
    scheduleTable.innerHTML += `<tbody>${list
      .map(ViewHelper.getScheduleTableRow)
      .join("")}</tbody>`;
  }
};

const handleJourneyDateScheduleRecordRequest = async (journeyDate) => {
  try {
    if (!(journeyDate instanceof Date)) throw new Error("Invalid Request");
    scheduleTable.innerHTML = ViewHelper.getTableLoader();
    if (
      !journeyDateScheduleCache[journeyDate.toDateString()] ||
      journeyDateScheduleCache[journeyDate.toDateString()] == null
    ) {
      const year = journeyDate.getFullYear();
      const month = journeyDate.getMonth();
      const day = journeyDate.getDate();
      const formattedDate = [year, month + 1, day].join("-");
      const response = await getJourneyDateScheduleRequest(formattedDate);
      if (response === "invalid" || response.startsWith("invalid"))
        throw new Error("Invalid Request");
      if (response.startsWith("[")) {
        journeyDateScheduleCache[journeyDate.toDateString()] =
          JSON.parse(response);
        updateScheduleRecords(
          journeyDateScheduleCache[journeyDate.toDateString()]
        );
      }
    } else {
      updateScheduleRecords(
        journeyDateScheduleCache[journeyDate.toDateString()]
      );
    }
  } catch (err) {
    toast.error(err.message);
    scheduleTable.innerHTML = "";
  }
};

const showActiveDateRecord = async () => {
  const activeDate = dateRangeContainer.querySelector(".active");

  if (!activeDate) {
    return;
  }

  const { year, month, day } = activeDate.dataset;
  const formattedDate = [year, +month, day].join("-");

  await handleJourneyDateScheduleRecordRequest(new Date(formattedDate));
};

const updateDateRange = () => {
  const currDate = new Date();
  let startDate = new Date(currDate);

  startDate.setDate(currDate.getDate() - currDate.getDay());
  startDate.setDate(startDate.getDate() + range);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  dateRangeText.textContent = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).formatRange(startDate, endDate);

  dateRangeContainer.innerHTML = "";
  let isInRange = false;
  Array.from({ length: 7 }, (_, day) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    let currInRange = false;

    if (
      date.getDate() === currDate.getDate() &&
      date.getDay() === currDate.getDay() &&
      date.getFullYear() === currDate.getFullYear()
    ) {
      isInRange = true;
      currInRange = true;
    }

    dateRangeContainer.innerHTML += `<button
                  class="col norm rounded-2  d-flex flex-column ${
                    currInRange ? "active" : ""
                  } text-center justify-content-center"
                  data-year=${date.getFullYear()}
                  data-month=${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                  data-day=${date.getDate().toString().padStart(2, "0")}
                >
                  <h4>${new Intl.DateTimeFormat(navigator.language, {
                    weekday: "short",
                  }).format(date)}</h4>
                  <span class="fs-4">${new Intl.DateTimeFormat(
                    navigator.language,
                    {
                      day: "2-digit",
                    }
                  ).format(date)}</span>
                </button>`;
  });

  if (!isInRange) {
    dateRangeContainer.firstElementChild.classList.add("active");
  }

  showActiveDateRecord();
};

/*************************EVENT LISTENERS *********************************** */

dateRangePrev.addEventListener("click", (e) => {
  range -= 7;
  updateDateRange();
});

dateRangeNext.addEventListener("click", (e) => {
  range += 7;
  updateDateRange();
});

scheduleTable.addEventListener("click", async (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const { scheduleId, day, month, date, year } = target.closest("tr").dataset;
  const key = [day, month, date, year]
    .map((next) => next.padStart(2, "0"))
    .join(" ");

  if (!journeyDateScheduleCache[key]) {
    await handleJourneyDateScheduleRecordRequest(new Date(key));
  } else {
    const activeSchedule = journeyDateScheduleCache[key]?.find((schedule) => {
      return schedule.scheduleId === +scheduleId;
    });
    console.log(activeSchedule);

    if (!activeSchedule) return;
    sessionStorage.setItem("activeSchedule", JSON.stringify(activeSchedule));

    const APP_URL = window.location.href.substring(
      0,
      window.location.href.lastIndexOf("/")
    );
    window.location.href = `${APP_URL}/manage_bus_schedule.do`;
  }
});

dateRangeContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");

  dateRangeContainer.childNodes.forEach((children) => {
    if (children !== target) {
      children.classList.remove("active");
    }
  });

  target.classList.add("active");
  showActiveDateRecord();
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    PageLoading.stopLoading();
    updateDateRange();
  } catch (err) {
    toast.error(err.message);
    PageLoading.stopLoading();
    PageError.showOperatorError();
  }
});
