import outcomesApi, { IOutcomes } from "../../@api/ItemList/outcomesApi";
import incomesApi, { IIncomes } from "../../@api/ItemList/incomesApi";
import useAsync from "../@common/async";

export const initialItemList: IOutcomes[] = [];

const useItemList = () => {
  const [{ data: outcomes }] = useAsync<IOutcomes[]>(async () => {
    const res = await outcomesApi();

    if (res.data) return res.data;
    else throw res.error ? res.error : new Error();
  }, initialItemList);

  const [{ data: incomes }] = useAsync<IIncomes[]>(async () => {
    const res = await incomesApi();

    if (res.data) return res.data;
    else throw res.error ? res.error : new Error();
  }, initialItemList);

  return { outcomes, incomes };
};

export default useItemList;
