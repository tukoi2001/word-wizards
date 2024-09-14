export enum RootRouter {
  HOME_PAGE = 'Home Page',
  SIGN_UP = 'Sign Up',
  VERIFY_OTP = 'Verify OTP',
  SIGN_IN = 'Sign In',
  NOT_FOUND = 'Not Found',
  FORGOT_PASSWORD = 'Forgot Password',
  RESET_PASSWORD = 'Reset Password',
}

export enum KeyCode {
  KEYZ = 'KeyZ',
}

export enum Theme {
  DARK = 'Dark',
  LIGHT = 'Light',
}

export enum StatusCode {
  CREATED = 201,
  UNAUTHORIZED = 401,
  ACCESS_TOKEN_EXPIRED = 440,
  TOO_MANY_REQUESTS = 429,
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}
