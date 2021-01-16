import outcomesApi from "../../@api/ItemList/outcomesApi";
import incomesApi from "../../@api/ItemList/incomesApi";
import useAsync from "../@common/async";

export interface ISummaryState {
  income: number;
  outcome: number;
  remain: number;
}

export const initialItemList = [];

const useItemList = () => {
  const [{ data: outcomes }] = useAsync<any>(async () => {
    const res = await outcomesApi();
    console.log(res);
  }, initialItemList);

  const [{ data: incomes }] = useAsync<any>(async () => {
    const res = await incomesApi();
    console.log(res);
  }, initialItemList);

  return { outcomes, incomes };
};

export default useItemList;
