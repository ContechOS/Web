import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "./actions.types";
import { MutationTypes } from "./mutations.types";
import { RootState } from "@/store";
import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import gql from "graphql-tag";
import { apolloClient } from "@/mixins/apollo.mixin";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionTypes.SIGN_IN]({ commit }: AugmentedActionContext, payload: any): void;
  [ActionTypes.SIGN_UP]({ commit }: AugmentedActionContext, payload: any): any;
  [ActionTypes.SIGN_OUT](
    { commit }: AugmentedActionContext,
    payload?: undefined
  ): any;
  [ActionTypes.FETCH_CURRENT_USER](
    { commit }: AugmentedActionContext,
    payload: any
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.SIGN_IN]({ commit }, payload) {
    provideApolloClient(apolloClient);

    const { mutate, onDone, onError } = useMutation(gql`
      mutation ($email: String!, $password: String!) {
        signIn(signInInput: { email: $email, password: $password }) {
          user {
            id
            name
            email
          }
          token
        }
      }
    `);

    mutate(payload);

    onDone((result) => {
      localStorage.setItem("auth.token", result.data.signIn.token);

      commit(MutationTypes.SET_USER, result.data.signIn.user);
    });

    onError((result) => {
      console.log(result.graphQLErrors[0].extensions?.response.message);
    });
  },
  [ActionTypes.SIGN_UP]({ commit }, payload) {
    provideApolloClient(apolloClient);

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
          user {
            id
            name
            email
          }
          token
        }
      }
    `);

    mutate(payload);

    onDone((result) => {
      localStorage.setItem("auth.token", result.data.signIn.token);

      commit(MutationTypes.SET_USER, result.data.signIn.user);
    });

    onError((result) => {
      console.log(result.graphQLErrors[0].extensions?.response.message);
    });
  },
  [ActionTypes.SIGN_OUT]({ commit }, payload) {
    localStorage.clear();
    sessionStorage.clear();

    commit(MutationTypes.SET_USER, undefined);
  },
  [ActionTypes.FETCH_CURRENT_USER]({ commit }, payload) {
    provideApolloClient(apolloClient);

    const { onResult, onError } = useQuery(
      gql`
        query {
          currentUser {
            id
            name
            email
          }
        }
      `,
      undefined,
      {}
    );

    onResult((result) => {
      commit(MutationTypes.SET_USER, result.data.currentUser);
    });

    onError((result) => {
      console.log(result.graphQLErrors[0].extensions?.response.message);
    });
  },
};
