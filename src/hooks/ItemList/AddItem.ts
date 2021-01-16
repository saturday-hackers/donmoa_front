import { useCallback, useReducer } from "react";
import { createLocallyReducer } from "../../utils/action";
import { makeDayId } from "../../utils/format";

export enum EItemType {
  outcome = "outcome",
  income = "income",
}

export enum ECycleType {
  month = "month",
  year = "year",
}

export interface IFormState {
  type: EItemType;
  name: string;
  price: number;
  date: string;
  cycle: ECycleType | number;
  category: string;
  remind: boolean;
}

export const initialFormState: IFormState = {
  type: EItemType.outcome,
  name: "",
  price: 0,
  date: makeDayId(new Date()),
  cycle: ECycleType.month,
  category: "",
  remind: true,
};

const useAddItem = () => {
  const reducer = createLocallyReducer<IFormState>();

  const [state, dispatch] = useReducer(reducer, initialFormState);

  const setType = useCallback((type: EItemType) => {
    dispatch((draft) => {
      draft.type = type;
    });
  }, []);

  const setName = useCallback((str: string) => {
    dispatch((draft) => {
      draft.name = str;
    });
  }, []);

  const setDate = useCallback((str: string) => {
    dispatch((draft) => {
      draft.date = str;
    });
  }, []);

  const setCategory = useCallback((str: string) => {
    dispatch((draft) => {
      draft.category = str;
    });
  }, []);

  const setPrice = useCallback((price: number) => {
    dispatch((draft) => {
      draft.price = price;
    });
  }, []);

  const setCycle = useCallback((cycle: ECycleType | number) => {
    dispatch((draft) => {
      draft.cycle = cycle;
    });
  }, []);

  const toggleRemind = useCallback(() => {
    dispatch((draft) => {
      draft.remind = !draft.remind;
    });
  }, []);

  return {
    ...state,
    action: {
      setType,
      setName,
      setDate,
      setCategory,
      setPrice,
      setCycle,
      toggleRemind,
    },
  };
};

export default useAddItem;
