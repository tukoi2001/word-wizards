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
