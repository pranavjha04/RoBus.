import { toast } from "./toast.js";
import { PageLoading } from "./pageLoading.js";
import { PageError } from "./pageError.js";
import { getDriverScheduleRequest } from "./service.js";

const pageWrapper = document.querySelector("#pageWrapper");
const infoContainer = document.querySelector("#info_container");
const scheduleListContainer = document.querySelector(
  "#schedule_list_container"
);
const filterContainer = document.querySelector("#filter_container");

const modal = {
  scheduleList: [],
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

const startLoading = () => {
  disableFilter();
  scheduleListContainer.innerHTML = `<div class="mt-5 justify-content-center align-self-center">
                                        <div class="mt-5 loader"></div>
                                      </div>`;
};

const getFilteresList = (callback) => {
  const filterResultList = [...modal.scheduleList].filter(callback);
  displayScheduleList(filterResultList);
};

const displayEmptySchedulePage = () => {
  if (modal.scheduleList.length !== 0) return;
  pageWrapper.innerHTML = `<div class="d-flex flex-column align-items-center justify-content-center text-center py-4 px-3">
        
        <div class="mb-3">
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 90C70 90 90 50 140 50C190 50 210 90 260 90" stroke="#f4f4f4" stroke-width="4" stroke-linecap="round"/>
            
            <rect x="80" y="35" width="80" height="45" rx="10" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
            
            <path d="M80 45C80 40 85 35 90 35H150C155 35 160 40 160 45V55H80V45Z" fill="#f8f9fa" stroke="#1a1a1a" stroke-width="2"/>
            
            <rect x="95" y="62" width="12" height="6" rx="2" fill="#e0e0e0"/>
            <rect x="114" y="62" width="12" height="6" rx="2" fill="#e0e0e0"/>
            <rect x="133" y="62" width="12" height="6" rx="2" fill="#e0e0e0"/>
            
            <circle cx="100" cy="80" r="6" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
            <circle cx="140" cy="80" r="6" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>

            <circle cx="165" cy="35" r="6" fill="#0d6efd" stroke="white" stroke-width="2"/>
        </svg>
        </div>

        <div style="max-width: 450px;">
          <h1 class="display-6 fw-bold text-dark mb-2" style="letter-spacing: -0.02em;">
            No Schedules found
          </h1>
          <p class="fs-5 text-muted mb-4" style="opacity: 0.8;">
            Your all assigned schedules will appear here.
          </p>
          
          <button onclick='window.location.reload()' role='button' class="btn btn-dark btn-lg px-5 py-2 fs-6 fw-semibold shadow-sm" style="border-radius: 8px; transition: transform 0.2s ease;">
            Check for updates
          </button>
        </div>
      </div>`;
};
const displayInfoContainer = () => {
  const scheduleList = modal.scheduleList;

  const info = scheduleList.reduce(
    (acc, { status }) => {
      switch (status.name) {
        case "Upcoming": {
          return { ...acc, total: acc.total + 1, upcoming: acc.upcoming + 1 };
        }
        case "Ongoing": {
          return {
            ...acc,
            total: acc.total + 1,
            ongoing: acc.ongoing + 1,
          };
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
      ongoing: 0,
      completed: 0,
      cancelled: 0,
    }
  );
  console.log(info);
  for (const prop in info) {
    infoContainer.querySelector(`[data-info-name="${prop}"]`).textContent =
      info[prop];
  }
};
const displayScheduleList = (list = []) => {
  if (modal.scheduleList.length === 0) {
    displayEmptySchedulePage();
    return;
  }

  enableFilter();
  if (list.length === 0) {
    scheduleListContainer.innerHTML = `
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
        No such schedules found
      </h1>
      <p class="fs-5 text-muted mb-4">
        We couldn't find any results for your current filters.
      </p>
      
    </div>
  </div>
  `;
  } else {
      
  }
};

const scheduleListFetching = async (firstTime = false) => {
  if (!firstTime) startLoading();
  try {
    const response = await getDriverScheduleRequest();
    if (response === "invalid") throw new Error("Invalid Request");
    modal.scheduleList = JSON.parse(response);
    console.log(modal.scheduleList);
  } catch (err) {
    if (firstTime) throw new Error(err.message);
    displayScheduleList(modal.scheduleList);
  }
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
      displayScheduleList(modal.scheduleList);
      break;
    }
    case "upcoming": {
      getFilteresList(({ status }) => status.name === "Upcoming");
      break;
    }
    case "ongoing": {
      getFilteresList(({ status }) => status.name === "Ongoing");
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
const init = async () => {
  try {
    await scheduleListFetching(true);
    displayEmptySchedulePage();
    displayInfoContainer();
    displayScheduleList(modal.scheduleList);
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

await init();
