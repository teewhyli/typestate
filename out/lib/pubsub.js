export class PubSub {
    constructor() {
        this.events = {};
    }
    subscribe(event, fn) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }
        this.events[event].push(fn);
    }
    publish(event, data) {
        this.events[event].map(fn => fn(data));
    }
}
