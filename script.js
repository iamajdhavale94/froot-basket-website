function toggleMenu() {
  let menu = document.getElementById("mobileMenu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Fade animation on scroll
const fadeElements = document.querySelectorAll(".fade-up");

function checkFade() {
  document.querySelectorAll(".fade-up").forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

// Load Fresh Stock JSON dynamically
async function loadFreshStock() {
  try {
    const response = await fetch("fresh-stock.json");
    const data = await response.json();

    const grid = document.getElementById("freshStockGrid");
    grid.innerHTML = "";

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card", "fade-up");

      card.innerHTML = `
        <h3>${item.emoji} ${item.name}</h3>
        <p><b>${item.price}</b></p>
        <p>${item.desc}</p>
      `;

      grid.appendChild(card);
    });

    checkFade();
  } catch (error) {
    console.error("Fresh stock loading error:", error);
  }
}

window.addEventListener("load", loadFreshStock);
