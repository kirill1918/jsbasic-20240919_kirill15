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
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.appendChild(step);
    }

    this.Slide();
    this.pointerDown();
  }

  Slide() {
    this.thumb = this.slider.querySelector('.slider__thumb');
    this.progress = this.slider.querySelector('.slider__progress');

    this.slider.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let value = Math.round(leftRelative * segments);
      let valuePercents = (value / segments) * 100;

      this.thumb.style.left = `${valuePercents}%`;
      this.progress.style.width = `${valuePercents}%`;
      this.value = value;
      this.slider.querySelector('.slider__value').textContent = this.value;

      const steps = this.slider.querySelectorAll('.slider__steps span');
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.toggle('slider__step-active', i === this.value);
      }
      this.dispatchSlider();
    });
  }

  pointerDown() {
    this.thumb = this.slider.querySelector('.slider__thumb');
    this.progress = this.slider.querySelector('.slider__progress');
    this.thumb.ondragstart = () => false;

    this.thumb.style.position = 'absolute';
    this.thumb.style.zIndex = 9999;

    this.pointermoveHandler = this.pointerMove.bind(this);
    this.pointerupHandler = this.pointerUp.bind(this);

    this.thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();

      
      const thumbRect = this.thumb.getBoundingClientRect();
      const sliderRect = this.slider.getBoundingClientRect();

      
      this.shiftX = event.clientX - thumbRect.left;

      this.slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', this.pointermoveHandler);
      document.addEventListener('pointerup', this.pointerupHandler);
    });
  }

  pointerMove(event) {
    const sliderRect = this.slider.getBoundingClientRect();
    let left = event.clientX - sliderRect.left - this.shiftX;

    
    if (left < 0) left = 0;
    if (left > this.slider.offsetWidth) left = this.slider.offsetWidth;

    
    const leftPercents = (left / this.slider.offsetWidth) * 100;

    
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    
    const segments = this.steps - 1;
    const value = Math.round((leftPercents / 100) * segments);

    
    if (!isNaN(value) && this.value !== value) {
      this.value = value;
      this.slider.querySelector('.slider__value').textContent = this.value;

      // Обновляем активные шаги
      const steps = this.slider.querySelectorAll('.slider__steps span');
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.toggle('slider__step-active', i === this.value);
      }

      this.dispatchSlider(); 
    }
  }

  pointerUp() {
    this.slider.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.pointermoveHandler);
    document.removeEventListener('pointerup', this.pointerupHandler);
  }

  dispatchSlider() {
    console.log('Event dispatched:', this.value); // Для отладки
    this.slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  get elem() {
    return this.slider;
  }
}





