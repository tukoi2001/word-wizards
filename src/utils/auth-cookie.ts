import { setCookie, getCookie, removeCookie } from 'utils/cookie';
import useEncryption from 'hooks/use-encryption';

const { decrypt, encrypt } = useEncryption();

export const getAccessToken = (): string => {
  return getCookie('token')!;
};

export const getRefreshToken = (): string => {
  return getCookie('refreshToken')!;
};

export const getCurrentUser = (): Auth.User => {
  const encryptUser: string = getCookie('userInfo')!;
  return encryptUser ? JSON.parse(decrypt(encryptUser)) : null;
};

export const setAccessToken = (token: string): void => {
  setCookie('token', token);
};

export const setRefreshToken = (refreshToken: string) => {
  setCookie('refreshToken', refreshToken);
};

export const setUserInfo = (user: Auth.User): void => {
  const encryptData = encrypt(JSON.stringify(user));
  setCookie('userInfo', encryptData);
};

export const revokeUser = () => {
  removeCookie('token');
  removeCookie('refreshToken');
  removeCookie('userInfo');
};
