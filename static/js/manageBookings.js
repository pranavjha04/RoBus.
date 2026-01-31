import { ModalHandler } from "./modalHandler.js";
import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { cancelBookingRequest, getAllBookingRequest } from "./service.js";
import { toast } from "./toast.js";
import { createURLParams, getFormattedTime } from "./util.js";
import { ViewHelper } from "./viewHelper.js";

const infoContainer = document.querySelector("#info_container");
const filterContainer = document.querySelector("#filter_container");
const contentWrapper = document.querySelector("#pageWrapper");
const bookingListContainer = document.querySelector("#booking_list_container");
const cancelBookingBtn = document.querySelector("#cancel_btn");
const cancelBookingModal = document.querySelector("#cancelBookingModal");
const showTicketModel = document.querySelector("#busTicketModal");

const modal = {
  bookingList: [],
  activeBookingId: null,
};

const disableFilter = () => {
  [...filterContainer.children].forEach((child) => {
    child.disabled = true;
  });
};

const enableFilter = () => {
  [...filterContainer.children].forEach((child) => {
    child.disabled = false;
  });
};

const resetFilter = () => {
  [...filterContainer.children].forEach((child) => {
    child.classList.remove("btn-primary");
    child.classList.add("btn-outline-primary");
  });
  filterContainer.firstElementChild.classList.add("btn-primary");
  filterContainer.firstElementChild.classList.remove("btn-outline-primary");
};

const formattedDate = (date) => {
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
  }).format(new Date(date));
};

const startLoading = () => {
  disableFilter();
  bookingListContainer.innerHTML = `<div class="mt-5 justify-content-center align-self-center">
                                        <div class="mt-5 loader"></div>
                                      </div>`;
};

const bookingListFetching = async (firstTime = false) => {
  if (!firstTime) startLoading();
  try {
    const response = await getAllBookingRequest();
    if (response === "invalid") throw new Error("Invalid Reques");
    resetFilter();
    modal.bookingList = JSON.parse(response);
  } catch (err) {
    if (firstTime) throw new Error(err.message);
  }
};

const getCityStateName = (route, target) => {
  if (!route || !target) return;
  const curr = route[target];
  if (!curr) return;

  return `${curr.name}, ${curr.state.name}`;
};

const displayInfoContainer = () => {
  const bookingList = modal.bookingList;

  const info = bookingList.reduce(
    (acc, curr) => {
      switch (curr.status.name) {
        case "Upcoming": {
          return { ...acc, total: acc.total + 1, upcoming: acc.upcoming + 1 };
        }
        case "Completed": {
          return { ...acc, total: acc.total + 1, completed: acc.completed + 1 };
        }
        case "Cancelled": {
          return { ...acc, total: acc.total + 1, cancelled: acc.cancelled + 1 };
        }
        default: {
          return acc;
        }
      }
    },
    {
      total: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0,
    },
  );

  for (const prop in info) {
    infoContainer.querySelector(`[data-info-name="${prop}"]`).textContent =
      info[prop];
  }
};

const displayEmptyBookingPage = () => {
  if (modal.bookingList.length > 0) return;
  contentWrapper.innerHTML = `
      <div class="d-flex flex-column align-items-center justify-content-center text-center py-4 px-3">
        
        <div class="mb-3">
          <svg width="240" height="100" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 70C60 70 80 30 120 30C160 30 180 70 220 70" stroke="#f4f4f4" stroke-width="4" stroke-linecap="round"/>
            <rect x="85" y="25" width="70" height="45" rx="6" fill="white" stroke="#1a1a1a" stroke-width="2"/>
            <line x1="100" y1="40" x2="140" y2="40" stroke="#1a1a1a" stroke-width="2"/>
            <line x1="100" y1="52" x2="130" y2="52" stroke="#e0e0e0" stroke-width="2"/>
            <circle cx="155" cy="25" r="5" fill="#0d6efd"/>
          </svg>
        </div>

        <div style="max-width: 450px;">
          <h1 class="display-6 fw-bold text-dark mb-2" style="letter-spacing: -0.02em;">
            No bookings found
          </h1>
          <p class="fs-5 text-muted mb-4" style="opacity: 0.8;">
            Your upcoming bookings will live here.
          </p>
          
          <a href='search_results.do' role='button' class="btn btn-dark btn-lg px-5 py-2 fs-6 fw-semibold shadow-sm" style="border-radius: 8px; transition: transform 0.2s ease;">
            Book a journey
          </a>
        </div>
      </div>
      `;
};

const displayBookingList = (list) => {
  if (modal.bookingList.length === 0) {
    displayEmptyBookingPage();
    return;
  }
  enableFilter();

  if (list.length === 0) {
    bookingListContainer.innerHTML = `
  <div class="d-flex flex-column align-items-center justify-content-center text-center py-5 px-3">
    
    <div class="mb-3">
      <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 50 L160 50" stroke="#f0f0f0" stroke-width="2" stroke-dasharray="6 6" stroke-linecap="round"/>
        
        <circle cx="90" cy="45" r="20" stroke="#1a1a1a" stroke-width="2" fill="white"/>
        <line x1="105" y1="60" x2="120" y2="75" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        
        <circle cx="120" cy="75" r="3" fill="#0d6efd"/>
      </svg>
    </div>
  
    <div style="max-width: 450px;">
      <h1 class="display-6 fw-bold text-dark mb-2" style="letter-spacing: -0.02em;">
        No such booking found
      </h1>
      <p class="fs-5 text-muted mb-4">
        We couldn't find any results for your current filters.
      </p>
      
    </div>
  </div>
  `;
  } else {
    bookingListContainer.innerHTML = list
      .map(ViewHelper.getManageBookingHTML)
      .join("");
  }
};

