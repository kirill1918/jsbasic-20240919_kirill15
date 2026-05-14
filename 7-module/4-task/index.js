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
        if (i === this.value) {
          steps[i].classList.add('slider__step-active');
        } else {
          steps[i].classList.remove('slider__step-active');
        }
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

    
    if (left < 0) left = 0;
    if (left > this.elem.offsetWidth) left = this.elem.offsetWidth;

   
    const leftPercents = (left / this.elem.offsetWidth) * 100;

    
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    
    const segments = this.steps - 1;
    const value = Math.round((leftPercents / 100) * segments);

    
    if (this.value !== value) {
      this.value = value;
      this.slider.querySelector('.slider__value').textContent = this.value;

      
      const steps = this.slider.querySelectorAll('.slider__steps span');
      for (let i = 0; i < steps.length; i++) {
        if (i === this.value) {
          steps[i].classList.add('slider__step-active');
        } else {
          steps[i].classList.remove('slider__step-active');
        }
      }

      this.dispatchSlider(); 
    }
  }

  pointerUp() {
    this.slider.classList.remove('slider_dragging');
  }

  dispatchSlider() {
    console.log('Event dispatched:', this.value);
    this.slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  get elem() {
    return this.slider;
  }
}






