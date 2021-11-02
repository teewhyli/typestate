import { PubSubEvent, State } from "../types/State.type";

export interface IPubSub {
    subscribe(event: PubSubEvent, fn: () => void): void;
    publish(event: PubSubEvent, data: State): void;
}
