const navigationToggle = document.querySelector('.header__navigation-toggle');
const navigationBody = document.querySelector('.header__navigation-list');
const noJsElement = document.querySelector(".header__navigation--no-js");

const onNavigationToggleClick = (e) => {
  e.preventDefault();
  navigationToggle.classList.toggle('header__navigation-toggle--close');
  navigationBody.classList.toggle('header__navigation-list--opened');
}


const initHeader = () => {
  noJsElement.classList.remove("header__navigation--no-js");
  navigationToggle.addEventListener('click', onNavigationToggleClick);
}

export {initHeader}
