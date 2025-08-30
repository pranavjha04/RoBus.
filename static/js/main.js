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
