import { PageLoading } from "./pageLoading.js";

const ctx = document.getElementById("bookingsChart");

PageLoading.stopLoading();

const init = async () => {};

new Chart(ctx, {
  type: "bar",
  maintainAspectRation: true,
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Bookings",
        data: [10, 8, 3, 2, 11, 8, 2, 5, 9, 6, 4, 5],
        pointRadius: 5,
        pointBackgroundColor: "blue",
        fill: true,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Monthly Bookings Trend (Jan - Dec)",
        font: {
          size: 22,
          weight: "bold",
        },
        color: "#333",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Bookings",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
        },
        beginAtZero: true,
      },
    },
  },
});
