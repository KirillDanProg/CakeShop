const menuItems = document.querySelectorAll(".menu__item");
const body = document.querySelector("body");
const header = document.querySelector(".header");
let active = null;

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", showModal);
});

function showModal(e) {
  // vars for modal info
  let target = e.currentTarget;
  let testTarget = e.target
  let modalImg = target.children[0].lastElementChild.getAttribute("src");
  let modalName = target.children[2].innerHTML;
  let modalPrice = target.children[3].innerHTML;

  if (
    target.classList.contains("menu__item") && !testTarget.classList.contains("take-order")
  ) {
    console.log(testTarget)
    e.preventDefault();
    header.innerHTML += createModal(modalImg, modalName, modalPrice);
    // vars in modal window
    const modal = document.querySelector(".modal");
    const modalCont = document.querySelector(".modal-container")
    const closeBtn = document.querySelector(".close-btn");
    const makeOrder = document.querySelector(".make-order");
    // to activate modal
    modal.classList.add("active-modal");
    modalCont.classList.add("active-modal-2")
    // to diactivate modal
    active = true;

    makeOrder.addEventListener("click", () => {
      scrollWindow()
    })
    closeBtn.addEventListener("click", () => {
     scrollWindow()
    });
  }
  if(active) {
    document.body.style.overflow = "hidden"
  } 
}

function scrollWindow() {
  active = false
  header.lastElementChild.remove();
  if(!active) {
    document.body.style.overflow = "auto"
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
      <a class="make-order" href="#order">Заказать</a>
    </div>
  </section>
    `;
}


export {menuItems, body, header, active, showModal, scrollWindow, createModal}