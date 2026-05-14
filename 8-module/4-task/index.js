import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) { 

     if (!product) {
      return
    };
    
    let cartItem = this.cartItems.find(item => item.id === product.id)
      if(!cartItem) { 
        this.cartItems.push({
           name: product.name,
           price: product.price,
           category: product.category,
          image: product.image,
          id: product.id,
          count: 1
        })
      }
      else { 
        cartItem.count++;
      }
      this.onProductUpdate(cartItem);
  }


  updateProductCount(productId, amount) { 
    const cartItem = this.cartItems.find(item => item.id === productId);

    if (!cartItem) {
      return;
    }
    
    cartItem.count += amount;
    
    if (cartItem.count === 0) {
      this.cartItems = this.cartItems.filter(item => item.id  !== productId);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() { 
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) { 
      const item = this.cartItems[i].count;
      totalCount = totalCount + item;
    }
    return totalCount;
  }

  getTotalPrice() { 
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) { 
      const item = this.cartItems[i];
      totalCount = totalCount + (item.count * item.price);
    }
    return totalCount;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }


renderModal() {
  let modal = new Modal();
  modal.setTitle('Your order');
  const modalBody = document.createElement('div');

  for (const cartItem of this.cartItems) {
    const productCard = this.renderProduct(cartItem, cartItem.count);
    modalBody.appendChild(productCard);
  }

    const orderForm = this.renderOrderForm();
    modalBody.appendChild(orderForm);

  modal.setBody(modalBody);
  modal.open(); 

  
  const container = modalBody;

  
  const plusButtons = container.querySelectorAll('.cart-counter__button_plus');
  const minusButtons = container.querySelectorAll('.cart-counter__button_minus');

  
  for (const button of plusButtons) {
    button.addEventListener('click', () => {
      const productCard = button.closest('.cart-product');
      const productId = productCard.dataset.productId;
      this.updateProductCount(productId, 1);
      this.renderModal();
    });
  }

  
  for (const button of minusButtons) {
    button.addEventListener('click', () => {
      const productCard = button.closest('.cart-product');
      const productId = productCard.dataset.productId;
      this.updateProductCount(productId, -1);
      this.renderModal();
    });
  }

 
  const cartForm = container.querySelector('.cart-form');
  if (cartForm) {
    cartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }
}

onProductUpdate(cartItem) {
  if (document.body.classList.contains('is-modal-open')) {
    let productId = cartItem.id;
    let modalBody = document.querySelector('.modal__body');

    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

    if (productCount) productCount.innerHTML = cartItem.count;
    if (productPrice) productPrice.innerHTML = `€${(cartItem.price * cartItem.count).toFixed(2)}`;
    if (infoPrice) infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  if (this.isEmpty()) {
    this.modal.closeModal();
  }

  this.cartIcon.update(this);
}


  onSubmit(event) {
    event.preventDefault();
    
    
    let submitButton = document.querySelector('[type="submit"]');
    submitButton.classList.add('is-loading');
    const form = document.querySelector('.cart-form');
    const modal = new Modal();

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            modal.setTitle('Success!');
            this.cartItems = []; 
             const successMessage = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `);

        modal.setBody(successMessage);
        modal.open(); 
          
        }
    });
}

  

  


  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

}


