import { useAuthStore } from 'stores/auth';
import authRoutes from 'routers/auth';
import { authMiddleware } from 'routers/middleware';
import { RootRouter } from 'enums/app';
import { getAccessToken, getCurrentUser } from 'utils/auth-cookie';
import HomePage from 'pages/HomePage.vue';

const NotFoundPage = () => import('pages/NotFoundPage.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RootRouter.HOME_PAGE,
    component: HomePage,
    meta: {
      title: RootRouter.HOME_PAGE,
      middleware: [authMiddleware],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: RootRouter.NOT_FOUND,
    component: NotFoundPage,
    meta: {
      title: RootRouter.NOT_FOUND,
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
    const middlewares = get(to.meta, 'middleware') as App.RouteMiddleware[];
    if (!middlewares) {
      return next();
    }
    const authStore = useAuthStore();
    const currentUser = getCurrentUser();
    const accessToken = getAccessToken();
    const isLoggedIn = Boolean(currentUser) && Boolean(accessToken);
    const middleware = head(middlewares);
    if (currentUser) {
      authStore.setUserInfo(currentUser);
    }
    const middlewareContext: App.MiddlewareContext = {
      to,
      next,
      currentUser,
      isLoggedIn,
    };
    return middleware!(middlewareContext);
  }
);

export default router;
