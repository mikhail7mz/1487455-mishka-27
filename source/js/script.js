// Menu for the mobile version

const navigationToggle = document.querySelector('.header__navigation-toggle');
const navigationBody = document.querySelector('.header__navigation-list');

document.querySelector(".header__navigation--no-js").classList.remove("header__navigation--no-js");

navigationToggle.addEventListener('click', (e) => {
  e.preventDefault();

  navigationToggle.classList.toggle('header__navigation-toggle--close');
  navigationBody.classList.toggle('header__navigation-list--opened');
});

// Modal windows

let modalButtons = document.querySelectorAll('.js-modal-open');
let overlay      = document.querySelector('.layout__modal-overlay');
let closeButtons = document.querySelectorAll('.js-modal-close');

/* открытие окон. */
modalButtons.forEach(function(item){
  item.addEventListener('click', function(e) {
    e.preventDefault();

    let modalId = this.getAttribute('data-modal');
    let productId = this.getAttribute('data-product-id');
    let modalElem = document.querySelector(`.layout__modal[data-modal="${modalId}"]`);
    let inputProductId = modalElem.querySelector('input[name="product-id"]');
    inputProductId.value = productId;

    modalElem.classList.add('layout__modal-active');
    overlay.classList.add('layout__modal-active');
  }); // end click
}); // end foreach

/* закрытие окон */
closeButtons.forEach(function(item){
  item.addEventListener('click', function(e) {
    this.closest('.layout__modal').classList.remove('layout__modal-active');
    overlay.classList.remove('layout__modal-active');
  });
}); // end foreach

/* закрытие по ESC */
document.body.addEventListener('keydown', function(e) {
  if (e.keyCode == 27) {
    document.querySelector('.layout__modal.modal-active').classList.remove('layout__modal-active');
    document.querySelector('.layout__modal-overlay.modal-active').classList.remove('layout__modal-active');
  };
}, false);

/* скрытие окна при клике на подложку */
overlay.addEventListener('click', function() {
  document.querySelector('.layout__modal.layout__modal-active').classList.remove('layout__modal-active');
  this.classList.remove('layout__modal-active');
});
