import { Store } from "./store.js";
export const state = {
    items: [
        'I made this',
        'Another thing'
    ]
};
export const actions = {
    addItem(context, payload) {
        context.commit('addItem', payload);
    },
    clearItem(context, payload) {
        context.commit('clearItem', payload);
    }
};
export const mutations = {
    addItem(state, payload) {
        state.items.push(payload);
        return state;
    },
    clearItem(state, payload) {
        state.items.splice(payload.index, 1);
        return state;
    }
};
export const store = new Store({
    actions,
    mutations,
    state
});
