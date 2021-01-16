import { IApiReturn, authApiAgent } from "../agent";

export enum EIntervalType {
  default = "default",
  custom = "custom",
}

export interface IOutcomes {
  category_id: string;
  category_name: string;
  created_at: string;
  enabled_remind: boolean;
  id: string;
  interval_type: EIntervalType;
  interval_value: number;
  name: string;
  price: number;
  started_date: string;
}

export interface IOutcomesApiReturn extends IApiReturn {
  data?: IOutcomes[];
}

const outcomesApi = async (): Promise<IOutcomesApiReturn> => {
  const { getRequest } = authApiAgent;

  try {
    const res = await getRequest("/outcomes");

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
