import { IStore } from "../interfaces/IStore";
import { PubSub } from "../lib/pubsub";
import { 
    ActionKey, 
    Actions, 
    MutationKey, 
    Mutations, 
    State, 
    StateKey, 
    Status 
} from "../types/State.type";

type Params = {
    actions: Actions,
    mutations: Mutations,
    state: State,
}

export class Store implements IStore{
    private state: State;
    private status: Status = 'RESTING';
    private readonly params: Params;
    public readonly events = new PubSub();

    constructor(
        params: Params,
        events = new PubSub()
    ) {
        this.params = params;
        this.state = new Proxy((params.state), {
            set: (state: State, key: StateKey, value) => {
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

    public getState(): State {
        return { ...this.state };
    }

    private get mutations(): Mutations {
        return this.params.mutations;
    }

    private get actions(): Actions {
        return this.params.actions;
    }

    dispatch(actionKey: ActionKey, payload: any): boolean {

        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        
        console.groupCollapsed(`ACTION: ${actionKey}`);
        this.status = 'ACTION';
        this.actions[actionKey](this, payload);
        console.groupEnd();

        return true
    }

    commit(mutationKey: MutationKey, payload: any): boolean {

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
