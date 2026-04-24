function toggleMenu() {
  let menu = document.getElementById("mobileMenu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Fade animation on scroll
function checkFade() {
  document.querySelectorAll(".fade-up").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

// -----------------------------
// Convert CSV to JSON
// -----------------------------
function csvToJson(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  let data = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map(v => v.trim());
    if (row.length < headers.length) continue;

    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    data.push(obj);
  }

  return data;
}

// -----------------------------
// Load Fresh Stock from Google Sheet
// -----------------------------
async function loadFreshStock() {
  try {
    // 🔥 Paste your published CSV link here
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRka1g0whksLuFyNo8o1CBTjUxdsZ5TZ-rsgYrKlm6mESKqZQyF8VNemq7oO96GfnUdIjkZy77nJNXQ/pubhtml?gid=0&single=true";

    // Prevent cache
    const response = await fetch(sheetURL + "&v=" + new Date().getTime());
    const csvText = await response.text();

    const data = csvToJson(csvText);

    const grid = document.getElementById("freshStockGrid");
    grid.innerHTML = "";

    // Filter available = TRUE
    const availableItems = data.filter(item => {
      return item.available && item.available.toUpperCase() === "TRUE";
    });

    if (availableItems.length === 0) {
      grid.innerHTML = `<p style="color:white;">आज स्टॉक उपलब्ध नाही.</p>`;
      return;
    }

    availableItems.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card", "fade-up");

      card.innerHTML = `
        <h3>${item.emoji || ""} ${item.name || ""}</h3>
        <p><b>${item.price || ""}</b></p>
        <p>${item.desc || ""}</p>
      `;

      grid.appendChild(card);
    });

    checkFade();
  } catch (error) {
    console.error("Fresh stock loading error:", error);

    const grid = document.getElementById("freshStockGrid");
    grid.innerHTML = `<p style="color:white;">⚠️ Fresh stock not loading. Please try again later.</p>`;
  }
}

window.addEventListener("load", loadFreshStock);
