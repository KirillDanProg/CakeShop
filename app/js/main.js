const reviews = document.querySelectorAll(".review-content");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const btns = document.querySelectorAll(".btn");
const banner = document.querySelector(".banner-img");
const bannerSlides = document.querySelectorAll(".banner-img img");
const bannerBtns = document.querySelectorAll(".btn-banner");


let currentSlide = 0;
let index = 0;
let isPlaying = true;
let intervalID = null;

next.addEventListener("click", nextBanner);
prev.addEventListener("click", prevBanner);
btns.forEach((btn) => btn.addEventListener("click", changeReview));
banner.addEventListener("transitionend", transitioтFunc);

startSlider()

function transitioтFunc() {
  if (index / 100 > bannerSlides.length - 2) {
    banner.style.transition = "none";
    index = 100;
    banner.style.transform = `translate(-${index}%)`;
  }
  if (index === 0) {
    banner.style.transition = "none";
    index = 400;
    banner.style.transform = `translate(-${index}%)`;
  }
}

function changeReview(e) {
  let target = e.target;
  if (target.classList.contains("btn") && target.classList.contains("prev")) {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = reviews.length - 1;
    }
    showSlide();
  } else if (
    target.classList.contains("btn") &&
    target.classList.contains("next")
  ) {
    currentSlide++;
    if (currentSlide > reviews.length - 1) {
      currentSlide = 0;
    }
    showSlide();
  }
}

function showSlide() {
  reviews.forEach((review) => {
    review.classList.remove("active-review");
  });
  reviews[currentSlide].classList.add("active-review");
}

function nextBanner() {
  index += 100;
  if (index / 100 > bannerSlides.length - 1) {
    index = 0;
  }
  banner.style.transition = "1s";
  banner.style.transform = `translate(-${index}%)`;
}
function prevBanner() {
  index -= 100;
  if (index < 0) {
    index = (bannerSlides.length - 2) * 100;
  }
  banner.style.transition = "1s";
  banner.style.transform = `translate(-${index}%)`;
}


bannerBtns.forEach((bannerBtn) => {
  bannerBtn.addEventListener("click", stopSlider);
});

function stopSlider() {
  isPlaying = false;
  clearInterval(intervalID);
}

function startSlider() {
  if (isPlaying) {
    intervalID = setInterval(() => {
      nextBanner();
    }, 1900);
  }
}

