/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "query-string";
import { ELocalItemKeys, getLocalItem } from "../utils/local";

export interface IApiReturn {
  success: boolean;
  poll?: boolean;
  message?: string;
  error?: Error;
}

export const DEFAULT_TIMEOUT = 600000;

const createAxiosInstance = (auth: boolean, baseURL: string) => {
  const apiInstance: AxiosInstance = axios.create({
    baseURL,
    validateStatus: (status) => status >= 200 && status < 400,
    timeout: DEFAULT_TIMEOUT,
  });

  apiInstance.interceptors.request.use((request) => {
    const accessToken = getLocalItem(ELocalItemKeys.access_token);
    if (auth && accessToken) request.headers.Authorization = `${accessToken}`;

    return request;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const message = error.response.data.message;
        const status = error.response.status;
        return Promise.reject(new Error(`${status}:${message}`));
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
};

class ApiAgent {
  private axiosInstance: AxiosInstance;

  constructor(auth: boolean) {
    this.axiosInstance = createAxiosInstance(
      auth,
      "https://donmoa-main.herokuapp.com/api"
    );
  }

  postRequest = async (url: string, data?: any, config?: any): Promise<any> => {
    let res;
    if (config?.stringify) data = qs.stringify(data);
    try {
      res = await this.axiosInstance.post(url, data, config);
    } catch (err) {
      throw err;
    }
    return res;
  };

  getRequest = async (
    url: string,
    params?: any,
    headers?: any
  ): Promise<any> => {
    let res;
    try {
      res = await this.axiosInstance.get(url, { params, headers });
    } catch (err) {
      throw err;
    }
    return res;
  };

  putRequest = async (url: string, data?: any, config?: AxiosRequestConfig) => {
    let res;
    try {
      res = await this.axiosInstance.put(url, data, config);
    } catch (err) {
      throw err;
    }
    return res;
  };

  deleteRequest = async (url: string, params?: any): Promise<any> => {
    let res;
    try {
      res = await this.axiosInstance.delete(url, { params });
    } catch (err) {
      throw err;
    }
    return res;
  };
}

export const authApiAgent = new ApiAgent(true);
export const unauthApiAgent = new ApiAgent(false);
