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

  if (!icon || !cardContainer) return;

  // Инициализируем this.elementTop, если не установлено
  if (this.elementTop === undefined) {
    this.elementTop = cardContainer.getBoundingClientRect().top + window.pageYOffset;
  }

  const pageWidth = document.documentElement.clientWidth; // Без учёта скроллбара
  const rightEdgeOfContainer = cardContainer.getBoundingClientRect().right;

  // Корректное условие: пользователь прокрутил ниже начальной позиции элемента
  const isScrolledPastElement = window.scrollY > this.elementTop;


  if (pageWidth <= 767) {
    Object.assign(icon.style, {
      position: 'absolute',
      top: '',
      left: '',
      zIndex: '',
      width: '',
      height: ''
    });
  } else if (!isScrolledPastElement) {
    // Пользователь ещё не доскроллил до элемента — сбрасываем фиксированное позиционирование
    Object.assign(icon.style, {
      position: 'absolute',
      top: '',
      left: '',
      zIndex: '',
      width: '',
      height: ''
    });
  } else if (pageWidth - (rightEdgeOfContainer + 20) - icon.offsetWidth < 10) {
    // Места справа от контейнера недостаточно — прижимаем к правому краю с отступом 10 px
    Object.assign(icon.style, {
      position: 'fixed',
      top: '50px',
      left: `${pageWidth - icon.offsetWidth - 10}px`,
      zIndex: 1000,
      width: `${icon.offsetWidth}px`,
      height: `${icon.offsetHeight}px`
    });
  } else {
    // Достаточно места — размещаем на 20 px правее правого края контейнера
    Object.assign(icon.style, {
      position: 'fixed',
      top: '50px',
      left: `${rightEdgeOfContainer + 20}px`,
      zIndex: 1000,
      width: `${icon.offsetWidth}px`,
      height: `${icon.offsetHeight}px`
    });
  }
}
}