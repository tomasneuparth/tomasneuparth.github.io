// Carousel logic (unchanged)
const slides = document.querySelectorAll('.carousel img');
let idx = 0;
setInterval(() => {
  slides[idx].classList.remove('active');
  idx = (idx + 1) % slides.length;
  slides[idx].classList.add('active');
}, 4000);

// Mobile left-pane hide/show on scroll direction
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const leftPane = document.querySelector(".left");
  const rightPane = document.querySelector(".right");
  const body = document.body;

  if (window.innerWidth <= 880 && leftPane) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // === HOME PAGE BEHAVIOR ===
      if (body.classList.contains("home")) {
        if (scrollTop > lastScrollTop + 10) {
          leftPane.classList.add("hide-on-scroll");
        } else if (scrollTop < lastScrollTop - 10) {
          leftPane.classList.remove("hide-on-scroll");
        }

        // prevent any scroll effects on right panel (image)
        if (rightPane) {
          rightPane.classList.add("lock-scroll");
        }
      }

      // === CV PAGE BEHAVIOR ===
      else if (body.classList.contains("cv")) {
        if (scrollTop > lastScrollTop + 10) {
          leftPane.classList.add("hide-on-scroll");
          if (rightPane) {
            rightPane.classList.remove("lock-scroll"); // allow scroll
          }
        } else if (scrollTop <= 0) {
          leftPane.classList.remove("hide-on-scroll");
          if (rightPane) {
            rightPane.classList.add("lock-scroll"); // lock scroll again
          }
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }
});
