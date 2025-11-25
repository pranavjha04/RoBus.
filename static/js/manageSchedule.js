import { PageError } from "./pageError.js";
import { PageLoading } from "./pageLoading.js";
import { toast } from "./toast.js";

const model = {
  activeSchedule: null,
};

window.addEventListener("DOMContentLoaded", () => {
  try {
    model.activeSchedule = JSON.parse(sessionStorage.getItem("activeSchedule"));
    console.log(model.activeSchedule);
  } catch (err) {
    PageError.showOperatorError();
    toast.error(err.message);
  } finally {
    PageLoading.stopLoading();
  }
});
