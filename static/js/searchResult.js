import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";

const modal = {
  searchResults: [],
};

const init = () => {
  try {
    PageLoading.stopLoading();
    modal.searchResults = JSON.parse(sessionStorage.getItem("searchResult"));
    console.log(modal);
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
