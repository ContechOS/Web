import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "./actions.types";
import { MutationTypes } from "./mutations.types";
import { RootState } from "@/store";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

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
    // TODO
  },
  async [ActionTypes.SIGN_UP]({ commit }, payload) {
    const { mutate, onDone, onError } = useMutation(gql`
    mutation ($name: String!, $email: String!, $password: String!) {
      createUser(createUserInput: {
        name: $name,
        email: $email,
        password: $password
      }) {}

      signIn(signInInput: {
        email: $email,
        password: $password
      }) {
        user
        token
      }
    }
    `);

    mutate(payload);

    onDone((result) => {
      localStorage.setItem("auth.token", result.data.token);

      commit(MutationTypes.SET_USER, result.data.user);
    });

    onError((result) => {
      console.log(result);
    })
  },
  async [ActionTypes.SIGN_OUT]({ commit }, payload) {
    localStorage.clear();
    sessionStorage.clear();

    commit(MutationTypes.SET_USER, undefined);
  },
  async [ActionTypes.FETCH_CURRENT_USER]({ commit }, payload) {
    // TODO
  },
};
