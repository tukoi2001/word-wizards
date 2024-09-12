import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { RootRouter } from 'enums/app';
import authRoutes from 'routers/auth';
import HomePage from 'pages/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RootRouter.HOME_PAGE,
    component: HomePage,
    meta: {
      title: RootRouter.HOME_PAGE,
    },
  },
  ...authRoutes,
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
