import { IApiReturn, authApiAgent } from "../agent";

export interface ISummaryApiReturn extends IApiReturn {
  data?: {
    monthly_income: number;
    monthly_outcome: number;
    remain_outcome: number;
  };
}

const summaryApi = async (): Promise<ISummaryApiReturn> => {
  const { getRequest } = authApiAgent;

  try {
    const res = await getRequest("/summary");

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

export default summaryApi;
