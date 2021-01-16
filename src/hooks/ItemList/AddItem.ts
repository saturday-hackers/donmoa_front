import { useCallback, useEffect, useReducer } from "react";
import outcomeCategoriesApi, {
  IOutcomeCategories,
} from "../../@api/ItemList/outcomeCategoriesApi";
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
  category_id: string;
  categories: IOutcomeCategories[];
  customCategory: string;
  remind: boolean;
}

export const initialFormState: IFormState = {
  type: EItemType.outcome,
  name: "",
  price: 0,
  date: makeDayId(new Date()),
  cycle: ECycleType.month,
  category_id: "custom",
  categories: [{ id: "custom", name: "카테고리 추가" }],
  customCategory: "",
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
      draft.category_id = str;
    });
  }, []);

  const setCustomCategory = useCallback((str: string) => {
    dispatch((draft) => {
      draft.customCategory = str;
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

  useEffect(() => {
    const request = async () => {
      const res = await outcomeCategoriesApi();
      if (res.success) {
        dispatch((draft) => {
          if (res.data) {
            draft.categories = [
              ...res.data,
              { id: "custom", name: "카테고리 추가" },
            ];
            draft.category_id = res.data[0].id;
          }
        });
      }
    };

    request();
  }, []);

  return {
    ...state,
    action: {
      setType,
      setName,
      setDate,
      setCategory,
      setCustomCategory,
      setPrice,
      setCycle,
      toggleRemind,
    },
  };
};

export default useAddItem;
