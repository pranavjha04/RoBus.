import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";

const watchSessionInternal = setInterval(() => {
  const activeFare = sessionStorage.getItem("activeFare");
  if (!activeFare) {
    history.back();
  }
}, 100);

window.addEventListener("DOMContentLoaded", () => {
  try {
    throw new Error("");
  } catch (err) {
    toast.error(err.message);
    PageLoading.stopLoading();
  }
});

window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  ["activeFare"].forEach((key) => sessionStorage.removeItem(key));
  clearInterval(watchSessionInternal);
});
