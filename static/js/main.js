import { toast } from "./toast.js";

(() => {
  const urlParams = new URLSearchParams(window.location.search);

  const success = urlParams.get("success");
  if (success && success === "true") {
    toast.success("Account created successfully");
    return;
  }

  if (urlParams && urlParams.get("invalid") == "true") {
    toast.error("Invalid Request");
  }
})();


document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});
