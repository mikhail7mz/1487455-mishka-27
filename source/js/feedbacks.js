const togglePrevElement = document.querySelector('.feedback__slider-button--prev');
const toggleNextElement = document.querySelector('.feedback__slider-button--next');

const slideElements = document.querySelectorAll('.feedback__slider-item');

const getActiveElementIndex = (NodeCollection) => Array.from(NodeCollection).findIndex((element) => element.classList.contains('active'));

const removeActiveClasses = (index) => {
  slideElements[index].classList.remove('active');
};

const addActiveClasses = (index) => {
  slideElements[index].classList.add('active');
};

const onTogglePrevElementClick = () => {
  const index = getActiveElementIndex(slideElements);

  if (index <= 0) {
    togglePrevElement.disabled = true;
    return;
  }

  toggleNextElement.disabled = false;
  removeActiveClasses(index);
  addActiveClasses(index - 1);
};

const onToggleNextElementClick = () => {
  const index = getActiveElementIndex(slideElements);

  if (index < 0 || index === slideElements.length - 1) {
    toggleNextElement.disabled = true;
    return;
  }

  togglePrevElement.disabled = false;
  removeActiveClasses(index);
  addActiveClasses(index + 1);
};

const initFeedbacks = () => {
  togglePrevElement.addEventListener('click', onTogglePrevElementClick);
  toggleNextElement.addEventListener('click', onToggleNextElementClick);
};

export {initFeedbacks};
