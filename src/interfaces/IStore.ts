import { ActionKey, MutationKey } from "../types/State.type";

export interface IStore {
    dispatch(actionKey: ActionKey, payload: any): boolean;
    commit(mutationKey: MutationKey, payload: any): boolean;
}
