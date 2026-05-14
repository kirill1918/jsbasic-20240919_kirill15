import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = createElement(`<div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>`);

    const sliderSteps = this.slider.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      step.setAttribute('data-id', i); 
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.appendChild(step);
    }

    
    this.updatePosition();

    this.Slide();
    this.pointerDown();
  }

  updatePosition() {
    const segments = Math.max(this.steps - 1, 1); 
    const valuePercents = (this.value / segments) * 100;

    this.thumb = this.slider.querySelector('.slider__thumb');
    this.progress = this.slider.querySelector('.slider__progress');

    if (this.thumb && this.progress) {
      this.thumb.style.left = `${valuePercents}%`;
      this.progress.style.width = `${valuePercents}%`;
    }
  }

  Slide() {
    this.thumb = this.slider.querySelector('.slider__thumb');
    this.progress = this.slider.querySelector('.slider__progress');

    this.slider.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) leftRelative = 0;
      if (leftRelative > 1) leftRelative = 1;

      let segments = Math.max(this.steps - 1, 1);
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      this.value = value;

      let valuePercents = (value / segments) * 100;

      this.thumb.style.left = `${valuePercents}%`;
      this.progress.style.width = `${valuePercents}%`;

      this.slider.querySelector('.slider__value').textContent = this.value;

      this.updateActiveStep(this.value);

      this.dispatchEventBubble();
    });
  }

  pointerDown() {
  this.thumb = this.slider.querySelector('.slider__thumb');
  this.progress = this.slider.querySelector('.slider__progress');
  this.thumb.ondragstart = () => false;

  
  this.thumb.style.position = 'absolute';
  this.thumb.style.zIndex = 9999;

  this.thumb.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    
    this.shiftX = event.clientX - this.thumb.getBoundingClientRect().left;
    this.slider.classList.add('slider_dragging');

    const onMove = (moveEvent) => {
      moveEvent.preventDefault();
      this.pointerMove(moveEvent);
    };

    const onUp = () => {
      this.pointerUp();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
}

pointerMove(event) {
  
  let left = event.clientX - this.elem.getBoundingClientRect().left - this.shiftX;
  let leftRelative = left / this.elem.offsetWidth;

  
  if (leftRelative < 0) leftRelative = 0;
  if (leftRelative > 1) leftRelative = 1;

  
  let leftPercents = leftRelative * 100;

  
  this.thumb.style.left = `${leftPercents}%`;
  this.progress.style.width = `${leftPercents}%`;

  
  let segments = Math.max(this.steps - 1, 1);
  let approximateValue = leftRelative * segments;
  let value = Math.round(approximateValue);

  
  if (this.value !== value) {
    this.value = value;
    this.slider.querySelector('.slider__value').textContent = this.value;
    this.updateActiveStep(this.value);
  }
}

pointerUp() {
  this.slider.classList.remove('slider_dragging');
  this.dispatchEventBubble();
}

  updateActiveStep(value) {
    const steps = this.slider.querySelectorAll('.slider__steps span');
    steps.forEach(step => step.classList.remove('slider__step-active'));
    steps[value].classList.add('slider__step-active');
  }

  dispatchEventBubble() {
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.slider.dispatchEvent(customEvent);
  }

  get elem() {
    return this.slider;
  }
}





