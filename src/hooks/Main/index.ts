import summaryApi from "../../@api/Main/summaryApi";
import useAsync from "../@common/async";

export interface ISummaryState {
  income: number;
  outcome: number;
  remain: number;
}

export const initialSummaryState = {
  income: 0,
  outcome: 0,
  remain: 0,
};

const useMain = () => {
  const [state] = useAsync<ISummaryState>(async () => {
    const res = await summaryApi();
    if (res.success && res.data)
      return {
        income: res.data.monthly_income,
        outcome: res.data.monthly_outcome,
        remain: res.data.remain_outcome,
      };
    else {
      if (res.error) throw res.error;
      else throw new Error();
    }
  }, initialSummaryState);

  return state.data;
};

export default useMain;
