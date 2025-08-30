import { toast } from "./toast.js";

(() => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams && urlParams.get("invalid") == "true") {
    toast.error("Invalid Request");
  }
})();
