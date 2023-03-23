// Menu for the mobile version

const navigationToggle = document.querySelector('.navigation__toggle');
const navigationBody = document.querySelector('.navigation__body');

document.querySelector(".navigation--no-js").classList.remove("navigation--no-js");

navigationToggle.addEventListener('click', (e) => {
  e.preventDefault();

  navigationToggle.classList.toggle('navigation__toggle--close');
  navigationBody.classList.toggle('navigation__body--opened');
});
