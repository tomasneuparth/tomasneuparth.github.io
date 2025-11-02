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

  if (window.innerWidth <= 880 && leftPane) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop + 10) {
        leftPane.classList.add("hidden");
      } else if (scrollTop < lastScrollTop - 10 && scrollTop <= 0) {
        leftPane.classList.remove("hidden");
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }
});

