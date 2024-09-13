import Cookies from 'js-cookie';

const options = { path: '/' };

export const setCookie = (name: string, value: string): void => {
  Cookies.set(name, value, options);
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name, options);
};
