import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  revokeAuthentication,
} from 'utils/auth-cookie';
import { StatusCode } from 'enums/app';
import { showError } from 'utils/toast';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

let isRefreshing: boolean = false;
let pendingRequests: App.PendingRequest[] = [];

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const addRequestForPendingRequests = (request: App.PendingRequest): void => {
  pendingRequests.push(request);
};

const addAccessTokenForPendingRequests = (accessToken: string): void => {
  pendingRequests.forEach((request) => request(accessToken));
};

const handleRefreshToken = async (): Promise<void> => {
  try {
    isRefreshing = true;
    const refreshToken = getRefreshToken();
    const response = await axiosInstance.post<Request.TokenResponse>(
      '/auth/refresh-token',
      { refreshToken },
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setAccessToken(accessToken);
    setRefreshToken(newRefreshToken);
    addAccessTokenForPendingRequests(accessToken);
    pendingRequests = [];
  } catch (error) {
    handleUnauthorized();
  } finally {
    isRefreshing = false;
  }
};

const handleUnauthorized = (): void => {
  revokeAuthentication();
  window.location.href = `${VUE_APP_API_URL}/sign-in`;
};

const handleAccessTokenExpired = (
  originalRequest: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  if (!isRefreshing) {
    handleRefreshToken();
  }
  return new Promise((resolve, reject) => {
    addRequestForPendingRequests((accessToken: string) => {
      originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  });
};

const handleResponseError = (error: AxiosError): Promise<AxiosResponse> => {
  const status = error.response!.status;
  const originalRequest = error.config;
  const errorData = get(error, 'response.data.message');
  switch (status) {
    case StatusCode.UNAUTHORIZED:
      handleUnauthorized();
      break;
    case StatusCode.ACCESS_TOKEN_EXPIRED:
      return handleAccessTokenExpired(originalRequest!);
    case StatusCode.TOO_MANY_REQUESTS:
      showError(errorData!);
      break;
    //   TODO: Handle more case later
    default:
      break;
  }
  return Promise.reject(errorData);
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosResponse> => handleResponseError(error),
);

export default axiosInstance;
