let currentSlide = 0;
const totalSlides = 3;

function nextSlide() {
  const carousel = document.getElementById("carousel");
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}

function prevSlide() {
  const carousel = document.getElementById("carousel");
  if (currentSlide > 0) {
    currentSlide--;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}
