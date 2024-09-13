import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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

const handleRefreshToken = async (): Promise<Request.TokenResponse['accessToken']> => {
  try {
    const refreshToken = getRefreshToken();
    const response = await axiosInstance.post<Request.TokenResponse>('/auth/refresh-token', {
      refreshToken,
    });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response.data.accessToken;
  } catch {
    throw new Error('Refresh token invalid!');
  }
};

const handleUnauthorized = (): void => {
  revokeUser();
  window.location.href = `${VUE_APP_API_URL}/sign-in`;
};

const shouldRefreshToken = (token: string): boolean => {
  const { exp } = jwtDecode<Request.DecodedToken>(token);
  const currentTime = Date.now() / 1000;
  const ttl = exp - currentTime;
  return ttl < (exp - currentTime) / 3;
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
    const accessToken = await handleRefreshToken();
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
      if (shouldRefreshToken(token)) {
        handleRefreshToken();
      }
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
