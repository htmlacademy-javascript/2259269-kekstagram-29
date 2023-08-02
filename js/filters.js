const effects = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 0,
    unit: ''
  },
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};
const modalElement = document.querySelector('.img-upload__form');
const effectsListElement = modalElement.querySelector('.effects__list');
const imagePreviewElement = modalElement.querySelector('.img-upload__preview img');
const sliderContainer = modalElement.querySelector('.img-upload__effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderElementValue = modalElement.querySelector('.effect-level__value');

const showSlider = () => sliderContainer.classList.remove('hidden');
const hideSlider = () => sliderContainer.classList.add('hidden');

const resetEffects = () => {
  sliderElementValue.value = effects.none.max;
  imagePreviewElement.className = `effects__preview--${effects.none.name}`;
  imagePreviewElement.style.filter = `${effects.none.name}`;
};
const changeSliderEffect = (effect) => {
  if (effect.name === effects.none.name) {
    resetEffects();
    return;
  }
  showSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });
};
const changeEffectPreview = (evt) => {
  if (evt.target.value === effects.none.name) {
    hideSlider();
  }
  imagePreviewElement.className = `effects__preview--${evt.target.value}`;
  changeSliderEffect(effects[evt.target.value]);
};
const changeValueEffect = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  const checkedEffects = effectsListElement.querySelector('.effects__radio:checked');
  const effectName = effects[checkedEffects.value].name;
  const effectUnit = effects[checkedEffects.value].unit;
  imagePreviewElement.style.filter = `${effectName}(${sliderValue}${effectUnit})`;
  sliderElementValue.value = sliderValue;
};
const addSliderEffect = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: effects.none.min,
      max: effects.none.max,
    },
    start: effects.none.max,
    step: effects.none.step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });
  hideSlider();
  sliderElement.noUiSlider.on('update', changeValueEffect);
};
const addEventsEffects = () => {
  effectsListElement.addEventListener('change', changeEffectPreview);
  addSliderEffect();
};

const removeEventsEffects = () => {
  resetEffects();
  effectsListElement.removeEventListener('change', changeEffectPreview);
  if (!sliderContainer.classList.contains('hidden')) {
    hideSlider();
  }
  sliderElement.noUiSlider.destroy();
};

export { addEventsEffects, removeEventsEffects };
