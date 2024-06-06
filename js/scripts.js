// import "./style.css";
// import product from "/product.json"
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let slideInterval;

function moveSlide(n) {
  currentSlide = (currentSlide + n + totalSlides) % totalSlides;
  updateSlides();
}

function updateSlides() {
  const slideWidth = slides[0].clientWidth;
  const newTransform = -currentSlide * slideWidth;
  document.querySelector(
    ".slides"
  ).style.transform = `translateX(${newTransform}px)`;
}

function autoSlide() {
  moveSlide(1);
}

function startSlideShow() {
  slideInterval = setInterval(autoSlide, 3000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

// Start the slideshow
startSlideShow();

// Stop the slideshow on mouse over and resume on mouse out
const slider = document.getElementById("slider");
slider.addEventListener("mouseover", stopSlideShow);
slider.addEventListener("mouseout", startSlideShow);

// Initialize slider
updateSlides();
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
});

function openModal() {
  document.getElementById("loginModal").style.display = "block";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

function openRegisterModal() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

// Add a function to close the login modal if needed (can be similar to closeRegisterModal)
function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}
