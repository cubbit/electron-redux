  import { Middleware, Store, AnyAction } from "redux";
  export const forwardToRenderer: (ipc_event_name: string) => Middleware;
  export const forwardToMain: (ipc_event_name: string) => Middleware;
  export const triggerAlias: Middleware;
  export function replayActionMain(ipc_event_name: string): (store: Store) => void;
  export function replayActionRenderer(ipc_event_name: string): (store: Store) => void;
  export function getInitialStateRenderer<T>(ipc_event_name: string): () => T;
  export type ForwardToMainParams = { blacklist?: RegExp[] };
  export function forwardToMainWithParams(
    params?: ForwardToMainParams
  ): Middleware;

  export type AliasedAction<T extends string, U extends any[]> = {
    type: "ALIASED";
    payload: U;
    meta: {
      trigger: T;
    };
  };

  export function createAliasedAction<T extends string, U extends any[]>(
    name: T,
    actionCreator: (...args: U) => AnyAction
  ): (...args: U) => AliasedAction<T, U>;