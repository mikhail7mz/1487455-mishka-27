// Modal windows
const openButtons = document.querySelectorAll('.js-modal-open');
const closeButtons = document.querySelectorAll('.js-modal-close');
const overlay      = document.querySelector('.layout__modal-overlay');

let modalElem = null;

const onOpenButtonClick = (e) => {
  e.preventDefault();

  const modalId = e.target.getAttribute('data-modal');
  const productId = e.target.getAttribute('data-product-id');
  modalElem = document.querySelector(`.layout__modal[data-modal="${modalId}"]`);
  const inputProductId = modalElem.querySelector('input[name="product-id"]');
  inputProductId.value = productId;

  openModal();
};

const onCloseButtonClick = (e) => {
  e.preventDefault();
  closeModal();
};

const onDocumentKeydown = (e) => {
  if (e.keyCode == 27) {
    closeModal();
  };
};

const onOverlayClick = () => closeModal();

function openModal () {
  modalElem.classList.add('layout__modal-active');
  overlay.classList.add('layout__modal-active');

  document.body.addEventListener('keydown', onDocumentKeydown, false); // закрытие по ESC
  overlay.addEventListener('click', onOverlayClick); // скрытие окна при клике на подложку
};

function closeModal () {
  modalElem.classList.remove('layout__modal-active');
  overlay.classList.remove('layout__modal-active');

  document.body.removeEventListener('keydown', onDocumentKeydown, false); // закрытие по ESC
  overlay.removeEventListener('click', onOverlayClick); // скрытие окна при клике на подложку
};

const initModals = () => {
  openButtons.forEach((item) => item.addEventListener('click', onOpenButtonClick)); // открытие окон
  closeButtons.forEach((item) => item.addEventListener('click', onCloseButtonClick)); // закрытие окон
}

export {initModals};
