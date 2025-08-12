const menuItemsContainer = document.querySelector("#navbar-hamburger");
const menuBtn = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  const isOpen = menuItemsContainer.classList.contains("max-h-96");

  if (isOpen) {
    // Close
    menuItemsContainer.classList.remove("max-h-96", "opacity-100");
    menuItemsContainer.classList.add("max-h-0", "opacity-0");
  } else {
    // Open
    menuItemsContainer.classList.remove("max-h-0", "opacity-0");
    menuItemsContainer.classList.add("max-h-96", "opacity-100");
  }
});

menuItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-nav-link")) {
    // Close after selecting a link
    menuItemsContainer.classList.remove("max-h-96", "opacity-100");
    menuItemsContainer.classList.add("max-h-0", "opacity-0");
  }
});
