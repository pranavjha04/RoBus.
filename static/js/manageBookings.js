import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { getAllBookingRequest } from "./service.js";
import { toast } from "./toast.js";
import { ViewHelper } from "./viewHelper.js";

const infoContainer = document.querySelector("#info_container");
const filterContainer = document.querySelector("#filter_container");
const contentWrapper = document.querySelector("#pageWrapper");
const bookingListContainer = document.querySelector("#booking_list_container");

const modal = {
  bookingList: [],
};

const displayInfoContainer = () => {
  const bookingList = modal.bookingList;

  const filters = bookingList.reduce(
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
    }
  );

  console.log(filters);

  for (const prop in filters) {
    infoContainer.querySelector(`[data-info-name="${prop}"]`).textContent =
      filters[prop];
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
    bookingListContainer.innerHTML = ViewHelper.
  }
};

const init = async () => {
  try {
    const response = await getAllBookingRequest();
    if (response === "invalid") throw new Error("Invalid Reques");
    modal.bookingList = JSON.parse(response);
    console.log(modal);
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
