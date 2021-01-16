import { IApiReturn, authApiAgent } from "../agent";

export interface IS3UploadApiReturn extends IApiReturn {
  data?: {
    monthly_income: number;
    monthly_outcome: number;
    remain_outcome: number;
  };
}

const postOutcomeApi = async (): Promise<IS3UploadApiReturn> => {
  const { postRequest } = authApiAgent;

  try {
    const res = await postRequest("/outcome");

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

export default postOutcomeApi;
