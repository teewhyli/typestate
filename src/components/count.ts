import { IRenderable } from '../interfaces/IRenderable';
import { Component } from '../lib/component';
import { store } from '../store/index';

export class Count extends Component implements IRenderable {
  constructor() {
    super({
      store: store,
      element: document.querySelector('.js-count') as Element,
    });
    
    store.events.subscribe('StateChange', () => this.render());
  }

  render(): void {
    const suffix = store.getState().items.length !== 1 ? 's' : '';
    const emoji = store.getState().items.length > 0 ? '&#x1f64c;' : '&#x1f622;';

    this.element.innerHTML = `
      <small>You've done</small>
      ${store.getState().items.length}
      <small>thing${suffix} today ${emoji}</small>
    `;
  }
}