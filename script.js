document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const body = document.body;

  if (!left || !body.classList.contains("home") || window.innerWidth > 880) return;

  let isVisible = true;
  let lastY = 0;
  let startY = 0;
  const TH = 20; // scroll threshold

  const show = () => { left.classList.remove("hide-on-scroll"); isVisible = true; };
  const hide = () => { left.classList.add("hide-on-scroll"); isVisible = false; };

  // Touch controls
  window.addEventListener("touchstart", e => startY = e.touches[0].clientY, { passive: true });
  window.addEventListener("touchmove", e => {
    const dy = e.touches[0].clientY - startY;
    if (dy < -TH && isVisible) hide();
    else if (dy > TH && !isVisible) show();
  }, { passive: true });

  // Scroll controls (mousewheel / inertia)
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > lastY + TH && isVisible) hide();
    else if (y < lastY - TH && !isVisible) show();
    lastY = y <= 0 ? 0 : y;
  }, { passive: true });
});
