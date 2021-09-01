import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "./actions.types";
import { MutationTypes } from "./mutations.types";
import { RootState } from "@/store";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionTypes.SIGN_IN](
    { commit }: AugmentedActionContext,
    payload: any
  ): Promise<void>;
  [ActionTypes.SIGN_UP](
    { commit }: AugmentedActionContext,
    payload: any
  ): Promise<any>;
  [ActionTypes.SIGN_OUT](
    { commit }: AugmentedActionContext,
    payload?: undefined
  ): Promise<any>;
  [ActionTypes.FETCH_CURRENT_USER](
    { commit }: AugmentedActionContext,
    payload: any
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SIGN_IN]({ commit }, payload) {
    const response = await fetch("api/tasks");
    const tasks = await response.json();

    commit(MutationTypes.SET_USER, tasks);

    return tasks;
  },
  async [ActionTypes.SIGN_UP]({ commit }, payload) {
    const response = await fetch("api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return alert("Error creating task");
    }

    commit(MutationTypes.SET_USER, task);
  },
  async [ActionTypes.SIGN_OUT]({ commit }, payload) {
    localStorage.clear();
    sessionStorage.clear();

    commit(MutationTypes.SET_USER, undefined);
  },
  async [ActionTypes.FETCH_CURRENT_USER]({ commit }, payload) {
    const response = await fetch(`api/tasks/${task.id}`, { method: "DELETE" });

    if (!response.ok) {
      return alert("Error deleting task");
    }

    commit(MutationTypes.SET_USER, task);
  },
};
