import { RootRouter } from 'enums/app';

export function guestMiddleWare({ next, isLoggedIn }: App.MiddlewareContext): void {
  if (isLoggedIn) {
    return next({ name: RootRouter.HOME_PAGE });
  }
  return next();
}

export function authMiddleware({ next, currentUser, isLoggedIn }: App.MiddlewareContext): void {
  if (isLoggedIn) {
    return next();
  }
  if (!currentUser.isActive) {
    return next({ name: RootRouter.VERIFY_OTP });
  }
  return next({ name: RootRouter.SIGN_IN });
}
