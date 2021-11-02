import { Actions, Mutations, State } from '../types/State.type';
import { Store } from './store';

export const state: State = {
    items: [
      'I made this',
      'Another thing'
    ]
  };

export const actions: Actions = {
    addItem(context: Store, payload: string) {
        context.commit('addItem', payload);
    },
    clearItem(context: Store, payload: string) {
        context.commit('clearItem', payload);
    }
};

export const mutations: Mutations = {
    addItem(state: State, payload: any): State {
        state.items.push(payload);
        return state;
    },
    clearItem(state: State, payload: any): State {
        state.items.splice(payload.index, 1);
        return state;
    }
  };

export const store: Store = new Store({
  actions,
  mutations,
  state
});