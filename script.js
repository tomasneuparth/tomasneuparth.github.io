document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const body = document.body;

  // Run only on mobile home page
  if (!left || !body.classList.contains("home") || window.innerWidth > 880) return;

  let lastY = 0;
  let startY = 0;
  let isVisible = true;
  const TH = 25; // scroll threshold

  const showLeft = () => { left.classList.remove("hide-on-scroll"); isVisible = true; };
  const hideLeft = () => { left.classList.add("hide-on-scroll"); isVisible = false; };

  // --- Touch gestures ---
  window.addEventListener("touchstart", e => (startY = e.touches[0].clientY), { passive: true });
  window.addEventListener("touchmove", e => {
    const delta = e.touches[0].clientY - startY;
    if (delta < -TH && isVisible) hideLeft();       // swipe up → hide
    else if (delta > TH && !isVisible) showLeft();  // swipe down → show
  }, { passive: true });

  // --- Wheel / inertia scroll ---
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > lastY + TH && isVisible) hideLeft();       // scroll down → hide
    else if (y < lastY - TH && !isVisible) showLeft(); // scroll up → show
    lastY = Math.max(y, 0);
  }, { passive: true });
});
