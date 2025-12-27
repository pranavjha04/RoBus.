import { toast } from "./toast.js";
import { PageLoading } from "./pageLoading.js";
import { PageError } from "./pageError.js";
import {
  convertTo24Hour,
  createURLParams,
  formateTime,
  getFormatedDuration,
} from "./util.js";
import { ViewHelper } from "./viewHelper.js";
import { bookTicketFormRequest } from "./service.js";
import { APP_URL } from "./helper.js";

// containers
const journeyInfoContainer = document.querySelector(".journey-info-container");
const busOperatorInfoContainer = document.querySelector(
  ".bus-operator-info-container"
);
const routeInfoTimeLineContainer = document.querySelector(
  ".route-info-timeline-container"
);

const selectedSeatContainer = document.querySelector(
  ".selected-seat-container"
);
const driverInfoContainer = document.querySelector(".driver-info-container");
const bookingFareInfoContainer = document.querySelector(
  ".booking-fare-info-container"
);

const scheduleId = document.querySelector("#schedule_id");
const totalFare = document.querySelector("#total_fare");

const journeyDateValue = document.querySelector("#journey_date");
const bookTicketForm = document.querySelector("#book-ticket-form");
const source = document.querySelector("#source");
const destination = document.querySelector("#destination");

const modal = {
  activeSchedule: null,
  selectedSeats: [],
};

const timeFormateWrapper = (time) => {
  const date = new Date();
  const time24 = convertTo24Hour(time);
  const [hours, mins] = time24.split(":");
  date.setHours(+hours, +mins, 0, 0);

  return formateTime(date);
};

const formattedDate = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const displayJourneyInfoContainer = () => {
  const { busRouteWeekday, journeyDate, departureTime, arrivalTime } =
    modal.activeSchedule;
  const { operatorRoute } = busRouteWeekday;
  const { route, operatorRouteMidCities } = operatorRoute;
  const { source, destination, distance, duration } = route;
  const totalDuration = operatorRouteMidCities.reduce(
    (acc, curr) => acc + curr.haltingTime,
    duration
  );
  journeyInfoContainer.querySelector(".source").textContent = source.name;
  journeyInfoContainer.querySelector(".destination").textContent =
    destination.name;
  journeyInfoContainer.querySelector(".journey-date").textContent =
    new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    }).format(new Date(journeyDate));
  journeyInfoContainer.querySelector(".departure-time").textContent =
    timeFormateWrapper(departureTime);
  journeyInfoContainer.querySelector(".arrival-time").textContent =
    timeFormateWrapper(arrivalTime);
  journeyInfoContainer.querySelector(".total-duration").textContent =
    getFormatedDuration(totalDuration);
  journeyInfoContainer.querySelector(
    ".distance"
  ).textContent = `Distance : ${distance} km`;
};

const displyBusOperatorInfoContainer = () => {
  const { bus } = modal.activeSchedule;
  const {
    busNumber,
    manufacturer,
    busFareFactorList,
    doubleDecker,
    operator,
    busImageList,
    busId,
  } = bus;
  busOperatorInfoContainer.querySelector(".operator-name").textContent =
    operator.fullName;
  busOperatorInfoContainer.querySelector(".bus-number").textContent = busNumber;
  busOperatorInfoContainer.querySelector(".manufacturer").textContent =
    manufacturer.name;
  busOperatorInfoContainer.querySelector(".deck").textContent = `${
    doubleDecker ? "Double" : "Single"
  } Decker`;
  busOperatorInfoContainer.querySelector(
    ".amenities-list"
  ).innerHTML = `${busFareFactorList
    .map(({ operatorTicketFare }) => {
      const { fareFactor } = operatorTicketFare;
      return `<span
              class="amenity-item"
              >${fareFactor.name}</span
            >`;
    })
    .join("")}`;

  busOperatorInfoContainer.querySelector(
    ".image-list"
  ).innerHTML = `${busImageList.map(({ pic }) => {
    return `<img class='rounded-2 object-fit-cover' src="show_image.do?target=bus&id=${busId}&name=${pic}"/>`;
  })}`;
};

const displayRouteTimeLineContainer = () => {
  routeInfoTimeLineContainer.innerHTML = ViewHelper.getRouteTimeLineContainer(
    modal.activeSchedule
  );
};

const displaySelectedSeatContainer = () => {
  selectedSeatContainer.innerHTML = `${modal.selectedSeats
    .map(({ isSleeper, seatNumber, totalCharge, deck }) => {
      return ` <div class="selected-seat-item d-flex justify-content-between align-items-center">
                    <div class="seat-left">
                        <div class="seat-title">
                        Seat ${seatNumber} <span class="seat-type seater">${
        isSleeper ? "Sleeper" : "Seater"
      }</span>
                        </div>
                        <div class="seat-sub">
                        <i class="bi bi-layers-half me-1"></i> ${
                          deck ? "Upper" : "Lower"
                        } Deck
                        </div>
                    </div>
                    <div class="seat-price fw-semibold">
                        ₹${totalCharge}
                    </div>
                    </div>`;
    })
    .join("")}`;
};
const displayDriverInfoContainer = () => {
  const { driver } = modal.activeSchedule;
  const { licenceNumber, user } = driver;

  driverInfoContainer.querySelector(".driver-name").textContent = user.fullName;
  driverInfoContainer.querySelector(".licence-no").textContent = licenceNumber;
  driverInfoContainer.querySelector(".contact").textContent = user.contact;
};

