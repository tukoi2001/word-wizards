import { useRequest } from 'hooks/use-request';

export const signIn = (data: Auth.SignInForm): Promise<Auth.SignInResponse> =>
  useRequest<Auth.SignInResponse>({
    url: '/auth/sign-in',
    method: 'POST',
    data,
  });

export const signUp = (data: Auth.SignUpForm): Promise<Auth.SignUpResponse> =>
  useRequest<Auth.SignUpResponse>({
    url: '/auth/sign-up',
    method: 'POST',
    data,
  });

export const verifyOtp = (data: Auth.OTPForm): Promise<App.BaseResponse> =>
  useRequest<App.BaseResponse>({
    url: '/auth/verify-otp',
    method: 'POST',
    data,
  });

export const resendOtp = (
  data: Pick<Auth.OTPForm, 'email'>,
): Promise<App.BaseResponse> =>
  useRequest<App.BaseResponse>({
    url: '/auth/resend-otp',
    method: 'POST',
    data,
  });

export const forgotPassword = (
  data: Auth.ForgotPasswordForm,
): Promise<App.BaseResponse> =>
  useRequest<App.BaseResponse>({
    url: 'auth/forgot-password',
    method: 'POST',
    data,
  });

export const resetPassword = (
  data: Auth.ResetPassword,
): Promise<App.BaseResponse> =>
  useRequest<App.BaseResponse>({
    url: 'auth/reset-password',
    method: 'POST',
    data,
  });
