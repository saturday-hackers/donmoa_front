import { IApiReturn, authApiAgent } from "../agent";

export interface IOutcomeCategories {
  id: string;
  name: string;
}

export interface IOutcomesApiReturn extends IApiReturn {
  data?: IOutcomeCategories[];
}

const outcomeCategoriesApi = async (): Promise<IOutcomesApiReturn> => {
  const { getRequest } = authApiAgent;

  try {
    const res = await getRequest("/outcome/categories");

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

export default outcomeCategoriesApi;
