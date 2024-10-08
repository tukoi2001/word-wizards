import { guestMiddleWare } from './middleware';
import { RootRouter } from 'enums/app';

const SignUpPage = () => import('pages/SignUpPage.vue');
const SignInPage = () => import('pages/SignInPage.vue');
const VerifyOTPPage = () => import('pages/VerifyOTPPage.vue');
const ResetPasswordPage = () => import('pages/ResetPasswordPage.vue');
const ForgotPasswordPage = () => import('pages/ForgotPasswordPage.vue');

const authRoutes = [
  {
    path: '/sign-up',
    name: RootRouter.SIGN_UP,
    component: SignUpPage,
    meta: {
      title: RootRouter.SIGN_UP,
      middleware: [guestMiddleWare],
    },
  },
  {
    path: '/verify-otp',
    name: RootRouter.VERIFY_OTP,
    component: VerifyOTPPage,
    meta: {
      title: RootRouter.VERIFY_OTP,
      middleware: [guestMiddleWare],
    },
  },
  {
    path: '/sign-in',
    name: RootRouter.SIGN_IN,
    component: SignInPage,
    meta: {
      title: RootRouter.SIGN_IN,
      middleware: [guestMiddleWare],
    },
  },
  {
    path: '/forgot-password',
    name: RootRouter.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    meta: {
      title: RootRouter.FORGOT_PASSWORD,
      middleware: [guestMiddleWare],
    },
  },
  {
    path: '/reset-password',
    name: RootRouter.RESET_PASSWORD,
    component: ResetPasswordPage,
    meta: {
      title: RootRouter.RESET_PASSWORD,
      middleware: [guestMiddleWare],
    },
  },
];

export default authRoutes;
