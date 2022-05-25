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

// MODAL JS

const menuItems = document.querySelectorAll(".menu__item");
const body = document.querySelector("body");
const header = document.querySelector(".header");
let active = null;

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", showModal);
});

function showModal(e) {
  
  let target = e.target;
  let modalImg = target.parentNode.children[0].getAttribute("src");
  let modalName = target.parentNode.children[1].innerHTML;
  let modalPrice = target.parentNode.children[2].innerHTML;

  if (
    target.classList.contains("cake__name") ||
    target.classList.contains("cake__img")
  ) {
    e.preventDefault();
    header.innerHTML += createModal(modalImg, modalName, modalPrice);
    const modal = document.querySelector(".modal");
    modal.classList.add("active-modal");
    const closeBtn = document.querySelector(".close-btn");
    active = true;
    closeBtn.addEventListener("click", () => {
      active = false
      header.lastElementChild.remove();
      if(!active) {
        document.body.style.overflow = "auto"
      }
    });
  }

  if(active) {
    document.body.style.overflow = "hidden"
  } 
}



function createModal(img, name, price) {
  return `
    <section class="modal">
    <div class="modal-container">
      <i class="fa-solid fa-xmark close-btn"></i>
      <img src="${img}">
      <h3>${name}</h3>
      <p class="price">${price}</p>
      <h6>Состав:</h6>
      <p class="info">Яйцо, сливки животные, крем для взбивания Шантипак, сахар, крахмал кукурузный, разрыхлитель, уксус, малина, сахарная пудра.
        Без глютена.</p>
      <h6>Масса:</h6>
      <p class="info">2000кг</p>
      <h6>Энергетическая ценность:</h6>
      <p class="info">белки- 2,2 г; жиры- 9,3 г; углеводы- 34,2г / 100 г</p>
      <a href="#order">Заказать</a>
    </div>
  </section>
    `;
}
