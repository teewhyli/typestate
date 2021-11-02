import { Component } from "../lib/component.js";
import { store } from "../store/index.js";
export class List extends Component {
    constructor() {
        super({
            store: store,
            element: document.querySelector('.js-items')
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
          `;
        }).join('')}
      </ul>
    `;
        this.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index });
            });
        });
    }
}
;
