import { Component } from '../lib/component';
import { store } from '../store/index';

export class List extends Component {
  constructor() {
    super({
      store: store,
      element: document.querySelector('.js-items') as Element
    });

    store.events.subscribe('StateChange', () => this.render());
  }

  render() {
    if (store.getState().items.length === 0) {
      this.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
      return;
    }

    this.element.innerHTML = `
      <ul class="app__items">
        ${store.getState().items.map(item => {
          return `
            <li>${item}<button aria-label="Delete this item">×</button></li>
          `
        }).join('')}
      </ul>
    `;

    this.element.querySelectorAll('button').forEach((button, index: number) => {
      button.addEventListener('click', () => {
        store.dispatch('clearItem', { index });
      });
    });
  }
};