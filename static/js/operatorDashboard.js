import { PageLoading } from "./pageLoading.js";

const ctx = document.getElementById("bookingsChart");

const model = { info: null };

const operatorDashBoardRequest = async () => {
  const res = await fetch(`operator_dashboard.do`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Internal Server Error");
  const data = await res.text();
  return data.trim();
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

const init = async () => {
  try {
    await infoFetching();
    displayInfoContainer();
  } catch (err) {
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
