// Carousel logic (unchanged)
const slides = document.querySelectorAll('.carousel img');
let idx = 0;
setInterval(() => {
  slides[idx].classList.remove('active');
  idx = (idx + 1) % slides.length;
  slides[idx].classList.add('active');
}, 4000);

// Scroll-hide logic for left pane (mobile only)
let lastScrollTop = 0;
const leftPane = document.querySelector('.left');

window.addEventListener("scroll", function () {
  if (window.innerWidth <= 768 && leftPane) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop + 10) {
      leftPane.classList.add('hidden');
    } else if (scrollTop < lastScrollTop - 10) {
      leftPane.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}, { passive: true });
