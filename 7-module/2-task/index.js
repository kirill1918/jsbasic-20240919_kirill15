import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.container = createElement(`<div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>`);
  }

  open(body = document.body) { 
    body.appendChild(this.container);
    document.body.classList.add('is-modal-open');
    this.closeX();
    this.closeEsc();
  }

  setTitle(title) {
    let titleElement = this.container.querySelector('.modal__title');
    titleElement.textContent = title;
  }

  setBody(node) {
    const bodyElement = this.container.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.appendChild(node);
  }

  closeModal() {
    const button = this.container.querySelector('.modal__close');
    button.removeEventListener('click', () => this.closeModal());
    document.body.classList.remove('is-modal-open');
    this.container.remove();
  }

  closeX() {
    const button = this.container.querySelector('.modal__close');
    button.addEventListener('click', () => {
      this.closeModal();
    });
  }

  closeEsc() {
    this.buttonEsc = (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    };
    document.addEventListener('keydown', this.buttonEsc);
  }

  get elem() {
    return this.container;
  }
}
