declare namespace Auth {
  type SignUpForm = {
    email: string;
    password: string;
    passwordConfirm: string;
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
  };

  type ForgotPasswordForm = {
    email: string;
  };

  type ResetPassword = {
    newPassword: string;
    token?: string;
    confirmNewPassword?: string;
  };
}
