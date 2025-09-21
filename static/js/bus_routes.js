import { toast } from "./toast";

const handleAllRoute = async () => {
    try {
      const response = await 
  } catch (err) {
    toast.error(err.message);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  handleAllRoute();
});
window.addEventListener("unload", () => {});
