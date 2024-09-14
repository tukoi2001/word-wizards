declare namespace Auth {
  import('enums/app');
  import('enums/auth');

  import type { StatusCode } from 'enums/app';
  import type { AuthRole } from 'enums/auth';

  type SignUpForm = {
    email: string;
    password: string;
    passwordConfirm?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  };

  type SignInForm = {
    email: string;
    password: string;
  };

  type OTPForm = {
    otp: string;
    email: string;
  };

  type ForgotPasswordForm = {
    email: string;
  };

  type ResetPassword = {
    newPassword: string;
    token?: string;
    confirmNewPassword?: string;
  };

  type User = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    role: AuthRole;
    isActive: boolean;
  };

  type SignInResponse = Request.TokenResponse & {
    userInfo: User;
  };

  type SignUpResponse = {
    statusCode: StatusCode;
    message: string;
    userInfo: User;
  };
}
