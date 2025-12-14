import { APP_URL } from "./helper.js";
import { logoutRequest } from "./service.js";
import { toast } from "./toast.js";

const logoutRequestHandler = async () => {
  try {
    const response = await logoutRequest();
    if (response !== "ok") throw new Error("Internal Error");

    Object.keys(sessionStorage).forEach((key) => {
      sessionStorage.removeItem(key);
    });

    window.location.href = APP_URL;
  } catch (err) {
    toast.error(err.message);
  }
};

document
  .querySelector("#logout_btn")
  .addEventListener("click", logoutRequestHandler);
