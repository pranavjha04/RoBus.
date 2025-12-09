const from = document.querySelector("#from");
const to = document.querySelector("#to");
const fromSuggestion = document.querySelector("#from_suggestion");
const toSuggestion = document.querySelector("#to_suggestion");
const swapper = document.querySelector("#swapper");
const journeyData = document.querySelector("#journey_date");
const searchBusForm = document.querySelector("#search_bus_form");

swapper.addEventListener("click", () => {
  if (!from.value && !to.value) return;
  swapper.style.transform = `scale(0.65) rotate(180deg)`;

  setTimeout(() => {
    swapper.style.transform = `scale(1.0) `;
    [from.value, to.value] = [to.value, from.value];
    [fromSuggestion.innerHTML, toSuggestion.innerHTML] = [
      toSuggestion.innerHTML,
      fromSuggestion.innerHTML,
    ];
  }, 350);
});

const searchBusEvent = (e) => {
  const target = e.target;
  const value = target.value;
};
