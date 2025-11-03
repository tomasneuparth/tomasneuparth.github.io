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
