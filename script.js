const images = document.querySelectorAll(".carousel-image");
let current = 0;

setInterval(() => {
  images[current].classList.add("hidden");
  current = (current + 1) % images.length;
  images[current].classList.remove("hidden");
}, 3000); // change image every 3 seconds

