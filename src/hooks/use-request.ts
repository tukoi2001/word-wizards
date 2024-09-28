import axiosInstance from 'config/axios-instance';
import type { AxiosRequestConfig } from 'axios';

export async function useRequest<T>(
  config: Partial<AxiosRequestConfig>,
): Promise<T> {
  const response = await axiosInstance<T>(config);
  return response.data;
}
