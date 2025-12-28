import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { getAllBookingRequest } from "./service.js";
import { toast } from "./toast.js";
import { ViewHelper } from "./viewHelper.js";

const infoContainer = document.querySelector("#info_container");
const filterContainer = document.querySelector("#filter_container");
const bookingListContainer = document.querySelector("#booking_list_container");

const modal = {
  bookingList: [],
};

const enableFilter = () => {};
const disableFilter = () => {};

const displayInfoContainer = () => {};
const displayBookingList = (list) => {};

const init = async () => {
  try {
    const response = await getAllBookingRequest();
    if (response === "invalid") throw new Error("Invalid Reques");
    modal.bookingList = JSON.parse(response);
    console.log(modal);
  } catch (err) {
    toast.error(err.message);
    PageError.showOperatorError();
  } finally {
    PageLoading.stopLoading();
  }
};

await init();
