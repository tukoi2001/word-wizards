import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  revokeUser,
} from 'utils/auth-cookie';
import { StatusCode } from 'enums/app';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

let isRefreshing: boolean = false;
let queueRequests: App.QueuedRequest[] = [];

const processQueueRequest = (error: Error | null, token: string | null = null): void => {
  queueRequests.forEach((request: App.QueuedRequest) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token!);
    }
  });
  queueRequests = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const handleSetNewToken = (response: App.Any): void => {
  const { accessToken, refreshToken } = response;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

const handleUnauthorized = (): void => {
  revokeUser();
  window.location.href = `${VUE_APP_API_URL}/sign-in`;
};

const handleAccessTokenExpired = async (
  originalRequest: AxiosRequestConfig
): Promise<AxiosResponse> => {
  if (isRefreshing) {
    try {
      const token = await new Promise<string>((resolve, reject) => {
        queueRequests.push({ resolve, reject });
      });
      originalRequest.headers!['Authorization'] = 'Bearer ' + token;
      return axiosInstance(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  isRefreshing = true;
  try {
    const refreshToken = getRefreshToken();
    const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
    handleSetNewToken(response.data);
    const { accessToken } = response.data;
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    originalRequest.headers!['Authorization'] = `Bearer ${accessToken}`;
    processQueueRequest(null, accessToken);
    return axiosInstance(originalRequest);
  } catch (error) {
    processQueueRequest(error as Error, null);
    handleUnauthorized();
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};

const handleResponseError = (error: AxiosError): Promise<AxiosResponse> => {
  const status = error.response!.status;
  const errorData = error.response!.data!;
  const originalRequest = error.config;
  switch (status) {
    case StatusCode.UNAUTHORIZED:
      handleUnauthorized();
      break;
    case StatusCode.ACCESS_TOKEN_EXPIRED:
      return handleAccessTokenExpired(originalRequest!);
    //   TODO: Handle more case later
    default:
      break;
  }
  return Promise.reject({ ...error, ...errorData });
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosResponse> => handleResponseError(error)
);

export async function useRequest<T>(config: Partial<AxiosRequestConfig>): Promise<T> {
  const response = await axiosInstance<T>(config);
  return response.data;
}
