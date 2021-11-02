import { Component } from "../lib/component.js";
import { store } from "../store/index.js";
export class Count extends Component {
    constructor() {
        super({
            store: store,
            element: document.querySelector('.js-count'),
        });
        store.events.subscribe('StateChange', () => this.render());
    }
    render() {
        const suffix = store.getState().items.length !== 1 ? 's' : '';
        const emoji = store.getState().items.length > 0 ? '&#x1f64c;' : '&#x1f622;';
        this.element.innerHTML = `
      <small>You've done</small>
      ${store.getState().items.length}
      <small>thing${suffix} today ${emoji}</small>
    `;
    }
}
