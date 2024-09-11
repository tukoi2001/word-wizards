import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { RootRouter } from 'enums/app';
import HomePage from 'pages/HomePage.vue';

const SignUpPage = () => import('pages/SignUpPage.vue');
const VerifyOTPPage = () => import('pages/VerifyOTPPage.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RootRouter.HOME_PAGE,
    component: HomePage,
    meta: {
      title: RootRouter.HOME_PAGE,
    },
  },
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
    component: SignUpPage, //TODO:
    meta: {
      title: RootRouter.SIGN_IN,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = `Word Wizards - ${to.meta.title}`;
    next();
  }
);

export default router;
