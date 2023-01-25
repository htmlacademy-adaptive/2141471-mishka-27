const mainnavElement = document.querySelector('.main-navigation');
const pagelistElement = document.querySelector('.page-list');
const userlistElement = document.querySelector('.user-list');
const togglerElement = document.querySelector('.main-navigation__toggle');
const pagemainElement = document.querySelector('.page__main');
mainnavElement.classList.remove('main-navigation--nojs');
pagemainElement.classList.remove('page__main--nojs');
pagelistElement.classList.add('page-list--closed', 'page-list--opened');
userlistElement.classList.add('user-list--closed', 'user-list--opened');
togglerElement.classList.add('main-navigation__toggle--closed');
togglerElement.classList.remove('main-navigation__toggle--nojs');

togglerElement.addEventListener('click', () => {
  pagelistElement.classList.toggle('page-list--closed');
  userlistElement.classList.toggle('user-list--closed');
  togglerElement.classList.toggle('main-navigation__toggle--opened');
});

/* Modal */
const modalElement = document.querySelector(".modal");
const modalOpeners = document.querySelectorAll(
  ".product-card__button, .price-block__link"
);

modalOpeners.forEach((opener) => {
  opener.addEventListener("click", () => {
    modalElement.classList.toggle("hidden");
  });
});
