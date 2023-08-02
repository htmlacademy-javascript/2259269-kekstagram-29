import { showBigPicture } from './big-picture-viewer.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const removeThumbnails = () => document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  removeThumbnails();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);

    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
    });

    fragment.append(thumbnail);
  });

  thumbnailsContainer.append(fragment);
};

export { renderThumbnails };
