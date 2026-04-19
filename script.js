function toggleMenu() {
  let menu = document.getElementById("mobileMenu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Fade animation on scroll
const fadeElements = document.querySelectorAll(".fade-up");

function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);