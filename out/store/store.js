import { PubSub } from "../lib/pubsub.js";
export class Store {
    constructor(params, events = new PubSub()) {
        this.status = 'RESTING';
        this.events = new PubSub();
        this.params = params;
        this.state = new Proxy((params.state), {
            set: (state, key, value) => {
                state[key] = value;
                console.log(`stateChange: ${key}: ${value}`);
                this.events.publish('StateChange', this.state);
                if (this.status !== 'MUTATION') {
                    console.warn(`You should use a mutation to set ${key}`);
                }
                this.status = 'RESTING';
                return true;
            }
        });
    }
    getState() {
        return Object.assign({}, this.state);
    }
    get mutations() {
        return this.params.mutations;
    }
    get actions() {
        return this.params.actions;
    }
    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        console.groupCollapsed(`ACTION: ${actionKey}`);
        this.status = 'ACTION';
        this.actions[actionKey](this, payload);
        console.groupEnd();
        return true;
    }
    commit(mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        this.status = 'MUTATION';
        const newState = this.mutations[mutationKey](this.state, payload);
        this.state = Object.assign(this.state, newState);
        return true;
    }
}
