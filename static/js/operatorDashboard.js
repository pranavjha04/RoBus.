import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";
import { createURLParams, getFormattedTime } from "./util.js";

const ctx = document.getElementById("bookingsChart");
const dateRangeContainer = document.querySelector("#dange_range_container");
const scheduleListContainer = document.querySelector("#schedule_container");

const model = { info: null, activeWeek: {}, scheduleList: null };
let bookingChart = null;

const operatorDashBoardRequest = async () => {
  const res = await fetch(`operator_dashboard.do`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Internal Server Error");
  const data = await res.text();
  return data.trim();
};

const operatorDateRangeBookingRequest = async (params) => {
  const res = await fetch(
    `get_operator_date_range_bookings.do?${params.toString()}`
  );
  if (!res.ok) throw new Error("Internal Server Error");
  const data = await res.text();
  return data.trim();
};

const collectAllScheduleRequest = async () => {
  const res = await fetch(
    `get_all_schedule.do?journey_date=${new Date().toISOString().split("T")[0]}`
  );
  if (!res.ok) throw new Error("Internal Server Error");
  const data = await res.text();
  return data.trim();
};

const formatDate = (d) => {
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const infoFetching = async () => {
  try {
    const response = await operatorDashBoardRequest();
    model.info = JSON.parse(response);
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
  }
};

const displayScheduleList = () => {
  scheduleListContainer.innerHTML = "";
  if (model.scheduleList.length === 0) {
    scheduleListContainer.innerHTML = `
    <div class="text-center py-5 text-muted">
      <i class="bi bi-calendar-x fs-1 d-block"></i>
      <h6 class="fw-semibold mb-1">No Schedules Found</h6>
      <p class="small mb-0">
        There are no bus schedules available for today right now.
      </p>
    </div>
  `;
  } else {
    scheduleListContainer.innerHTML = model.scheduleList
      .map(
        ({
          scheduleId,
          busRouteWeekday,
          arrivalTime,
          departureTime,
          status,
          bus,
        }) => {
          const { operatorRoute } = busRouteWeekday;
          const { route } = operatorRoute;
          const { source, destination } = route;
          const { busNumber } = bus;

          return `
  <div
          role="button"
    class="schedule-item border-start rounded-3 p-3  bg-white shadow-sm"
    data-schedule-id="${scheduleId}"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="badge bg-light text-primary border border-primary-subtle px-2 py-1">
        <i class="bi bi-bus-front me-1"></i> ${busNumber || "N/A"}
      </span>
      
      <span class="badge rounded-pill status-${status.name.toLowerCase()}">
        ${status.name}
      </span>
    </div>

    <div class="row align-items-center">
      <div class="col-8">
        <div class="fw-bold text-dark small mb-1">
          ${source.name} 
          <i class="bi bi-arrow-right text-muted mx-2"></i> 
          ${destination.name}
        </div>
        
        <div class="text-uppercase ls-wide small text-secondary fw-medium d-flex">
          <span class="text-truncate small text-muted">${
            source.state.name
          }</span>
          <span class="mx-2 text-light">|</span>
          <span class="text-truncate small text-muted">${
            destination.state.name
          }</span>
        </div>
      </div>

      <div class="col-4 text-end">
        <div class="text-dark fw-semibold">
          ${getFormattedTime(departureTime)}
        </div>
        <div class="text-dark small">
          to ${getFormattedTime(arrivalTime)}
        </div>
      </div>
    </div>
  </div>
`;
        }
      )
      .join("");
  }
};

const showSchedules = async () => {
  if (model.scheduleList) return;
  try {
    const response = await collectAllScheduleRequest();
    if (response === "invalid") throw new Error("Invalid Request");
    model.scheduleList = JSON.parse(response);
    displayScheduleList();
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
  }
};

const displayInfoContainer = () => {
  for (const params in model.info) {
    document.querySelector(
      `[data-type="${params.toLowerCase()}"]`
    ).textContent = new Intl.NumberFormat("en-IN").format(model.info[params]);
  }
};

const barCharDisplay = (list) => {
  if (!Array.isArray(list)) return;
  if (bookingChart) bookingChart.destroy();
  bookingChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: list.map(({ first }) =>
        new Intl.DateTimeFormat(navigator.language, {
          day: "numeric",
          month: "short",
          weekday: "short",
        }).format(new Date(first))
      ),

      datasets: [
        {
          label: "Bookings",
          data: list.map(({ second }) => second),
          backgroundColor: "#0d6efd",
          borderRadius: 6,
          barThickness: 50,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Weekly Bookings Trend",
          font: {
            size: 20,
            weight: "bold",
          },
          color: "#333",
          padding: {
            bottom: 20,
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Days of Week",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Bookings",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          ticks: {
            stepSize: 2,
          },
        },
      },
    },
  });
};

const updateDateRange = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth();
  dateRangeContainer.innerHTML = "";

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const calendarStart = new Date(firstDayOfMonth);
  calendarStart.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  const calendarEnd = new Date(lastDayOfMonth);
  calendarEnd.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  let curr = new Date(calendarStart);
  let weekNumber = 1;

  while (curr <= calendarEnd) {
    const weekStart = new Date(curr);
    const weekEnd = new Date(curr);
    weekEnd.setDate(curr.getDate() + 6);

    const isCurrentWeek = today >= weekStart && today <= weekEnd;

    const card = document.createElement("div");
    card.className = `week-card${isCurrentWeek ? " active" : ""}`;

    card.dataset.start = weekStart.toISOString();
    card.dataset.end = weekEnd.toISOString();

    card.innerHTML = `
      <div class="week-title">Week ${weekNumber}</div>
      <div class="week-range">
        ${weekStart.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })}
        –
        ${weekEnd.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })}
      </div>
    `;

    dateRangeContainer.appendChild(card);

    curr.setDate(curr.getDate() + 7);
    weekNumber++;
  }
};

const showActiveWeek = async () => {
  const active = document.querySelector(".week-card.active");
  if (!active) return;

  try {
    const from = formatDate(new Date(active.dataset.start));
    const to = formatDate(new Date(active.dataset.end));
    const key = [from, to].join("-");
    if (model.activeWeek[key]) {
      barCharDisplay(model.activeWeek[key].map((data) => data));
      return;
    }
    const response = await operatorDateRangeBookingRequest(
      createURLParams({
        from,
        to,
      })
    );

    if (response == "invalid" || !response) throw new Error("Invalid Request");
    model.activeWeek[key] = JSON.parse(response);
    barCharDisplay(model.activeWeek[key].map((data) => data));
  } catch (err) {
    console.error(err.message);
    toast.error(err.message);
  }
};

dateRangeContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".week-card");
  if (!target || target.classList.contains("active")) return;

  document
    .querySelectorAll(".week-card")
    .forEach((c) => c.classList.remove("active"));

  target.classList.add("active");
  showActiveWeek();
});

scheduleListContainer.addEventListener("click", (e) => {
  const target = e.target.closest("[data-schedule-id]");
  if (!target) return;

  const activeSchedule = model.scheduleList.find(
    ({ scheduleId }) => scheduleId === +target.dataset.scheduleId
  );

  sessionStorage.setItem("activeSchedule", JSON.stringify(activeSchedule));

  const APP_URL = window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/")
  );
  window.location.href = `${APP_URL}/manage_bus_schedule.do`;
});

const init = async () => {
  try {
    await infoFetching();
    displayInfoContainer();
    updateDateRange();
    await showActiveWeek();
    await showSchedules();
  } catch (err) {
    PageError.showOperatorError();
    toast.error(err.message);
  } finally {
    PageLoading.stopLoading();
  }
};

await init();
