
import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.slides = slides;
    this.categories = categories;
  }

  async render() {
    const carousel = new Carousel(this.slides);
    const holder = document.querySelector('[data-carousel-holder]');
    holder.appendChild(carousel.elem);



    const ribbonMenu = new RibbonMenu(this.categories);
    this.ribbonMenu = ribbonMenu;
    const ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.appendChild(ribbonMenu.elem);



    const stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.stepSlider = stepSlider;
    const sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.appendChild(stepSlider.elem);



    const cartIcon = new CartIcon();
    const iconHolder = document.querySelector('[data-cart-icon-holder]');
    iconHolder.appendChild(cartIcon.elem); 
    this.cart = new Cart(cartIcon);



    const response = await fetch('products.json');
    const data = await response.json();



    this.productGrid = new ProductsGrid(data);
    const productHolder = document.querySelector('[data-products-grid-holder]');
    productHolder.appendChild(this.productGrid.elem);

   
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
});

    document.body.addEventListener('product-add' , event => { 
      const product = this.productGrid.products.find(el => el.id === event.detail)
      if(product) { 
        this.cart.addProduct(product)
      }
    })

     this.stepSlider.elem.addEventListener('slider-change', () => {
      this.productGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value, 
        category: this.ribbonMenu.value
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value, 
        category: event.detail
      });
    });

    document.body.addEventListener('change' , event => { 
      const target = event.target.closest('.filters__checkbox')
      if(event.target.id === 'nuts-checkbox') { 
        this.productGrid.updateFilter({
          noNuts: event.target.checked
        })
      }


      if(event.target.id === 'vegeterian-checkbox') { 
        this.productGrid.updateFilter({
          vegeterianOnly: event.target.checked
        })
      }
    })

    

    return Promise.resolve();
  }
}
