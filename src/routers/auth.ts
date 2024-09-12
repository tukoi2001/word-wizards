import { RouteRecordRaw } from 'vue-router';
import { RootRouter } from 'enums/app';

const SignUpPage = () => import('pages/SignUpPage.vue');
const SignInPage = () => import('pages/SignInPage.vue');
const VerifyOTPPage = () => import('pages/VerifyOTPPage.vue');

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/sign-up',
    name: RootRouter.SIGN_UP,
    component: SignUpPage,
    meta: {
      title: RootRouter.SIGN_UP,
    },
  },
  {
    path: '/verify-otp',
    name: RootRouter.VERIFY_OTP,
    component: VerifyOTPPage,
    meta: {
      title: RootRouter.VERIFY_OTP,
    },
  },
  {
    path: '/sign-in',
    name: RootRouter.SIGN_IN,
    component: SignInPage,
    meta: {
      title: RootRouter.SIGN_IN,
    },
  },
];

export default authRoutes;
