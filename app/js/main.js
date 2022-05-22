const reviews = document.querySelectorAll(".review-content");
let currentSlide = 0;

window.addEventListener("click", changeReview);
// window.addEventListener("touchend", changeReview)

function changeReview(e) {
    let target = e.target
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
