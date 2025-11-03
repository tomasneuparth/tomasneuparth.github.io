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

  if (!leftPane || !rightPane) return;
  if (window.innerWidth > MOBILE_MAX) return;

  // ===== INITIAL STATE =====
  leftPane.classList.remove("hide-on-scroll");
  leftPane.classList.add("show-on-load");
  leftPane.style.left = "0"; // ensure visible on load
  leftPane.style.zIndex = "10";
  rightPane.style.zIndex = "0";

  if (body.classList.contains("home")) {
    rightPane.classList.add("lock-scroll"); // image static on home
  }

  // ===== STATE VARIABLES =====
  let isLeftVisible = true;
  let lastScrollTop = 0;
  let touchStartY = 0;
  const threshold = 20; // scroll threshold

  // ===== HELPER FUNCTIONS =====
  const showLeft = () => {
    leftPane.classList.remove("hide-on-scroll");
    leftPane.style.left = "0";
    isLeftVisible = true;

    if (body.classList.contains("cv")) {
      rightPane.classList.add("lock-scroll");
      rightPane.scrollTop = 0;
    }
  };

  const hideLeft = () => {
    leftPane.classList.add("hide-on-scroll");
    leftPane.style.left = "-100%";
    isLeftVisible = false;

    if (body.classList.contains("cv")) {
      rightPane.classList.remove("lock-scroll");
    }
  };

  // ===== TOUCH HANDLERS =====
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

      // HOME: swipe up hides menu, swipe down shows it
      if (body.classList.contains("home")) {
        if (delta < -threshold && isLeftVisible) {
          hideLeft();
        } else if (delta > threshold && !isLeftVisible) {
          showLeft();
        }
      }

      // CV: swipe up hides menu and unlocks scroll, swipe down (from top) shows it
      if (body.classList.contains("cv")) {
        const atTop = rightPane.scrollTop <= 0;
        if (delta < -threshold && isLeftVisible) {
          hideLeft(); // hide left, allow scrolling
          rightPane.classList.remove("lock-scroll");
        } else if (delta > threshold && !isLeftVisible && atTop) {
          showLeft(); // show left only when scrolled to top
          rightPane.classList.add("lock-scroll");
        }
      }
    },
    { passive: true }
  );

  // ===== SCROLL HANDLER (mousewheel / inertia) =====
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
        rightPane.classList.add("lock-scroll"); // keep image static
      }

      // CV
      if (body.classList.contains("cv")) {
        const atTop = rightPane.scrollTop <= 0;

        if (scrollTop > lastScrollTop + threshold && isLeftVisible) {
          hideLeft();
          rightPane.classList.remove("lock-scroll");
        } else if (
          scrollTop < lastScrollTop - threshold &&
          !isLeftVisible &&
          atTop
        ) {
          showLeft();
          rightPane.classList.add("lock-scroll");
        }
      }

      lastScrollTop = Math.max(scrollTop, 0);
    },
    { passive: true }
  );

  // ===== RESIZE SAFETY =====
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_MAX) {
      leftPane.classList.remove("hide-on-scroll", "show-on-load");
      leftPane.style.left = "0";
      rightPane.classList.remove("lock-scroll");
    }
  });
});


