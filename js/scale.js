const ScalingOptions = {
  STEP: 10,
  MIN: 0,
  MAX: 200,
  DEFAULT: 100
};


const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imagePreviewElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => scaleImage(Math.max(parseInt(scaleInputElement.value, 10) - ScalingOptions.STEP, ScalingOptions.MIN));

const onBiggerButtonClick = () => {
  scaleImage(Math.min(parseInt(scaleInputElement.value, 10) + ScalingOptions.STEP, ScalingOptions.MAX));
};

const resetScale = () => scaleImage(ScalingOptions.DEFAULT);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
