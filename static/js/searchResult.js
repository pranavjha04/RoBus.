import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";
import { ViewHelper } from "./viewHelper.js";

const searchResultContainer = document.querySelector(
  "#search_result_container"
);
const totalResultContainer = document.querySelector("#total_result");
const sortPrice = document.querySelector("#sort_price");
const sortSeats = document.querySelector("#sort_seats");

const modal = {
  searchResults: [],
};

const displaySearchResult = (list = []) => {
  if (!(list instanceof Array)) throw new Error("Invalid List");

  totalResultContainer.textContent = `${list.length} Results Found`;
  if (list.length === 0) {
  } else {
    searchResultContainer.innerHTML = modal.searchResults
      .map(ViewHelper.getSearchResultRow)
      .join("");
  }
};

const init = () => {
  try {
    PageLoading.stopLoading();
    modal.searchResults = JSON.parse(sessionStorage.getItem("searchResult"));
    console.log(modal);
    displaySearchResult(modal.searchResults);
  } catch (err) {
    toast.error(err.message);
  }
  if (!sessionStorage.getItem("searchResult")) {
    history.back();
  }
};

window.addEventListener("beforeunload", (e) => {
  console.log("hell");
});

init();
