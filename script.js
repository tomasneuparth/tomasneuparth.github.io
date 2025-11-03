// =======================================
// CAROUSEL (unchanged)
const slides = document.querySelectorAll('.carousel img');
let idx = 0;
if (slides.length) {
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 4000);
}

// =======================================
// MOBILE PANEL SCROLL BEHAVIOR
document.addEventListener("DOMContentLoaded", () => {
  const leftPane = document.querySelector(".left");
  const rightPane = document.querySelector(".right");
  const body = document.body;

  if (!leftPane || !rightPane) return;
  if (window.innerWidth > 880) return; // Desktop unaffected

  // === INITIAL STATE FIX ===
  leftPane.classList.remove("hide-on-scroll");
  leftPane.classList.remove("show-on-load"); // reset in case of reload
  rightPane.classList.remove("lock-scroll");

  // For HOME page: ensure menu visible & above image
  if (body.classList.contains("home")) {
    leftPane.classList.add("show-on-load");  // visible on load
    rightPane.classList.add("lock-scroll");  // image locked
    leftPane.style.zIndex = "2000";
    rightPane.style.zIndex = "1000";
  }

  let lastScrollTop = 0;
  let isLeftVisible = true; // start with menu visible
  let touchStartY = 0;
  const threshold = 20; // smooth out touch scrolling

  // helper functions
  const showLeft = () => {
    leftPane.classList.remove("hide-on-scroll");
    leftPane.classList.add("show-on-load");
    if (body.classList.contains("cv")) {
      rightPane.classList.add("lock-scroll");
      rightPane.scrollTop = 0; // reset scroll when panel reopens
    }
    isLeftVisible = true;
  };

  const hideLeft = () => {
    leftPane.classList.remove("show-on-load");
    leftPane.classList.add("hide-on-scroll");
    if (body.classList.contains("cv")) {
      rightPane.classList.remove("lock-scroll");
    }
    isLeftVisible = false;
  };

  // Track scroll direction properly on touch
  window.addEventListener(
    "touchstart",
    e => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    e => {
      const touchY = e.touches[0].clientY;
      const delta = touchY - touchStartY;

      // HOME PAGE LOGIC (menu visible by default)
      if (body.classList.contains("home")) {
        // Swiping UP hides menu, swiping DOWN shows it again
        if (delta < -threshold && isLeftVisible) {
          hideLeft();
        } else if (delta > threshold && !isLeftVisible) {
          showLeft();
        }
      }

      // CV PAGE LOGIC
      if (body.classList.contains("cv")) {
        const atTop = rightPane.scrollTop <= 0;
        if (delta < -threshold && isLeftVisible) {
          hideLeft(); // swipe up hides left, unlock right scroll
        } else if (delta > threshold && !isLeftVisible && atTop) {
          showLeft(); // swipe down from top reveals left
        }
      }
    },
    { passive: true }
  );

  // Also handle standard scroll (mousewheel / inertia)
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // HOME
      if (body.classList.contains("home")) {
        if (scrollTop > lastScrollTop + threshold && isLeftVisible) hideLeft();
        else if (scrollTop < lastScrollTop - threshold && !isLeftVisible)
          showLeft();
        rightPane.classList.add("lock-scroll"); // keep image static
      }

      // CV
      else if (body.classList.contains("cv")) {
        const atTop = rightPane.scrollTop <= 0;
        if (scrollTop > lastScrollTop + threshold && isLeftVisible) hideLeft();
        else if (scrollTop < lastScrollTop - threshold && !isLeftVisible && atTop)
          showLeft();
      }

      lastScrollTop = Math.max(scrollTop, 0);
    },
    { passive: true }
  );

  // Reset everything when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880) {
      leftPane.classList.remove("hide-on-scroll", "show-on-load");
      rightPane.classList.remove("lock-scroll");
    }
  });
});


