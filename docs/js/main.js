import { links,  smoothScroll, takeOrderLinks} from "./scroll.js";
import { menuItems, body, header, active, showModal, scrollWindow, createModal } from "./modal.js";
// import { inputMask, inputTel, form } from "./inputmask.js";

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
  banner.style.transition = "0.8s";
  banner.style.transform = `translate(-${index}%)`;
}
function prevBanner() {
  index -= 100;
  if (index < 0) {
    index = (bannerSlides.length - 2) * 100;
  }
  banner.style.transition = "0.8s";
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

startSlider();




takeOrderLinks.forEach((takeOrderLink) => {
  takeOrderLink.addEventListener("click", getInputName);
});

function getInputName(e) {
  let target = e.target;
  let cakeName = target.parentNode.children[1].innerHTML;
  let inputCakeName = document.querySelector("input[name=order]");
  if (!target.classList.contains("take-order-const")) {
    inputCakeName.value = cakeName
  }
}


const form = document.querySelector("form");
const inputTel = document.querySelector("input[type=tel]");
const inputMask = new Inputmask("+7(999) 999-99-99");
inputMask.mask(inputTel);

new window.JustValidate('.form', {
    rules: {
      tel: {
        required: true,
        function: () => {
          const phone = telSelector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      }
    },
    colorWrong: '#ff0f0f',
    messages: {
      name: {
        required: 'Введите имя',
        minLength: 'Введите 3 и более символов',
        maxLength: 'Запрещено вводить более 15 символов'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Введите email'
      },
      tel: {
        required: 'Введите телефон',
        function: 'Здесь должно быть 10 символов без +7'
      }
    },
    submitHandler: function(thisForm) {
      let formData = new FormData(thisForm);
  
      let xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }
  
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
  
      thisForm.reset();
    }
  })