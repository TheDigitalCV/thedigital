/* =========================
   PORTFOLIO STUDIO SETTINGS
   =========================
   1. Replace WHATSAPP_NUMBER with your WhatsApp number.
      Use country code, without + or spaces.
      Example Bangladesh: 8801XXXXXXXXX

   2. Replace the GitHub Pages demo URLs in index.html.

   3. Set the offer end date below.
      The countdown uses one shared deadline for every visitor.
*/

const WHATSAPP_NUMBER = "8801933001723";

// Change this to your real campaign deadline.
// Example format: "2026-09-05T23:59:59+06:00"
const OFFER_END_DATE = "2026-09-05T23:59:59+06:00";

const whatsappMessage =
  "Hi! I'm interested in the portfolio website launch offer for ৳199. I'd like to know the available designs and purchase process.";

function setWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const product = link.dataset.product;
    const message = product
      ? `Hi! I'm interested in ${product} (Demo ${product.match(/\d+$/)?.[0] || ""}) for the ৳199 launch offer. I'd like to know the purchase process.`
      : whatsappMessage;
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function updateCountdown() {
  const end = new Date(OFFER_END_DATE).getTime();
  const now = Date.now();
  const distance = end - now;

  const hourEls = [document.getElementById("hours"), document.getElementById("hours2")];
  const minuteEls = [document.getElementById("minutes"), document.getElementById("minutes2")];
  const secondEls = [document.getElementById("seconds"), document.getElementById("seconds2")];

  if (distance <= 0) {
    hourEls.forEach(el => { if (el) el.textContent = "00"; });
    minuteEls.forEach(el => { if (el) el.textContent = "00"; });
    secondEls.forEach(el => { if (el) el.textContent = "00"; });

    document.querySelectorAll(".sale-price, .product-price strong, .featured-price strong, .offer-price strong, .final-price strong")
      .forEach(el => el.textContent = "৳1,500");

    document.querySelectorAll(".save-pill").forEach(el => el.textContent = "OFFER ENDED");
    document.querySelectorAll(".countdown-note").forEach(el => {
      el.innerHTML = 'The launch offer has ended. Regular price: <strong>৳1,500</strong>.';
    });

    return;
  }

  const totalSeconds = Math.floor(distance / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  hourEls.forEach(el => { if (el) el.textContent = h; });
  minuteEls.forEach(el => { if (el) el.textContent = m; });
  secondEls.forEach(el => { if (el) el.textContent = s; });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupBackToTop() {
  const button = document.querySelector(".back-top");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("show", window.scrollY > 600);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

setWhatsAppLinks();
setupMobileMenu();
setupBackToTop();
updateCountdown();
setInterval(updateCountdown, 1000);


// Transparent header becomes a subtle glass header after the user scrolls.
function setupHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}
setupHeader();
