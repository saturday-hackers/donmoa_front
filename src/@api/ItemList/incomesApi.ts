import { IApiReturn, authApiAgent } from "../agent";
import { EIntervalType } from "./outcomesApi";

export interface IIncomes {
  category_id: string;
  category_name: string;
  created_at: string;
  id: string;
  interval_type: EIntervalType;
  interval_value: number;
  name: string;
  price: number;
  started_date: string;
}

export interface IIncomesApiReturn extends IApiReturn {
  data?: IIncomes[];
}

const incomesApi = async (): Promise<IIncomesApiReturn> => {
  const { getRequest } = authApiAgent;

  try {
    const res = await getRequest("/incomes");

    console.log(res);
    if (res.status === 200) {
      return {
        success: true,
        data: res.data,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }

  return { success: false, error: new Error() };
};

export default incomesApi;
