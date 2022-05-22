const reviews = document.querySelectorAll(".review-content");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const btns= document.querySelectorAll(".btn")
let currentSlide = 0;

// window.addEventListener("click", changeReview);
// prev.addEventListener("click", changeReview)
// next.addEventListener("click", changeReview)
btns.forEach((btn) => btn.addEventListener("click", changeReview))


function changeReview(e) {
    let target = e.target
    console.log(target)
    if(target.classList.contains("btn") && target.classList.contains("prev")) {
        currentSlide--;
        if(currentSlide < 0) {currentSlide = reviews.length - 1}
        showSlide()
    } else if (target.classList.contains("btn") && target.classList.contains("next")){
        currentSlide++;
        if(currentSlide > reviews.length - 1) {currentSlide = 0}
        showSlide()
    } 
}

function showSlide() {
    reviews.forEach((review) => {
        review.classList.remove("active-review")
    })
    reviews[currentSlide].classList.add("active-review")
}
