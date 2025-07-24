const dateInput = document.querySelector("#journey-date");

console.log(dateInput);

const formateDate = () => {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
};

formateDate();
