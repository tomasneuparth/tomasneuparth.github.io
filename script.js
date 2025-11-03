// =======================================
// 1) SAFE CAROUSEL (won't break pages without it)
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel img");
  if (slides.length) {
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
    }, 4000);
  }
});

// =======================================
// 2) MOBILE PANEL SCROLL BEHAVIOR
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const leftPane = document.querySelector(".left");
  const rightPane = document.querySelector(".right");
  const body = document.body;
  const MOBILE_MAX = 880;

  // if we don't have the layout, or we're on desktop, stop here
  if (!leftPane || !rightPane) return;
  if (window.innerWidth > MOBILE_MAX) return;

  // ===== INITIAL STATE (IMPORTANT) =====
  // we force the menu to be on top and visible
  leftPane.classList.remove("hide-on-scroll");
  leftPane.classList.add("show-on-load");
  leftPane.style.zIndex = "2000";

  // right panel always behind on mobile
  rightPane.style.zIndex = "1000";

  // home page: image should not scroll
  if (body.classList.contains("home")) {
    rightPane.classList.add("lock-scroll");
  }

  // state
  let isLeftVisible = true;
  let lastScrollTop = 0;
  let touchStartY = 0;
  const threshold = 20;

  // helper functions
  const showLeft = () => {
   leftPane.classList.remove("hide-on-scroll");
   isLeftVisible = true;

   if (body.classList.contains("cv")) {
    rightPane.classList.add("lock-scroll");
    rightPane.scrollTop = 0;
   }
 };

  const hideLeft = () => {
  leftPane.classList.add("hide-on-scroll");
  isLeftVisible = false;

  if (body.classList.contains("cv")) {
    rightPane.classList.remove("lock-scroll");
  }
};
  
  // ===== TOUCH HANDLERS (for phones) =====
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

      // HOME: swipe up -> hide menu, swipe down -> show menu
      if (body.classList.contains("home")) {
        if (delta < -threshold && isLeftVisible) {
          hideLeft();
        } else if (delta > threshold && !isLeftVisible) {
          showLeft();
        }
      }

      // CV: similar, but only show again when at top
      if (body.classList.contains("cv")) {
        const atTop = rightPane.scrollTop <= 0;

        if (delta < -threshold && isLeftVisible) {
          hideLeft(); // swipe up hides left, unlocks scroll
        } else if (delta > threshold && !isLeftVisible && atTop) {
          showLeft(); // swipe down from top shows left again
        }
      }
    },
    { passive: true }
  );

  // ===== SCROLL HANDLER (for mousewheel / inertia) =====
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // HOME
      if (body.classList.contains("home")) {
        if (scrollTop > lastScrollTop + threshold && isLeftVisible) {
          hideLeft();
        } else if (scrollTop < lastScrollTop - threshold && !isLeftVisible) {
          showLeft();
        }
        // always keep image fixed on home
        rightPane.classList.add("lock-scroll");
      }

      // CV
      if (body.classList.contains("cv")) {
        const atTop = rightPane.scrollTop <= 0;
        if (scrollTop > lastScrollTop + threshold && isLeftVisible) {
          hideLeft();
        } else if (
          scrollTop < lastScrollTop - threshold &&
          !isLeftVisible &&
          atTop
        ) {
          showLeft();
        }
      }

      lastScrollTop = Math.max(scrollTop, 0);
    },
    { passive: true }
  );

  // ===== RESIZE SAFETY (back to desktop) =====
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_MAX) {
      leftPane.classList.remove("hide-on-scroll", "show-on-load");
      rightPane.classList.remove("lock-scroll");
    }
  });
});

