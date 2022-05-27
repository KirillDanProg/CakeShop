// scroll to
const links = document.querySelectorAll(".list__item");
const takeOrderLinks = document.querySelectorAll(".take-order");

links.forEach((link) => {
  link.childNodes[0].addEventListener("click", smoothScroll);
});
takeOrderLinks.forEach((takeOrderLink) => {
  takeOrderLink.addEventListener("click", smoothScroll);
});

function smoothScroll(e) {
  e.preventDefault();
  const id = e.currentTarget.getAttribute("href").slice(1);
  const elem = document.getElementById(id);
  const header = document.querySelector(".header");
  const headerHeight = header.getBoundingClientRect().height;
  const position = elem.offsetTop - headerHeight;
  window.scrollTo({
    top: position,
    left: 0,
  });
}
export { links, smoothScroll };
