import { Component } from "../lib/component.js";
import { store } from "../store/index.js";
export class Status extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.js-status')
        });
        store.events.subscribe('StateChange', () => this.render());
    }
    render() {
        let suffix = store.getState().items.length !== 1 ? 's' : '';
        this.element.innerHTML = `${store.getState().items.length} item${suffix}`;
    }
}
