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
// MOBILE CV PAGE BEHAVIOR (FINAL FIX)
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const body = document.body;

  if (!left || !right || !body.classList.contains("cv") || window.innerWidth > 880) return;

  let startY = 0;
  let isLeftVisible = true;
  const TH = 30;

  const showLeft = () => {
    left.classList.remove("hide-on-scroll");
    isLeftVisible = true;
    right.classList.remove("scrollable");
    right.scrollTop = 0;
  };

  const hideLeft = () => {
    left.classList.add("hide-on-scroll");
    isLeftVisible = false;
    // wait for CSS transition, then unlock scroll
    setTimeout(() => right.classList.add("scrollable"), 450);
  };

  // --- Touch gestures captured on LEFT (because it sits on top) ---
  left.addEventListener("touchstart", e => (startY = e.touches[0].clientY), { passive: true });
  left.addEventListener("touchmove", e => {
    const delta = e.touches[0].clientY - startY;
    if (delta < -TH && isLeftVisible) hideLeft();  // swipe up → hide menu
  }, { passive: true });

  // --- Touch gestures captured on RIGHT once scroll unlocked ---
  right.addEventListener("touchstart", e => (startY = e.touches[0].clientY), { passive: true });
  right.addEventListener("touchmove", e => {
    const delta = e.touches[0].clientY - startY;
    const atTop = right.scrollTop <= 0;
    if (delta > TH && !isLeftVisible && atTop) showLeft(); // swipe down from top → show menu
  }, { passive: true });

  // --- Scroll behaviour ---
  right.addEventListener("scroll", () => {
    const atTop = right.scrollTop <= 0;
    if (atTop && !isLeftVisible) showLeft();
  }, { passive: true });
});

