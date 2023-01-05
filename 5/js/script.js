const pagelistElement = document.querySelector('.page-list');
const userlistElement = document.querySelector('.user-list');
const togglerElement = document.querySelector('.main-navigation__toggle');
pagelistElement.classList.add('page-list--closed', 'page-list--opened');
userlistElement.classList.add('user-list--closed', 'user-list--opened');
togglerElement.classList.add('main-navigation__toggle--closed');
togglerElement.classList.remove('main-navigation__toggle--nojs');

togglerElement.addEventListener('click', () => {
  pagelistElement.classList.toggle('page-list--closed');
  userlistElement.classList.toggle('user-list--closed');
  togglerElement.classList.toggle('main-navigation__toggle--opened');
});

const shoosebuttonElement = document.querySelector('.product-card__button');
const modalElement = document.querySelector('.modal');

shoosebuttonElement.addEventListener('click', () => {
  modalElement.classList.toggle('hidden');
});
