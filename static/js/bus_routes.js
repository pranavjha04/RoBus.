import { collectOperatorRouteRequest, collectRouteRequest } from "./service.js";
import { toast } from "./toast.js";

const handleAllRoutes = async () => {
  try {
    const response = await collectRouteRequest();
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response.startsWith("{")) {
      const routeMap = JSON.parse(response);
      const { routeList, routeMidCityList } = routeMap;
      console.log(routeMap);

      sessionStorage.setItem("routeList", JSON.stringify(routeList));
      sessionStorage.setItem(
        "routeMidCityList",
        JSON.stringify(routeMidCityList)
      );
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    toast.error(err.message);
  }
};

const handleAllOperatorRoutes = async () => {
  try {
    const response = await collectOperatorRouteRequest();
    if (response === "invalid") {
      throw new Error("Invalid Request");
    }
    if (response.startsWith("{")) {
      const routeMap = JSON.parse(response);
      const { operatorRouteList, operatorRouteMidCityList } = routeMap;
      console.log(routeMap);
      sessionStorage.setItem(
        "operatorRouteList",
        JSON.stringify(operatorRouteList)
      );
      sessionStorage.setItem(
        "operatorRouteMidCityList",
        JSON.stringify(operatorRouteMidCityList)
      );
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    toast.error(err.message);
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  setTimeout(async () => {
    try {
      await Promise.all([handleAllRoutes(), handleAllOperatorRoutes()]);
    } catch {
      window.location.reload();
    }
  }, 1000);
});

window.addEventListener("pagehide", () => {
  sessionStorage.removeItem("routeList");
  sessionStorage.removeItem("routeMidCityList");
  sessionStorage.removeItem("operatorRouteList");
  sessionStorage.removeItem("operatorRouteMidCityList");
});
