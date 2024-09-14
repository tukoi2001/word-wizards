import { RootRouter } from 'enums/app';

export const guestMiddleWare = ({
  next,
  isLoggedIn,
}: App.MiddlewareContext): void => {
  if (isLoggedIn) {
    return next({ name: RootRouter.HOME_PAGE });
  }
  return next();
};

export const authMiddleware = ({
  next,
  currentUser,
  isLoggedIn,
}: App.MiddlewareContext): void => {
  if (isLoggedIn) {
    if (currentUser && !currentUser.isActive) {
      return next({ name: RootRouter.VERIFY_OTP });
    }
    return next();
  }
  return next({ name: RootRouter.SIGN_IN });
};
