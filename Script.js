let currentSlide = 0; // mulai dari slide pertama (index 0)
const totalSlides = 3; // total slide (0, 1, 2)

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
