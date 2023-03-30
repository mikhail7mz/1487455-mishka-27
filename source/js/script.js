// Menu for the mobile version

const navigationToggle = document.querySelector('.header__navigation-toggle');
const navigationBody = document.querySelector('.header__navigation-list');

document.querySelector(".header__navigation--no-js").classList.remove("header__navigation--no-js");

navigationToggle.addEventListener('click', (e) => {
  e.preventDefault();

  navigationToggle.classList.toggle('header__navigation-toggle--close');
  navigationBody.classList.toggle('header__navigation-list--opened');
});
