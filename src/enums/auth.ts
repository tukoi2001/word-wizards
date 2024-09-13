export enum SignUpStep {
  EMAIL,
  PERSONAL,
  PASSWORD,
  OTHER,
}

export enum VerifyOTPStep {
  VERIFY,
  DONE,
}

export enum ForgotPasswordStep {
  RESET,
  DONE,
}

export enum AuthRole {
  ADMIN = 'admin',
  USER = 'user',
}