const displayTotalFareSummery = () => {
  const { selectedSeats, activeSchedule } = modal;
  console.log(selectedSeats);

  const sleeperSeats = selectedSeats.filter((seat) => seat.isSleeper);
  const seaterSeats = selectedSeats.filter((seat) => !seat.isSleeper);
  const totalFare = selectedSeats.reduce(
    (acc, curr) => acc + curr.totalCharge,
    activeSchedule.additionalCharges
  );

  bookingFareInfoContainer.innerHTML = "";
  if (sleeperSeats.length) {
    const total = sleeperSeats.reduce((acc, curr) => acc + curr.totalCharge, 0);
    bookingFareInfoContainer.innerHTML += `<div class="info-row">
                <span>${sleeperSeats.length}x Sleeper</span>
                <span>₹ ${total}</span>
              </div>`;
  }
  if (seaterSeats.length) {
    const total = seaterSeats.reduce((acc, curr) => acc + curr.totalCharge, 0);
    console.log(total);
    bookingFareInfoContainer.innerHTML += `<div class="info-row">
                <span>${seaterSeats.length}x Seater</span>
                <span>₹ ${total}</span>
              </div>`;
  }

  if (activeSchedule.additionalCharges) {
    bookingFareInfoContainer.innerHTML += `<div class="info-row">
                <span>Additional Charges</span>
                <span>₹ ${activeSchedule.additionalCharges}</span>
              </div>`;
  }

  bookingFareInfoContainer.innerHTML += `<div class="divider"></div>`;

  bookingFareInfoContainer.innerHTML += `<div class="info-row fw-semibold fs-5">
                <span>Total Payable</span>
                <span class="text-primary total-amount">₹ ${totalFare}</span>
              </div>`;
};

const insertBookingFormFields = () => {
  const { selectedSeats, activeSchedule } = modal;
  const calculatedTotalFare = selectedSeats.reduce(
    (acc, curr) => acc + curr.totalCharge,
    activeSchedule.additionalCharges
  );
  journeyDateValue.value = formattedDate(activeSchedule.journeyDate);
  console.log(journeyDateValue.value);
  console.log(formattedDate(activeSchedule.journeyDate));
  scheduleId.value = activeSchedule.scheduleId;
  totalFare.value = calculatedTotalFare;
  source.value =
    activeSchedule.busRouteWeekday.operatorRoute.route.source.cityId;
  destination.value =
    activeSchedule.busRouteWeekday.operatorRoute.route.destination.cityId;
  selectedSeats.forEach(({ seatNumber, totalCharge, isSleeper }) => {
    const input = `<input type='hidden' name='seat' value='${seatNumber}_${
      isSleeper ? 1 : 0
    }_${totalCharge}'>`;
    bookTicketForm.innerHTML += input;
  });
};

busOperatorInfoContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || !target.dataset.type) return;

  const type = e.target.dataset.type;
  const amenityContainer =
    busOperatorInfoContainer.querySelector(".amenities-list");
  const imageContainer = busOperatorInfoContainer.querySelector(".image-list");
  switch (type) {
    case "amenities": {
      imageContainer.classList.add("d-none");
      amenityContainer.classList.toggle("d-none");
      busOperatorInfoContainer.querySelector(
        `[data-type="images"]`
      ).textContent = "Bus Images";
      if (amenityContainer.classList.contains("d-none")) {
        target.textContent = "Amenities";
      } else {
        target.textContent = "Hide Amenities";
      }
      break;
    }
    case "images": {
      amenityContainer.classList.add("d-none");
      imageContainer.classList.toggle("d-none");
      busOperatorInfoContainer.querySelector(
        `[data-type="amenities"]`
      ).textContent = "Amenities";
      if (imageContainer.classList.contains("d-none")) {
        target.textContent = "Bus Images";
      } else {
        target.textContent = "Hide Images";
      }
      break;
    }
    default: {
      break;
    }
  }
});

bookTicketForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    if (
      !scheduleId.value ||
      !totalFare.value ||
      !source.value ||
      !destination.value
    )
      throw new Error("Invalid Request");
    const params = createURLParams(new FormData(bookTicketForm));
    const response = await bookTicketFormRequest(params);
    switch (response) {
      case "ok": {
        sessionStorage.removeItem("activeSchedule");
        sessionStorage.removeItem("selectedSeatList");
        sessionStorage.removeItem("searchResult");
        window.location.href = `${APP_URL}/manage_bookings.do`;
        break;
      }
      case "invalid": {
        throw new Error("Invalid Request");
        break;
      }
      case "missing": {
        throw new Error("Missing Parameter");
        break;
      }
      default: {
        break;
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
});

const init = () => {
  try {
    ["activeSchedule", "selectedSeatList"].forEach((item) => {
      if (
        !sessionStorage.getItem(item) ||
        !JSON.parse(sessionStorage.getItem(item))
      )
        throw new Error("Invalid");
    });
    modal.activeSchedule = JSON.parse(sessionStorage.getItem("activeSchedule"));
    modal.selectedSeats = JSON.parse(
      sessionStorage.getItem("selectedSeatList")
    );
    displayJourneyInfoContainer();
    displyBusOperatorInfoContainer();
    displayRouteTimeLineContainer();
    displaySelectedSeatContainer();
    displayDriverInfoContainer();
    displayTotalFareSummery();
    insertBookingFormFields();
  } catch (err) {
    console.error(err.message);
  }
};

init();
