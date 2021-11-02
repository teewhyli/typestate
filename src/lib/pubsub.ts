import { IPubSub } from "../interfaces/IPubSub";
import { Events, PubSubEvent } from "../types/State.type";

export class PubSub implements IPubSub{
    private readonly events: Events = {} as Events;
    
    subscribe(event: PubSubEvent, fn: () => void): void {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }
        this.events[event].push(fn);
    }

    publish(event: PubSubEvent, data: { items: string[]; }): void {
        this.events[event].map(fn => fn(data));
    }
}