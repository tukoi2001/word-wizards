import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { RootRouter } from 'enums/app';
import HomePage from 'pages/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RootRouter.ADS_MANAGER,
    component: HomePage,
    meta: {
      title: RootRouter.ADS_MANAGER,
    },
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () => import("../views/About"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return { left: 0, top: 0, behavior: 'smooth' };
  },
});

router.beforeEach(
  (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = `ADS Report - ${to.meta.title}`;
    next();
  }
);

export default router;
