import { useRequest } from 'hooks/use-request';

export const signIn = (data: Auth.SignInForm): Promise<Auth.SignInResponse> =>
  useRequest<Auth.SignInResponse>({ url: '/auth/sign-in', method: 'POST', data });
