import { Store } from "../store/store";

export type PubSubEvent = "StateChange"

export type ArrayOfFn = { (data: State): void; } [];

export type ComponentData = {
    store: Store,
    element: Element,
}

export type Events = {
    [event in PubSubEvent]: ArrayOfFn;
};
export type Actions = { 
    [key in ActionKey]: (context: Store, payload: any) => void 
}
export type Mutations = { 
    [key in MutationKey]: (state: State, payload: any) => State;
}
export type State = { 
    [key in StateKey]: string[] 
};

export type Status = 'RESTING' | 'MUTATION' | 'ACTION';
export type ActionKey = "addItem" | "clearItem";
export type MutationKey = "addItem" | "clearItem";
export type StateKey = "items";