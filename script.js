document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const body = document.body;

  // Only run on the HOME page under 880px
  if (!left || !body.classList.contains("home") || window.innerWidth > 880) return;

  let startY = 0;
  let isVisible = true;
  const THRESHOLD = 30; // gesture sensitivity

  // --- Show / hide helper functions ---
  const showLeft = () => {
    left.classList.remove("hide-on-scroll");
    isVisible = true;
  };

  const hideLeft = () => {
    left.classList.add("hide-on-scroll");
    isVisible = false;
  };

  // --- Touch gestures (mobile) ---
  window.addEventListener(
    "touchstart",
    (e) => {
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // Swipe up → hide left panel
      if (deltaY < -THRESHOLD && isVisible) {
        hideLeft();
      }

      // Swipe down → show left panel
      if (deltaY > THRESHOLD && !isVisible) {
        showLeft();
      }
    },
    { passive: true }
  );
});

// =======================================
// Redirect Portfolio link based on device width
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("portfolioLink");
  if (!link) return;

  const isMobile = window.matchMedia("(max-width: 880px)").matches;
  link.href = isMobile ? "portfolio.html" : "portfolio2.html";
});

// Optional: auto-redirect if someone types the wrong URL directly
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 880px)").matches;
  const path = window.location.pathname;

  if (isMobile && path.endsWith("portfolio2.html")) {
    window.location.replace("portfolio.html");
  } else if (!isMobile && path.endsWith("portfolio.html")) {
    window.location.replace("portfolio2.html");
  }
});





