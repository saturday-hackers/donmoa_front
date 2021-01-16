import { useReducer, useEffect } from "react";
import { createLocallyReducer } from "../../utils/action";

export interface IAsync<T> {
  loading: boolean;
  data: T;
  error: Error | null;
}

function useAsync<T>(
  callback: () => Promise<T>,
  initialState: T,
  deps = [],
  skip: boolean = false
): [IAsync<T>, () => Promise<void>] {
  const reducer = createLocallyReducer<IAsync<T>>();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: initialState,
    error: null,
  });

  const fetchData = async () => {
    dispatch((draft) => {
      draft.loading = true;
    });
    try {
      const data = await callback();
      dispatch((draft) => {
        draft.loading = false;
        draft.data = data;
      });
    } catch (e) {
      dispatch((draft) => {
        draft.error = e;
      });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
