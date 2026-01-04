import { PageLoading } from "./pageLoading.js";

const ctx = document.getElementById("bookingsChart");
const dateRangeContainer = document.querySelector("#dange_range_container");
const model = { info: null };

const operatorDashBoardRequest = async () => {
  const res = await fetch(`operator_dashboard.do`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Internal Server Error");
  const data = await res.text();
  return data.trim();
};

let range = 0;
const formatDate = (d) => {
  return d.toISOString().split("T")[0];
};

const infoFetching = async () => {
  try {
    const response = await operatorDashBoardRequest();
    model.info = JSON.parse(response);
    console.log(model);
  } catch (err) {}
};

const displayInfoContainer = () => {
  for (const params in model.info) {
    document.querySelector(
      `[data-type="${params.toLowerCase()}"]`
    ).textContent = new Intl.NumberFormat("en-IN").format(model.info[params]);
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

  dateRangeContainer.innerHTML = "";

  Array.from({ length: 7 }).forEach((_, i) => {
    const currDate = new Date(startDate);
    currDate.setDate(startDate.getDate() + i);
    const isInRange = formatDate(currDate) === formatDate(todayDate);

    // dateRangeContainer.innerHTML += ViewHelper.getDateRangeButton(
    //   currDate,
    //   isInRange
    // );
    dateRangeContainer.innerHTML += `<div
                      class="date-card ${isInRange ? "active" : ""} "
                      data-year="2026"
                      data-month="01"
                      data-day="04"
                    >
                      <span class="fw-semibold">${new Intl.DateTimeFormat(
                        navigator.language,
                        {
                          weekday: "short",
                        }
                      ).format(currDate)}</span>
                      <span class="small fw-medium">${new Intl.DateTimeFormat(
                        navigator.language,
                        {
                          day: "2-digit",
                        }
                      ).format(currDate)}</span>
                    </div>`;
  });

  if (!dateRangeContainer.querySelector(".active")) {
    dateRangeContainer.firstElementChild.classList.add("active");
  }
  showActiveDateRecord();
};

const init = async () => {
  try {
    await infoFetching();
    displayInfoContainer();
    updateDateRange();
  } catch (err) {
    console.error(err.message);
  } finally {
    PageLoading.stopLoading();
  }
};

init();

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Bookings",
        data: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 10) + 1
        ),
        backgroundColor: "#0d6efd",
        borderRadius: 8,
        barThickness: 35,
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
