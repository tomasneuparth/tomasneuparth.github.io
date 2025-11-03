document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const body = document.body;

  if (!left || !right || window.innerWidth > 880) return;

  let isVisible = true;
  let lastY = 0;
  let startY = 0;
  const TH = 20;

  const show = () => { left.classList.remove("hide-on-scroll"); isVisible = true; };
  const hide = () => { left.classList.add("hide-on-scroll"); isVisible = false; };

  // touch
  window.addEventListener("touchstart", e => startY = e.touches[0].clientY, {passive:true});
  window.addEventListener("touchmove", e => {
    const dy = e.touches[0].clientY - startY;
    if (dy < -TH && isVisible) hide();
    else if (dy > TH && !isVisible) show();
  }, {passive:true});

  // scroll (wheel / momentum)
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > lastY + TH && isVisible) hide();
    else if (y < lastY - TH && !isVisible) show();
    lastY = y <= 0 ? 0 : y;
  }, {passive:true});
});
