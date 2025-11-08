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
// MOBILE CV PAGE BEHAVIOR
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const body = document.body;

  if (!left || !right || !body.classList.contains("cv") || window.innerWidth > 880) return;

  let lastY = 0;
  let startY = 0;
  let isLeftVisible = true;
  const TH = 25;

  const showLeft = () => {
    left.classList.remove("hide-on-scroll");
    isLeftVisible = true;
    right.classList.remove("scrollable"); // lock scroll
    right.scrollTop = 0;
  };

  const hideLeft = () => {
    left.classList.add("hide-on-scroll");
    isLeftVisible = false;
    right.classList.add("scrollable"); // unlock scroll
  };

  // --- Touch gestures ---
  window.addEventListener("touchstart", e => (startY = e.touches[0].clientY), { passive: true });
  window.addEventListener("touchmove", e => {
    const delta = e.touches[0].clientY - startY;
    const atTop = right.scrollTop <= 0;

    // Swipe up → hide left (unlock scroll)
    if (delta < -TH && isLeftVisible) hideLeft();

    // Swipe down (from top) → show left (lock scroll)
    if (delta > TH && !isLeftVisible && atTop) showLeft();
  }, { passive: true });

  // --- Scroll logic ---
  right.addEventListener("scroll", () => {
    const y = right.scrollTop;

    // if left is visible, block right scroll
    if (isLeftVisible) {
      right.scrollTop = 0;
      return;
    }

    // When reaching top and scrolling up → show left again
    if (y <= 0) {
      showLeft();
    }

    lastY = y;
  }, { passive: true });
});  // <-- this ends your current home-page script

// =======================================
// MOBILE CV PAGE BEHAVIOR
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const body = document.body;

  if (!left || !right || !body.classList.contains("cv") || window.innerWidth > 880) return;

  let startY = 0;
  let isLeftVisible = true;
  const TH = 30; // scroll/swipe threshold

  const showLeft = () => {
    left.classList.remove("hide-on-scroll");
    isLeftVisible = true;
    right.classList.remove("scrollable");
    right.scrollTop = 0;
  };

  const hideLeft = () => {
    left.classList.add("hide-on-scroll");
    isLeftVisible = false;
    setTimeout(() => right.classList.add("scrollable"), 400);
  };

  window.addEventListener("touchstart", e => (startY = e.touches[0].clientY), { passive: true });
  window.addEventListener("touchmove", e => {
    const delta = e.touches[0].clientY - startY;
    const atTop = right.scrollTop <= 0;

    if (delta < -TH && isLeftVisible) hideLeft();
    if (delta > TH && !isLeftVisible && atTop) showLeft();
  }, { passive: true });

  right.addEventListener("scroll", () => {
    const atTop = right.scrollTop <= 0;
    if (atTop && !isLeftVisible) showLeft();
  }, { passive: true });
});