const showTicket = (booking) => {
  const { bookingId, schedule, totalFare, bookingDate, bookedSeatList } =
    booking;
  const {
    arrivalTime,
    departureTime,
    bus,
    journeyDate,
    busRouteWeekday,
    driver,
  } = schedule;
  const { busNumber, operator } = bus;

  showTicketModel.innerHTML = `<div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <!-- Header -->
        <div class="modal-header border-0">
          <div>
            <h5 class="modal-title fw-bold" id="busTicketLabel">Bus Ticket</h5>
            <small class="text-muted">Booking ID: ${bookingId}</small>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body pt-0">
          <!-- Route -->
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>${getCityStateName(busRouteWeekday.operatorRoute.route, "source")}</strong><br />
              <small class="text-muted">${getFormattedTime(departureTime)}</small>
            </div>

            <div class="text-muted">→</div>

            <div class="text-end">
              <strong>${getCityStateName(busRouteWeekday.operatorRoute.route, "destination")}</strong><br />
              <small class="text-muted">${getFormattedTime(arrivalTime)}</small>
            </div>
          </div>
          <div class="text-muted small mb-1">Journey Date: ${formattedDate(
            journeyDate,
          )}</div>
          <div class="text-muted small mb-3">Booking Date: ${formattedDate(
            bookingDate,
          )}</div>

          <!-- Details -->
          <table class="table table-sm table-borderless mb-0">
            <tbody>
              <tr>
                <td>Operator & Contact</td>
                <td class="text-end">${operator.fullName}, ${operator.contact}</td>
              </tr>
              <tr>
                <td>Bus No</td>
                <td class="text-end">${busNumber}</td>
              </tr>
              <tr>
                <td>Driver & Contact</td>
                <td class="text-end">${driver.user.fullName}, ${driver.user.contact}</td>
              </tr>
              <tr>
                <td>Seats</td>
                <td class="text-end">${bookedSeatList.map(({ seatNumber }) => seatNumber).join(",")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 d-flex justify-content-between">
          <strong>Total Paid</strong>
          <strong>₹${new Intl.NumberFormat("en-IN").format(totalFare)}</strong>
        </div>
      </div>
    </div>`;

  ModalHandler.show(showTicketModel);
};

const getFilteresList = (callback) => {
  const filterResultList = [...modal.bookingList].filter(callback);
  displayBookingList(filterResultList);
};

filterContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (
    !button ||
    !button.dataset.type ||
    button.classList.contains("btn-primary")
  )
    return;

  const type = button.dataset.type;
  [...filterContainer.children].forEach((child) => {
    child.classList.remove("btn-primary");
    child.classList.add("btn-outline-primary");
  });

  button.classList.add("btn-primary");
  button.classList.remove("btn-outline-primary");

  switch (type) {
    case "all": {
      displayBookingList(modal.bookingList);
      break;
    }
    case "upcoming": {
      getFilteresList(({ status }) => status.name === "Upcoming");
      break;
    }
    case "completed": {
      getFilteresList(({ status }) => status.name === "Completed");
      break;
    }
    case "cancelled": {
      getFilteresList(({ status }) => status.name === "Cancelled");
      break;
    }
    default: {
      break;
    }
  }
});

bookingListContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target || !target.dataset.type) return;

  const type = target.dataset.type;
  const targetBookingId =
    target.closest("[data-booking-id]")?.dataset?.bookingId;
  if (!targetBookingId || isNaN(+targetBookingId)) return;

  switch (type) {
    case "cancel": {
      modal.activeBookingId = +targetBookingId;
      break;
    }
    case "ticket": {
      showTicket(
        modal.bookingList.find(
          ({ bookingId }) => bookingId === +targetBookingId,
        ),
      );
      break;
    }
    default: {
      break;
    }
  }
});

cancelBookingBtn.addEventListener("click", async () => {
  if (!modal.activeBookingId) return;

  try {
    const queryParams = createURLParams({
      booking_id: modal.activeBookingId,
    });
    const response = await cancelBookingRequest(queryParams);
    if (response === "ok") {
      modal.activeBookingId = null;
      toast.success("Booking cancelled Sucessfully");
      await bookingListFetching();
      displayInfoContainer();
      displayBookingList(modal.bookingList);
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    toast.error(err.message);
    displayBookingList(modal.bookingList);
  } finally {
    ModalHandler.hide(cancelBookingModal);
  }
});

cancelBookingModal.addEventListener("hide.bs.modal", () => {
  modal.activeBookingId = null;
});

showTicketModel.addEventListener("hide.bs.modal", () => {});

const init = async () => {
  try {
    disableFilter();
    await bookingListFetching(true);
    displayInfoContainer();
    displayEmptyBookingPage();
    displayBookingList(modal.bookingList);
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

await init();
