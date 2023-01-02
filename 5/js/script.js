let pagelist = document.querySelector('.page-list');
let userlist = document.querySelector('.user-list');

let toggle = document.querySelector('.main-navigation__toggle');
let opened = document.querySelector('.main-navigation__toggle--closed')

toggle.onclick = function() {
  pagelist.classList.toggle('hidden');
  userlist.classList.toggle('hidden');
  opened.classList.toggle('main-navigation__toggle--opened');
}
