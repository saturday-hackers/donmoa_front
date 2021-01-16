import produce from "immer";

export const createLocallyReducer = <T>() => (
  state: T,
  action: (draft: T) => void
): T => produce(state, action);
