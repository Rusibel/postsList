import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';

export function createRequest<T>(
  data: AxiosRequestConfig<any>,
): Promise<AxiosResponse> {
  const location = document.location;
  console.log(location);

  document.cookie = `back_url=${location}`;
  return axiosInstance<T>(data);
}
