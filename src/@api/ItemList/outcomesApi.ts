import { IApiReturn, authApiAgent } from "../agent";

export enum EIntervalType {
  monthly = "monthly",
  custom = "custom",
}

export interface IOutcomesApiReturn extends IApiReturn {
  data?: {
    category_id: string;
    category_name: string;
    created_at: string;
    enabled_remind: boolean;
    id: string;
    interval_type: EIntervalType;
    name: string;
    price: number;
    started_date: string;
  };
}

const outcomesApi = async (): Promise<IOutcomesApiReturn> => {
  const { getRequest } = authApiAgent;

  try {
    const res = await getRequest("/outcomes");

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

export default outcomesApi;
