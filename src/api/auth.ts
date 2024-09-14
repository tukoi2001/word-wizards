import { useRequest } from 'hooks/use-request';

export const signIn = (data: Auth.SignInForm): Promise<Auth.SignInResponse> =>
  useRequest<Auth.SignInResponse>({ url: '/auth/sign-in', method: 'POST', data });

export const signUp = (data: Auth.SignUpForm): Promise<Auth.SignUpResponse> =>
  useRequest<Auth.SignUpResponse>({ url: '/auth/sign-up', method: 'POST', data });
