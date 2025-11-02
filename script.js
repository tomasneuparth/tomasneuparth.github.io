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
  const leftPane = document.querySelector(".left");
  let lastScrollY = window.pageYOffset;

  function onScroll() {
    if (window.innerWidth > 880 || !leftPane) return;

    const currentScrollY = window.pageYOffset;

    if (currentScrollY > lastScrollY + 5) {
      // Scrolling down
      leftPane.classList.add("hide-on-scroll");
    } else if (currentScrollY === 0) {
      // At top of page: reveal
      leftPane.classList.remove("hide-on-scroll");
    }

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
});


