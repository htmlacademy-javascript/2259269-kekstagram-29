import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const RANDOM_PICTURES_COUNT = 10;

const sortingSection = document.querySelector('.img-filters');
const sortButtons = sortingSection.querySelectorAll('.img-filters__button');
const sortByRandomButton = sortingSection.querySelector('#filter-random');
const sortByCommentsButton = sortingSection.querySelector('#filter-discussed');

const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (postOne, postTwo) => postTwo.comments.length - postOne.comments.length;

const showSortingSection = () => sortingSection.classList.remove('img-filters--inactive');

const updateThumbnails = (targetElement, thumbnails) => {
  const copyThumbnails = thumbnails.slice();
  let sortedThumbnails = [];

  switch (targetElement) {
    case sortByRandomButton:
      copyThumbnails.sort(sortRandomly);
      sortedThumbnails = copyThumbnails.slice(0, RANDOM_PICTURES_COUNT);
      return renderThumbnails(sortedThumbnails);

    case sortByCommentsButton:
      sortedThumbnails = copyThumbnails.sort(sortByComments);
      return renderThumbnails(sortedThumbnails);

    default:
      return renderThumbnails(thumbnails);
  }
};

const renderThumbnailsWithDelay = debounce((targetElement, thumbnails) => updateThumbnails(targetElement, thumbnails));

const onSortingButtonClick = (evt, thumbnails) => {
  const sortButton = evt.target;

  sortButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  sortButton.classList.add('img-filters__button--active');

  renderThumbnailsWithDelay(sortButton, thumbnails);
};

const setDebouncedSorting = (thumbnails) => sortButtons.forEach((sortButton) =>
  sortButton.addEventListener('click', (evt) => onSortingButtonClick(evt, thumbnails)));

export { showSortingSection, setDebouncedSorting };
