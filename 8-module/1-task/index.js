import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const icon = this.elem.querySelector('.cart-icon__inner');
    const cardContainer = document.querySelector('.container');

    const pageWidth = window.innerWidth;
    const initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;

    const iconPosition = cardContainer.getBoundingClientRect().right + 20;
    const iconLeftPosition = pageWidth - icon.offsetWidth - 10;
    console.log('icon' , icon.offsetWidth)
    const leftIndent = Math.min(iconPosition, iconLeftPosition) + 'px';

    if (window.innerWidth <= 767) {
      Object.assign(icon.style, {
        position: '',
        top: '',
        left: '',
        zIndex: '',
        width: '',
        height: ''
      });
      return;
    }

    if (window.pageYOffset > initialTopCoord) {
      Object.assign(icon.style, {
        position: 'fixed',
        top: '50px',
        left: leftIndent,
        zIndex: 1e3,
        width: `${icon.offsetWidth}px`,
        height: `${icon.offsetHeight}px`
      });
    } else {
      Object.assign(icon.style, {
        position: '',
        top: '',
        left: '',
        zIndex: '',
        width: '',
        height: ''
      });
    }
  }
}