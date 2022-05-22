const reviews = document.querySelectorAll(".review-content");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const btns = document.querySelectorAll(".btn");
const banner = document.querySelector(".banner-img");
const bannerSlides = document.querySelectorAll(".banner-img img")
let currentSlide = 0;
let index = 0;
let isPlaying = true;

next.addEventListener("click", nextBanner);
prev.addEventListener("click", prevBanner)
btns.forEach((btn) => btn.addEventListener("click", changeReview));

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
    // isPlaying = false;
    index -= 100;
  if (index < 0) {
    index = (bannerSlides.length - 2) * 100;
  }
  banner.style.transition = "1s";
  banner.style.transform = `translate(-${index}%)`;
}

banner.addEventListener("transitionend", () => {
    if(index / 100 > bannerSlides.length - 2) {
        banner.style.transition = "none";
        index = 100;
        banner.style.transform = `translate(-${index}%)`;
    }
    if(index === 0) {
        banner.style.transition = "none";
        index = 400;
        banner.style.transform = `translate(-${index}%)`
    }
})
if(isPlaying) {
    let intervalID = setInterval(() => {
        nextBanner()
    }, 1900)
}



// TRANSFORM TRANSLATE VARIANT
// btnNext.addEventListener("click", () => {
//   index += 100;
//   if (index / 100 > slide.length - 1) {
//     index = 0;
//   }
//   container.style.transform = `translate(-${index}%)`;
// });

// btnPrev.addEventListener("click", () => {
//   if (index === 0) {
//     index = slide.length * 100;
//   }
//   index -= 100;
//   container.style.transform = `translate(-${Math.abs(index)}%)`;
// });

// function activeSlide(n) {
//   for(let slide of slides) {
//     slide.classList.remove('active');
//   }
//   slides[n].classList.add('active');
// }

// btnNext.addEventListener('click', (function () {
//   let index = 0
//   return function () {
//     if(index == slides.length - 1){
//       index = 0;
//       activeSlide(index)
//     } else {
//       index++;
//       activeSlide(index)
//     }
//   }
// })());

// btnPrev.addEventListener('click', (function () {
//   index = 0
//   return function () {
//     if(index === 0) {
//       index = slides.length - 1
//       activeSlide(index)
//     } else {
//       index--;
//       activeSlide(index)
//     }
//   }
// })()
// );
